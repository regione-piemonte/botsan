// SPDX-License-Identifier: EUPL-1.2
// Copyright Regione Piemonte - 2022

import axios from 'axios';

import {SERVER_API_URL} from 'app/config/constants';
import {loggerFactory} from 'app/config/log.config';

const logger = loggerFactory.getLogger('app/config/axios-config.ts');

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = SERVER_API_URL;

logger.debug(() => 'axios.defaults=' + JSON.stringify(axios.defaults));

export const setupAxios = onUnauthenticated => {
	logger.debug(() => '[setupAxios] Inizio');

	const onRequestSuccess = config => {
		return config;
	};

	const onResponseSuccess = response => {
		return response;
	};


	const onResponseError = error => {
		logger.debug(() => '[setupAxios::onResponseError] Inizio');
		logger.debug(() => '[setupAxios::onResponseError] error=' + JSON.stringify(error));

		const status = error.status || (error.response ? error.response.status : 0);
		if (status === 403 || status === 401) {
			onUnauthenticated();
		}

		logger.debug(() => '[setupAxios::onResponseError] Fine');
		return Promise.reject(error);
	};

	axios.interceptors.request.use(onRequestSuccess);
	axios.interceptors.response.use(onResponseSuccess, onResponseError);

	logger.debug(() => '[setupAxios] Fine');
};

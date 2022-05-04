// SPDX-License-Identifier: EUPL-1.2
// Copyright Regione Piemonte - 2022

import axios, {AxiosPromise, AxiosResponse} from 'axios';
import {v4 as uuidv4} from 'uuid';
import {API_URL} from 'app/config/constants';
import {loggerFactory} from 'app/config/log.config';

const logger = loggerFactory.getLogger('app/entities/message/message.service.ts');

const getStandardHeader = () => {
	const header = {
		"Content-Type": "application/json",
		"X-Request-ID": uuidv4()
	};
	return header;
}

interface IQueryChatBotServiceResult {
	answer: string;
	status: number;
}

export const queryChatBotService = (question: string): Promise<IQueryChatBotServiceResult> => {
	logger.debug(() => '[queryChatBotService] Inizio');
	logger.debug(() => '[queryChatBotService] question=' + question);

	const requestUrl = `${API_URL.CHAT_BOT}`;
	const params = {question};
	const config = {
		headers: getStandardHeader()
	};

	const result = axios.post(requestUrl, params, config)
		.then((response) => {
			logger.debug(() => '[queryChatBotService][then] response=' + JSON.stringify(response));

			const res = {
				answer: response.data.answer,
				status: response.status
			}

			return res;
		});

	logger.debug(() => '[queryChatBotService] Fine');
	return result;
};

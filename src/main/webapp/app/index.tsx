// SPDX-License-Identifier: EUPL-1.2
// Copyright Regione Piemonte - 2022

import React from 'react';
import ReactDOM from 'react-dom';
import {setupAxios} from 'app/config/axios.config';

import AppComponent from './app';
import {loggerFactory} from 'app/config/log.config';

const logger = loggerFactory.getLogger('app/index.tsx');

logger.debug(() => 'Inizio');

logger.debug(() => 'Call to [setupAxios()] Inizio');
setupAxios(() => {});
logger.debug(() => 'Call to [setupAxios()] Fine');

const rootEl = document.getElementById('botsan-chat');

const render = Component =>
	// eslint-disable-next-line react/no-render-return-value
	ReactDOM.render(
		<Component />,
		rootEl
	);

logger.debug(() => 'Call to [render(AppComponent)] Inizio');
render(AppComponent);
logger.debug(() => 'Call to [render(AppComponent)] Fine');

logger.debug(() => 'Fine');

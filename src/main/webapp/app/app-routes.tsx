// SPDX-License-Identifier: MIT
// Copyright Regione Piemonte - 2022

import React from 'react';
import {Switch} from 'react-router-dom';

import {loggerFactory} from 'app/config/log.config';

const logger = loggerFactory.getLogger('app/app-routes.tsx');

logger.debug(() => 'Inizio');

const AppRoutes = () => {
	logger.debug(() => '[AppRoutes] Inizio');

	const result = (
		<div className="view-routes">
			<Switch>
			</Switch>
		</div>
	);

	logger.debug(() => '[AppRoutes] Fine');
	return result;
}

export default AppRoutes;

logger.debug(() => 'Fine');

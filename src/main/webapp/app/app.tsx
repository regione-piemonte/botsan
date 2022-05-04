// SPDX-License-Identifier: MIT
// Copyright Regione Piemonte - 2022

import React, {useEffect} from 'react';

import 'app/theme/style/main.scss';
import 'app/theme/fonts/main.scss';
import './app.scss';

import {loggerFactory} from 'app/config/log.config';
import HomeComponent from 'app/modules/home/home/home.component';

const logger = loggerFactory.getLogger('app/app.tsx');

export const App = (props: any) => {
	return (
		<HomeComponent></HomeComponent>
	);
};

export default App;

// SPDX-License-Identifier: MIT
// Copyright Regione Piemonte - 2022

import classNames from 'classnames/bind';
import React, {useEffect} from 'react';
import {addLinkSnippet, addResponseMessage, setBadgeCount, toggleWidget, Widget} from 'react-chat-widget';

import styles from './home.component.scss';

import {loggerFactory} from 'app/config/log.config';
import {queryChatBotService} from 'app/entities/message/message.service';

const logger = loggerFactory.getLogger('app/module/home/home/home.component.tsx');

const cx = classNames.bind(styles);

export const HomeComponent = (props: any) => {
	logger.debug(() => '[HomeComponent] Inizio');
	logger.debug(() => '[HomeComponent] props=' + JSON.stringify(props));

	const init = (): void => {
		logger.debug(() => '[HomeComponent::init] Inizio');
		addResponseMessage('Ciao, sono l\'assistente digitale del portale Salute! Far&#242; del mio meglio per aiutarti a trovare le informazioni che cerchi!');
		setBadgeCount(0);
		logger.debug(() => '[HomeComponent::init] Fine');
	}

	useEffect(() => {
		logger.debug(() => '[HomeComponent::useEffect([])] Inizio');
		init();
		logger.debug(() => '[HomeComponent::useEffect([])] Fine');
	}, []);

	const handleNewUserMessage = (newMessage: string) => {
		logger.debug(() => '[HomeComponent::handleNewUserMessage] Inizio');

		logger.debug(() => '[HomeComponent::handleNewUserMessage] newMessage=' + newMessage);

		queryChatBotService(newMessage)
			.then(response => {
				logger.debug(() => '[HomeComponent::handleNewUserMessage][then] response=' + JSON.stringify(response));

				if (response.status === 204) {
					addResponseMessage("Non hai trovato la risposta che cercavi? Consulta le FAQ disponibili [qui](https://www.salutepiemonte.it/assistenza)");
				}
				else {
					addResponseMessage(response.answer);
				}
			})
			.catch(error => {
				logger.debug(() => '[HomeComponent::handleNewUserMessage][catch] error=' + JSON.stringify(error));

				addResponseMessage("Ci spiace ma per un problema tecnico non riusciamo a fornirti una risposta.");
			});

		logger.debug(() => '[HomeComponent::handleNewUserMessage] Fine');
	};

	const parser = new DOMParser();
	const senderPh = parser.parseFromString(`Vorrei avere pi&ugrave; info su...`, "text/html").body.textContent;

	const result = (
		<div className={cx('root')}>
			<Widget
				handleNewUserMessage={handleNewUserMessage}
				title='Salute Piemonte'
				subtitle='Il tuo assistente digitale!'
				senderPlaceHolder={senderPh}
				sendButtonAlt='Invia'
				showTimeStamp={false}
			/>
		</div>
	);

	logger.debug(() => '[HomeComponent] Fine');
	return result;
};

export default HomeComponent;

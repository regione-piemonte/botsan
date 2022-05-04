// SPDX-License-Identifier: EUPL-1.2
// Copyright Regione Piemonte - 2022

import {
  AbstractLogger,
  DateFormat,
  DateFormatEnum,
  LoggerFactoryOptions,
  LogFormat,
  LogGroupRule,
  LogLevel,
  LogMessage,
  LoggerFactory,
  LFService
} from 'typescript-logging';

const options = new LoggerFactoryOptions();
const logFormat: LogFormat = new LogFormat(new DateFormat(DateFormatEnum.YearDayMonthWithFullTime, '/'));

options.addLogGroupRule(new LogGroupRule(new RegExp('^app/'), LogLevel.Error, logFormat));

export const loggerFactory: LoggerFactory = LFService.createNamedLoggerFactory('app-logger-factory', options);

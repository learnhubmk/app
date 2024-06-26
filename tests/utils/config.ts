import dotenv from 'dotenv';
import assert from 'assert';
import { Logger } from 'winston';
import { GetLogger } from './logger';

dotenv.config();

export type TestConfig = {
  DEBUG_LEVEL: string;
  BASE_URL: string;
  logger: Logger;
};

export function GetConfig(): TestConfig {
  const { BASE_URL, DEBUG_LEVEL } = process.env;

  assert(BASE_URL, 'BASE_URL not found in .env file');
  assert(DEBUG_LEVEL, 'DEBUG_LEVEL not found in .env file');

  if (DEBUG_LEVEL.toLowerCase() !== 'info' && DEBUG_LEVEL.toLowerCase() !== 'debug') {
    // eslint-disable-next-line no-throw-literal
    throw 'Debug needs to be INFO or DEBUG';
  }

  const logger = GetLogger(DEBUG_LEVEL as 'info' | 'debug');

  return { DEBUG_LEVEL, BASE_URL, logger };
}

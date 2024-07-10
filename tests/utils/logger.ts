import { Logger, createLogger, format, transports } from 'winston';

export function GetLogger(debugLevel: 'info' | 'debug'): Logger {
  return createLogger({
    level: debugLevel,
    exitOnError: false,
    format: format.combine(
      format.colorize({
        all: true,
      }),
      format.label({
        label: '[LOG]',
      }),
      format.timestamp({ format: 'YY-MM-DD HH:mm:ss' }),
      format.printf((info) => `${info.label}  [${info.timestamp}]  ${info.level} : ${info.message}`)
    ),
    transports: [new transports.Console()],
  });
}

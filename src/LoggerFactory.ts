import { createLogger, format, Logger, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
const { printf } = format;

/**
 * Class with a singleton patter implemented that
 * allows returning a logger with the name of the file where
 * the {@link getLogger} method was called
 */
export default class LoggerFactory {
    // Singleton
    private static instance: LoggerFactory;

    /**
     * Get the instance of the factory
     * @returns the instance of the factory
     */
    public static get Instance() {
        if (!this.instance) {
            this.instance = new LoggerFactory();
        }

        return this.instance;
    }

    private constructor() {}

    /**
     * Creates a logger that prints the name of the file where this method
     * was called
     * @returns a new logger associated to the file
     */
    public getLogger(): Logger {
        let stackTrace = new Error().stack!;

        // Get the file where the logger was created
        let file = stackTrace.split('\n')[1].split('/').pop()!.split(':')[0];

        return createLogger({
            level: 'debug',
            format: format.combine(
                format.metadata(),
                format.timestamp({
                    format: 'YYYY-MM-DD hh:mm:ss',
                }),
                this.getLoggerFormatter(file)
            ),
            transports: [
                new transports.Console({
                    level: 'debug',
                    format: format.combine(
                        format.colorize({ all: true }),
                        this.getLoggerFormatter(file)
                    ),
                }),
                new DailyRotateFile({
                    level: 'info',
                    filename: 'logs/%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    maxSize: '10m',
                    maxFiles: '14d',
                }),
            ],
        });
    }

    private getLoggerFormatter(file: string) {
        return printf((info) => {
            let msg = `${info.timestamp} [${info.level}] ${file}: ${info.message}`;

            if (Object.entries(info.metadata).length > 1) {
                msg += '\n' + JSON.stringify(info.metadata, null, 4);
            }

            return msg;
        });
    }
}

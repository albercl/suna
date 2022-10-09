import { createLogger, format, transports } from 'winston';
const { printf } = format;

let logger_format = printf((info) => {
    let msg = `${info.timestamp} [${info.level}] ${info.message}`;

    let splat = Symbol('splat');
    if (info.metadata) {
        msg += '\n' + JSON.stringify(info.metadata, null, 4);
    }

    return msg;
});

let logger = createLogger({
    level: 'info',
    format: format.combine(
        format.prettyPrint({
            colorize: true,
        }),
        format.metadata(),
        format.timestamp({
            format: 'YYYY-MM-DD hh:mm:ss',
        }),
        logger_format
    ),
    transports: [new transports.Console()],
});

logger.info('Logger is working!', {
    myObj: {
        name: 'albercl',
    },
    string: 'str',
});

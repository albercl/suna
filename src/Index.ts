import BotController from './controller/BotController';
import LoggerFactory from './utils/LoggerFactory';
import CONFIG from './config/Config';

const logger = LoggerFactory.Instance.getLogger();

try {
    BotController.getInstance(CONFIG);
} catch (e) {
    logger.error('An error occurred while initializing the bot!', e);
}

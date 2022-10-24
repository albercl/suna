import IConfig from './IConfig';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import LoggerFactory from '../utils/LoggerFactory';

const logger = LoggerFactory.Instance.getLogger();
const configPath = path.join(process.cwd(), 'config', 'config.json');
let config: IConfig;

try {
    config = JSON.parse(readFileSync(configPath).toString()) as IConfig;
} catch (e) {
    logger.error(
        'Cannot load ./config/config.json, a new config file will be created, exiting...',
        e
    );

    try {
        mkdirSync(path.join(process.cwd(), 'config'));
    } catch (_) {}

    try {
        writeFileSync(configPath, '{ token: "", developers: [] }');
    } catch (e) {
        logger.error("Couldn't create the new file, exiting...");
    }

    process.exit(1);
}

export default config;

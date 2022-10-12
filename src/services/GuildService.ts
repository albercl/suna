import IGuildConfig from '../model/IGuildConfig';

declare class GuildService {
    retrieveConfig(id: string): IGuildConfig;
}

export default GuildService;

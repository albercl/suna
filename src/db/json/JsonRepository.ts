import * as path from 'path';
import IEntity from '../IEntity';
import IRepository from '../IRepository';

export default class JsonRepository<E extends IEntity<number>>
    implements IRepository<number, E>
{
    public static readonly DB_PATH = './.jsondb';

    private readonly dbPath;
    private array: E[] = [];

    constructor(entityName: string) {
        this.dbPath = path.join(JsonRepository.DB_PATH, entityName + '.json');
    }
    public async getById(key: number): Promise<E | null> {
        throw new Error('Method not implemented.');
    }
    public async getAllKeys(): Promise<number[]> {
        throw new Error('Method not implemented.');
    }
    public async getAll(): Promise<E[]> {
        throw new Error('Method not implemented.');
    }
    public async create(entity: E): Promise<E | null> {
        throw new Error('Method not implemented.');
    }
    public async update(entity: E): Promise<void> {
        throw new Error('Method not implemented.');
    }
    public async delete(entity: E): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    public async deleteAll(): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}

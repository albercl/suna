import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import * as path from 'path';
import IEntity from '../IEntity';
import IRepository from '../IRepository';

export default class JsonRepository<E extends IEntity<number>>
    implements IRepository<number, E>
{
    private readonly dbPath;
    private map: Map<number, E> = new Map();
    private nextId: number = 0;

    constructor(dbBasePath: string, entityName: string) {
        this.dbPath = path.join(dbBasePath, entityName + '.json');

        const directory = dbBasePath;
        if (!existsSync(directory)) {
            mkdirSync(directory);
        }

        if (existsSync(this.dbPath)) this.loadDB();
    }

    private async persist() {
        writeFileSync(
            this.dbPath,
            JSON.stringify({
                nextId: this.nextId,
                db: Array.from(this.map.entries()),
            }),
            {
                encoding: 'utf-8',
            }
        );
    }

    private async loadDB() {
        try {
            let dbStr = readFileSync(this.dbPath).toString('utf-8');
            let object = JSON.parse(dbStr);
            this.nextId = object.nextId;
            this.map = new Map(object.db);
        } catch (e) {}
    }

    public async getById(key: number): Promise<E | null> {
        return this.map.get(key) || null;
    }

    public async getAllKeys(): Promise<number[]> {
        return Array.from(this.map.keys()) as number[];
    }

    public async getAll(): Promise<E[]> {
        return Array.from(this.map.values());
    }

    public async create(entity: E): Promise<E> {
        if (!entity)
            throw new Error('Cannot create entity with value: undefined');
        entity.id = this.nextId++;

        this.map.set(entity.id, entity);

        this.persist();

        return entity;
    }

    public async update(entity: E): Promise<void> {
        if (!entity)
            throw new Error('Cannot update entity with value: undefined');
        if (!entity.id)
            throw new Error(`The provided entity doesn't have a key!`);

        this.map.set(entity.id, entity);

        this.persist();
    }

    public async delete(entity: E): Promise<boolean> {
        if (!entity)
            throw new Error('Cannot delete entity with value: undefined');
        if (entity.id === undefined) {
            throw new Error(`The provided entity doesn't have a key!`);
        }

        let result = this.map.delete(entity.id);
        this.persist();

        return result;
    }

    public async deleteAll(): Promise<boolean> {
        this.map.clear();
        this.nextId = 0;
        this.persist();

        return true;
    }
}

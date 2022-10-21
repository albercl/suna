import IEntity from '../IEntity';
import IRepository from '../IRepository';

export default class TmpRepository<E extends IEntity<number>>
    implements IRepository<number, E>
{
    private map: Map<number, E> = new Map();
    private counter: number = 1;

    public async getById(key: number): Promise<E | null> {
        let entity = this.map.get(key);
        if (entity) return entity;

        return null;
    }

    public async getAllKeys(): Promise<number[]> {
        return Array.from(this.map.keys());
    }

    public async getAll(): Promise<E[]> {
        return Array.from(this.map.values());
    }

    public async create(entity: E): Promise<E> {
        if (!entity)
            throw new Error('Cannot create entity with value: undefined');
        entity.id = this.counter++;
        this.map.set(entity.id, entity);

        return entity;
    }

    public async update(entity: E): Promise<void> {
        if (!entity)
            throw new Error('Cannot update entity with value: undefined');
        if (!entity.id) {
            throw new Error(`The provided entity doesn't have a key!`);
        }
        this.map.set(entity.id, entity);
    }

    public async delete(entity: E): Promise<boolean> {
        if (!entity)
            throw new Error('Cannot delete entity with value: undefined');
        if (!entity.id) {
            throw new Error(`The provided entity doesn't have a key!`);
        }
        return this.map.delete(entity.id);
    }

    public async deleteAll(): Promise<boolean> {
        this.map.clear();
        return true;
    }
}

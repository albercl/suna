import IEntity from '../IEntity';
import IRepository from '../IRepository';

export default class JsonRepository<E extends IEntity<number>>
    implements IRepository<number, E>
{
    private map = new Map<number, E>();

    constructor() {}

    getById(key: number): E | null {
        throw new Error('Method not implemented.');
    }
    create(entity: E): E {
        throw new Error('Method not implemented.');
    }
    update(entity: E): E {
        throw new Error('Method not implemented.');
    }
    delete(entity: E): boolean {
        throw new Error('Method not implemented.');
    }
}

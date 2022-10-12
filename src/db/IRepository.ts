import IEntity from './IEntity';

/**
 * This interface establish the methods that should have any
 * repository in this project.
 */
export default interface IRepository<K, E extends IEntity<K>> {
    /**
     * Get an entity by its associated key or ID
     * @param   {K} key Key of the entity
     * @returns {E | null} The entity associated with the key or null
     */
    getById(key: K): E | null;

    /**
     * Creates a new entity and associates to it a key
     * @param  {E} entity Entity object
     * @returns The same entity with the key associated to it
     * @throws Error when an entity is already associated with this key
     */
    create(entity: E): E;

    /**
     * Updates an entity that is already registered
     * @param  {E} entity New contents of the entity
     * @throws Error when the entity doesn't exists or the key isn't valid
     */
    update(entity: E): void;

    /**
     * Delete the given entity from the repository
     * @param  {E} entity Entity to delete
     * @returns boolean
     */
    delete(entity: E): boolean;
}

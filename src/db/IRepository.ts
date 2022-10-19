import IEntity from './IEntity';

/**
 * This interface establish the methods that should have any
 * repository in this project.
 */
export default interface IRepository<K, E extends IEntity<K>> {
    /**
     * Get an entity by its associated key or ID
     * @param   {K} key Key of the entity
     * @returns {Promise<E | null>} The entity associated with the key or null
     */
    getById(key: K): Promise<E | null>;

    /**
     * Returns an array with all the keys stored
     * @returns Array with all the keys stored
     */
    getAllKeys(): Promise<K[]>;

    /**
     * Returns an array with all the entities stored
     * @returns Array with all entites stored
     */
    getAll(): Promise<E[]>;

    /**
     * Creates a new entity and associates to it a key.
     * If the entity has a key associated this method overwrites it
     * and inserts another entry in the repository.
     * @param  {E} entity Entity object
     * @returns The same entity reference received as parameter
     * @throws Error when an entity is already associated with this key
     */
    create(entity: E): Promise<E | null>;

    /**
     * Updates an entity that is already registered
     * @param  {E} entity New contents of the entity
     * @throws Error when the entity doesn't exists or the key isn't valid
     */
    update(entity: E): Promise<void>;

    /**
     * Delete the given entity from the repository
     * @param  {E} entity Entity to delete
     * @returns True if the operation completed
     */
    delete(entity: E): Promise<boolean>;

    /**
     * Delete all the entities of the repository
     * @returns True if the operation completed
     */
    deleteAll(): Promise<boolean>;
}

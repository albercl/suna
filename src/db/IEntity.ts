/**
 * This class is used as base to a repository entity.
 * It must have a key associated to it.
 */
export default class IEntity<K> {
    private key: K;

    /**
     * Constructor for an entity that need a key to associate the object with
     * @param key Key associated to the entity
     */
    public constructor(key: K) {
        this.key = key;
    }

    /**
     * Get the key of the entity
     * @returns key of the entity
     */
    public get Key(): K {
        return this.key;
    }
}

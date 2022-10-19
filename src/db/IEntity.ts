/**
 * This class is used as base to a repository entity.
 * It must have a key associated to it.
 */
export default interface IEntity<K> {
    id?: K;
}

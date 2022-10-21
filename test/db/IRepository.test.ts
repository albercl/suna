import IEntity from '../../src/db/IEntity';
import IRepository from '../../src/db/IRepository';
import JsonRepository from '../../src/db/json/JsonRepository';
import TmpRepository from '../../src/db/tmp/TmpRepository';

interface TestEntity extends IEntity<number> {
    id?: number;
    username: string;
    password: string;
    name?: string;
    firstSurname?: string;
    secondSurname?: string;
}

function genericTestSuite<R extends IRepository<number, TestEntity>>(
    repoBuilder: () => R
) {
    return () => {
        // * GENERIC TESTS HERE USING 'repo' !!!
        const entity1: TestEntity = {
            username: 'albercl',
            password: 'pass',
        };

        const entity2: TestEntity = {
            username: 'albercl2',
            password: 'password',
            name: 'Alberto',
            firstSurname: 'Cuadrado',
        };

        const entity3: TestEntity = {
            username: 'albercl32',
            password: 'password',
            name: 'Alber',
            firstSurname: 'Cuadrado',
        };

        describe('create()', () => {
            let repo: R;
            beforeAll(() => {
                repo = repoBuilder();
            });
            it('new entity', async () => {
                await repo.create(entity1);
                expect(entity1.id).not.toBe(undefined);
            });

            it('undefined reference', async () => {
                expect(repo.create(undefined as any)).rejects.toThrow();
            });
        });

        describe('getById()', () => {
            let repo: R;
            beforeAll(() => {
                repo = repoBuilder();
            });
            it('undefined key', async () => {
                let result = await repo.getById(undefined as any);
                expect(result).toBe(null);
            });

            it('entity not present in repository', async () => {
                let result = await repo.getById(-1);
                expect(result).toBe(null);
            });

            it('get created entity', async () => {
                await repo.create(entity2);
                let result = await repo.getById(entity2.id!);

                expect(result!.id).toBe(entity2.id);
                expect(result?.username).toBe(entity2.username);
            });
        });

        describe('update()', () => {
            let repo: R;
            beforeAll(() => {
                repo = repoBuilder();
            });
            it('update field of entity', async () => {
                let myentity = { ...entity2 };
                console.log(myentity);

                myentity = await repo.create(myentity);
                myentity.username = 'albertocl';
                console.log(myentity);
                await repo.update(myentity);

                let updatedEntity = await repo.getById(myentity.id!);
                expect(updatedEntity?.username).toBe(myentity.username);
                expect(updatedEntity?.username).not.toBe(entity2.username);
            });

            it('update entity with undefined key', async () => {
                let updateAction = async () => {
                    await repo.update(entity3);
                };

                await expect(updateAction).rejects.toThrow(
                    `The provided entity doesn't have a key!`
                );
            });
        });

        describe('delete()', () => {
            let repo: R;
            beforeAll(() => {
                repo = repoBuilder();
            });
            it('delete existing entity', async () => {
                let myentity: TestEntity | null = await repo.create(entity2);
                expect(myentity!.id).not.toBe(null);

                myentity = await repo.getById(myentity!.id!);
                expect(myentity).not.toBeNull();

                let result = await repo.delete(myentity!);
                expect(result).toBe(true);

                myentity = await repo.getById(myentity!.id!);
                expect(myentity).toBeNull();
            });

            it('update entity with undefined key', async () => {
                let deleteAction = async () => {
                    await repo.update(entity3);
                };
                await expect(deleteAction).rejects.toThrowError(
                    `The provided entity doesn't have a key!`
                );
            });
        });

        describe('deleteAll()', () => {
            let repo: R;
            beforeAll(() => {
                repo = repoBuilder();
            });

            it('delete all entities', async () => {
                await repo.create(entity2);
                let result = await repo.deleteAll();
                expect(result).toBe(true);

                let entities = await repo.getAll();
                expect(entities.length).toBe(0);
            });
        });

        describe('getAllKeys()', () => {
            let repo: R;
            beforeAll(() => {
                repo = repoBuilder();
            });

            it('get random number of keys', async () => {
                let numberOfEntries = Math.floor(Math.random() * 50);
                for (let i = 0; i < numberOfEntries; i++) {
                    await repo.create(entity1);
                }

                let keys = await repo.getAllKeys();
                expect(keys.length).toBe(numberOfEntries);
            });
        });

        describe('getAll()', () => {
            let repo: R;
            beforeAll(() => {
                repo = repoBuilder();
            });

            it('get random number of entries', async () => {
                await repo.deleteAll();

                let numberOfEntries = Math.floor(Math.random() * 50);
                for (let i = 0; i < numberOfEntries; i++) {
                    await repo.create({ ...entity1 });
                }

                let entities = await repo.getAll();
                expect(entities.length).toBe(numberOfEntries);
            });
        });
    };
}

describe('TmpRepository', () => {
    describe(
        'generic tests',
        genericTestSuite<TmpRepository<TestEntity>>(() => new TmpRepository())
    );
});

describe('JsonRepository', () => {
    describe(
        'generic tests',
        genericTestSuite<JsonRepository<TestEntity>>(
            () => new JsonRepository('testEntity')
        )
    );
});

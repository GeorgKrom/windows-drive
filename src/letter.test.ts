import { available, availableSync, randomAvailable, randomAvailableSync, used, usedSync } from './letter';

describe('letter', () => {
    test('usedSync', () => {
        expect(usedSync().includes('C')).toEqual(true);
    });

    test('used', async () => {
        expect((await used()).includes('C')).toEqual(true);
    });

    test('availableSync', () => {
        expect(availableSync().includes('C')).toEqual(false);
    });

    test('available', async () => {
        expect((await available()).includes('C')).toEqual(false);
    });

    test('randomAvailableSync', () => {
        expect(randomAvailableSync()).not.toEqual(undefined);
    });

    test('randomAvailable', async () => {
        expect((await randomAvailable())).not.toEqual(undefined);
    });
})
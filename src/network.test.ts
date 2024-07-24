import { mount, unmount } from './network';

describe('network', () => {
    const MOUNT_PATH = '\\\\localhost\\c$';

    test('mount and unmount', async () => {
        const driveLetter = await mount(MOUNT_PATH);

        if (driveLetter) {
            await unmount(driveLetter);
        }
    });

    test('mount with error', async () => {
        expect.assertions(1);

        try {
            await mount('');
        } catch (err: unknown) {
            expect(err instanceof Error).toEqual(true);
        }
    });

    test('unmount non existence drive', async () => {
        await unmount('L');
    });

    test('unmount with error', async () => {
        expect.assertions(1);

        try {
            await unmount('C');
        } catch (err: unknown) {
            expect(err instanceof Error).toEqual(false);
        }
    });
});
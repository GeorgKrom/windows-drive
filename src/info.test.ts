import { drivesSpaceList, drivesSpaceListSync, localDrivesSpaceList, networkDriveStatusList } from './info';

describe('info', () => {
    test('drivesSpaceList', async () => {
        expect((await drivesSpaceList()).find(drive => drive.driveLetter === 'C')).not.toEqual(undefined);
    });

    test('drivesSpaceListSync', async () => {
        expect(drivesSpaceListSync().find(drive => drive.driveLetter === 'C')).not.toEqual(undefined);
    });

    test('networkDriveStatusList', async () => {
        expect((await networkDriveStatusList()).find(drive => drive.driveLetter === 'C')).toEqual(undefined);
    });

    test('localDrivesSpaceList', async () => {
        expect((await localDrivesSpaceList()).find(drive => drive.driveLetter === 'C')).not.toEqual(undefined);
    });
})
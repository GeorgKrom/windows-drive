import { isWindows, parseSpaceInfo, runCommand, runCommandSync } from './shared/utils';
import { MAX_BUFFER_SIZE, NET_USE_COMMAND } from './shared/constants';
import { TNetworkDriveStatus } from './shared/types';

const COMMAND = 'wmic logicaldisk get freespace, caption, size';

export const drivesSpaceList = async () => {
    isWindows();
    const commandResult = await runCommand(COMMAND);

    return parseSpaceInfo(commandResult);
};

export const drivesSpaceListSync = () => {
    isWindows();
    const commandResult = runCommandSync(COMMAND);

    return parseSpaceInfo(commandResult);
};

export const networkDriveStatusList = async () => {
    isWindows();
    const commandResult = await runCommand(NET_USE_COMMAND, { maxBuffer: MAX_BUFFER_SIZE });

    const driveData = commandResult.replace(/^(-+)$/gm, '').split('\n').map(line => line.replace(/[\r\n]/g, '')).filter(Boolean);
    driveData.shift();
    driveData.shift();
    driveData.pop();

    return driveData.flatMap(drive => {
        const parts = drive.trim().split(/\s+/);

        return {
            status: parts[0] ?? '',
            driveLetter: parts[1] ? parts[1].replace(':', '') : '',
            path: parts[2] ?? '',
        } as TNetworkDriveStatus;
    });
};

export const localDrivesSpaceList = async () => {
    const allDrives = await drivesSpaceList();
    const allNetworkDrives = await networkDriveStatusList();

    return allDrives.flatMap(drive => {
        if (allNetworkDrives.find(networkDrive => networkDrive.driveLetter === drive.driveLetter)) {
            return [];
        }

        return drive;
    });
};
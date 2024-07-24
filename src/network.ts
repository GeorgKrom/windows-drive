import { isWindows, runCommand, windowsPath } from './shared/utils';
import { randomAvailable, used } from './letter';
import { MAX_BUFFER_SIZE, NET_USE_COMMAND } from './shared/constants';

export const mount = async (drivePath: string, driveLetter?: string, username?: string, password?: string) => {
    isWindows();

    if (typeof drivePath !== 'string' || drivePath.trim().length === 0) {
        throw new Error('Path is missing or has wrong type');
    }

    if (typeof driveLetter !== 'string' && driveLetter !== undefined) {
        throw new Error('Drive letter must be string or undefined');
    }

    if (typeof username !== 'string' && username !== undefined) {
        throw new Error('Username must be string or undefined');
    }

    if (typeof password !== 'string' && password !== undefined) {
        throw new Error('Password must be string or undefined');
    }

    if (typeof driveLetter === 'string') {
        driveLetter = driveLetter.trim();
    }

    if (driveLetter === '' || driveLetter === undefined) {
        driveLetter = await randomAvailable();
    }

    drivePath = windowsPath(drivePath);
    let mountCommand = `${ NET_USE_COMMAND } ${ driveLetter }: ${ drivePath } /P:Yes"`;

    if (typeof username === 'string' && typeof password === 'string') {
        mountCommand += ' /user:' + username + ' ' + password;
    }

    await runCommand(mountCommand, { maxBuffer: MAX_BUFFER_SIZE });

    return driveLetter;
};

export const unmount = async (driveLetter: string) => {
    isWindows();

    if (typeof driveLetter !== 'string' || driveLetter.trim().length === 0) {
        throw new Error('Drive letter is missing or has wrong type');
    }

    driveLetter = driveLetter.trim().toUpperCase();
    const usedDriveLetters = await used();

    if (usedDriveLetters.indexOf(driveLetter) !== -1) {
        const umountCommand = `${ NET_USE_COMMAND } ${ driveLetter }: /Delete /y`;

        await runCommand(umountCommand, { maxBuffer: MAX_BUFFER_SIZE });
    }
};
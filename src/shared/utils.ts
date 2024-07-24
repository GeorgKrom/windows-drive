import { execSync, exec, ExecOptions } from 'child_process';
import { TDriveSpace } from './types';

export const isWindows = () => {
    if (process.platform !== 'win32') {
        throw new Error('Works only with Windows');
    }
};

export const runCommand = async (command: string, options?: ExecOptions) => {
    return new Promise<string>((resolve, reject) => {
        exec(command, options, (error, stdout) => {
            if (error) {
                reject(error);
            }

            if (typeof stdout === 'string') {
                resolve(stdout);
            } else {
                resolve(stdout.toString());
            }
        });
    });
};

export const runCommandSync = (command: string) => {
    return execSync(command, { encoding: 'utf-8' });
};

export const getLetters = (stdout: string) => {
    return stdout.split(/[\r\n]+/).reduce<string[]>((letters, line, index) => {
        if (index && line.trim() && line[0]) {
            letters.push(line[0]);
        }

        return letters;
    }, []);
};

export const arrayDiffer = <T>(array: readonly T[], ...values: readonly T[][]) => {
    const rest = new Set(values.flat());

    return array.filter(element => !rest.has(element));
};

export const getRandomIndex = (length: number) => {
    return Math.floor(Math.random() * length);
};

export const parseSpaceInfo = (commandResult: string): TDriveSpace[] => {
    const result = commandResult.split('\r\r\n');
    result.shift();

    return result.flatMap(drive => {
        if (drive) {
            const parts = drive.trim().split(/\s+/);

            return {
                driveLetter: parts[0] ? parts[0].replace(':', '') : '',
                freeSpace: parts[1] ? parseInt(parts[1]) : 0,
                size: parts[2] ? parseInt(parts[2]) : 0,
            };
        }

        return [];
    });
};

export const windowsPath = (drivePath: string) => {
    isWindows();

    if (!drivePath || !drivePath.trim()) {
        throw new Error('Path is missing');
    }

    return drivePath.normalize().replace('/', '\\').replace(/\\+$/, '');
};
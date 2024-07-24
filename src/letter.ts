import { arrayDiffer, getLetters, getRandomIndex, isWindows, runCommand, runCommandSync } from './shared/utils';

const COMMAND = 'wmic logicaldisk get caption';
const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'] as const;

/**
 * @throws Error If OS is not Windows or command failed
 */
export const available = async (): Promise<string[]> => {
    isWindows();
    const usedLetters = await used();

    return arrayDiffer(ALPHABET, usedLetters);
};

/**
 * @throws Error If OS is not Windows or command failed
 */
export const availableSync = (): string[] => {
    isWindows();
    const usedLetters = usedSync();

    return arrayDiffer(ALPHABET, usedLetters);
};

/**
 * @throws Error If OS is not Windows or command failed
 */
export const used = async (): Promise<string[]> => {
    isWindows();
    const stdout = await runCommand(COMMAND);

    return getLetters(stdout);
};

/**
 * @throws Error If OS is not Windows or command failed
 */
export const usedSync = (): string[] => {
    isWindows();
    const stdout = runCommandSync(COMMAND);

    return getLetters(stdout);
};

/**
 * @throws Error If OS is not Windows or command failed
 */
export const randomAvailable = async () => {
    isWindows();
    const availableLetters = await available();
    const randomIndex = getRandomIndex(availableLetters.length);

    return availableLetters[randomIndex];
};

/**
 * @throws Error If OS is not Windows or command failed
 */
export const randomAvailableSync = () => {
    isWindows();
    const availableLetters = availableSync();
    const randomIndex = getRandomIndex(availableLetters.length);

    return availableLetters[randomIndex];
};
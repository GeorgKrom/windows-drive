export type TNetworkDriveStatus = {
    status: string;
    driveLetter: string;
    path: string;
};

export type TDriveSpace = {
    driveLetter: string;
    freeSpace: number;
    size: number;
};
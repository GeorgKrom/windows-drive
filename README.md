# windows-drive

## Installation
```
$ npm install windows-drive
```

## Features
* Mount a network drive
* Unmount network drive
* Get list of all or local drives with information about their size and free space
* Get information about available and used drives letters
* Get list of all network drives with their status
* Typescript supported

## Methods

Available drive letters
```typescript
declare const available: () => Promise<string[]>;

declare const availableSync: () => string[];
```

Used drive letters
```typescript
declare const used: () => Promise<string[]>;

declare const usedSync: () => string[];
```

Random available drive letter
```typescript
declare const randomAvailable: () => Promise<string | undefined>;

declare const randomAvailableSync: () => string | undefined;
```

Mount and unmount network drive
```typescript
declare const mount: (drivePath: string, driveLetter?: string, username?: string, password?: string) => Promise<string | undefined>;

declare const unmount: (driveLetter: string) => Promise<void>;
```

Types for drives info
```typescript
type TNetworkDriveStatus = {
    status: string;
    driveLetter: string;
    path: string;
};

type TDriveSpace = {
    driveLetter: string;
    freeSpace: number;
    size: number;
};
```

Returns array of all drives with information about their size in bytes and free space
```typescript
declare const drivesSpaceList: () => Promise<TDriveSpace[]>;

declare const drivesSpaceListSync: () => TDriveSpace[];
```

Returns array of all network drives with information about their status
```typescript
declare const networkDriveStatusList: () => Promise<TNetworkDriveStatus[]>;
```

Returns array of all local drives with information about their size in bytes and free space
```typescript
declare const localDrivesSpaceList: () => Promise<TDriveSpace[]>;
```

### License
[MIT](LICENSE)
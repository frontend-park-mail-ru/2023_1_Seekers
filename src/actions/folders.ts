
export const actionCreateFolder = () => ({
    type: 'createFolder',
    value: {},
});

export const actionSendFolderToCreate = (name: string) => ({
    type: 'sendFolderToCreate',
    value: name,
});

export const actionTransmitToFolder = (folderSlug: string) => ({
    type: 'transmitToFolder',
    value: folderSlug,
});


export const actionCreateFolder = () => ({
    type: 'createFolder',
    value: {},
});

export const actionSendFolderToCreate = (name: string) => ({
    type: 'sendFolderToCreate',
    value: name,
});

export const actionTransmitToFolder = (id: number) => ({
    type: 'transmitToFolder',
    value: id,
});

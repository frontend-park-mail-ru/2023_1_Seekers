
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

export const actionDeleteFolder = (name: string) => ({
    type: 'deleteFolder',
    value: name,
});

export const actionRenameFolder = (newName: string) => ({
    type: 'renameFolder',
    value: newName,
});

export const actionDeleteFolderByCtx = () => ({
    type: 'deleteFolderByCtx',
    value: {},
});

export const actionRenameFolderByCtx = (newName: string) => ({
    type: 'renameFolderByCtx',
    value: newName,
});

export const actionCtxFolder = (name: string) => ({
    type: 'setContextFolder',
    value: name,
});

export const actionRenameFolderForm = () => ({
    type: 'createRenameFolderForm',
    value: {},
});

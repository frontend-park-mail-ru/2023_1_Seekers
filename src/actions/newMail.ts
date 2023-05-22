
export const actionSendMail = (mail: MailToSend) => ({
    type: 'sendMail',
    value: mail,
});

export const actionReplyToMail = () => ({
    type: 'replyToMail',
    value: {},
});

export const actionForwardMail = () => ({
    type: 'forwardMail',
    value: {},
});

export const actionCreateNewMail = () => ({
    type: 'createNewMail',
    value: {},
});

export const actionSendDraft = (draft: MailToSend) => ({
    type: 'sendDraft',
    value: draft,
});

export const actionSelectDraft = (draftHref: string) => ({
    type: 'selectDraft',
    value: draftHref,
});

export const actionAddAttachment = (file: File) => ({
    type: 'addAttachment',
    value: file,
});

export const actionRemoveAttachment = (attachID: number) => ({
    type: 'removeAttachment',
    value: attachID,
});

export const actionDownloadAttachFromSend = (attachID: number) => ({
    type: 'downloadAttachFromSend',
    value: attachID,
});

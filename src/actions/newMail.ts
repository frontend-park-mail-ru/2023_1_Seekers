
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

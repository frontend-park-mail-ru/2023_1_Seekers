
export const actionSendMail = (mail: mailToSend) => ({
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
})

export const actionCreateNewMail = () => ({
    type: 'createNewMail',
    value: {},
})

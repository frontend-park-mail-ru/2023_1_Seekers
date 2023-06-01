import {Connector} from '@utils/ajax';
import {config, responseStatuses} from '@config/config';
import {microEvents} from '@utils/microevents';
import BaseStore from '@stores/BaseStore';
import {reducerUser} from '@stores/userStore';
import {reducerFolder} from '@stores/FolderStore';
import {socket} from "@utils/webSocket";
import {dateUtil} from "@utils/dateUtil";

/**
 * class that implements all possible actions with letters data
 */
class LettersStore extends BaseStore {
    _storeNames = {
        letters: 'letters',
        mail: 'mail',
        currentLetters: 'currentLetters',
        shownMail: 'shownMail',
        contextMail: 'contextMail',
        currentAccountPage: 'currentAccountPage',
        selectedLetters: 'selectedLetters',
        accountName: 'accountName',
        emailToPaste: 'emailToPaste',
        searchedLetters: 'searchedLetters',
        mailToAppend: 'mailToAppend',
    };

    /**
     * constructor that sets initial state of the store
     */
    constructor() {
        super();
        this._storage.set(this._storeNames.letters, new Map());
        this._storage.set(this._storeNames.mail, new Map());
        this._storage.set(this._storeNames.shownMail, undefined);
        this._storage.set(this._storeNames.contextMail, undefined);
        this._storage.set(this._storeNames.currentLetters, '/inbox');
        this._storage.set(this._storeNames.selectedLetters, []);
        this._storage.set(this._storeNames.searchedLetters, []);
        this._storage.set(this._storeNames.mailToAppend, undefined);
    }

    /**
     * function that makes request to get all the letters from folder
     * @param folderName - name of folder
     */
    getLetters = async (folderName: string) => {
        this.clearSelectedLetter();
        Connector.makeGetRequest(config.api.getLetters + folderName)
            .then(([status, body]) => {
                if (status === responseStatuses.OK) {
                    const curDate = new Date();
                    this._storage.get(this._storeNames.letters).set(folderName, []);
                    body.messages?.forEach((message: any) => {
                        const date = new Date(message.created_at);

                        let time: string = '';

                        if(curDate.getDate() === date.getDate() &&
                           curDate.getMonth() === date.getMonth() &&
                           curDate.getFullYear() === date.getFullYear()) {
                            time = 'сегодня, '
                                + dateUtil.padTo2Digits(date.getHours()) + ':' + dateUtil.padTo2Digits(date.getMinutes());
                        } else {
                            time = date.getDate().toString() + ' ' + dateUtil.getMonth(date.getMonth()) + ', '
                                + dateUtil.padTo2Digits(date.getHours()) + ':' + dateUtil.padTo2Digits(date.getMinutes());
                        }

                        (message.recipients as ProfileData[])?.forEach((recipient) => {
                            recipient.avatar = `${config.basePath}/${config.api.avatar}` +
                                `?email=${recipient.email}`;
                        });

                        const letterFrame: LetterFrameData = {
                            message_id: message.message_id,
                            seen: message.seen,
                            from_user_email: message.from_user_id.email,
                            title: message.title,
                            text: message.text,
                            preview: message.preview,
                            created_at: time,
                            href: folderName + '/' + message.message_id,
                            avatar: `${config.basePath}/${config.api.avatar}` +
                                `?email=${message.from_user_id.email}`,
                            recipients: message.recipients,
                            attachments: message.attachments,
                        };

                        this._storage.get(this._storeNames.letters).get(folderName).push(letterFrame);
                    });

                    if (folderName === this._storage.get(this._storeNames.currentLetters)) {
                        microEvents.trigger('letterListChanged');
                        microEvents.trigger('mailChanged');
                    }
                } else if (status === responseStatuses.NotFound) {
                    microEvents.trigger('folderNotFound');
                }
            });
        this._storage.set(this._storeNames.currentLetters, folderName);
        this._storage.set(this._storeNames.shownMail, undefined);
        microEvents.trigger('letterListChanged');
        microEvents.trigger('mailChanged');
    };

    /**
     * function that makes request to get all the letters from folder
     */
    getLettersAfterSearch = async (message: SearchMessage) => {
        this.clearSelectedLetter();
        Connector.makeGetRequest(config.api.search + this.getCurrentLettersName().split('/').pop() +
            config.api.search_post + message.text)
            .then(([status, body]) => {
                if (status === responseStatuses.OK) {
                    const curDate = new Date();
                    const searchedLetters: LetterFrameData[] = [];
                    body.messages?.forEach((message: any) => {
                        const date = new Date(message.created_at);

                        let time: string = '';

                        if(curDate.getDate() === date.getDate() &&
                            curDate.getMonth() === date.getMonth() &&
                            curDate.getFullYear() === date.getFullYear()) {
                            time = 'сегодня, '
                                + dateUtil.padTo2Digits(date.getHours()) + ':' + dateUtil.padTo2Digits(date.getMinutes());
                        } else {
                            time = date.getDate().toString() + ' ' + dateUtil.getMonth(date.getMonth()) + ', '
                                + dateUtil.padTo2Digits(date.getHours()) + ':' + dateUtil.padTo2Digits(date.getMinutes());
                        }

                        (message.recipients as ProfileData[])?.forEach((recipient) => {
                            recipient.avatar = `${config.basePath}/${config.api.avatar}` +
                                `?email=${recipient.email}`;
                        });

                        const letterFrame: LetterFrameData = {
                            message_id: message.message_id,
                            seen: message.seen,
                            from_user_email: message.from_user_id.email,
                            title: message.title,
                            text: '',
                            preview: message.preview,
                            created_at: time,
                            href: '/' + message.message_id, //  folderName + как вычислить где оно лежит
                            avatar: `${config.basePath}/${config.api.avatar}` +
                                `?email=${message.from_user_id.email}`,
                            recipients: message.recipients,
                        };

                        searchedLetters.push(letterFrame);
                    });
                    this._storage.set(this._storeNames.searchedLetters, searchedLetters);
                    microEvents.trigger('searchDone');
                }
            });
    };

    /**
     * function that makes request to get all the letters from folder
     */
    getLettersAfterFilter = async (filter: string) => {
        this.clearSelectedLetter();
        console.log(filter);
        Connector.makeGetRequest(config.api.filter + this.getCurrentLettersName().split('/').pop() +
            config.api.filter_post + filter)
            .then(([status, body]) => {
                if (status === responseStatuses.OK) {
                    const curDate = new Date();
                    const searchedLetters: LetterFrameData[] = [];
                    body.messages?.forEach((message: any) => {
                        const date = new Date(message.created_at);

                        let time: string = '';

                        if(curDate.getDate() === date.getDate() &&
                            curDate.getMonth() === date.getMonth() &&
                            curDate.getFullYear() === date.getFullYear()) {
                            time = 'сегодня, '
                                + dateUtil.padTo2Digits(date.getHours()) + ':' + dateUtil.padTo2Digits(date.getMinutes());
                        } else {
                            time = date.getDate().toString() + ' ' + dateUtil.getMonth(date.getMonth()) + ', '
                                + dateUtil.padTo2Digits(date.getHours()) + ':' + dateUtil.padTo2Digits(date.getMinutes());
                        }

                        (message.recipients as ProfileData[])?.forEach((recipient) => {
                            recipient.avatar = `${config.basePath}/${config.api.avatar}` +
                                `?email=${recipient.email}`;
                        });

                        const letterFrame: LetterFrameData = {
                            message_id: message.message_id,
                            seen: message.seen,
                            from_user_email: message.from_user_id.email,
                            title: message.title,
                            text: '',
                            preview: message.preview,
                            created_at: time,
                            href: '/' + message.message_id, //  folderName + как вычислить где оно лежит
                            avatar: `${config.basePath}/${config.api.avatar}` +
                                `?email=${message.from_user_id.email}`,
                            recipients: message.recipients,
                        };

                        searchedLetters.push(letterFrame);
                    });
                    this._storage.set(this._storeNames.searchedLetters, searchedLetters);
                    microEvents.trigger('searchDone');
                }
            });
    };

    pasteEmail = async (email: string) => {
        this._storage.set(this._storeNames.emailToPaste, email);
        microEvents.trigger('pasteEmailInRecipient');
    };

    freePasteEmail = async () => {
        this._storage.set(this._storeNames.emailToPaste, '');
    };

    showPasteEmail = async (email: string) => {
        this._storage.set(this._storeNames.emailToPaste, email);
        microEvents.trigger('showPasteEmailInRecipient');
    };

    /**
     * function that makes request to log out user
     */
    async deleteMailRequest(id: string) {
        return Connector.makeDeleteRequest(config.api.deleteMail + id +
            config.api.deleteMail_from + reducerLetters.getCurrentLettersName().split('/')[1]);
    }

    deleteMail = async () => {
        if (this.getSelectedLetters().find((letterId) =>
            letterId === this.getCurrentContextMail().message_id)) {
            const len = this.getSelectedLetters().length;
            let i = 0;
            this.getSelectedLetters().forEach((id) => {
                Connector.makeDeleteRequest(config.api.deleteMail + id +
                    config.api.deleteMail_from + reducerLetters.getCurrentLettersName().split('/')[1])
                    .then(() => {
                        i++;
                        if (i === len) {
                            this.deleteDone();
                        }
                    });
            });
        } else {
            Connector.makeDeleteRequest(config.api.deleteMail +
                this.getCurrentContextMail().message_id.toString() +
                config.api.deleteMail_from + reducerLetters.getCurrentLettersName().split('/')[1]).then(() => {
                this.deleteDone();
            });
        }
    };

    deleteDone = () => {
        this.clearSelectedLetter();
        this.getLetters(this._storage.get(this._storeNames.currentLetters));
        microEvents.trigger('responseFromDelete');
        const mailHref = '/' +
            this._storage.get(this._storeNames.shownMail);
        this.getLetters(
            this._storage.get(this._storeNames.currentLetters));
        if (mailHref !== '/undefined') {
            this.showMail(mailHref);
        }
    };

    downloadMail = async (mailId: string) => {
        Connector.makeGetRequest(config.api.getMail + mailId)
            .then(([status, body]) => {

                if (status === responseStatuses.OK) {
                    const mailData: MailData = body.message;
                    const date = new Date(mailData.created_at);
                    const curDate = new Date();
                    let time: string = '';

                    if(curDate.getDate() === date.getDate() &&
                        curDate.getMonth() === date.getMonth() &&
                        curDate.getFullYear() === date.getFullYear()) {
                        time = 'сегодня, '
                            + dateUtil.padTo2Digits(date.getHours()) + ':' + dateUtil.padTo2Digits(date.getMinutes());
                    } else {
                        time = date.getDate().toString() + ' ' + dateUtil.getMonth(date.getMonth()) + ', '
                            + dateUtil.padTo2Digits(date.getHours()) + ':' + dateUtil.padTo2Digits(date.getMinutes());
                    }
                    mailData.created_at = time;
                    mailData.from_user_id.avatar =
                        `${config.basePath}/${config.api.avatar}?email=` +
                        `${body.message.from_user_id.email}`;

                    this.getMailArray().set(mailId, mailData);
                    if (this._storage.get(this._storeNames.shownMail) === mailId) {
                        microEvents.trigger('mailChanged');
                    }
                }
            });
    };

    getAttachment = async (attachId: string) => {
        const link = document.createElement('a');
        link.href = config.basePath + '/' + config.api.getAttach + attachId;
        link.click();
    };

    getArchiveAttachment = async (href: string) => {
        const mailId = href.split('/').pop();
        const link = document.createElement('a');
        link.href = config.basePath + '/' + config.api.getArchiveAttach
            + mailId + '/attaches';
        link.click();
    };

    openAttachment = async (attachId: number) => {
        const link = document.createElement('a');
        window
            .open(config.basePath + '/' + config.api.openAttach + attachId + config.api.openAttach_post);
        link.click();
    };

    /**
     * function that makes request to show concrete mail
     * @param href - href of mail
     */
    showMail = async (href: string) => {
        const mailId = href.split('/').pop();
        if (!this._storage.get(this._storeNames.mail).get(mailId)) {
            await this.downloadMail(mailId!);
            this._storage.get(this._storeNames.mail).set(mailId, {});
        }
        this._storage.set(this._storeNames.shownMail, mailId);
        microEvents.trigger('mailChanged');
    };


    appendMessage(sockMsg: MessageFromSocket) {
        const message = sockMsg.mailData;
        reducerFolder.getMenu();
        if (this.getCurrentLettersName() !== sockMsg.folder) {
            return;
        }
        this._storage.set(this._storeNames.mailToAppend, this.getLetterFrameFromMailData(message));
        this.getCurrentLettersArray().unshift(this.getLetterFrameFromMailData(message));
        if (this.getCurrentLettersArray().length === 0) {
            return;
        }
        microEvents.trigger('newMailReceived');
    }

    /**
     * function that makes request to get mail for context
     * @param href - href of mail
     */
    getCtxMail = async (href: string) => {
        const mailId = href.split('/').pop();
        if (!this.getMailArray().get(mailId)) {
            await this.downloadMail(mailId!);
            this.getMailArray().set(mailId, {});
        }
        this._storage.set(this._storeNames.contextMail, mailId);
    };

    clearCtxMail = async () => { // почему не используется??
        this._storage.set(this._storeNames.contextMail, undefined);
        microEvents.trigger('mailChanged');
    };

    /**
     * function that makes requests for all the components of mailbox
     */
    getMailboxPage = async (obj: stateObject) => {
        reducerFolder.getMenu().then(() => {
            this.getLetters(obj.path).then(() => {
                if (obj.props) {
                    this.showMail(obj.props);
                }
                reducerUser.getProfile().then(() => {
                    socket.init();
                });
                reducerUser.getRecipients();
                microEvents.trigger('renderMailboxPage');
            });
        });
    };

    /**
     * function that makes requests for all the components of account
     */
    getAccountPage = async (obj: stateObject) => {
        await reducerUser.getProfile();

        if (obj.path == '/profile') {
            this._storage.set(this._storeNames.accountName, 'Личные данные');
        } else if (obj.path == '/security') {
            this._storage.set(this._storeNames.accountName, 'Пароль и безопасность');
        }

        this._storage.set(this._storeNames.currentAccountPage, obj.path);
        microEvents.trigger('renderAccountPage');
    };

    /**
     * function that makes requests for all the components of profile
     */
    getProfilePage = async () => {
        this._storage.set(this._storeNames.accountName, 'Личные данные');
        microEvents.trigger('renderProfilePage');
    };

    /**
     * function that makes requests for all the components of security
     */
    getSecurityPage = async () => {
        this._storage.set(this._storeNames.accountName, 'Пароль и безопасность');
        microEvents.trigger('renderSecurityPage');
    };

    /**
     * function that makes requests for all the components of anonymous
     */
    getAnonymousPage = async () => {
        this._storage.set(this._storeNames.accountName, 'Анонимный ящик');
        microEvents.trigger('renderAnonymousPage');
    };

    /**
     * function that makes requests for changing letter state
     */
    changeLetterStateToRead = async (letterId: string) => {
        const responsePromise = Connector.makePostRequest(config.api.getMail + letterId + '/read' +
            '?fromFolder=' + reducerLetters.getCurrentLettersName().split('/')[1], {});
        const [status] = await responsePromise;
        if (status === responseStatuses.OK) {
            reducerFolder.getMenu();
        }
    };

    /**
     * function that makes requests for changing letter state
     */
    changeLetterStateToUnread = async (letterId: string) => {
        const responsePromise = Connector.makePostRequest(config.api.getMail + letterId + '/unread' +
            '?fromFolder=' + reducerLetters.getCurrentLettersName().split('/')[1], {});
        const [status] = await responsePromise;
        if (status === responseStatuses.OK) {
            reducerFolder.getMenu();
        }
    };

    addSelectedLetter = (id: number) => {
        if (!this.getSelectedLetters().find((letter) => letter === id)) {
            this.getSelectedLetters().push(id);
        }
    };

    deleteSelectedLetter = (id: number) => {
        if (this.getSelectedLetters().find((letter) => letter === id)) {
            this.getSelectedLetters()
                .splice(this.getSelectedLetters().indexOf(id), 1);
        }
    };

    clearSelectedLetter = () => {
        this.getSelectedLetters().splice(0, this.getSelectedLetters().length);
    };

    /**
     * function that gets current mail from this store
     * @returns current mail
     */
    getCurrentMail() {
        return this._storage.get(this._storeNames.mail)
            .get(this._storage.get(this._storeNames.shownMail)) as MailData;
    }

    getCurrentLettersName() {
        return this._storage.get(this._storeNames.currentLetters);
    }

    getCurrentAccountsName() {
        return this._storage.get(this._storeNames.accountName);
    }

    /**
     * function that gets current mail from this store
     * @returns []Object array of current lettters
     */
    getCurrentLettersArray() {
        return this._storage.get(this._storeNames.letters)
            .get(this._storage.get(this._storeNames.currentLetters)) as LetterFrameData[];
    }

    getCurrentMailPath() {
        return this._storage.get(this._storeNames.currentLetters) + '/' +
            this._storage.get(this._storeNames.shownMail);
    }

    getCurrentContextMail() {
        return this._storage.get(this._storeNames.mail)
            .get(this._storage.get(this._storeNames.contextMail)) as MailData;
    }

    getMailArray() {
        return this._storage.get(this._storeNames.mail);
    }

    getSelectedLetters() {
        return this._storage.get(this._storeNames.selectedLetters) as number[];
    }

    getLetterByFolderAndId(folder: string, id: number) {
        return (this._storage.get(this._storeNames.letters)
            .get('/' + folder) as MailData[]).find((letterFrame) => {
            if (letterFrame.message_id === id) {
                return letterFrame;
            }
        });
    }

    getLetterFrameFromMailData(message: MailData) {
        const date = new Date(message.created_at);
        const curDate = new Date();
        let time: string = '';

        if(curDate.getDate() === date.getDate() &&
            curDate.getMonth() === date.getMonth() &&
            curDate.getFullYear() === date.getFullYear()) {
            time = 'сегодня, '
                + dateUtil.padTo2Digits(date.getHours()) + ':' + dateUtil.padTo2Digits(date.getMinutes());
        } else {
            time = date.getDate().toString() + ' ' + dateUtil.getMonth(date.getMonth()) + ', '
                + dateUtil.padTo2Digits(date.getHours()) + ':' + dateUtil.padTo2Digits(date.getMinutes());
        }

        (message.recipients as ProfileData[])?.forEach((recipient) => {
            recipient.avatar = `${config.basePath}/${config.api.avatar}` +
                `?email=${recipient.email}`;
        });

        const letterFrame: LetterFrameData = {
            message_id: message.message_id,
            seen: message.seen,
            from_user_email: message.from_user_id.email,
            title: message.title,
            text: message.text,
            preview: message.preview,
            created_at: time,
            href: this.getCurrentLettersName() + '/' + message.message_id,
            avatar: `${config.basePath}/${config.api.avatar}` +
                `?email=${message.from_user_id.email}`,
            recipients: message.recipients,
        };
        return letterFrame;
    }

    getCurrentShownMailId() {
        return this._storage.get(this._storeNames.shownMail);
    }

    getEmailToPaste() {
        return this._storage.get(this._storeNames.emailToPaste);
    }

    getSearchedLetters() {
        return this._storage.get(this._storeNames.searchedLetters);
    }

    getNewMail() {
        return this._storage.get(this._storeNames.mailToAppend) as LetterFrameData;
    }
}

export const reducerLetters = new LettersStore();

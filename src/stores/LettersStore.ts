import {Connector} from '@utils/ajax';
import {config, responseStatuses} from '@config/config';
import {microEvents} from '@utils/microevents';
import BaseStore from '@stores/BaseStore';
import {reducerUser} from '@stores/userStore';
import {reducerFolder} from '@stores/FolderStore';

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
                    this._storage.get(this._storeNames.letters).set(folderName, []);
                    body.messages?.forEach((message: any) => {
                        const time = message.created_at.substring(0, 10)
                            .replace('-', '.').replace('-', '.');
                        const letterFrame: LetterFrameData = {
                            message_id: message.message_id,
                            seen: message.seen,
                            from_user_email: message.from_user_id.email,
                            title: message.title,
                            text: message.text,
                            created_at: time,
                            href: folderName + '/' + message.message_id,
                            avatar: `${config.basePath}/${config.api.avatar}` +
                                `?email=${message.from_user_id.email}`,
                            recipients: message.recipients,
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
     * function that makes request to log out user
     */
    async deleteMailRequest(id: string) {
        return Connector.makeDeleteRequest(config.api.deleteMail + id);
    }

    deleteMail = async () => {
        if (this.getSelectedLetters().find((letterId) =>
            letterId === this.getCurrentContextMail().message_id)) {
            const len = this.getSelectedLetters().length;
            let i = 0;
            this.getSelectedLetters().forEach((id) => {
                Connector.makeDeleteRequest(config.api.deleteMail + id).then(() => {
                    i++;
                    if (i === len) {
                        this.deleteDone();
                    }
                });
            });
        } else {
            Connector.makeDeleteRequest(config.api.deleteMail +
                this.getCurrentContextMail().message_id.toString()).then(() => {
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
        console.log(mailHref);
        this.getLetters(
            this._storage.get(this._storeNames.currentLetters));
        if (mailHref !== '/undefined') {
            this.showMail(mailHref);
        }
    }

    downloadMail = async (mailId: string) => {
        Connector.makeGetRequest(config.api.getMail + mailId)
            .then(([status, body]) => {
                if (status === responseStatuses.OK) {
                    const mailData: MailData = body.message;
                    mailData.created_at = mailData.created_at.substring(0, 10)
                        .replace('-', '.').replace('-', '.');
                    mailData.from_user_id.avatar =
                        `${config.basePath}/${config.api.avatar}?email=` +
                        `${body.message.from_user_id.email}`;

                    this.getMailArray().set(mailId, mailData);
                    console.log('mailDownloaded');

                    if (this._storage.get(this._storeNames.shownMail) === mailId) {
                        console.log('triggering from download');
                        microEvents.trigger('mailChanged');
                    }
                }
            });
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

    clearCtxMail = async () => {
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
                reducerUser.getProfile();
                microEvents.trigger('renderMailboxPage');
            });
        });
    };

    /**
     * function that makes requests for all the components of account
     */
    getAccountPage = async (obj: stateObject) => {
        await reducerUser.getProfile();
        this._storage.set(this._storeNames.currentAccountPage, obj.path);
        microEvents.trigger('renderAccountPage');
    };

    /**
     * function that makes requests for all the components of profile
     */
    getProfilePage = async () => {
        microEvents.trigger('renderProfilePage');
    };

    /**
     * function that makes requests for all the components of security
     */
    getSecurityPage = async () => {
        microEvents.trigger('renderSecurityPage');
    };

    /**
     * function that makes requests for changing letter state
     */
    changeLetterStateToRead = async (letterId: string) => {
        const responsePromise = Connector.makePostRequest(config.api.getMail + letterId + '/read', {});
        const [status] = await responsePromise;
        if (status === responseStatuses.OK) {
            // microEvents.trigger('letterStateChanged');
        }
    };

    /**
     * function that makes requests for changing letter state
     */
    changeLetterStateToUnread = async (letterId: string) => {
        const responsePromise = Connector.makePostRequest(config.api.getMail + letterId + '/unread', {});
        const [status] = await responsePromise;
        if (status === responseStatuses.OK) {
            // microEvents.trigger('letterStateChanged');
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
            .get(this._storage.get(this._storeNames.shownMail));
    }

    getCurrentLettersName() {
        return this._storage.get(this._storeNames.currentLetters);
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
        console.log(folder);
        console.log(id);

        return (this._storage.get(this._storeNames.letters)
            .get('/' + folder) as MailData[]).find((letterFrame) => {
            if (letterFrame.message_id === id) {
                return letterFrame;
            }
        });
    }

    getCurrentShownMailId() {
        return this._storage.get(this._storeNames.shownMail);
    }
}

export const reducerLetters = new LettersStore();

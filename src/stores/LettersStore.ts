import {Connector} from '@utils/ajax';
import {config, responseStatuses} from '@config/config';
import {microEvents} from '@utils/microevents';
import BaseStore from '@stores/BaseStore';
import {reducerUser} from '@stores/userStore';

/**
 * class that implements all possible actions with letters data
 */
class LettersStore extends BaseStore {
    _storeNames = {
        letters: 'letters',
        mail: 'mail',
        menu: 'menu',
        currentLetters: 'currentLetters',
        currentMail: 'currentMail',
        currentAccountPage: 'currentAccountPage',
    };

    /**
     * constructor that sets initial state of the store
     */
    constructor() {
        super();
        this._storage.set(this._storeNames.letters, new Map());
        this._storage.set(this._storeNames.mail, new Map());
        this._storage.set(this._storeNames.currentMail, undefined);
        this._storage.set(this._storeNames.menu, []);
        this._storage.set(this._storeNames.currentLetters, '/inbox');
    }

    /**
     * function that makes request to get all the letters from folder
     * @param folderName - name of folder
     */
    getLetters = async (folderName: string) => {
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
                        };

                        this._storage.get(this._storeNames.letters).get(folderName).push(letterFrame);
                    });

                    if (folderName === this._storage.get(this._storeNames.currentLetters)) {
                        microEvents.trigger('letterListChanged');
                        microEvents.trigger('mailChanged');
                    }
                }
            });
        this._storage.set(this._storeNames.currentLetters, folderName);
        this._storage.set(this._storeNames.currentMail, undefined);
        microEvents.trigger('letterListChanged');
        microEvents.trigger('mailChanged');
    };

    /**
     * function that makes request to get concrete mail
     * @param href - href of mail
     */
    getMail = async (href: string) => {
        const mailId = href.split('/').pop();
        if (!this._storage.get(this._storeNames.mail).get(mailId)) {
            Connector.makeGetRequest(config.api.getMail + mailId)
                .then(([status, body]) => {
                    if (status === responseStatuses.OK) {
                        const mailData: MailData = body.message;
                        mailData.created_at = mailData.created_at.substring(0, 10)
                            .replace('-', '.').replace('-', '.');
                        mailData.from_user_id.avatar =
                            `${config.basePath}/${config.api.avatar}?email=
                            ${body.message.from_user_id.email}`;

                        this._storage.get(this._storeNames.mail).set(mailId, mailData);

                        if (this._storage.get(this._storeNames.currentMail) === mailId) {
                            microEvents.trigger('mailChanged');
                        }
                    }
                });

            this._storage.get(this._storeNames.mail).set(mailId, {});
        }
        this._storage.set(this._storeNames.currentMail, mailId);
        microEvents.trigger('mailChanged');
    };

    /**
     * function that makes request to get menu
     */
    getMenu = async () => {
        const responsePromise = Connector.makeGetRequest(config.api.getMenu);
        const [status, response] = await responsePromise;
        if (status === responseStatuses.OK) {
            this._storage.set(this._storeNames.menu, response.folders);
            microEvents.trigger('menuChanged');
        }
    };

    /**
     * function that makes requests for all the components of mailbox
     */
    getMailboxPage = async (obj: stateObject) => {
        this.getMenu().then(() => {
            this.getLetters(obj.path).then(() => {
                if (obj.props) {
                    this.getMail(obj.props);
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

    /**
     * function that gets current mail from this store
     * @returns current mail
     */
    getCurrentMail() {
        return this._storage.get(this._storeNames.mail)
            .get(this._storage.get(this._storeNames.currentMail));
    }
}

export const reducerLetters = new LettersStore();

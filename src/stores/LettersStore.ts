import {Connector} from '@utils/ajax';
import {config, responseStatuses} from '@config/config';
import {microEvents} from '@utils/microevents';
import BaseStore from '@stores/BaseStore';
import {reducerUser} from '@stores/userStore';
import {actionChangeLetterStateToRead} from '@actions/letters';
import {LetterFrame} from '@uikits/letter-frame/letter-frame';


class LettersStore extends BaseStore {
    _storeNames = {
        letters: 'letters',
        mail: 'mail',
        menu: 'menu',
        currentLetters: 'currentLetters',
        currentMail: 'currentMail',
        currentAccountPage: 'currentAccountPage',
    };

    constructor() {
        super();
        this._storage.set(this._storeNames.letters, new Map());
        this._storage.set(this._storeNames.mail, new Map());
        this._storage.set(this._storeNames.currentMail, undefined);
        this._storage.set(this._storeNames.menu, []);
        this._storage.set(this._storeNames.currentLetters, '/inbox');
    }

    getLetters = async (folderName: string) => {
        Connector.makeGetRequest(config.api.getLetters + folderName)
            .then(([status, body]) => {
                if (status === responseStatuses.OK) {
                    this._storage.get(this._storeNames.letters).set(folderName, []);



                    body.messages?.forEach((message: any) => {
                        const time = message.created_at.substring(0, 10).replace('-', '.');
                        const letterFrame: LetterFrameData = {
                            message_id: message.message_id,
                            seen: message.seen,
                            from_user_email: message.from_user_id.email,
                            title: message.title,
                            text: message.text,
                            created_at: time,
                            href: folderName + '/' + message.message_id,
                            avatar: `${config.basePath}/${config.api.avatar}?email=${message.from_user_id.email}`,
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

    getMail = async (href: string) => {
        const mailId = href.split('/').pop();
        if (!this._storage.get(this._storeNames.mail).get(mailId)) {
            Connector.makeGetRequest(config.api.getMail + mailId)
                .then(([status, body]) => {
                    if (status === responseStatuses.OK) {
                        const mailData: MailData = body.message;
                        mailData.created_at = mailData.created_at.substring(0, 9).replace('-', '.');
                        mailData.from_user_id.avatar =
                            `${config.basePath}/${config.api.avatar}?email=${body.message.from_user_id.email}`;

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

    getMenu = async () => {
        const responsePromise = Connector.makeGetRequest(config.api.getMenu);
        const [status, response] = await responsePromise;
        if (status === responseStatuses.OK) {
            this._storage.set(this._storeNames.menu, response.folders);
            microEvents.trigger('menuChanged');
        }
    };

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

    getAccountPage = async (obj: stateObject) => {
        await reducerUser.getProfile();
        this._storage.set(this._storeNames.currentAccountPage, obj.path);
        microEvents.trigger('renderAccountPage');
    };

    getProfilePage = async () => {
        microEvents.trigger('renderProfilePage');
    };

    getSecurityPage = async () => {
        microEvents.trigger('renderSecurityPage');
    };

    changeLetterStateToRead = async (letterId: string) => {
        const responsePromise = Connector.makePostRequest(config.api.getMail + letterId + '/read', {});
        const [status, body] = await responsePromise;
        if (status === responseStatuses.OK) {
            // microEvents.trigger('letterStateChanged');
        }
    };

    changeLetterStateToUnread = async (letterId: string) => {
        const responsePromise = Connector.makePostRequest(config.api.getMail + letterId + '/unread', {});
        const [status, body] = await responsePromise;
        if (status === responseStatuses.OK) {
            // microEvents.trigger('letterStateChanged');
        }
    };


    getCurrentMail() {
        return this._storage.get(this._storeNames.mail).get(this._storage.get(this._storeNames.currentMail));
    }
}


const menuBtns = [
    {
        href: 'inbox',
        text: 'inbox',
        count: '10',
    },

    {
        href: 'outbox',
        text: 'outbox',
        count: '10',
    },

    {
        href: 'spam',
        text: 'spam',
        count: '10',
    },

    {
        href: 'trash',
        text: 'trash',
        count: '10',
    },
];

export const reducerLetters = new LettersStore();

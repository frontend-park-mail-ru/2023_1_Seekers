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
    }

    /**
     * function that makes request to get all the letters from folder
     * @param folderName - name of folder
     */
    getLetters = async (folderName: string) => {
        console.log('in get letters');
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
        this._storage.set(this._storeNames.shownMail, undefined);
        microEvents.trigger('letterListChanged');
        microEvents.trigger('mailChanged');
    };

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

                    this._storage.get(this._storeNames.mail).set(mailId, mailData);

                    if (this._storage.get(this._storeNames.shownMail) === mailId) {
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
        if (!this._storage.get(this._storeNames.mail).get(mailId)) {
            await this.downloadMail(mailId!);
            this._storage.get(this._storeNames.mail).set(mailId, {});
        }
        this._storage.set(this._storeNames.contextMail, mailId);
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

    /**
     * function that gets current mail from this store
     * @returns current mail
     */
    getCurrentMail() {
        return this._storage.get(this._storeNames.mail)
            .get(this._storage.get(this._storeNames.shownMail));
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
}


const testLetters = [{
    'message_id': 8,
    'from_user_id': {'firstName': 'Michail', 'lastName': 'Sidorov', 'email': 'max@mailbox.ru'},
    'recipients': [{'firstName': 'Michail', 'lastName': 'Testov', 'email': 'test@mailbox.ru'}],
    'title': 'Let’s get acquainted',
    'created_at': '2023-01-29T00:00:00Z',
    'text': 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout',
    'reply_to': null,
    'seen': true,
    'favorite': false,
    'deleted': false,
}, {
    'message_id': 7,
    'from_user_id': {'firstName': 'Ivan', 'lastName': 'Ivanov', 'email': 'gena@mailbox.ru'},
    'recipients': [{'firstName': 'Michail', 'lastName': 'Testov', 'email': 'test@mailbox.ru'}],
    'title': 'Advertisement',
    'created_at': '2023-01-07T00:00:00Z',
    'text': 'Hi, visit our shop!',
    'reply_to': null,
    'seen': true,
    'favorite': false,
    'deleted': false,
}, {
    'message_id': 5,
    'from_user_id': {'firstName': 'Ivan', 'lastName': 'Ivanov', 'email': 'gena@mailbox.ru'},
    'recipients': [{'firstName': 'Michail', 'lastName': 'Testov', 'email': 'test@mailbox.ru'}],
    'title': 'Small text letter',
    'created_at': '2023-01-06T00:00:00Z',
    'text': 'Hi! how are you?',
    'reply_to': null,
    'seen': false,
    'favorite': false,
    'deleted': false,
}, {
    'message_id': 6,
    'from_user_id': {'firstName': 'Michail', 'lastName': 'Sidorov', 'email': 'max@mailbox.ru'},
    'recipients': [{'firstName': 'Michail', 'lastName': 'Testov', 'email': 'test@mailbox.ru'}],
    'title': 'Do you like to read books?',
    'created_at': '2023-01-06T00:00:00Z',
    'text': 'We have a lot of new books that may interest you',
    'reply_to': null,
    'seen': false,
    'favorite': false,
    'deleted': false,
}, {
    'message_id': 4,
    'from_user_id': {'firstName': 'Michail', 'lastName': 'Sidorov', 'email': 'max@mailbox.ru'},
    'recipients': [{'firstName': 'Michail', 'lastName': 'Testov', 'email': 'test@mailbox.ru'}],
    'title': 'Very interesting letter',
    'created_at': '2023-01-05T00:00:00Z',
    'text': 'Morbi sit amet porttitor sapien, eget venenatis est. Suspendisse sollicitudin elit velit, quis sodales dolor maximus id. Vestibulum gravida scelerisque nibh, sit amet tincidunt augue gravida nec. Maecenas non placerat justo, at feugiat nulla. Phasellus dapibus a mi ut interdum. Aliquam nec quam feugiat, rutrum urna ut, cursus purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'reply_to': null,
    'seen': false,
    'favorite': false,
    'deleted': false,
}, {
    'message_id': 3,
    'from_user_id': {'firstName': 'Ivan', 'lastName': 'Ivanov', 'email': 'gena@mailbox.ru'},
    'recipients': [{'firstName': 'Michail', 'lastName': 'Testov', 'email': 'test@mailbox.ru'}],
    'title': 'Lorem',
    'created_at': '2023-01-04T00:00:00Z',
    'text': 'Mauris imperdiet massa ante. Pellentesque feugiat nisl nec ultrices laoreet. Aenean a mauris mi. Sed auctor egestas nulla et vulputate. Praesent lobortis nulla ante, vel dignissim odio aliquet et. Suspendisse potenti. Donec venenatis nibh a sem consectetur, bibendum consectetur metus venenatis. Mauris lorem tellus, finibus id dui sit amet, facilisis fermentum orci. Mauris arcu ante, lacinia vitae orci in, tempus elementum lacus. Donec eu augue vulputate, tempor neque nec, efficitur purus. Mauris ut lorem non sapien placerat mattis. In in lacus a lorem viverra laoreet ut et orci. Maecenas auctor, justo nec hendrerit interdum, nibh nisi consectetur sapien, id ultrices lacus mi sed risus.',
    'reply_to': null,
    'seen': false,
    'favorite': false,
    'deleted': false,
}, {
    'message_id': 2,
    'from_user_id': {'firstName': 'Michail', 'lastName': 'Sidorov', 'email': 'max@mailbox.ru'},
    'recipients': [{'firstName': 'Michail', 'lastName': 'Testov', 'email': 'test@mailbox.ru'}],
    'title': 'Spam letter',
    'created_at': '2023-01-02T00:00:00Z',
    'text': 'Nunc non velit commodo, vestibulum enim ullamcorper, lobortis mi. Integer eu elit nibh. Integer bibendum semper arcu, eget consectetur nisi gravida eu. Suspendisse maximus id urna a volutpat. Quisque nec iaculis purus, non facilisis massa. Maecenas finibus dui ipsum, ut tempor sapien tincidunt blandit. Ut at iaculis eros, ultrices iaculis nibh. Mauris fermentum elit erat, at cursus urna euismod vel. In congue, ipsum a fermentum semper, dolor sem scelerisque leo, a tempus risus orci eu leo. Fusce vulputate venenatis imperdiet. Vestibulum interdum pellentesque facilisis',
    'reply_to': null,
    'seen': false,
    'favorite': false,
    'deleted': false,
}, {
    'message_id': 1,
    'from_user_id': {'firstName': 'Ivan', 'lastName': 'Ivanov', 'email': 'gena@mailbox.ru'},
    'recipients': [{'firstName': 'Michail', 'lastName': 'Testov', 'email': 'test@mailbox.ru'}],
    'title': 'Invitation',
    'created_at': '2023-01-01T00:00:00Z',
    'text': 'Hello, we decided to invite you to our party, lets go it will be fine!',
    'reply_to': null,
    'seen': false,
    'favorite': false,
    'deleted': false,
}];

export const reducerLetters = new LettersStore();

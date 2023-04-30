import {Connector} from '@utils/ajax';
import {config, responseStatuses} from '@config/config';
import {microEvents} from '@utils/microevents';
import BaseStore from '@stores/BaseStore';
import {reducerLetters} from '@stores/LettersStore';

/**
 * class that implements all possible actions with sent mail
 */
class FolderStore extends BaseStore {
    _storeNames = {
        answerStatus: 'answerStatus',
        answerBody: 'answerBody',
        contextFolder: 'contextFolder',
        menu: 'menu',
    };

    /**
     * constructor that creates the store
     */
    constructor() {
        super();
    }

    createNewFolder = async () => {
        microEvents.trigger('createNewFolder');
    };

    createRenameFolderForm = async () => {
        microEvents.trigger('createRenameFolderForm');
    };

    /**
     * function that make send mail request to backend
     * @param name - mail to send
     */
    sendFolderToCreate = async (name: string) => {
        Connector.makePostRequest(config.api.createFolder, {name: name}).then(([status, body]) => {
            if (status === responseStatuses.OK) {
                this.getMenu();
            }
            this._storage.set(this._storeNames.answerBody, body);
            this._storage.set(this._storeNames.answerStatus, status);
            microEvents.trigger('folderRequestSent');
        });
    };

    /**
     * function that makes request to get menu
     */
    getMenu = async () => {
        if (!this._storage.get(this._storeNames.menu)) {
            this._storage.set(this._storeNames.menu, []);
        }
        const responsePromise = Connector.makeGetRequest(config.api.getMenu + '?custom=true');
        const [status, response] = await responsePromise;
        if (status === responseStatuses.OK) {
            (response.folders as Folder[]).forEach((folder) => {
                folder.folder_slug = '/' + folder.folder_slug;
            });

            this._storage.set(this._storeNames.menu, response.folders);
            console.log(this._storage.get(this._storeNames.menu));
            microEvents.trigger('menuChanged');
        }
    };

    /**
     * function that transmits mail to another folder
     */
    transmitToFolder = async (folder: string) => {
        folder = folder.replace('to_', '');
        if (reducerLetters.getSelectedLetters().find((letterId) => {
            return letterId === reducerLetters.getCurrentContextMail()?.message_id;
        })) {
            this.transmitPackToFolder(folder);
        } else {
            this.transmitLetterToFolder(folder);
        }
    };

    transmitLetterToFolder = async (folder: string) => {
        const responsePromise = Connector.makePutRequest({
            url: config.api.moveToFolder +
                reducerLetters.getCurrentContextMail().message_id.toString() +
                config.api.moveToFolder_post + folder,
            data: {},
        });
        const [status, response] = await responsePromise;
        this._storage.set(this._storeNames.answerBody, response);
        this._storage.set(this._storeNames.answerStatus, status);
        microEvents.trigger('responseFromTransmitFolder');
        const mailHref = '/' + reducerLetters._storage.get(reducerLetters._storeNames.shownMail);
        console.log(mailHref);
        reducerLetters.getLetters(reducerLetters._storage.get(reducerLetters._storeNames.currentLetters));
        if (mailHref !== '/undefined') {
            reducerLetters.showMail(mailHref);
        }

        if (reducerLetters.getCurrentContextMail()?.message_id == reducerLetters.getCurrentShownMailId()) {
            reducerLetters._storage.set(reducerLetters._storeNames.shownMail, undefined);
            microEvents.trigger('mailChanged');
        }
        // }
    };

    /**
     * function that transmits mail to another folder
     */
    transmitPackToFolder = async (folder: string) => {
        folder = folder.replace('to_', '');
        const len = reducerLetters.getSelectedLetters().length;
        let i = 0;
        reducerLetters.getSelectedLetters().forEach((id) => {
            Connector.makePutRequest({
                url: config.api.moveToFolder + id.toString() +
                    config.api.moveToFolder_post + folder,
                data: {},
            }).then(([status, answer]) => {
                i++;
                if (i === len) {
                    if (reducerLetters.getSelectedLetters().find((letter) => {
                        return letter.toString() === reducerLetters.getCurrentShownMailId();
                    })) {
                        reducerLetters._storage.set(reducerLetters._storeNames.shownMail, undefined);
                        microEvents.trigger('mailChanged');
                    }

                    reducerLetters.clearSelectedLetter();
                    console.log(answer);
                    console.log(status);
                    this._storage.set(this._storeNames.answerBody, answer);
                    this._storage.set(this._storeNames.answerStatus, status);
                    microEvents.trigger('responseFromTransmitFolder');
                    const mailHref = '/' +
                        reducerLetters._storage.get(reducerLetters._storeNames.shownMail);
                    console.log(mailHref);
                    reducerLetters.getLetters(
                        reducerLetters._storage.get(reducerLetters._storeNames.currentLetters));
                    if (mailHref !== '/undefined') {
                        reducerLetters.showMail(mailHref);
                    }
                }
            });
        });
    };

    setCtxFolder(folder: string) {
        this._storage.set(this._storeNames.contextFolder, folder);
    }


    deleteFolder(folder: string) {
        Connector.makeDeleteRequest(config.api.deleteFolder + '/' + folder).then(() => {
            this.getMenu();
            microEvents.trigger('folderDeleted');

            if (this.getCtxFolder() === reducerLetters.getCurrentLettersName()) {
                reducerLetters.getLetters(reducerLetters.getCurrentLettersName());
            }
        });
    }

    deleteFolderByCtx() {
        this.deleteFolder(this.getCtxFolder());
    }

    renameFolder(slug: string, newName: string) {
        Connector.makePutRequest({
            url: config.api.renameFolder + '/' + slug + config.api.renameFolder_post,
            data: {
                name: newName,
            },
        }).then(([status, body]) => {
            this._storage.set(this._storeNames.answerBody, body);
            this._storage.set(this._storeNames.answerStatus, status);
            this.getMenu();
            microEvents.trigger('folderRenamed');
        });
    }

    renameFolderByCtx(newName: string) {
        this.renameFolder(this.getCtxFolder(), newName);
    }

    getAdvancedMenu() {
        return this._storage.get(this._storeNames.menu);
    }

    getAnswer() {
        return [this._storage.get(this._storeNames.answerStatus),
            this._storage.get(this._storeNames.answerBody)];
    }

    getCtxFolder() {
        return this._storage.get(this._storeNames.contextFolder);
    }
}

export const reducerFolder = new FolderStore();

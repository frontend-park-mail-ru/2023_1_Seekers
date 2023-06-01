import {Connector} from '@utils/ajax';
import {config, responseStatuses} from '@config/config';
import {microEvents} from '@utils/microevents';
import BaseStore from '@stores/BaseStore';
import {reducerLetters} from '@stores/LettersStore';
import {reducerUser} from '@stores/userStore';
import {Attachment} from '@uikits/attachment/attachment';
import {fileDownloader} from '@utils/fileDownloader';
import {loginPage} from '@views/login-page/login-page';

/**
 * class that implements all possible actions with sent mail
 */
class NewMailStore extends BaseStore {
    _storeNames = {
        title: 'title',
        text: 'text',
        recipients: 'recipients',
        answerStatus: 'answerStatus',
        answerBody: 'answerBody',
        isDraft: 'isDraft',
        draftId: 'draftId',
        attachments: 'attachments',
        lastAttachName: 'lastAttachName',
        lastAttachSize: 'lastAttachSize',
        lastAttachID: 'lastAttachID',
        fromUser: 'fromUser',
    };

    /**
     * constructor that creates the store
     */
    constructor() {
        super();
    }

    setEmptyMail = () => {
        this._storage.set(this._storeNames.title, '');
        this._storage.set(this._storeNames.text, '');
        this._storage.set(this._storeNames.recipients, '');
        this._storage.set(this._storeNames.answerBody, '');
        this._storage.set(this._storeNames.answerStatus, '');
        this._storage.set(this._storeNames.isDraft, false);
        this._storage.set(this._storeNames.attachments, []);
        this._storage.set(this._storeNames.lastAttachID, 0);
        this._storage.set(this._storeNames.fromUser, reducerUser.getMyProfile().email);
    };

    /**
     * function that sets initial state of the store
     */
    createNewMail = async () => {
        this.setEmptyMail();
        microEvents.trigger('createNewMail');
    };

    /**
     * function that sets initial state of the store when need to forward mail
     */
    forwardMail = async () => {
        this.setEmptyMail();
        this._storage.set(
            this._storeNames.title, reducerLetters.getCurrentContextMail().title,
        );
        this._storage.set(
            this._storeNames.text, reducerLetters.getCurrentContextMail().text,
        );
        this._storage.set(this._storeNames.recipients, '');

        this._storage.set(this._storeNames.isDraft, false);
        microEvents.trigger('createNewMail');

        if (reducerLetters.getCurrentContextMail().attachments) {
            reducerLetters.getCurrentContextMail().attachments.forEach((attach) => {
                this.getFileContent(attach);
            });
        }
    };

    getFileContent(attach: AttachmentData) {
        Connector.makeGetRequest(config.api.getAttach + attach.attachID.toString() + config.api.openAttach_post_b64)
            .then(([status, body]) => {
                reducerNewMail._storage
                    .set(reducerNewMail._storeNames.lastAttachID, reducerNewMail.getAttachID() + 1);
                const newAttach: AttachToSend = {
                    attachID: reducerNewMail.getAttachID(),
                    fileName: attach.fileName,
                    fileData: body.fileData,
                };
                this._storage.get(reducerNewMail._storeNames.attachments).push(newAttach);
                this._storage.set(this._storeNames.lastAttachName, newAttach.fileName);
                this._storage.set(this._storeNames.lastAttachSize, attach.sizeStr);
                microEvents.trigger('addAttachmentToSendMail');
            });
    }

    /**
     * function that sets initial state of the store when need to reply to mail
     */
    replyToMail = async () => {
        this.setEmptyMail();
        const email = reducerLetters.getCurrentContextMail().from_user_id.email;
        const text = reducerLetters.getCurrentContextMail().text;
        const title = reducerLetters.getCurrentContextMail().title;
        this._storage.set(
            this._storeNames.title, 'RE: ' + title,
        );
        this._storage.set(
            this._storeNames.text,
            '<div style="display: block; height: 1px; border: 0; border-top: 1px solid #ccc; margin: 1em 0; padding: 0;">' + '</div>' +
            '<div>' + email +
            ' написал(а) ' + reducerLetters.getCurrentContextMail().created_at + ':' + '</div>' + text,
        );

        this._storage.set(
            this._storeNames.recipients, email,
        );
        this._storage.set(this._storeNames.isDraft, false);
        microEvents.trigger('createNewMail');

        if (reducerLetters.getCurrentContextMail().attachments) {
            reducerLetters.getCurrentContextMail().attachments.forEach((attach) => {
                this.getFileContent(attach);
            });
        }
    };

    /**
     * function that sets initial state of the store when need to forward mail
     */
    selectDraft = async (draftHref: string) => {
        this.setEmptyMail();
        this._storage.set(this._storeNames.draftId, parseInt(draftHref.split('/').pop()!));
        const mail = reducerLetters.getLetterByFolderAndId('drafts', this._storage.get(this._storeNames.draftId))!;
        let recipientsStr = '';

        console.log(mail);

        mail.recipients?.forEach((recipient) => {
            recipientsStr = recipientsStr + recipient.email + ' ';
        });
        this._storage.set(
            this._storeNames.fromUser, mail.from_user_email,
        );
        this._storage.set(
            this._storeNames.title, mail.title,
        );

        this._storage.set(
            this._storeNames.text, mail.text,
        );
        this._storage.set(this._storeNames.recipients, recipientsStr);
        this._storage.set(this._storeNames.isDraft, true);
        microEvents.trigger('createNewMail');

        if (mail.attachments) {
            mail.attachments.forEach((attach) => {
                this.getFileContent(attach);
            });
        }
    };

    /**
     * function that make send mail request to backend
     * @param mail - mail to send
     */
    sendMail = async (mail: MailToSend) => {
        mail.attachments = this._storage.get(this._storeNames.attachments);
        mail.attachments.forEach((attach) => {
            delete attach.attachID;
        });
        Connector.makePostRequest(config.api.sendMail, mail).then(([status, body]) => {
            this._storage.set(this._storeNames.answerBody, body);
            this._storage.set(this._storeNames.answerStatus, status);

            if (this.isDraft()) {
                reducerLetters.deleteMailRequest(this.getDraftId()).then(() =>
                    reducerLetters.getLetters(reducerLetters.getCurrentLettersName()));
            }
            microEvents.trigger('mailSent');
        });
    };

    sendDraft = async (draft: MailToSend) => {
        draft.from_user = reducerUser.getMyProfile().email;
        draft.attachments = this._storage.get(this._storeNames.attachments);
        draft.attachments.forEach((attach) => {
            delete attach.attachID;
        });
        const promise = Connector.makePostRequest(config.api.sendDraft, draft);
        const [status, body] = await promise;

        this._storage.set(this._storeNames.answerBody, body);
        this._storage.set(this._storeNames.answerStatus, status);

        if (status == responseStatuses.OK) {
            if (this.isDraft()) {
                reducerLetters.deleteMailRequest(this.getDraftId()).then(() =>
                    reducerLetters.getLetters(reducerLetters.getCurrentLettersName()));
            }
        }
        microEvents.trigger('draftSent');
        return promise;
    };

    addAttachment(file: File) {
        const reader = new FileReader();
        reader.readAsDataURL(file);



        reader.onload = function() {

            reducerNewMail._storage
                .set(reducerNewMail._storeNames.lastAttachID, reducerNewMail.getAttachID() + 1);
            const attach: AttachToSend = {
                attachID: reducerNewMail.getAttachID(),
                fileName: file.name,
                fileData: (reader.result as string).split(',')[1],
            };
            reducerNewMail._storage.get(reducerNewMail._storeNames.attachments).push(attach);
            reducerNewMail._storage.set(reducerNewMail._storeNames.lastAttachName, file.name);
            reducerNewMail._storage.set(reducerNewMail._storeNames.lastAttachSize, file.size);
            microEvents.trigger('addAttachmentToSendMail');
        };
    }

    removeAttachment(id: number) {
        this.getAttachList()
            .splice(this.getAttachList().indexOf(this.getAttachList().find((attach) =>
                attach.attachID === id)!), 1);
    }

    downloadAttachment(id: number) {
        const file = this.getAttachList().find((attach) => attach.attachID === id)!;
        fileDownloader.download(file.fileName, file.fileData);
    }

    getDraftId() {
        return this._storage.get(this._storeNames.draftId);
    }

    getAttachName() {
        return this._storage.get(this._storeNames.lastAttachName);
    }

    getAttachSize() {
        return this._storage.get(this._storeNames.lastAttachSize);
    }

    getAttachList() {
        return this._storage.get(this._storeNames.attachments) as AttachToSend[];
    }

    getAttachID() {
        return this._storage.get(this._storeNames.lastAttachID);
    }

    isDraft() {
        return this._storage.get(this._storeNames.isDraft);
    }

    getFromEmail() {
        return this._storage.get(this._storeNames.fromUser);
    }
}

export const reducerNewMail = new NewMailStore();

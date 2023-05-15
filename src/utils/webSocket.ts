import {showNotification} from '@components/notification/notification';
import {config} from '@config/config';
import {reducerUser} from '@stores/userStore';
import {dispatcher} from '@utils/dispatcher';
import {actionAppendMessage} from '@actions/letters';
// import sound from '@sound/alert.mp3';



class WebSocketMessage {
    private socket: WebSocket | undefined;

    onMessage = (e: MessageEvent) => {
        if (e.data === 'okey') {
            return;
        }
        const mailData: MailData = JSON.parse(e.data);

        if (mailData.from_user_id.email === reducerUser.getMyProfile().email) {
            dispatcher.dispatch(actionAppendMessage({mailData: JSON.parse(e.data), folder: '/outbox'}));
        } else {
            showNotification('получено новое сообщение от ' + mailData.from_user_id.email);
            this.playSound('/sound/alert.mp3');
            dispatcher.dispatch(actionAppendMessage({mailData: JSON.parse(e.data), folder: '/inbox'}));
            if (document.hidden) {
                document.title = 'Новое письмо!';
                this.changeState();
            }
        }
    };

    onClose = (e: CloseEvent) => {
        console.log('socket disconnected.');
    };

    onError = (e: Event) => {
        console.log('error while processing socket.');
    };

    init = () => {
        console.log('hello!');
        const sock = new WebSocket('wss://mailbx.ru' + '/' + config.api.webSocket + '?email=' + reducerUser.getMyProfile().email);
        sock.onmessage = this.onMessage;
        sock.onclose = this.onClose;
        sock.onerror = this.onError;
        this.socket = sock;
    };

    playSound = (path: string) => {
        const audio = new Audio('../sound/alert.mp3');
        audio.play().then().catch((e) => {
            console.log(e);
        });
    };

    close = () => {
        this.socket?.close();
    };

    // changevisibility = async (e: Event) => {
    //     document.removeEventListener('visibilitychange', this.changevisibility);
    //     document.title = 'MailBox';
    // };

    changeState = () => {
        if (document.hidden) {
            if (document.title !== 'Новое письмо!') {
                document.title = 'Новое письмо!';
            } else {
                document.title = 'MailBox';
            }
            setTimeout(this.changeState, 500);
        } else {
            document.title = 'MailBox';
            return;
        }
    };
}

export const socket = new WebSocketMessage();

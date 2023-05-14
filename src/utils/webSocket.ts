import {reducerLetters} from '@stores/LettersStore';
import {showNotification} from '@components/notification/notification';
import {config} from '@config/config';
import {reducerUser} from "@stores/userStore";


class WebSocketMessage {
    private socket: WebSocket | undefined;


    init = () => {
        console.log('hello!');
        const sock = new WebSocket('ws://127.0.0.1:8001' + '/' + config.api.webSocket + '?email=' + reducerUser.getMyProfile().email);
        sock.onmessage = (event) => {
            if (event.data === 'okey') {
                return;
            }
            showNotification('Получено новое сообщение!');
            console.log(`[message] Данные получены с сервера: ${event.data}`);
            reducerLetters.getLetters('/inbox');
            // this.playSound(`/Audio/soundNewMessage.mp3`);
        };
        sock.onclose = (e) => {
            console.log('poka');
        };

        sock.onerror = (e) => {
            console.log('pokaz');
        };
        this.socket = sock;
    };

    playSound = (path: string) => {
        const audioElement = document.createElement('audio');
        audioElement.setAttribute('src', path);
        audioElement.play();
    };

    // close = () => {
    //     this.socket.close();
    // };
}

export const socket = new WebSocketMessage();

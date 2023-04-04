import {Notification} from '@uikits/notification/notification';
import {ROOT} from '@config/config';


export function showNotification(text = 'Упс, что-то пошло не так...', duration = 4000) {
    ROOT.insertAdjacentHTML('afterbegin', Notification.renderTemplate({notification: text}));

    const content = document.getElementById('error-label');
    setTimeout(() => {
        content!.classList.add('notification-area__deletion');
         setTimeout(() =>content?.remove(), 1000 );
    }, duration);
}

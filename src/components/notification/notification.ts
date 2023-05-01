import {Notification} from '@uikits/notification/notification';
import {ROOT} from '@config/config';

/**
 * function that creates a notification
 * @param text - text of the notification
 * @param duration - duration of
 */
export function showNotification(text = 'Упс, что-то пошло не так...', duration = 4000) {

    if(window.matchMedia("only screen and (max-width: 991px)").matches)
    {
        document.getElementById('letter-list-header')!.insertAdjacentHTML('afterbegin', Notification.renderTemplate({notification: text}));
    }
    else
    {
        document.getElementById('letter-list-header')!.insertAdjacentHTML('afterbegin', Notification.renderTemplate({notification: text}));

        ROOT.insertAdjacentHTML('afterbegin', Notification.renderTemplate({notification: text}));
    }


    const content = document.getElementById('error-label');
    setTimeout(() => {
        content!.classList.add('notification-area__deletion');
        setTimeout(() =>content?.remove(), 1000 );
    }, duration);
}

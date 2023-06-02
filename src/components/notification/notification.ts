import {Notification} from '@uikits/notification/notification';
import {ROOT} from '@config/config';

/**
 * function that creates a notification
 * @param text - text of the notification
 * @param duration - duration of
 */
export function showNotification(text = 'Упс, что-то пошло не так...', duration = 5000) {
    ROOT.insertAdjacentHTML('afterbegin', Notification.renderTemplate({notification: text}));

    const deleteOnClick = (e: Event) => {
        const content = document.getElementById('error-label');
        content?.classList.add('notification-area__deletion');
        setTimeout(() => content?.remove(), 1000);
        content?.removeEventListener('click', deleteOnClick);
    };

    const content = document.getElementById('error-label');
    content?.addEventListener('click', deleteOnClick);
    setTimeout(() => {
        content!.classList.add('notification-area__deletion');
        setTimeout(() => content?.remove(), 1000);
        content?.removeEventListener('click', deleteOnClick);
    }, duration);
}

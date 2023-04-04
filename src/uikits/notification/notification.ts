import {UiKit} from '@/uikits/uikit';
import template from '@uikits/notification/notification.hbs';
import '@uikits/notification/notification.scss';

/**
 * class implementing uikit notification
 */
export class Notification extends UiKit {
    static renderTemplate(args: any) {
        return template(args);
    }
}

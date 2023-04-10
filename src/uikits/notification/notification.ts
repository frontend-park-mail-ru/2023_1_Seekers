import {UiKit} from '@/uikits/uikit';
import template from '@uikits/notification/notification.hbs';
import '@uikits/notification/notification.scss';

/**
 * class implementing uikit notification
 */
export class Notification extends UiKit {
    /**
     * method that render current kit
     * @param args - needed data to render template
     */
    static renderTemplate(args: any) {
        return template(args);
    }
}

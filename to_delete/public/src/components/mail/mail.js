import '../templates.js';
import {MailContent} from '../../uikit/mail-content/mail-content.js';

const myText = 'На другой день после приема в ложу Пьер сидел дома, читая книгу и стараясь вникнуть в значение квадрата, изображавшего одной своей стороною Бога, другою нравственное, третьею физическое и четвертою смешанное. Изредка он отрывался от книги и квадрата и в воображении своем составлял себе новый план жизни. Вчера в ложе ему сказали, что до сведения государя дошел слух о дуэли и что Пьеру благоразумнее было бы удалиться из Петербурга. Пьер предполагал ехать в свои южные имения и заняться там своими крестьянами. Он радостно обдумывал эту новую жизнь, когда неожиданно в комнату вошел князь Василий.\n' +
    '— Мой друг, что ты наделал в Москве? За что ты поссорился с Лелей, mon cher? 1 Ты в заблуждении, — сказал князь Василий, входя в комнату. — Я все узнал, я могу тебе сказать верно, что Элен невинна перед тобой, как Христос перед жидами.\n' +
    'Пьер хотел отвечать, но он перебил его:\n' +
    '— И зачем ты не обратился прямо и просто ко мне, как к другу? Я все знаю, я все понимаю, — сказал он, — ты вел себя, как прилично человеку, дорожащему своей честью; может быть, слишком поспешно, но об этом мы не будем судить. Одно ты пойми, в какое ты ставишь положение ее и меня в глазах всего общества и даже двора, — прибавил он, понизив голос. — Она живет в Москве, ты здесь. Полно, мой милый, — он потянул его вниз за руку, — здесь одно недоразуменье; ты сам, я думаю, чувствуешь. Напиши сейчас со мною письмо, и она приедет сюда, все объяснится, и все эти толки кончатся, а то, я тебе скажу, ты очень легко можешь пострадать, мой милый.\n'

/**
 * class implementing component Mail
 */
export class Mail {
    /**
     * Private field that contains parent HTML-element
     * @type {Element}
     */
    #parent;

    /**
     * Private field that contains current HTML-element
     * @type {Element}
     */
    #element;

    /**
     * Private field that contains current HTML-element
     * @type {Object[]}
     */
    #childs = [];

    /**
     * Constructor that creates a component class Mail
     * @param {Element} parent HTML-element for including content
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * method insert mail to HTML
     */
    render(context) {
        this.#parent.insertAdjacentHTML('beforeend',
            window.Handlebars.templates['mail.hbs'](context));
        this.#element = this.#parent.getElementsByClassName('mail')[0];
        const mailContent = new MailContent(
            this.#element.getElementsByClassName('mail__content')[0]);
        mailContent.render({title: 'title', text: myText});
    }

    /**
     * method register NOT IMPLEMENTED
     * will unregister listeners for each button in mail
     */
    registerEventListener() {
    }

    /**
     * method unregister NOT IMPLEMENTED
     * will register listeners for each button in mail
     */
    unregisterEventListener() {
    }

    /**
     * method purge NOT IMPLEMENTED
     * mail page clearing
     * will purge all the content in mail
     */
    purge() {

    }
}

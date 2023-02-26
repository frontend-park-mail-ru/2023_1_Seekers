export const MENU_RENDER_TYPES = {
    DOM: 'DOM',
    STRING: 'STRING',
    TEMPLATE: 'TEMPLATE'
}

export class Menu {
    #parent
    #config

    constructor(parent) {
        this.#parent = parent;
    }

    get config() {
        return this.#config;
    }

    set config(value) {
        this.#config = value;
    }

    get items() {
        return Object.entries(this.#config).map(([key, value]) => ({
            key,
            ...value
        }))
    }

    render(renderType) {
        switch (renderType) {
            case MENU_RENDER_TYPES.DOM:
                this.renderDOM();
                break;
            case MENU_RENDER_TYPES.STRING:
                this.renderString();
                break;
            case MENU_RENDER_TYPES.TEMPLATE:
            default:
                this.renderTemplate();
                break;
        }
    }

    renderTemplate() {
        const template = fest['components/Menu/Menu.tmpl'];
        this.#parent.innerHTML = template(this.items);
    }

    renderString() {
        this.#parent.innerHTML = this.items.map(({key, href, name}, index) => {
            let className = 'menu__item';
            if (index === 0) {
                className += ' active';
            }

            return `<a class="${className}" data-section="${key}" href="${href}">${name}</a>`;
        }).join('\n');
    }

    renderDOM() {
        this.items.map(({key, href, name}, index) => {
            const menuElement = document.createElement('a');
            menuElement.textContent = name;
            menuElement.href = href;
            menuElement.dataset.section = key;
            menuElement.classList.add('menu__item')

            if (index === 0) {
                menuElement.classList.add('active');
            }

            return menuElement;
        }).forEach((e) => this.#parent.appendChild(e));
    }
}
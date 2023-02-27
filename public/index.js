const rootElement = document.getElementById('root');
const menuElement = document.createElement('aside');
const contentElement = document.createElement('main');
rootElement.appendChild(menuElement);
rootElement.appendChild(contentElement);




const menuContent = {
    input: {
        text: 'входящие',
        count: '999',
    },
    sent: {
        text: 'входящие',
        count: '999',
    },
    draft: {
        text: 'входящие',
        count: '999',
    },
    spam: {
        text: 'входящие',
        count: '999',
    },
    trash: {
        text: 'входящие',
        count: '999',
    },
}

function createButton(text, c){
    const button = document.createElement('a');
    button.classList.add('menu-button');

    const leftFrame = document.createElement('div');
    leftFrame.classList.add('menu-button-left-frame');

    const icon = document.createElement('div');
    icon.classList.add('menu-button-icon');

    const menuButtonText = document.createElement('label');
    menuButtonText.classList.add('menu-button-text');
    menuButtonText.textContent = text;

    leftFrame.appendChild(icon);
    leftFrame.appendChild(menuButtonText);

    button.appendChild(leftFrame);

    const rightFrame = document.createElement('div');
    rightFrame.classList.add('menu-button-right-frame');

    const count = document.createElement('p');
    count.textContent = c;
    rightFrame.classList.add('menu-button-count');

    rightFrame.appendChild(count);

    button.appendChild(rightFrame);
    return button;
}

function createMenu(parent){
    const menu = document.createElement('div')
    menu.classList.add('Menu')

    Object.entries(menuContent).map(([key, {text, count}], index) =>
        createButton(text, count)).forEach((e) => menu.appendChild(e))

    menu.appendChild(createButton('Входящие', '999'))

    parent.appendChild(menu)
}


createMenu(menuElement);
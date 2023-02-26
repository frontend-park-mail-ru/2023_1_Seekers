console.log("kek")

const rootElement = document.getElementById('root')
const menuElement = document.createElement('aside')
const contentElement = document.createElement('main')
rootElement.appendChild(menuElement)
rootElement.appendChild(contentElement)

const config = {
    feed: {
        name: 'Лента',
        href: '/feed',
    },
    login: {
        name: 'Авторизация',
        href: '/login',
    },
    signup: {
        name: 'Регистрация',
        href: '/signup',
    },
    profile: {
        name: 'Профиль',
        href: '/profile',
    },
}

Object.entries(config).map(([key, {href, name}]) => {
    const menuElement = document.createElement('a')
    menuElement.textContent = name
    menuElement.href = href
    return menuElement
}).forEach((e) => menuElement.appendChild(e))


import {reducerUser} from '@stores/userStore';
import {reducerLetters} from '@stores/LettersStore';

const handlers = [
    {type: 'login', method: reducerUser.login.bind(reducerUser)},
    {type: 'login', method: reducerLetters.getLetters.bind(reducerLetters)},
    {type: 'getLetters', method: reducerLetters.getLetters.bind(reducerLetters)},
];

export {handlers};

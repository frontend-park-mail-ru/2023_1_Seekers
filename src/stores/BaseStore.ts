import {dispatcher} from '@utils/dispatcher';

/**
 * Класс, реализующий базовое хранилище.
 */
export default class BaseStore {
    _changed: boolean;
    _storage: Map<string, any>;
    /**
     * constructor
     */
    constructor() {
        this._changed = false;
        this._storage = new Map();
    }

    /**
     * Метод, возвращающий текущее состояние (контекст) хранилища.
     * @param field - возвращаемое поле
     * @returns контекст хранилища
     */
    getContext(field: string) {
        return (field ? this._storage.get(field) : this._storage);
    }

    /**
     * Метод, проверяющий, изменилось ли хранилище
     * @returns результат проверки
     */
    hasChanged() {
        return this._changed;
    }
}

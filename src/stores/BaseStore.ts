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
        dispatcher.register(this._invokeOnDispatch.bind(this));
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

    /**
     * Метод, реализующий обертку под _onDispatch.
     * @param payload - полезная нагрузка
     */
    async _invokeOnDispatch(payload: object) {
        this._changed = false;
        await this._onDispatch(payload);

        // if (this.hasChanged()) {
        //     this._events.forEach((value: baseStoreObject, key: string) => {
        //         value.promise?.then(
        //             (changeEvent) => {
        //                 value.callbacks();
        //                 this._events.get(key)!.promise = null;
        //             })
        //             .catch((error: any) => console.log('_invokeOnDispatch:', error));
        //     });
        // }
    }

    /**
     * Метод, реализующий реакцию на рассылку Диспетчера.
     * @param payload - полезная нагрузка запроса
     */
    async _onDispatch(payload: object) {
        throw new Error('Store: метод _onDispatch должен быть реализован в подклассе');
    }
}

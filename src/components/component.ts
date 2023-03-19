// @ts-ignore
import { ROOT } from '@config/config';

export interface Component extends anyObject {
    props: componentProps;
    parent: HTMLElement;
}

export class Component {
    /**
     * Cохраняет переданные параметры props.
     * @default parent - div, через который происходит взаимодействие с html.
     * @param props - необходимые для работы класса свойства
     */
    constructor(props = { parent: ROOT } as componentProps) {
        this.state = {};
        this.props = props;
        if (Object.hasOwnProperty.call(props, 'parent')) {
            this.parent = props.parent;
        }
    }
}

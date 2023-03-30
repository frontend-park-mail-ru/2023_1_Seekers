import '@views/404-page/404-page.scss';

import template from '@views/404-page/404-page.hbs'
import {View} from "@views/view";

class Vector {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    set(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    equals(v: Vector): boolean {
        return this.x == v.x && this.y == v.y;
    }
}

class Scalable {
    scale: number;
    position: Vector;

    constructor(scale: number, position: Vector) {
        this.scale = scale;
        this.position = position;
    }

    draw(context: CanvasRenderingContext2D): void {
        context.fillRect(
            this.position.x * this.scale,
            this.position.y * this.scale,
            this.scale,
            this.scale
        );
    }
}

class Food extends Scalable {
    constructor(scale: number, position: Vector) {
        super(scale, position);
    }

    draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = '#e17272';
        super.draw(context);
    }
}

abstract class Random {
    static Generate(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export enum Direction {
    LEFT,
    UP,
    RIGHT,
    DOWN
}

class Snake extends Scalable {
    direction: Direction = Direction.RIGHT;
    private tail: Scalable[] = [];

    constructor(scale: number, position: Vector) {
        super(scale, position);
    }

    draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = '#BB86FC';
        super.draw(context);

        context.fillStyle = '#BB86FC55';
        this.tail.forEach(part => part.draw(context));
    }

    move(maxX: number, maxY: number): boolean {
        let x = this.position.x;
        let y = this.position.y;

        switch(this.direction) {
            case Direction.LEFT:
                this.position.x--;
                break;
            case Direction.UP:
                this.position.y--;
                break;
            case Direction.RIGHT:
                this.position.x++;
                break;
            case Direction.DOWN:
                this.position.y++;
                break;
        }

        if(this.position.x < 0) {
            this.position.x = maxX;
        }

        if(this.position.y < 0) {
            this.position.y = maxY;
        }

        if(this.position.x > maxX) {
            this.position.x = 0;
        }

        if(this.position.y > maxY) {
            this.position.y = 0;
        }

        for(let tpart of this.tail) {
            if(this.position.equals(tpart.position)) {
                return true;
            }

            const xtmp = tpart.position.x;
            const ytmp = tpart.position.y;

            tpart.position.set(x, y);

            x = xtmp;
            y = ytmp;
        }

        return false;
    }

    eat(food: Food): void {
        this.tail.push(new Scalable(this.scale, food.position));
    }
}

export enum KEYS {
    ARROW_LEFT  = 'ArrowLeft',
    ARROW_UP    = 'ArrowUp',
    ARROW_RIGHT = 'ArrowRight',
    ARROW_DOWN  = 'ArrowDown'
}

export interface GameSettings {
    width?: number;
    height?: number;
    scale?: number;
    speed?: number;
}

const DefaultSettings: GameSettings = {
    width: 40,
    height: 30,
    scale: 15,
    speed: 50
}

export default class Game extends View  {
    private context?: CanvasRenderingContext2D;
    private settings: GameSettings;

    private snake: Snake;
    private food!: Food;
    private timestamp?: number = 0;

    private nextKey: string = "";

    constructor(parent: Element, settings: GameSettings = {}) {
        super(
            parent,
            template,
        );

        this.settings = { ...DefaultSettings, ...settings };
        this.snake = new Snake(this.settings.scale!, new Vector(0, 0));
    }

    start(): void {
        super.render({});

        const canvas = document.getElementById('arena') as HTMLCanvasElement

        this.context = canvas.getContext('2d')!;




        this.canvas.width = this.settings.width! * this.settings.scale!;
        this.canvas.height = this.settings.height! * this.settings.scale!;

        this.attachKeyboard();
        this.placeFood();
        this.update();
    }

    private placeFood(): void {
        const x = Random.Generate(0, this.settings.width! - 1);
        const y = Random.Generate(0, this.settings.height! - 1);

        this.food = new Food(this.settings.scale!, new Vector(x, y));
    }

    private attachKeyboard(): void {
        document.addEventListener('keydown', e => {
            if(this.nextKey == null || this.nextKey != e.code) {
                this.nextKey = e.code;
            }
        });
    }

    update(timestamp?: number): void {
        timestamp = timestamp || 0;

        this.context!.fillStyle = '#2d2d2e';
        this.context!.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.snake.draw(this.context!);

        if(timestamp - this.timestamp! >= this.settings.speed!) {
            this.timestamp = timestamp;

            this.checkKey();

            if(this.snake.move(this.settings.width! - 1, this.settings.height! - 1)) {
                // this.emit('over', this._score);
                return;
            }

            this.checkFoodCollision();
        }

        this.food.draw(this.context!);

        requestAnimationFrame(this.update.bind(this));
    }

    private checkKey(): void {
        if(this.nextKey == null) {
            return;
        }

        switch(this.nextKey) {
            case KEYS.ARROW_LEFT:
                this.snake.direction = Direction.LEFT;
                break;
            case KEYS.ARROW_UP:
                this.snake.direction = Direction.UP;
                break;
            case KEYS.ARROW_RIGHT:
                this.snake.direction = Direction.RIGHT;
                break;
            case KEYS.ARROW_DOWN:
                this.snake.direction = Direction.DOWN;
                break;
        }

        this.nextKey = "";
    }

    private checkFoodCollision(): void {
        if(this.snake.position.equals(this.food.position)) {
            this.snake.eat(this.food);
            // this.emit('score', ++this._score);
            this.placeFood();
        }
    }

    get canvas(): HTMLCanvasElement {
        return this.context!.canvas;
    }
}

export const Page404 = new Game(document.getElementById('root')!);

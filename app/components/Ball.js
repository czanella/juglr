import { Sprite } from '../lightpixel';
import { randomPick } from '../utils';

const COLOR_LIST = [
    '#ff0000',
    '#00ff00',
    '#0000ff',
    '#ffff00',
    '#ff00ff',
    '#00ffff',
];

class Ball extends Sprite {
    constructor (radius = 10, color = null) {
        super();

        this.radius = radius;
        this.color = color || randomPick(COLOR_LIST);

        this.speedX = 0;
        this.speedY = 0;
        this.fixed = false;

        this.texture = document.createElement('canvas');
        this.texture.width = 2 * radius;
        this.texture.height = 2 * radius;

        this.textureContext = this.texture.getContext('2d');
        this.textureContext.fillStyle = this.color;
        this.textureContext.beginPath();
        this.textureContext.arc(this.radius, this.radius, this.radius, 0, 2*Math.PI);
        this.textureContext.fill();
    }

    applyGravity (delta, gravityX, gravityY) {
        if (!this.fixed) {
            this.speedX += gravityX * delta;
            this.speedY += gravityY * delta;

            this.x += this.speedX * delta;
            this.y += this.speedY * delta;
        }
    }
}

export default Ball;

import { Drawable } from '../lightpixel';
import { randomPick, CircularQueue } from '../utils';

const COLOR_LIST = [
    ['rgb(255, 0, 0)', 'rgba(255, 0, 0, 0.5)'],
    ['rgb(0, 255, 0)', 'rgba(0, 255, 0, 0.5)'],
    ['rgb(0, 0, 255)', 'rgba(0, 0, 255, 0.5)'],
    ['rgb(255, 255, 0)', 'rgba(255, 255, 0, 0.5)'],
    ['rgb(255, 0, 255)', 'rgba(255, 0, 255, 0.5)'],
    ['rgb(0, 255, 255)', 'rgba(0, 255, 255, 0.5)'],
];

const TRAIL_LENGTH = 20;

class Ball extends Drawable {
    constructor (initialX = 0, initialY = 0, radius = 10, color = null) {
        super();

        this.radius = radius;
        this.color = color || randomPick(COLOR_LIST);

        this.speedX = 0;
        this.speedY = 0;
        this.fixed = false;

        this.x = initialX;
        this.y = initialY;
        this.trail = new CircularQueue(TRAIL_LENGTH, { x: initialX, y: initialY });
    }

    drawOn(context) {
        context.fillStyle = this.color[0];
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        context.fill();

        context.strokeStyle = this.color[1];
        context.lineWidth = this.radius / 2;
        context.beginPath();
        this.trail.iterate((pos, i) => {
            if (i == 0) {
                context.moveTo(pos.x, pos.y);
            } else {
                context.lineTo(pos.x, pos.y);
            }
        });
        context.stroke();
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.trail.add({ x, y });
    }

    applyGravity (delta, gravityX, gravityY) {
        if (!this.fixed) {
            this.speedX += gravityX * delta;
            this.speedY += gravityY * delta;

            this.setPosition(
                this.x + this.speedX * delta,
                this.y + this.speedY * delta,
            );
        }
    }
}

export default Ball;

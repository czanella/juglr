import { Drawable } from '../lightpixel';
import { randomPick, CircularQueue, TrailPoint } from '../utils';

const COLOR_LIST = [
    ['rgb(255, 0, 0)', 'rgba(255, 0, 0, 0.5)'],
    ['rgb(0, 255, 0)', 'rgba(0, 255, 0, 0.5)'],
    ['rgb(0, 0, 255)', 'rgba(0, 0, 255, 0.5)'],
    ['rgb(255, 255, 0)', 'rgba(255, 255, 0, 0.5)'],
    ['rgb(255, 0, 255)', 'rgba(255, 0, 255, 0.5)'],
    ['rgb(0, 255, 255)', 'rgba(0, 255, 255, 0.5)'],
];

const TRAIL_LENGTH = 20;
const TWO_PI = 2 * Math.PI;

class Ball extends Drawable {
    constructor (x = 0, y = 0, radius = 10, speedX = 0, speedY = 0, color = null) {
        super();

        this.radius = radius;
        this.color = color || randomPick(COLOR_LIST);

        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.fixed = false;

        this.trail = new CircularQueue(TRAIL_LENGTH, new TrailPoint({ x, y }));
    }

    drawOn(context) {
        context.fillStyle = this.color[1];
        const trailPoints = this.trail.map((p, i) => {
            return p.sidePoints(this.radius * i / (TRAIL_LENGTH - 1));
        });
        context.beginPath();
        context.moveTo(trailPoints[0].left.x, trailPoints[0].left.y);
        for (let i = 1; i < trailPoints.length; i++) {
            context.lineTo(trailPoints[i].left.x, trailPoints[i].left.y)
        }
        for (let i = trailPoints.length - 1; i >= 0; i--) {
            context.lineTo(trailPoints[i].right.x, trailPoints[i].right.y)
        }
        context.fill();

        context.fillStyle = this.color[0];
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, TWO_PI);
        context.fill();
    }

    minY() {
        return this.trail.tail().y;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.trail.add(new TrailPoint({ x, y }, this.trail.head()));
    }

    applyGravity(delta, gravityX, gravityY) {
        if (!this.fixed) {
            this.speedX += gravityX * delta;
            this.speedY += gravityY * delta;

            this.setPosition(
                this.x + this.speedX * delta,
                this.y + this.speedY * delta,
            );
        }
    }

    distance2(x, y) {
        const dx = this.x - x;
        const dy = this.y - y;

        return dx * dx + dy * dy;
    }

    distance(x, y) {
        return Math.sqrt(this.distance2(x, y));
    }
}

export default Ball;

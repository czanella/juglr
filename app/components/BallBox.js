import { Sprite, Container } from '../lightpixel';

const BLACK = '#000000';

class BallBox extends Container {
    constructor (width, height, gravityX, gravityY) {
        super();

        this.width = width;
        this.height = height;
        this.gravityX = gravityX;
        this.gravityY = gravityY;
        this.balls = [];

        this.removeBall = this.removeBall.bind(this);
    }

    drawOn(context) {
        context.fillStyle = BLACK;
        context.fillRect(0, 0, this.width, this.height);
        super.drawOn(context);
    }

    propagateEvent(eventType, position, matrix = null) {
        this.emit(eventType, eventType, position);

        return true;
    }

    addBall(ball) {
        const ballIndex = this.balls.indexOf(ball);

        if (ballIndex < 0) {
            this.balls.push(ball);
            this.addChild(ball);
        }
    }

    removeBall(ball) {
        const ballIndex = this.balls.indexOf(ball);

        if (ballIndex >= 0) {
            this.balls.splice(ballIndex, 1);
            this.removeChild(ball);
        }
    }

    removeAllBalls() {
        this.balls.forEach(b => this.removeChild(b));
        this.balls = [];
    }

    animationStep(delta) {
        // Moves each ball
        this.balls.forEach((ball) => {
            const originalY = ball.y;

            ball.applyGravity(delta, this.gravityX, this.gravityY);
            if (ball.x - ball.radius < 0) {
                ball.x = ball.radius + (ball.radius - ball.x);
                ball.speedX = -ball.speedX;
            }
            if (ball.x >= this.width - ball.radius) {
                ball.x = (this.width - ball.radius) - (ball.x - (this.width - ball.radius));
                ball.speedX = -ball.speedX;
            }
        });
    }

    ballsOffScreen() {
        return this.balls.filter(b => b.y - b.radius >= this.height);
    }

    ballsTotallyOffScreen() {
        return this.balls.filter(b => b.minY() >= this.height);
    }
}

export default BallBox;

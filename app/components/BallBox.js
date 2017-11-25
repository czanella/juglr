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

    addBall (ball) {
        const ballIndex = this.balls.indexOf(ball);

        if (ballIndex < 0) {
            this.balls.push(ball);
            this.addChild(ball);
        }
    }

    removeBall (ball) {
        const ballIndex = this.balls.indexOf(ball);

        if (ballIndex >= 0) {
            this.balls.splice(ballIndex, 1);
            this.removeChild(ball);
        }
    }

    animationStep (delta) {
        // Moves each ball
        this.balls.forEach((ball) => {
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

        // Removes the balls that fell off screen
        const offBalls = this.balls.filter(ball => ball.minY() >= this.height);
        offBalls.forEach(ball => this.removeBall(ball));
    }
}

export default BallBox;

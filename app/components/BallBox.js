import {
    Sprite
} from '../lightpixel';

class BallBox extends Sprite {
    constructor (width, height, gravityX, gravityY) {
        super();

        this.width = width;
        this.height = height;
        this.gravityX = gravityX;
        this.gravityY = gravityY;
        this.balls = [];

        // The background where the ball trails are drawn
        this.texture = document.createElement('canvas');
        this.texture.width = this.width;
        this.texture.height = this.height;

        this.trailContext = this.texture.getContext('2d');
        this.trailContext.fillStyle = '#000000';
        this.trailContext.fillRect(0, 0, this.texture.width, this.texture.height);

        this.anchorX = this.anchorY = 0;
    }

    addBall (ball) {
        const ballIndex = this.balls.indexOf(ball);

        if (ballIndex < 0) {
            this.balls.push(ball);
        }
    }

    removeBall (ball) {
        const ballIndex = this.balls.indexOf(ball);

        if (ballIndex >= 0) {
            this.balls.splice(ballIndex, 1);
        }
    }

    animationStep (delta) {
        // Moves each ball, also drawing the trails
        this.trailContext.globalAlpha = 1;

        this.balls.forEach((ball) => {
            this.trailContext.beginPath();
            this.trailContext.strokeStyle = ball.color;
            this.trailContext.lineWidth = 2 * ball.radius;
            this.trailContext.lineCap = 'round';
            this.trailContext.moveTo(ball.x, ball.y);

            ball.move(delta, this.gravityX, this.gravityY);
            if (ball.x - ball.radius < 0) {
                ball.x = ball.radius + (ball.radius - ball.x);
                ball.speedX = -ball.speedX;
            }
            if (ball.x >= this.width - ball.radius) {
                ball.x = (this.width - ball.radius) - (ball.x - (this.width - ball.radius));
                ball.speedX = -ball.speedX;
            }

            this.trailContext.lineTo(ball.x, ball.y);
            this.trailContext.stroke();
        });

        // Applies a fade effect
        this.trailContext.globalAlpha = 0.1;
        this.trailContext.fillRect(0, 0, this.width, this.height);

        // Removes the balls that fell off screen
        const offBalls = this.balls.filter(ball => (ball.y - ball.radius) >= this.height);
        offBalls.forEach(ball => this.removeBall(ball));
    }
}

export default BallBox;

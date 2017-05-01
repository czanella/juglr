import {
    Sprite,
    Container,
} from '../lightpixel';

class BallBox extends Container {
    constructor (width, height, gravityX, gravityY) {
        super();

        this.width = width;
        this.height = height;
        this.gravityX = gravityX;
        this.gravityY = gravityY;
        this.balls = [];

        // The background where the ball trails are drawn
        this.trailCanvas = document.createElement('canvas');
        this.trailCanvas.width = this.width;
        this.trailCanvas.height = this.height;

        this.trailContext = this.trailCanvas.getContext('2d');
        this.trailContext.fillStyle = '#000000';
        this.trailContext.fillRect(0, 0, this.trailCanvas.width, this.trailCanvas.height);

        this.trailSprite = new Sprite(this.trailCanvas);
        this.trailSprite.anchorX = this.trailSprite.anchorY = 0;
        this.addChild(this.trailSprite);

        // The container that holds all the balls
        this.ballContainer = new Container();
        this.addChild(this.ballContainer);
    }

    addBall (ball) {
        const ballIndex = this.balls.indexOf(ball);

        if (ballIndex < 0) {
            this.balls.push(ball);
            this.ballContainer.addChild(ball);
        }
    }

    removeBall (ball) {
        const ballIndex = this.balls.indexOf(ball);

        if (ballIndex >= 0) {
            this.balls.splice(ballIndex, 1);
            this.ballContainer.removeChild(ball);
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

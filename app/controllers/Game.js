import store from '../redux/store';
import { INCREASE_SCORE, RESET_SCORE } from '../redux/actions';
import { Ball } from '../components';
import { randomRange } from '../utils';
import { window } from '../browserGlobals';
import {
    BALL_RADIUS,
    MAX_INITIAL_SPEED_X,
    TAP_IMPULSE,
    TAP_ANGLE,
    HIT_AREA_RADIUS,
} from '../config.json';

const HIT_DISTANCE2 = HIT_AREA_RADIUS ** 2;
const DEG_TO_RAD = Math.PI / 180;

class Game {
    constructor(ballBox) {
        this.ballBox = ballBox;

        this.gameOn = false;
        this.gameLoopId = null;
        this.lastTimestamp = null;

        this.onStateChange = this.onStateChange.bind(this);
        this.onInteraction = this.onInteraction.bind(this);
        this.gameLoop = this.gameLoop.bind(this);

        this.unsubscribeStore = store.subscribe(this.onStateChange);
    }

    onStateChange() {
        const { gameOn } = store.getState();

        if (gameOn && !this.gameOn) {
            this.gameOn = true;
            this.startGame();
        } else if (!gameOn && this.gameOn) {
            this.gameOn = false;
            this.stopGame();
        }
    }

    addNewBall() {
        const newBall = new Ball(
            Math.random() * (this.ballBox.width - 2 * BALL_RADIUS) + BALL_RADIUS,
            -BALL_RADIUS,
            BALL_RADIUS,
            Math.random() * 2 * MAX_INITIAL_SPEED_X - MAX_INITIAL_SPEED_X,
            0,
        );
        this.ballBox.addBall(newBall);
    }

    startGame() {
        console.log('startGame');
        this.ballBox.removeAllBalls();
        this.ballBox.removeListener('mousedown', this.onInteraction);
        this.ballBox.on('mousedown', this.onInteraction);
        store.dispatch(RESET_SCORE);
        this.addNewBall();

        this.gameLoopId = window.requestAnimationFrame(this.gameLoop);
    }

    gameLoop(timestamp) {
        const delta = this.lastTimestamp ? timestamp - this.lastTimestamp : 0;
        this.lastTimestamp = timestamp;
        this.ballBox.animationStep(delta / 1000);

        this.gameLoopId = window.requestAnimationFrame(this.gameLoop);
    }

    stopGame() {
        window.cancelAnimationFrame(this.gameLoopId);
        this.gameLoopId = null;
    }

    onInteraction(event, data) {
        const [x, y] = data;
        for (let i = 0; i < this.ballBox.balls.length; i += 1) {
            const ball = this.ballBox.balls[i];

            if (ball.distance2(x, y) <= HIT_DISTANCE2) {
                const angle = randomRange(TAP_ANGLE[0], TAP_ANGLE[1]) * DEG_TO_RAD;
                const speed = randomRange(TAP_IMPULSE[0], TAP_IMPULSE[1]);
                ball.speedX = speed * Math.cos(angle);
                ball.speedY = -speed * Math.sin(angle);

                store.dispatch(INCREASE_SCORE);

                break;
            }
        }
    }

    dispose() {
        this.unsubscribeStore();
    }
}

export default Game;

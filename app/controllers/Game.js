import store from '../redux/store';
import { INCREASE_SCORE, RESET_SCORE } from '../redux/actions';
import { Ball } from '../components';
import { BALL_RADIUS, MAX_INITIAL_SPEED_X } from '../config.json';

class Game {
    constructor(ballBox, scoreView) {
        this.ballBox = ballBox;
        this.scoreView = scoreView;

        this.gameOn = false;
        this.gameLoopId = null;
        this.lastTimestamp = null;

        this.onStateChange = this.onStateChange.bind(this);
        this.onInteraction = this.onInteraction.bind(this);

        this.unsubscribeStore = store.subscribe(this.onStateChange);
    }

    set score(value) {
        this._score = value;
        this.scoreView.text = value;
    }

    onStateChange() {
        const { score, gameOn } = store.getState();
        console.log('onStateChange', score, gameOn);

        if (score !== this.score) {
            this.score = score;
        }

        if (gameOn && !this.gameOn) {
            this.gameOn = true;
            this.startGame();
        } else if (!gameOn && this.gameOn) {
            this.gameOn = false;
            this.stopGame();
        }
    }

    addNewBall() {
        this.ballBox.addBall(
            new Ball(
                Math.random() * (this.width - 2 * BALL_RADIUS) + BALL_RADIUS,
                -BALL_RADIUS,
                BALL_RADIUS,
                Math.random() * 2 * MAX_INITIAL_SPEED_X - MAX_INITIAL_SPEED_X,
                0
            )
        );
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
        console.log('gameLoop', timestamp);
        const delta = this.lastTimestamp ? timestamp - this.lastTimestamp : 0;
        this.lastTimestamp = timestamp;
        this.ballBox.animationStep(delta);

        this.gameLoopId = window.requestAnimationFrame(this.gameLoop);
    }

    stopGame() {
        window.cancelAnimationFrame(this.gameLoopId);
        this.gameLoopId = null;
    }

    onInteraction(e) {
        console.log('onInteraction', e);
        store.dispatch(INCREASE_SCORE);
    }

    dispose() {
        this.unsubscribeStore();
    }
}

export default Game;

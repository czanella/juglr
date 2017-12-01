import store from '../redux/store';
import { INCREASE_SCORE, RESET_SCORE } from '../redux/actions';
import { Ball } from '../components';
import { BALL_RADIUS, MAX_INITIAL_SPEED_X } from '../config.json';

class Game {
    constructor(ballBox, scoreView) {
        this.ballBox = ballBox;
        this.scoreView = scoreView;
        
        this.onStateChange = this.onStateChange.bind(this);
        this.onInteraction = this.onInteraction.bind(this);
        
        this.gameOn = false;
        this.unsubscribeStore = store.subscribe(this.onStateChange);
        this.scoreView.on('mousedown', this.onInteraction);
    }

    set score(value) {
        this._score = value;
        this.scoreView.text = value;
    }

    onStateChange() {
        const { score, gameOn } = store.getState();

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
        this.ballBox.removeAllBalls();
        store.dispatch(RESET_SCORE);
    }

    stopGame() {
        
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

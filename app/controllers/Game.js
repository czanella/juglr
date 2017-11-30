import store from '../redux/store';
import { increaseScore, resetScore } from '../redux/actions';

class Game {
    constructor(ballBox, scoreView) {
        this.ballBox = ballBox;
        this.scoreView = scoreView;

        this.score = 0;
        this.gameOn = false;
        this.unsubscribeStore = store.subscribe(this.onStateChange.bind(this));
    }

    onStateChange() {
        const { score, gameOn } = store.getState();
        if (score !== this.score) {
            this.score = score;
            this.scoreView.text = score;
        }

        if (gameOn && !this.gameOn) {
            this.gameOn = true;
            this.startGame();
        } else if (!gameOn && this.gameOn) {
            this.gameOn = false;
            this.stopGame();
        }
    }

    startGame() {

    }

    stopGame() {
        
    }

    dispose() {
        this.unsubscribeStore();
    }
}

export default Game;

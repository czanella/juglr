import { TweenLite } from 'gsap';
import OutlineText from './OutlineText';
import store from '../redux/store';
import { SCORE_TOP_MARGIN, SCORE_FONT_SIZE } from '../config';

const OUT_POSITION = -(SCORE_FONT_SIZE / 2 + 20);
const IN_POSITION = SCORE_TOP_MARGIN + SCORE_FONT_SIZE / 2;

class GameScore extends OutlineText {
    constructor() {
        super('0', SCORE_FONT_SIZE);

        this.gameOn = false;
        this.interactive = false;
        this.onStateChange = this.onStateChange.bind(this);
        this.unsubscribeStore = store.subscribe(this.onStateChange);
        this.y = OUT_POSITION;
    }

    onStateChange() {
        const { score, gameOn } = store.getState();

        if (score !== this.score) {
            this.setScore(score);
        }

        if (gameOn && !this.gameOn) {
            this.gameOn = true;
            this.show();
        } else if (!gameOn && this.gameOn) {
            this.gameOn = false;
            this.hide();
        }
    }

    setScore(score) {
        this.text = score;
        this.score = score;
    }

    show() {
        TweenLite.to(this, 0.5, { y: IN_POSITION });
    }

    hide() {
        TweenLite.to(this, 0.5, { y: OUT_POSITION });
    }

    dispose() {
        this.unsubscribeStore();
    }
}

export default GameScore;

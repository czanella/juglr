import { Drawable, TextNode } from '../lightpixel';
import {
    FONT,
    INTRO_BUTTON_FONT_SIZE,
    INTRO_BUTTON_WIDTH,
    INTRO_BUTTON_HEIGHT,
} from '../config';

class IntroButton extends Drawable {
    constructor(text) {
        super();

        this.textNode = new TextNode(
            text,
            INTRO_BUTTON_FONT_SIZE,
            '#ffffff',
            FONT,
            'center',
            'middle',
        );
    }

    drawOn(context) {
        if (this.isVisible) {
            this.stackContext(context);

            context.fillStyle = '#f00';
            context.fillRect(
                -INTRO_BUTTON_WIDTH / 2,
                -INTRO_BUTTON_HEIGHT / 2,
                INTRO_BUTTON_WIDTH,
                INTRO_BUTTON_HEIGHT,
            );

            context.lineWidth = 5;
            context.strokeStyle = '#fff';
            context.strokeRect(
                -INTRO_BUTTON_WIDTH / 2,
                -INTRO_BUTTON_HEIGHT / 2,
                INTRO_BUTTON_WIDTH,
                INTRO_BUTTON_HEIGHT,
            );

            this.textNode.drawOn(context);

            context.restore();
        }
    }

    propagateEvent(eventType, position, matrix = null) {
        if (this.isInteractive) {
            matrix = this.stackTransform(matrix);
            position = matrix.transform(position);
            
            if (position[0] >= -INTRO_BUTTON_WIDTH / 2 &&
                position[0] < INTRO_BUTTON_WIDTH / 2 &&
                position[1] >= -INTRO_BUTTON_HEIGHT / 2 &&
                position[1] < INTRO_BUTTON_HEIGHT) {

                this.emit(eventType, eventType, position);

                return true;
            }
        }

        return false;
    }
}

export default IntroButton;

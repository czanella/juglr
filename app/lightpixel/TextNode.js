import Drawable from './Drawable.js';

class TextNode extends Drawable {
    constructor(
        text = '',
        fontSize = 10,
        color = '#ffffff',
        fontFamily = 'serif',
        textAlign = 'start',
        textBaseline = 'alphabetic',
        strokeWidth = undefined
    ) {
        super();

        this.text = text;
        this._fontSize = fontSize;
        this.color = color;
        this._fontFamily = fontFamily;
        this.textAlign = textAlign;
        this.textBaseline = textBaseline;
        this.strokeWidth = strokeWidth;

        this.updateFontString();
    }

    updateFontString() {
        this.fontString = `${this._fontSize}px ${this._fontFamily}`;
    }

    set fontSize(value) {
        this._fontSize = value;
        this.updateFontString();
    }

    get fontSize() {
        return this._fontSize;
    }

    set fontFamily(value) {
        this._fontFamily = value;
        this.updateFontString();
    }

    get fontFamily() {
        return this._fontFamily;
    }

    drawOn(context) {
        if (this.isVisible) {
            this.stackContext(context);

            context.font = this.fontString;
            context.textAlign = this.textAlign;
            context.textBaseline = this.textBaseline;
            if (this.strokeWidth) {
                context.strokeStyle = this.color;
                context.lineWidth = this.strokeWidth;
                context.strokeText(this.text, 0, 0);
            } else {
                context.fillStyle = this.color;
                context.fillText(this.text, 0, 0);
            }

            context.restore();
        }
    }
}

export default TextNode;

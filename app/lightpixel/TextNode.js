import Drawable from './Drawable';

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
        this.metrics = null;

        this.updateFontString();
    }

    updateFontString() {
        this.fontString = `${this._fontSize}pt ${this._fontFamily}`;
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

            const textWidth = context.measureText(this.text).width + (this.strokeWidth || 0);
            const textHeight = this._fontSize + (this.strokeWidth || 0);

            this.metrics = this.metrics || {};

            switch (this.textBaseline) {
                case 'bottom':
                case 'alphabetic':
                    this.metrics.top = -textHeight;
                    this.metrics.bottom = 0;
                    break;
                
                case 'middle':
                    this.metrics.top = -textHeight / 2;
                    this.metrics.bottom = textHeight / 2;
                    break;
                
                case 'top':
                case 'hanging':
                default:
                    this.metrics.top = 0;
                    this.metrics.bottom = textHeight;
                    break;
            }

            switch (this.textAlign) {
                case 'center':
                    this.metrics.left = -textWidth / 2;
                    this.metrics.right = textWidth / 2;
                    break;
                
                case 'right':
                case 'end':
                    this.metrics.left = -textWidth;
                    this.metrics.right = 0;
                    break;
                
                case 'left':
                case 'start':
                default:
                    this.metrics.left = 0;
                    this.metrics.right = textWidth;
                    break;
            }

            context.restore();
        } else {
            this.metrics = null;
        }
    }

    propagateEvent(eventType, position, matrix = null) {
        if (this.isInteractive && this.metrics) {
            matrix = this.stackTransform(matrix);
            position = matrix.transform(position);

            
            if (position[0] >= this.metrics.left && position[0] < this.metrics.right &&
                position[1] >= this.metrics.top && position[1] < this.metrics.bottom) {

                this.emit(eventType, eventType, position);

                return true;
            }
        }

        return false;
    }
}

export default TextNode;

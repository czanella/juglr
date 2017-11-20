class CircularQueue {
    constructor(size = 10, initialValue = undefined) {
        this.buffer = new Array(size);
        for (let i = 0; i < size; i++) {
            this.buffer[i] = initialValue;
        }
        this.n = 0;
    }

    add(value) {
        this.buffer[this.n] = value;
        this.n = (this.n + 1) % this.buffer.length;
    }

    iterate(callback) {
        for (let i = 0; i < this.buffer.length; i++) {
            callback(this.buffer[(this.n + i) % this.buffer.length], i);
        }
    }
}

export default CircularQueue;

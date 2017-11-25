class TrailPoint {
  constructor(point, pivot = null) {
    const { x, y } = point;
    const { x: px, y: py } = (pivot || point);

    this.x = x;
    this.y = y;

    const vectorX = px - x;
    const vectorY = py - y;
    const vectorLength = Math.sqrt(vectorX * vectorX + vectorY * vectorY);

    if (vectorLength !== 0) {
      this.vector = {
        x: vectorY / vectorLength,
        y: - vectorX / vectorLength,
      };
    } else {
      this.vector = {
        x: 0,
        y: -1,
      };
    }
  }

  sidePoints(length = 1) {
    return {
      left: {
        x: this.x + length * this.vector.x,
        y: this.y + length * this.vector.y,
      },
      right: {
        x: this.x - length * this.vector.x,
        y: this.y - length * this.vector.y,
      },
    }
  }
}

export default TrailPoint;

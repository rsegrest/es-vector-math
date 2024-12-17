export class Vector {
  public readonly x:number;
  public readonly y:number;
  constructor(x:number,y:number) {
    if (x) { this.x = x; } else { this.x = 0; }
    if (y) { this.y = y; } else { this.y = 0; }
  }
  toString() {
    return `Vector[${this.x},${this.y}]`;
  }
  add(vector:Vector) {
    let newX:number = 0;
    let newY:number = 0;
    if (this.x && vector.x) { newX = this.x + vector.x; }
    if (this.y && vector.y) { newY = this.y + vector.y; }
    return new Vector(newX, newY);
  }
  static add(v1:Vector, v2:Vector) {
    return v1.add(v2);
  }
}
export default Vector;
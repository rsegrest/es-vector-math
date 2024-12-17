import Vector from "../Vector.js";

export class Position {
    private x: number | null;
    private y: number | null;
    constructor(x: number, y: number) {
        if (x) {
            this.x = x;
        } else {
            this.x = null;
        }
        if (y) {
            this.y = y;
        } else {
            this.y = null;
        }
    }
    toString() {
        return `Position[${this.x},${this.y}]`;
    }
    addVector(vector: Vector) {
        if (this.x && vector.x) {
            this.x += vector.x;
        }
        if (this.y && vector.y) {
            this.y += vector.y;
        }
    }
}
export default Position;

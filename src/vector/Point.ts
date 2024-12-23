// import Angle from './Angle.js';
import Angle from './Angle.js';
import VectorMath from './VectorMath.js';
export class Point {
    
  public readonly x:number;
  public readonly y:number;
  public readonly z?:number;
  public readonly dimensions:2|3;
  constructor(x:number,y:number,z:number|null = null) {
      if (x !== null && typeof x !== undefined) { this.x = x; } else { throw('Point requires x,y components') }
      if (y !== null && typeof y !== undefined) { this.y = y; } else { throw('Point requires y component'); }
      if (z === null) { this.dimensions = 2; }
      else {
          this.z = z;
          this.dimensions = 3;
      } 
  }
  toString() {
      if (this.dimensions === 3) return `Point3D[${this.x}, ${this.y}, ${this.z}]`;
      return `Point2D[${this.x}, ${this.y}]`;
  }
  equals(v:Point) {
      return VectorMath.equals(this,v);
  }
  scale(scalar:number) {
      return VectorMath.scale(scalar, this);
  }
  rotateX(angle:Angle) {
      return VectorMath.rotateX(angle,this);
  }
  rotateY(angle:Angle) {
      return VectorMath.rotateY(angle,this);
  }
  rotateZ(angle:Angle) {
      return VectorMath.rotateZ(angle,this);
  }
  rotateXY(angleX:Angle, angleY:Angle) {
      return VectorMath.rotateXY(angleX,angleY,this);
  }
  rotateXYZ(angleX:Angle, angleY:Angle, angleZ:Angle) {
      return VectorMath.rotateXYZ(angleX,angleY,angleZ, this);
  }
  vectorRotateXByCosineAndSine(cosine:number, sine:number) {
      return VectorMath.rotateXByCosineAndSine(cosine,sine,this);
  }
  vectorRotateYByCosineAndSine(cosine:number, sine:number) {
      return VectorMath.rotateYByCosineAndSine(cosine,sine,this);
  }
  vectorRotateZByCosineAndSine(cosine:number, sine:number) {
      return VectorMath.rotateZByCosineAndSine(cosine,sine,this);
  }
}
export default Point;
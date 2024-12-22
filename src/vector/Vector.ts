import Angle from './Angle.js';
import VectorMath from './VectorMath.js';
export class Vector {
    
  public readonly x:number;
  public readonly y:number;
  public readonly z?:number;
  public readonly dimensions:2|3;
  constructor(x:number,y:number,z:number|null = null) {
      if (x !== null && typeof x !== undefined) { this.x = x; } else { throw('Vector requires x,y components') }
      if (y !== null && typeof y !== undefined) { this.y = y; } else { throw('Vector requires y component'); }
      if (z === null) { this.dimensions = 2; }
      else {
          this.z = z;
          this.dimensions = 3;
      } 
  }
  toString() {
      if (this.dimensions === 3) return `Vector3D[${this.x}, ${this.y}, ${this.z}]`;
      return `Vector2D[${this.x}, ${this.y}]`;
  }
  add(v:Vector) {
      return VectorMath.add(this,v);
  }
  subtract(v:Vector) {
      return VectorMath.subtract(this,v);
  }
  equals(v:Vector) {
      return VectorMath.equals(this,v)
  }
  reverse() {
      return VectorMath.reverse(this);
  }
  scale(scalar:number) {
      return VectorMath.scale(scalar, this);
  }
  getLength():number {
      return VectorMath.getLength(this);
  }
  setLength(length:number):Vector {
      return VectorMath.setLength(length, this);
  }
  setAngleDegrees(angleDegrees:number) {
      return VectorMath.setAngleDegrees(angleDegrees,this);
  }
  setAngleRadians(angleRadians:number) {
      return VectorMath.setAngleRadians(angleRadians,this);
  }
  getAngleDegrees() {
      return VectorMath.getAngleDegrees(this);
  }
  getAngleRadians() {
      return VectorMath.getAngleRadians(this);
  }
  dotProduct(v:Vector) {
      return VectorMath.dotProduct(this,v);
  }
  getNormal() {
      return VectorMath.getNormal(this);
  }
  isPerpendicularTo(v:Vector) {
      return VectorMath.arePerpendicular(this,v);
  }
  calculateAngleBetween(v:Vector) {
      return VectorMath.calculateAngleBetween(this,v);
  }
  crossProduct(v: Vector): any {
      return VectorMath.crossProduct(this,v);
  }
  getPerspective(viewDistance:number) {
      return VectorMath.getPerspective(viewDistance, this);
  }
  perspectiveProjection(p:number|null = null) {
      if (p === null) p = VectorMath.getPerspective(300,this);
      const x = this.x * p;
      const y = this.y * p;
      const z = 0;
      return new Vector(x,y,z);
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
export default Vector;
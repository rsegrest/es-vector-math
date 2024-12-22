import Angle from './Angle.js';
import Vector from './Vector.js';
export class VectorMath {

    static equals(v:Vector, w:Vector) {
        if (v.dimensions === 3) v.x === w.x && v.y === w.y && v.z === w.z && v.dimensions === w.dimensions;
        return v.x === w.x && v.y === w.y && v.dimensions === w.dimensions;
    }
    static add(v:Vector, w:Vector) {
        if (v.dimensions === 3 && w.dimensions === 3) return new Vector((v.x+w.x),(v.y+w.y),(v.z!+w.z!));
        return new Vector((v.x+w.x),(v.y+w.y));
    }
    static minus(v:Vector, w:Vector) {
        if (v.dimensions === 3 && w.dimensions === 3) return new Vector((v.x-w.x),(v.y-w.y),(v.z!-w.z!));
        return new Vector((v.x-w.x),(v.y-w.y));
    }
    static reverse(v:Vector) {
        if (v.dimensions === 3) return new Vector(-1*v.x, -1*v.y, -1*v.z!)
        return new Vector(-1*v.x, -1*v.y);
    }
    static scale(scalar:number, v:Vector) {
        if (v.dimensions === 3) return new Vector(scalar*v.x, scalar*v.y, scalar*v.z!);
        return new Vector(scalar*v.x, scalar*v.y);
    }
    static getLength(v:Vector):number {
        if (v.dimensions === 3) return Math.sqrt(Math.pow(v.x,2)+Math.pow(v.y,2)+Math.pow(v.z!,2))
        return Math.sqrt(Math.pow(v.x,2)+Math.pow(v.y,2))
    }
    static setLength(length:number, v:Vector) {
        const r = v.getLength();
        let scaled:Vector;
        if (r) scaled = v.scale(length / r);
        else scaled = new Vector(length, v.y, v.z as number);
        return scaled;
    }
    static setAngleDegrees(angleDegrees:number, v:Vector) {
        const r = v.getLength();
        return new Vector(
            Math.round((r*Math.cos(Angle.fromDegrees(angleDegrees).radians))*1000)/1000,
            Math.round((r*Math.sin(Angle.fromDegrees(angleDegrees).radians))*1000)/1000
        )
    }
    static getAngleDegrees(v:Vector) {
        return Angle.atan2Degrees(v.y,v.x);
    }
    
    static dotProduct(v:Vector,w:Vector) {
        if (v.z && w.z) return (v.x*w.x)+(v.y*w.y)+(v.z*w.z);
        return (v.x*w.x)+(v.y*w.y);
    }
    static getNormal(v:Vector) {
        // TODO: 3D version
        return new Vector(-v.y,v.x);
    }
    static isPerpendicular(v:Vector,w:Vector) {
        return VectorMath.dotProduct(v,w) === 0;
    }
    static calculateAngleBetween(v:Vector,w:Vector) {
        if (v.dimensions === 3 && w.dimensions === 3) {
            const dot = VectorMath.dotProduct(v,w);
            const cosTheta = dot / (v.getLength() * w.getLength());
            return Angle.fromRadians(Math.acos(cosTheta));
        }
        return Angle.fromRadians(Math.acos(VectorMath.dotProduct(v,w)/(v.getLength()*w.getLength())));
    }
    static crossProduct(v: Vector, w: Vector): any {
        if (v.dimensions === 3 && w.dimensions === 3) {
            return new Vector(
                v.y*w.z! - v.z!*w.y,
                v.z!*w.x - v.x*w.z!,
                v.x*w.y - v.y*w.x
            )
        }
        throw('Cross product requires 3D vectors');
    }
    static getPerspective(viewDistance:number, v:Vector) {
        return viewDistance / (v.z! + viewDistance);
    }
    static perspectiveProjection(p:number|null = null, v:Vector) {
        if (p === null) p = VectorMath.getPerspective(300,v);
        const x = v.x * p;
        const y = v.y * p;
        const z = 0;
        return new Vector(x,y,z);
    }
    static expand2DVector(v:Vector) {
        if (v.dimensions === 3) return v;
        return new Vector(v.x,v.y,0);
    }
    
    static rotateX(angle:Angle, v:Vector) {
        v = VectorMath.expand2DVector(v);
        const ca = angle.cos();
        const sa = angle.sin();
        const newY = v.y * ca - v.z! * sa;
        const newZ = v.y * sa + v.z! * ca;
        return new Vector(v.x,newY,newZ);
    }
    static rotateXByCosineAndSine(
        cosine:number, sine:number, v:Vector
    ) {
        v = VectorMath.expand2DVector(v);
        const newY = v.y * cosine - v.z! * sine;
        const newZ = v.y * sine + v.z! * cosine;
        return new Vector(v.x,newY,newZ);
    }
    
    static rotateY(angle:Angle, v:Vector) {
        v = VectorMath.expand2DVector(v);
        const ca = angle.cos();
        const sa = angle.sin();
        const newX = v.x * ca + v.z! * sa;
        const newZ = v.x * -sa + v.z! * ca;
        return new Vector(newX,v.y,newZ);
    }
    static rotateYByCosineAndSine(
        cosine:number, sine:number, v:Vector
    ) {
        v = VectorMath.expand2DVector(v);
        const newX = v.x * cosine + v.z! * sine;
        const newZ = v.x * -sine + v.z! * cosine;
        return new Vector(newX,v.y,newZ);
    }
    
    static rotateZ(angle:Angle, v:Vector) {
        v = VectorMath.expand2DVector(v);
        const ca = angle.cos();
        const sa = angle.sin();
        const newX = v.x * ca - v.y * sa;
        const newY = v.x * sa + v.y * ca;
        return new Vector(newX,newY,v.z);
    }
    static rotateZByCosineAndSine(
        cosine:number, sine:number, v:Vector
    ) {
        v = VectorMath.expand2DVector(v);
        const newX = v.x * cosine - v.y! * sine;
        const newY = v.x * sine + v.y! * cosine;
        return new Vector(newX,newY,v.z);
    }
    
    static rotateXY(angleX:Angle, angleY:Angle, v:Vector) {
        v = VectorMath.expand2DVector(v);
        const ca = angleX.cos();
        const sa = angleX.sin();
        const cb = angleY.cos();
        const sb = angleY.sin();
    
        // x-axis rotation
        const y = v.y * ca - v.z! * sa;
        const rz1 = v.y * sa + v.z! * ca;
        const z = v.x * -sb + rz1 * cb;
        const x = v.x * cb + rz1 * sb;
        return new Vector(x,y,z);
    }
    static rotateXYZ(angleX:Angle, angleY:Angle, angleZ:Angle, v:Vector) {
        const ca = angleX.cos();
        const sa = angleX.sin();
        const cb = angleY.cos();
        const sb = angleY.sin();
        const cc = angleZ.cos();
        const sc = angleZ.sin();
    
        // x-axis rotation
        const ry = v.y * ca - v.z! * sa;
        const rz = v.y * sa + v.z! * ca;
        // y-axis rotation
        const rx = v.x * cb + rz * sb;
        const newZ = v.x * -sb + rz * cb;
        // z-axis rotation
        const newX = rx * cc - ry * sc;
        const newY = rx * sc + ry * cc;
        
        return new Vector(newX,newY,newZ);
    }
}
export default VectorMath;
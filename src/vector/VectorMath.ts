import Angle from './Angle.js';
import Point from './Point.js';
import Vector from './Vector.js';
export class VectorMath {

    static equals(v:Vector|Point, w:Vector|Point) {
        if (v instanceof Point && w instanceof Vector) { return false; }
        if (v instanceof Vector && w instanceof Point) { return false; }
        if (v.dimensions === 3) v.x === w.x && v.y === w.y && v.z === w.z && v.dimensions === w.dimensions;
        return v.x === w.x && v.y === w.y && v.dimensions === w.dimensions;
    }
    static add(v:Vector, w:Vector) {
        if (v.dimensions === 3 && w.dimensions === 3) return new Vector((v.x+w.x),(v.y+w.y),(v.z!+w.z!));
        return new Vector((v.x+w.x),(v.y+w.y));
    }
    static subtract(v:Vector, w:Vector) {
        if (v.dimensions === 3 && w.dimensions === 3) return new Vector((v.x-w.x),(v.y-w.y),(v.z!-w.z!));
        return new Vector((v.x-w.x),(v.y-w.y));
    }
    static reverse(v:Vector) {
        if (v.dimensions === 3) return new Vector(-1*v.x, -1*v.y, -1*v.z!)
        return new Vector(-1*v.x, -1*v.y);
    }
    static scale(scalar:number, v:Vector|Point):Vector|Point {
        if (v.dimensions === 3) {
            if (v instanceof Point) return new Point(scalar*v.x, scalar*v.y, scalar*v.z!)
            return new Vector(scalar*v.x, scalar*v.y, scalar*v.z!)
        };
        if (v instanceof Point) return new Point(scalar*v.x, scalar*v.y)
        return new Vector(scalar*v.x, scalar*v.y);
    }
    static getLength(v:Vector):number {
        if (v.dimensions === 3) return Math.sqrt(Math.pow(v.x,2)+Math.pow(v.y,2)+Math.pow(v.z!,2))
        return Math.sqrt(Math.pow(v.x,2)+Math.pow(v.y,2))
    }
    static setLength(length:number, v:Vector):Vector {
        const r = v.getLength();
        let scaled:Vector;
        if (r) scaled = v.scale(length / r) as Vector;
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
    static setAngleRadians(angleRadians:number, v:Vector) {
        const r = v.getLength();
        return new Vector(
            Math.round((r*Math.cos(angleRadians))*1000)/1000,
            Math.round((r*Math.sin(angleRadians))*1000)/1000
        )
    }
    static getAngleDegrees(v:Vector) {
        return Angle.atan2Degrees(v.y,v.x);
    }
    static getAngleRadians(v:Vector) {
        return Math.atan2(v.y,v.x);
    }
    
    static dotProduct(v:Vector,w:Vector) {
        if (v.z && w.z) return (v.x*w.x)+(v.y*w.y)+(v.z*w.z);
        return (v.x*w.x)+(v.y*w.y);
    }
    static getNormal(v:Vector) {
        if (v.dimensions === 3) return new Vector(-v.y,v.x,v.z); // correct?
        return new Vector(-v.y,v.x);
    }
    static arePerpendicular(v:Vector,w:Vector) {
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
    static crossProduct(v3D: Vector, w3D: Vector): any {
        if (v3D.dimensions === 3 && w3D.dimensions === 3) {
            return new Vector(
                v3D.y*w3D.z! - v3D.z!*w3D.y,
                v3D.z!*w3D.x - v3D.x*w3D.z!,
                v3D.x*w3D.y - v3D.y*w3D.x
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
    static expand2D(v:Vector|Point) {
        if (v instanceof Point) {
            return new Point(v.x,v.y,0);
        } else {
            return new Vector(v.x,v.y,0);
        }
    }
    static expand2DVector(v:Vector) {
        if (v.dimensions === 3) return v;
        return new Vector(v.x,v.y,0);
    }
    static expand2DPoint(p:Point) {
        if (p.dimensions === 3) return new Point(p.x,p.y,p.z!);
        return new Point(p.x,p.y,0);
    }
    static rotateX(angle:Angle, v:Vector|Point):Vector|Point {
        if (v.dimensions === 2) { v = VectorMath.expand2D(v); }
        const ca = angle.cos();
        const sa = angle.sin();
        
        const newY = v.y * ca - v.z! * sa;
        const newZ = v.y * sa + v.z! * ca;
        if (v instanceof Point) {
            return new Point(v.x,newY,newZ);
        } 
        return new Vector(v.x,newY,newZ);
        
    }
    static rotateXByCosineAndSine(
        cosine:number, sine:number, v:Vector|Point
    ):Vector|Point {
        if (v.dimensions === 2) { v = VectorMath.expand2D(v); }
        const newY = v.y * cosine - v.z! * sine;
        const newZ = v.y * sine + v.z! * cosine;
        if (v instanceof Point) {
            return new Point(v.x,newY,newZ);
        } 
        return new Vector(v.x,newY,newZ);
    }
    
    static rotateY(angle:Angle, v:Vector|Point):Vector|Point {
        if (v.dimensions === 2) { v = VectorMath.expand2D(v); }
        const ca = angle.cos();
        const sa = angle.sin();
        const newX = v.x * ca + v.z! * sa;
        const newZ = v.x * -sa + v.z! * ca;
        if (v instanceof Point) {
            return new Point(newX,v.y,newZ);
        }
        return new Vector(newX,v.y,newZ);
    }
    static rotateYByCosineAndSine(
        cosine:number, sine:number, v:Vector|Point
    ):Vector|Point {
        if (v.dimensions === 2) { v = VectorMath.expand2D(v); }
        const newX = v.x * cosine + v.z! * sine;
        const newZ = v.x * -sine + v.z! * cosine;
        if (v instanceof Point) {
            return new Point(newX,v.y,newZ);
        }
        return new Vector(newX,v.y,newZ);
    }
    
    static rotateZ(angle:Angle, v:Vector|Point):Vector|Point {
        if (v.dimensions === 2) { v = VectorMath.expand2D(v); }
        const ca = angle.cos();
        const sa = angle.sin();
        const newX = v.x * ca - v.y * sa;
        const newY = v.x * sa + v.y * ca;
        if (v instanceof Point) {
            return new Point(newX,newY,v.z);
        }
        return new Vector(newX,newY,v.z);
    }
    static rotateZByCosineAndSine(
        cosine:number, sine:number, v:Vector|Point
    ):Point|Vector {
        if (v.dimensions === 2) { v = VectorMath.expand2D(v); }
        const newX = v.x * cosine - v.y! * sine;
        const newY = v.x * sine + v.y! * cosine;
        if (v instanceof Point) {
            return new Point(newX,newY,v.z);
        } 
        return new Vector(newX,newY,v.z);
    }
    
    static rotateXY(angleX:Angle, angleY:Angle, v:Vector|Point):Vector|Point {
        if (v.dimensions === 2) { v = VectorMath.expand2D(v); }
        const ca = angleX.cos();
        const sa = angleX.sin();
        const cb = angleY.cos();
        const sb = angleY.sin();
    
        // x-axis rotation
        const y = v.y * ca - v.z! * sa;
        const rz1 = v.y * sa + v.z! * ca;
        const z = v.x * -sb + rz1 * cb;
        const x = v.x * cb + rz1 * sb;
        if (v instanceof Point) {
            return new Point(x,y,z);
        } 
        return new Vector(x,y,z);
    }
    static rotateXYZ(angleX:Angle, angleY:Angle, angleZ:Angle, v:Vector|Point):Vector|Point {
        if (v.dimensions === 2) { v = VectorMath.expand2D(v); }
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

        if (v instanceof Point) {
            return new Point(newX,newY,newZ);
        } 
        return new Vector(newX,newY,newZ);
    }
}
export default VectorMath;
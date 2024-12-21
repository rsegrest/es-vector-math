export class Angle {
    public readonly degrees:number;
    constructor(
        public readonly radians:number
    ) {
        this.degrees = radians * (180/Math.PI)
    }
    static radiansToDegrees(radians:number) {
        return radians * (180/Math.PI);
    }
    static degreesToRadians(degrees:number) {
        return degrees * (Math.PI/180);
    }
    static fromDegrees(degrees:number) {
        return new Angle(degrees * (Math.PI / 180));
    }
    static fromRadians(rad:number) {
        return new Angle(rad);
    }
    static sinFromDegrees(deg:number) {
        return Math.sin(Angle.fromDegrees(deg).radians)
    }
    static cosFromDegrees(deg:number) {
        return Math.cos(Angle.fromDegrees(deg).radians)
    }
    static atan2Degrees(y:number,x:number) {
        // return Math.atan2(Angle.fromDegrees())
        return Math.atan2(y,x) * (180/Math.PI);
    }
    sin() {
        return Math.sin(this.radians);
    }
    cos() {
        return Math.cos(this.radians);
    }
}

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
        return Vector.add(this,v);
    }
    minus(v:Vector) {
        return Vector.minus(this,v);
    }
    equals(v:Vector) {
        return Vector.equals(this,v)
    }
    reverse() {
        return Vector.reverse(this);
    }
    scale(scalar:number) {
        return Vector.scale(scalar, this);
    }
    getLength():number {
        return Vector.getLength(this);
    }
    setLength(length:number):Vector {
        return Vector.setLength(length, this);
    }
    setAngleDegrees(angle:number) {
        return Vector.setAngleDegrees(angle,this);
    }
    dotProduct(v:Vector) {
        return Vector.dotProduct(this,v);
    }
    getNormal() {
        return Vector.getNormal(this);
    }

    isPerpendicular(v:Vector) {
        return Vector.dotProduct(this,v) === 0;
    }
    calculateAngleBetween(v:Vector) {
        return Vector.calculateAngleBetween(this,v);
    }
    crossProduct(v: Vector): any {
        return Vector.crossProduct(this,v);
    }
    getPerspective(viewDistance:number) {
        return Vector.getPerspective(viewDistance, this);
    }
    perspectiveProjection(p:number|null = null) {
        if (p === null) p = Vector.getPerspective(300,this);
        const x = this.x * p;
        const y = this.y * p;
        const z = 0;
        return new Vector(x,y,z);
    }
    rotateX(angle:number) {
        return Vector.rotateX(angle,this);
    }
    rotateY(angle:number) {
        return Vector.rotateY(angle,this);
    }
    rotateZ(angle:number) {
        return Vector.rotateZ(angle,this);
    }
    rotateXY(angleX:Angle, angleY:Angle) {
        return Vector.rotateXY(angleX,angleY,this);
    }
    rotateXYZ(angleX:Angle, angleY:Angle, angleZ:Angle) {
        return Vector.rotateXYZ(angleX,angleY,angleZ, this);
    }
    vectorRotateXByCosineAndSine(cosine:number, sine:number) {
        return Vector.rotateXByCosineAndSine(cosine,sine,this);
    }
    vectorRotateYByCosineAndSine(cosine:number, sine:number) {
        return Vector.rotateYByCosineAndSine(cosine,sine,this);
    }
    vectorRotateZByCosineAndSine(cosine:number, sine:number) {
        return Vector.rotateZByCosineAndSine(cosine,sine,this);
    }
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
    static setAngleDegrees(angle:number, v:Vector) {
        const r = v.getLength();
        return new Vector(
            Math.round(r*Angle.cosFromDegrees(angle)*1000)/1000,
            Math.round(r*Angle.sinFromDegrees(angle)*1000)/1000
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
        return Vector.dotProduct(v,w) === 0;
    }
    static calculateAngleBetween(v:Vector,w:Vector) {
        if (v.dimensions === 3 && w.dimensions === 3) {
            const dot = Vector.dotProduct(v,w);
            const cosTheta = dot / (v.getLength() * w.getLength());
            return Angle.fromRadians(Math.acos(cosTheta));
        }
        return Angle.fromRadians(Math.acos(Vector.dotProduct(v,w)/(v.getLength()*w.getLength())));
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
        if (p === null) p = Vector.getPerspective(300,v);
        const x = v.x * p;
        const y = v.y * p;
        const z = 0;
        return new Vector(x,y,z);
    }
    static expand2DVector(v:Vector) {
        if (v.dimensions === 3) return v;
        return new Vector(v.x,v.y,0);
    }

    static rotateX(angle:number, v:Vector) {
        v = Vector.expand2DVector(v);
        const ca = Math.cos(Angle.fromDegrees(angle).radians);
        const sa = Math.sin(Angle.fromDegrees(angle).radians);
        const newY = v.y * ca - v.z! * sa;
        const newZ = v.y * sa + v.z! * ca;
        return new Vector(v.x,newY,newZ);
    }
    static rotateXByCosineAndSine(
        cosine:number, sine:number, v:Vector
    ) {
        v = Vector.expand2DVector(v);
        const newY = v.y * cosine - v.z! * sine;
        const newZ = v.y * sine + v.z! * cosine;
        return new Vector(v.x,newY,newZ);
    }

    static rotateY(angle:number, v:Vector) {
        v = Vector.expand2DVector(v);
        const ca = Math.cos(Angle.fromDegrees(angle).radians);
        const sa = Math.sin(Angle.fromDegrees(angle).radians);
        const newX = v.x * ca + v.z! * sa;
        const newZ = v.x * -sa + v.z! * ca;
        return new Vector(newX,v.y,newZ);
    }
    static rotateYByCosineAndSine(
        cosine:number, sine:number, v:Vector
    ) {
        v = Vector.expand2DVector(v);
        const newX = v.x * cosine + v.z! * sine;
        const newZ = v.x * -sine + v.z! * cosine;
        return new Vector(newX,v.y,newZ);
    }

    static rotateZ(angle:number, v:Vector) {
        v = Vector.expand2DVector(v);
        const ca = Math.cos(Angle.fromDegrees(angle).radians);
        const sa = Math.sin(Angle.fromDegrees(angle).radians);
        const newX = v.x * ca - v.y * sa;
        const newY = v.x * sa + v.y * ca;
        return new Vector(newX,newY,v.z);
    }
    static rotateZByCosineAndSine(
        cosine:number, sine:number, v:Vector
    ) {
        v = Vector.expand2DVector(v);
        const newX = v.x * cosine - v.y! * sine;
        const newY = v.x * sine + v.y! * cosine;
        return new Vector(newX,newY,v.z);
    }

    static rotateXY(angleX:Angle, angleY:Angle, v:Vector) {
        v = Vector.expand2DVector(v);
        const ca = Math.cos(angleX.radians);
        const sa = Math.sin(angleX.radians);
        const cb = Math.cos(angleY.radians);
        const sb = Math.sin(angleY.radians);

        // x-axis rotation
        const y = v.y * ca - v.z! * sa;
        const rz1 = v.y * sa + v.z! * ca;
        const z = v.x * -sb + rz1 * cb;
        const x = v.x * cb + rz1 * sb;
        return new Vector(x,y,z);
    }
    static rotateXYZ(angleX:Angle, angleY:Angle, angleZ:Angle, v:Vector) {
        const ca = Math.cos(angleX.radians);
        const sa = Math.sin(angleX.radians);
        const cb = Math.cos(angleY.radians);
        const sb = Math.sin(angleY.radians);
        const cc = Math.cos(angleZ.radians);
        const sc = Math.sin(angleZ.radians);

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
export default Vector;

describe("Vector", () => {
    describe('set A', () => {
        it('should create a 3D vector', () => {
            const v = new Vector(0,0,0);
            expect(v.dimensions).toBe(3);
            expect(v.toString()).toBe('Vector3D[0, 0, 0]')

            const w = new Vector(0,0);
            expect(w.dimensions).toBe(2);
            expect(w.toString()).toBe('Vector2D[0, 0]')

            const y = new Vector(1,2,3);
            expect(y.dimensions).toBe(3);
            expect(y.toString()).toBe('Vector3D[1, 2, 3]')

            const z = new Vector(1,2);
            expect(z.dimensions).toBe(2);
            expect(z.toString()).toBe('Vector2D[1, 2]')
        });
        it("should scale a vector", () => {
            let velocity = new Vector(3,4);
            const newSpeed = 10;
            velocity = Vector.setLength(newSpeed, velocity);
            expect(velocity.equals(new Vector(6,8))).toBe(true);
        });
    })
    describe('set B', () => {
        it("should get vector angle", () => {
            let velocity = new Vector(7,0);
            const newBearing = 180;
            velocity = velocity.setAngleDegrees(newBearing);
            expect(velocity.equals(new Vector(-7,0))).toBe(true);
        })
        it("should perform the dot-product", () => {
            let v = new Vector(2,3);
            let w = new Vector(4,5);
            expect(Vector.dotProduct(v,w)).toBe(23);
            expect(v.dotProduct(w)).toBe(23);
            expect(w.dotProduct(v)).toBe(23);
        })
        it("should get normal vector", () => {
            let v = new Vector(3,5);
            let force = Vector.getNormal(v);
            expect(force.equals(new Vector(-5,3)));
        })
        it("should check for perpendicularity (_0713 2)", () => {
            let v = new Vector(0,5);
            let w = new Vector(-5,0);
            expect(Vector.isPerpendicular(v,w)).toBe(true);
        })
        it("should find angle between", () => {
            // let v = new Vector(0,5);
            // let w = new Vector(5,0);
            // expect(Vector.calculateAngleBetween(v,w)).toBe(Angle.fromDegrees(90).radians);
            let v = new Vector(4,0);
            let w = new Vector(-1,0);
            expect(Vector.calculateAngleBetween(v,w).degrees).toBe(Angle.fromDegrees(180).degrees);
        })
    
        it('should add two 3D vectors', () => {
            let v = new Vector(1,2,3);
            let w = new Vector(4,5,6);
            expect(Vector.add(v,w)).toEqual(new Vector(5,7,9));
        })
    
        it('should subtract one 3D vector from another', () => {
            let v = new Vector(1,2,3);
            let w = new Vector(4,5,6);
            expect(Vector.minus(v,w)).toEqual(new Vector(-3,-3,-3));
        })
    
        it('should negate a 3D vector', () => {
            let v = new Vector(1,2,3);
            expect(Vector.reverse(v)).toEqual(new Vector(-1,-2,-3));
        })
        it('should scale a 3D vector', () => {
            let v = new Vector(1,2,3);
            expect(Vector.scale(2,v)).toEqual(new Vector(2,4,6));
        })
        it('should get the length of a 3D vector', () => {
            let v = new Vector(1,2,3);
            expect(Vector.getLength(v)).toBe(Math.sqrt(14));
        })
        it('should set the length of a 3D vector', () => {
            const v = new Vector(3,4,0);
            const newV = v.setLength(10);
            expect(newV.getLength()).toBe(10);
            expect(newV).toStrictEqual(new Vector(6,8,0));
        });
    
        it('should get the dot product of two 3D vectors', () => {
            const v = new Vector(2,0,1);
            const w = new Vector(3,5,4);
            expect(Vector.dotProduct(v,w)).toBe(10);
        })
        it('should get the cross product of two 3D vectors', () => {
            const v = new Vector(2,0,1);
            const w = new Vector(3,5,4);
            expect(Vector.crossProduct(v,w)).toStrictEqual(new Vector(-5,-5,10));
        })
        it('should get the cross product of two 3D vectors', () => {
            const v = new Vector(2,0,0);
            const w = new Vector(0,2,0);
            expect(Vector.crossProduct(v,w)).toStrictEqual(new Vector(0,0,4));
        })
        it('should get angle between two 3D Vectors', () => {
            const v = new Vector(4,0,0);
            expect(v.toString()).toBe('Vector3D[4, 0, 0]');
            const w = new Vector(0,0,-3);
            expect(Vector.calculateAngleBetween(v,w).degrees).toBe(Angle.fromDegrees(90).degrees);
        })
        it('should get perspective of a 3D vector', () => {
            const pointA = new Vector(50,20,40);
            const perspective = pointA.getPerspective(300);
            expect(perspective).toBeCloseTo(0.8824);
        });

        it('should project a 3D vector to 2D', () => {
            const pointA = new Vector(50,20,40);
            const projection = pointA.perspectiveProjection();
            expect(projection.x).toBeCloseTo(44.1176)
            expect(projection.y).toBeCloseTo(17.6471)
            expect(projection.z).toBeCloseTo(0);
        });

        it('should rotate a 3D vector', () => {
            const p = new Vector(1,4,7);
            const rotatedVector = p.rotateX(180);
            expect(rotatedVector.x).toBeCloseTo(1);
            expect(rotatedVector.y).toBeCloseTo(-4);
            expect(rotatedVector.z).toBeCloseTo(-7);
        });

        it('should rotate by cosine & sine', () => {
            const p = new Vector(1,4,7);
            const cosine = Math.cos(Angle.fromDegrees(180).radians);
            const sine = Math.sin(Angle.fromDegrees(180).radians);
            
            const rotatedVector = p.vectorRotateXByCosineAndSine(cosine, sine);
            expect(rotatedVector.x).toBeCloseTo(1);
            expect(rotatedVector.y).toBeCloseTo(-4);
            expect(rotatedVector.z).toBeCloseTo(-7);
        })
        
        it('should rotate a 3D vector on XYZ axes', () => {
            const p = new Vector(8,0,0);
            const rotatedVector = p.rotateXYZ(Angle.fromDegrees(45),Angle.fromDegrees(45),Angle.fromDegrees(45));
            expect(rotatedVector.x).toBeCloseTo(4);
            expect(rotatedVector.y).toBeCloseTo(4);
            expect(rotatedVector.z).toBeCloseTo(-5.657);
        })
    });
});

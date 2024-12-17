export class Angle {

    constructor(
        public readonly radians:number
    ) {}
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
    constructor(x:number,y:number,z?:number|null) {
      if (y !== null && typeof y !== undefined) { this.x = x; } else { throw('Vector requires x,y components') }
      if (y !== null && typeof y !== undefined) { this.y = y; } else { throw('Vector requires y component'); }
      if (z) { this.z = z; }
    }
    toString() {
      return `Vector[${this.x}, ${this.y}]`;
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
    static equals(v:Vector, w:Vector) {
        if (v.z) v.x === w.x && v.y === w.y && v.z === w.z;
        return v.x === w.x && v.y === w.y;
    }
    static add(v:Vector, w:Vector) {
        if (v.z && w.z) return new Vector((v.x+w.x),(v.y+w.y),(v.z+w.z));
        return new Vector((v.x+w.x),(v.y+w.y));
    }
    static minus(v:Vector, w:Vector) {
        if (v.z && w.z) return new Vector((v.x-w.x),(v.y-w.y),(v.z-w.z));
        return new Vector((v.x-w.x),(v.y-w.y));
    }
    static reverse(v:Vector) {
        if (v.z) return new Vector(-1*v.x, -1*v.y, -1*v.z)
        return new Vector(-1*v.x, -1*v.y);
    }
    static scale(scalar:number, v:Vector) {
        if (v.z) return new Vector(scalar*v.x, scalar*v.y, scalar*v.z);
        return new Vector(scalar*v.x, scalar*v.y);
    }
    static getLength(v:Vector):number {
        if (v.z) return Math.sqrt(Math.pow(v.x,2)+Math.pow(v.y,2)+Math.pow(v.x,2))
        return Math.sqrt(Math.pow(v.x,2)+Math.pow(v.y,2))
    }
    static setLength(length:number, v:Vector) {
        const r = v.getLength();
        let scaled:Vector;
        if (r) scaled = v.scale(length / r);
        else scaled = new Vector(length, v.y, v.z);
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
        let dotProduct = ((v.x*w.x) + (v.y*w.y))
        if (v.z && w.z) { dotProduct + (v.z*w.z) }
        return dotProduct;
    }
    static getNormal(v:Vector) {
        // TODO: 3D version
        return new Vector(-v.y,v.x);
    }
}
export default Vector;

describe("Vector", () => {
    it("should scale a vector", () => {
        let velocity = new Vector(3,4);
        const newSpeed = 10;
        velocity = Vector.setLength(newSpeed, velocity);
        expect(velocity.equals(new Vector(6,8))).toBe(true);
    });
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
    it.todo("should check for perpendicularity (_0713 2)")
    it.todo("should find angle between")
});

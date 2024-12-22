import Vector from '../vector/Vector.js';
import Angle from '../vector/Angle.js';
import VectorMath from '../vector/VectorMath';

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
            velocity = velocity.setLength(newSpeed);
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
            expect(VectorMath.dotProduct(v,w)).toBe(23);
            expect(v.dotProduct(w)).toBe(23);
            expect(w.dotProduct(v)).toBe(23);
        })
        it("should get normal vector", () => {
            let v = new Vector(3,5);
            let force = VectorMath.getNormal(v);
            expect(force.equals(new Vector(-5,3)));
        })
        it("should check for perpendicularity (_0713 2)", () => {
            let v = new Vector(0,5);
            let w = new Vector(-5,0);
            expect(VectorMath.isPerpendicular(v,w)).toBe(true);
        })
        it("should find angle between", () => {
            // let v = new Vector(0,5);
            // let w = new Vector(5,0);
            // expect(Vector.calculateAngleBetween(v,w)).toBe(Angle.fromDegrees(90).radians);
            let v = new Vector(4,0);
            let w = new Vector(-1,0);
            expect(VectorMath.calculateAngleBetween(v,w).degrees).toBe(Angle.fromDegrees(180).degrees);
        })
    
        it('should add two 3D vectors', () => {
            let v = new Vector(1,2,3);
            let w = new Vector(4,5,6);
            expect(VectorMath.add(v,w)).toEqual(new Vector(5,7,9));
        })
    
        it('should subtract one 3D vector from another', () => {
            let v = new Vector(1,2,3);
            let w = new Vector(4,5,6);
            expect(VectorMath.minus(v,w)).toEqual(new Vector(-3,-3,-3));
        })
    
        it('should negate a 3D vector', () => {
            let v = new Vector(1,2,3);
            expect(VectorMath.reverse(v)).toEqual(new Vector(-1,-2,-3));
        })
        it('should scale a 3D vector', () => {
            let v = new Vector(1,2,3);
            expect(VectorMath.scale(2,v)).toEqual(new Vector(2,4,6));
        })
        it('should get the length of a 3D vector', () => {
            let v = new Vector(1,2,3);
            expect(VectorMath.getLength(v)).toBe(Math.sqrt(14));
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
            expect(VectorMath.dotProduct(v,w)).toBe(10);
        })
        it('should get the cross product of two 3D vectors', () => {
            const v = new Vector(2,0,1);
            const w = new Vector(3,5,4);
            expect(VectorMath.crossProduct(v,w)).toStrictEqual(new Vector(-5,-5,10));
        })
        it('should get the cross product of two 3D vectors', () => {
            const v = new Vector(2,0,0);
            const w = new Vector(0,2,0);
            expect(VectorMath.crossProduct(v,w)).toStrictEqual(new Vector(0,0,4));
        })
        it('should get angle between two 3D Vectors', () => {
            const v = new Vector(4,0,0);
            expect(v.toString()).toBe('Vector3D[4, 0, 0]');
            const w = new Vector(0,0,-3);
            expect(VectorMath.calculateAngleBetween(v,w).degrees).toBe(Angle.fromDegrees(90).degrees);
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
            const rotatedVector = p.rotateX(Angle.fromDegrees(180));
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

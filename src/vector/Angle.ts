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
export default Angle;
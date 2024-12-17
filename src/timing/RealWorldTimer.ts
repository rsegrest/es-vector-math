export class RealWorldTimer {
    private static startTime: number = Date.now();

    constructor() {}

    public static getElapsedTime() {
        return Date.now() - RealWorldTimer.startTime;
    }
    public toString() {
        return `RealWorldTimer[${RealWorldTimer.getElapsedTime()}]`;
    }
}
export default RealWorldTimer;
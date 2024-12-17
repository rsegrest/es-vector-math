import Tween, {
    TweenAlgorithmParams,
    TweenAtTimeParams,
    TweenChangeProps,
} from "../Tween.js";

export class EaseInQuadraticTween extends Tween {
    constructor(params: TweenChangeProps) {
        super(params, "EaseInQuadraticTween");
    }
    tweenAlgorithm(params: TweenAlgorithmParams): number {
        let { nextT, beginValue, valueChange, actionDuration } = params;
        const timeStep = nextT / actionDuration;
        const newValue = valueChange * Math.pow(timeStep, 2) + beginValue;
        return newValue;
    }
    update(params: TweenAtTimeParams | null = null): typeof this.obj {
        return super.update(params, this.tweenAlgorithm);
    }
}
export default EaseInQuadraticTween;

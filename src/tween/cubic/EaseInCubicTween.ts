import Tween, {
    TweenAlgorithmParams,
    TweenAtTimeParams,
    TweenChangeProps,
} from "../Tween.js";

export class EaseInCubicTween extends Tween {
    constructor(params: TweenChangeProps) {
        super(params, "EaseInCubicTween");
    }
    tweenAlgorithm(params: TweenAlgorithmParams): number {
        let { nextT, beginValue, valueChange, actionDuration } = params;
        const newValue =
            valueChange * Math.pow(nextT / actionDuration, 3) + beginValue;
        return newValue;
    }
    update(params: TweenAtTimeParams | null = null): typeof this.obj {
        return super.update(params, this.tweenAlgorithm);
    }
}
export default EaseInCubicTween;

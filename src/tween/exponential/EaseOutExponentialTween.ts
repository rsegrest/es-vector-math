import Tween, {
    TweenAlgorithmParams,
    TweenAtTimeParams,
    TweenChangeProps,
} from "../Tween.js";

export class EaseOutExponentialTween extends Tween {
    constructor(params: TweenChangeProps) {
        super(params, "EaseOutExponentialTween");
    }
    tweenAlgorithm(params: TweenAlgorithmParams): number {
        let { nextT, beginValue, valueChange, actionDuration } = params;
        const newValue =
            valueChange * (-Math.pow(2, (-10 * nextT) / actionDuration) + 1) +
            beginValue;
        return newValue;
    }

    update(params: TweenAtTimeParams | null = null): typeof this.obj {
        return super.update(params, this.tweenAlgorithm);
    }
}
export default EaseOutExponentialTween;

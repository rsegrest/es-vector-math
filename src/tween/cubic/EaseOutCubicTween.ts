import Tween, {
    TweenAlgorithmParams,
    TweenAtTimeParams,
    TweenChangeProps,
} from "../Tween.js";

export class EaseOutCubicTween extends Tween {
    constructor(params: TweenChangeProps) {
        super(params, "EaseOutCubicTween");
    }
    tweenAlgorithm(params: TweenAlgorithmParams): number {
        let { nextT, beginValue, valueChange, actionDuration } = params;
        const newValue =
            valueChange * (Math.pow(nextT / actionDuration - 1, 3) + 1) +
            beginValue;
        return newValue;
    }
    update(params: TweenAtTimeParams | null = null): typeof this.obj {
        return super.update(params, this.tweenAlgorithm);
    }
}
export default EaseOutCubicTween;

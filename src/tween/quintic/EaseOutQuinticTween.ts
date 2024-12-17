import Tween, {
    TweenAlgorithmParams,
    TweenAtTimeParams,
    TweenChangeProps,
} from "../Tween.js";

export class EaseOutQuinticTween extends Tween {
    constructor(params: TweenChangeProps) {
        super(params, "EaseOutQuinticTween");
    }

    tweenAlgorithm(params: TweenAlgorithmParams): number {
        let { nextT, beginValue, valueChange, actionDuration } = params;
        const newValue =
            valueChange * (Math.pow(nextT / actionDuration - 1, 5) + 1) +
            beginValue;
        return newValue;
    }
    update(
        params: TweenAtTimeParams | null | undefined = null,
    ): typeof this.obj {
        return super.update(params, this.tweenAlgorithm);
    }
}
export default EaseOutQuinticTween;

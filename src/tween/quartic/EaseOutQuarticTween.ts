import Tween, {
    TweenAlgorithmParams,
    TweenAtTimeParams,
    TweenChangeProps,
} from "../Tween.js";

export class EaseOutQuarticTween extends Tween {
    constructor(params: TweenChangeProps) {
        super(params, "EaseOutQuarticTween");
    }
    tweenAlgorithm(params: TweenAlgorithmParams): number {
        const { nextT, beginValue, valueChange, actionDuration } = params;
        const newValue =
            -valueChange * (Math.pow(nextT / actionDuration - 1, 4) - 1) +
            beginValue;
        return newValue;
    }
    update(
        params: TweenAtTimeParams | null | undefined = null,
    ): typeof this.obj {
        return super.update(params, this.tweenAlgorithm);
    }
}
export default EaseOutQuarticTween;

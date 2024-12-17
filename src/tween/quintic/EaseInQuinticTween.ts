import Tween, {
    TweenAlgorithmParams,
    TweenAtTimeParams,
    TweenChangeProps,
} from "../Tween.js";

export class EaseInQuinticTween extends Tween {
    constructor(params: TweenChangeProps) {
        super(params, "EaseInQuinticTween");
    }

    tweenAlgorithm(params: TweenAlgorithmParams): number {
        let { nextT, beginValue, valueChange, actionDuration } = params;
        const newValue =
            valueChange * Math.pow(nextT / actionDuration, 5) + beginValue;
        return newValue;
    }
    update(
        params: TweenAtTimeParams | null | undefined = null,
    ): typeof this.obj {
        return super.update(params, this.tweenAlgorithm);
    }
}
export default EaseInQuinticTween;

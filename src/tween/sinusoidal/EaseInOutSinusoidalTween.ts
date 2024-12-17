import Tween, {
    TweenAlgorithmParams,
    TweenAtTimeParams,
    TweenChangeProps,
} from "../Tween.js";

export class EaseInOutSinusoidalTween extends Tween {
    constructor(params: TweenChangeProps) {
        super(params, "EaseInOutSinusoidalTween");
    }
    tweenAlgorithm(params: TweenAlgorithmParams): number {
        let { nextT, beginValue, valueChange, actionDuration } = params;
        const newValue =
            (valueChange / 2) *
                (1 - Math.cos(Math.PI * (nextT / actionDuration))) +
            beginValue;
        return newValue;
    }
    update(
        params: TweenAtTimeParams | null | undefined = null,
    ): typeof this.obj {
        return super.update(params, this.tweenAlgorithm);
    }
}
export default EaseInOutSinusoidalTween;

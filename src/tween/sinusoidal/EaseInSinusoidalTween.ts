import Tween, {
    TweenAlgorithmParams,
    TweenAtTimeParams,
    TweenChangeProps,
} from "../Tween.js";

export class EaseInSinusoidalTween extends Tween {
    constructor(params: TweenChangeProps) {
        super(params, "EaseInSinusoidalTween");
    }
    tweenAlgorithm(params: TweenAlgorithmParams): number {
        let { nextT, beginValue, valueChange, actionDuration } = params;
        const newValue =
            valueChange *
                (1 - Math.cos((nextT / actionDuration) * (Math.PI / 2))) +
            beginValue;
        return newValue;
    }
    update(
        params: TweenAtTimeParams | null | undefined = null,
    ): typeof this.obj {
        return super.update(params, this.tweenAlgorithm);
    }
}
export default EaseInSinusoidalTween;

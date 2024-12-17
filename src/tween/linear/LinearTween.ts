import Tween, {
    TweenAlgorithmParams,
    TweenAtTimeParams,
    TweenChangeProps,
} from "../Tween.js";

export class LinearTween extends Tween {
    constructor(params: TweenChangeProps) {
        super(params, "LinearTween");
    }
    tweenAlgorithm(params: TweenAlgorithmParams): number {
        let {
            nextT,
            beginValue,
            valueChange,
            actionDuration: duration,
        } = params;
        const newValue = beginValue + (valueChange * nextT) / duration;
        return newValue;
    }
    update(
        params: TweenAtTimeParams | null | undefined = null,
    ): typeof this.obj {
        return super.update(params, this.tweenAlgorithm);
    }
}
export default LinearTween;

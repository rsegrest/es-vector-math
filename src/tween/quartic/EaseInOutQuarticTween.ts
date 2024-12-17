import Tween, {
    TweenAlgorithmParams,
    TweenAtTimeParams,
    TweenChangeProps,
} from "../Tween.js";

export class EaseInOutQuarticTween extends Tween {
    constructor(params: TweenChangeProps) {
        super(params, "EaseInOutQuarticTween");
    }
    tweenAlgorithm(params: TweenAlgorithmParams): number {
        let { nextT, beginValue, valueChange, actionDuration } = params;
        let timeStep = nextT / (actionDuration / 2);
        let newValue;
        if (timeStep < 1)
            newValue = (valueChange / 2) * Math.pow(timeStep, 4) + beginValue;
        else {
            newValue =
                -(valueChange / 2) * (Math.pow(timeStep - 2, 4) - 2) +
                beginValue;
        }

        return newValue;
    }
    update(
        params: TweenAtTimeParams | null | undefined = null,
    ): typeof this.obj {
        return super.update(params, this.tweenAlgorithm);
    }
}
export default EaseInOutQuarticTween;

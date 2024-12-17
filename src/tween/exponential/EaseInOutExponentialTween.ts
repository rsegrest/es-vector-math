import Tween, {
    TweenAlgorithmParams,
    TweenAtTimeParams,
    TweenChangeProps,
} from "../Tween.js";

export class EaseInOutExponentialTween extends Tween {
    constructor(params: TweenChangeProps) {
        super(params, "EaseInOutExponentialTween");
    }
    tweenAlgorithm(params: TweenAlgorithmParams): number {
        let { nextT, beginValue, valueChange, actionDuration } = params;
        let timeStep = nextT / (actionDuration / 2);
        let newValue;
        if (timeStep < 1) {
            newValue =
                (valueChange / 2) * Math.pow(2, 10 * (timeStep - 1)) +
                beginValue;
        } else {
            const calculatedValue = -Math.pow(2, -10 * --timeStep) + 2;
            newValue = (valueChange / 2) * calculatedValue + beginValue;
        }
        return newValue;
    }

    update(params: TweenAtTimeParams | null = null): typeof this.obj {
        return super.update(params, this.tweenAlgorithm);
    }
}
export default EaseInOutExponentialTween;

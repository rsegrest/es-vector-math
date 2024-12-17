import Tween, {
    TweenAlgorithmParams,
    TweenAtTimeParams,
    TweenChangeProps,
} from "../Tween.js";

export class EaseInOutCubicTween extends Tween {
    constructor(params: TweenChangeProps) {
        super(params, "EaseInOutCubicTween");
    }
    tweenAlgorithm(params: TweenAlgorithmParams): number {
        let { nextT, beginValue, valueChange, actionDuration } = params;
        let newValue;
        let timeStep = nextT / (actionDuration / 2);
        if (timeStep < 1) {
            newValue = (valueChange / 2) * Math.pow(timeStep, 3) + beginValue;
        } else {
            newValue =
                (valueChange / 2) * (Math.pow(timeStep - 2, 3) + 2) +
                beginValue;
        }
        return newValue;
    }
    update(params: TweenAtTimeParams | null = null): typeof this.obj {
        return super.update(params, this.tweenAlgorithm);
    }
}
export default EaseInOutCubicTween;

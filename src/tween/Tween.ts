import Motion, { MotionProps } from "../motion/Motion.js";

export interface TweenChangeProps extends MotionProps {
    valueChange?: number | undefined;
}
export interface TweenFinishProps extends MotionProps {
    finishValue?: number | undefined;
}
export interface TweenAlgorithmParams {
    nextT?: number | null;
    lastT?: number | null | undefined;
    beginValue?: number | null | undefined;
    valueChange?: number | null | undefined;
    actionDuration?: number | null | undefined;
}
export interface TweenAtTimeParams {
    t: number | null | undefined;
    beginValue?: number | null | undefined;
    valueChange?: number | null | undefined;
}
export interface TweenForDurationParams {
    beginValue?: number | null | undefined;
    valueChange?: number | null | undefined;
    actionDuration: number | null | undefined;
}

export class Tween extends Motion {
    protected isComplete: boolean = false;
    protected funcName: string = "";
    protected _finishValue: number = 0;

    constructor(params: TweenChangeProps | TweenFinishProps, funcName: string) {
        super({
            obj: params.obj,
            propertyToChange: params.propertyToChange,
            beginValue: params.beginValue,
            actionDuration: params.actionDuration,
        });
        if (params.hasOwnProperty("valueChange")) {
            this._valueChange = (params as TweenChangeProps).valueChange;
            this._finishValue = this._beginValue + this._valueChange;
        } else if (params.hasOwnProperty("finishValue")) {
            const fv = (params as TweenFinishProps).finishValue;
            this._finishValue = fv;
            this._valueChange = fv - this._beginValue;
        }
        this.isComplete = false;
        this.funcName = funcName;
    }
    checkIfFinished(t: number, actionDuration: number): boolean {
        if (t > actionDuration) {
            this.isComplete = true;
            this.obj[this.propertyToChange] = this._finishValue;
            return true;
        }
        return false;
    }
    public update(
        params: TweenAtTimeParams | undefined | null = null,
        tweenAlgo: Function | null = null,
    ) {
        let newParams = this.expandParams(params);
        if (tweenAlgo) {
            const newValue = tweenAlgo(newParams);
            if (
                !this.checkIfFinished(newParams.nextT, newParams.actionDuration)
            ) {
                this.obj[this.propertyToChange] = newValue;
            }
        }
        super.update(params);
        return this.obj;
    }
    // override
    tweenAlgorithm(params: TweenAlgorithmParams): number {
        let newValue = 0;
        return newValue;
    }
    // TODO: Test/Verify or remove
    continueTo(finish: number, interimDuration: number) {
        this.setBegin(this.getPosition());
        this.setFinish(finish);
        if (!interimDuration) {
            this.setActionDuration(interimDuration);
        }
        this.start();
    }
    // TODO: Test/Verify or remove
    yoyo() {
        this.continueTo(this.getBegin(), this.getActionDuration());
    }
    // TODO: Test/Verify or remove
    getPosition(t?: number) {
        if (!t) {
            t = this._currentTime;
        }
        let returnValue = this._pos;
        return returnValue;
    }

    setChange(change: number) {
        this._valueChange = change;
    }
    getChange() {
        return this._valueChange;
    }
    setFinish(finish: number) {
        this._finishValue = finish;
        this._valueChange = this._finishValue - this._beginValue;
    }
    calcFinish() {
        return this._valueChange + this._beginValue;
    }

    toString() {
        return `Tween[${super.toString()}, funcName: ${this.funcName}, _valueChange: ${this._valueChange}, _finishValue: ${this._finishValue}, isComplete: ${this.isComplete}]`;
    }
}
export default Tween;

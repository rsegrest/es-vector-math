
import RealWorldTimer from "../timing/RealWorldTimer.js";
import {
    TweenForDurationParams,
    type TweenAtTimeParams,
} from "../tween/Tween.js";

export interface MotionProps {
    obj: any;
    propertyToChange: string;
    beginValue?: number;
    actionDuration?: number;
    valueChange?: number | null;
}
export class Motion {
    protected obj: any;
    protected propertyToChange: string;
    protected _beginValue: number;
    protected _actionDuration: number;
    protected _listeners: any[];
    protected _currentTime: number;
    protected _prevPos: any;
    protected _pos: any;
    protected _isLooping: boolean = false;
    protected _startTime: number;
    protected _valueChange: number | null = null;

    constructor({
        obj,
        propertyToChange,
        beginValue,
        actionDuration,
        valueChange,
    }: MotionProps) {
        this.obj = obj;
        this.propertyToChange = propertyToChange;
        this._beginValue = beginValue;
        this._actionDuration = actionDuration;
        this._listeners = [];
        this.addListener(this);
        this.start();
        this._currentTime = 0;
        this._prevPos = null;
        this._pos = beginValue;
        this._startTime = RealWorldTimer.getElapsedTime();
        this._valueChange = valueChange;
    }
    public getElapsedTime() {
        return RealWorldTimer.getElapsedTime();
    }
    public start() {
        this.rewind();
        this.addListener(this);
    }
    public stop() {
        this.removeListener(this);
    }
    public resume() {
        this.addListener(this);
    }
    public rewind(t: number = this._currentTime) {
        this._currentTime = !t ? 1 : t;
        this.update();
    }
    protected addListener(listener: any) {
        this._listeners.push(listener);
    }

    public nextFrame() {
        this.setTime(this._currentTime + 1);
    }
    public prevFrame() {
        this.setTime(this._currentTime - 1);
    }
    setTime(t: number) {
        if (t > this._actionDuration) {
            if (this._isLooping) {
                this.rewind(t - this._actionDuration);
            } else {
                this.stop();
            }
        } else if (t < 0) {
            this.rewind();
        } else {
            this._currentTime = t;
        }
        this.update();
    }
    public getTime() {
        return this._currentTime;
    }
    public setBegin(b: number) {
        this._beginValue = b;
    }
    public getBegin() {
        return this._beginValue;
    }
    public setActionDuration(d: number) {
        this._actionDuration = d === null || d <= 0 ? 10000000 : d;
    }
    public getActionDuration() {
        return this._actionDuration;
    }
    public setIsLooping(b: boolean) {
        this._isLooping = b;
    }
    public getIsLooping() {
        return this._isLooping;
    }
    public setObj(obj: any) {
        this.obj = obj;
    }
    public getObj(): typeof this.obj {
        return this.obj;
    }
    public setProp(prop: any) {
        this.propertyToChange = prop;
    }
    public getProp() {
        return this.propertyToChange;
    }
    public expandParams(
        params:
            | null
            | undefined
            | TweenAtTimeParams
            | TweenForDurationParams = null,
    ): {
        lastT: number;
        nextT: number;
        beginValue: number;
        valueChange: number;
        actionDuration: number;
    } {
        let lastT, nextT, beginValue, valueChange, actionDuration;
        if (params) {
            if (params.beginValue) beginValue = params.beginValue;
            if (params.valueChange) valueChange = params.valueChange;
        }
        lastT = this._currentTime;
        if (!params) {
            lastT = this._currentTime;
            nextT = this._currentTime + 1;
            beginValue = this._beginValue;
            valueChange = this._valueChange;
            actionDuration = this._actionDuration;
        } else {
            if (params.hasOwnProperty("t")) {
                nextT = (params as TweenAtTimeParams).t;
            }
            if (!beginValue) {
                beginValue = this._beginValue;
            }
            if (!valueChange) {
                valueChange = this._valueChange;
            }
            if (!actionDuration) {
                actionDuration = this._actionDuration;
            }
        }
        return { lastT, nextT, beginValue, valueChange, actionDuration };
    }
    // Override this method
    public update(
        params: TweenAtTimeParams | undefined | null = null,
    ): typeof this.obj {
        if (params) {
            this._currentTime = params.t;
        } else {
            this._currentTime += 1;
        }
        return this.obj;
    }
    protected removeListener(listener: any) {
        this._listeners = this._listeners.filter((l) => l !== listener);
    }
    public toString() {
        return `Motion[obj=${JSON.stringify(this.obj)}, prop=${JSON.stringify(this.propertyToChange)},\
 _beginValue=${this._beginValue}, _duration=${this._actionDuration}]`; // , useSeconds=${this.useSeconds}]`;
    }
}
export default Motion;

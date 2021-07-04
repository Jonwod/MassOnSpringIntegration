import {StepFunction} from "./stepFunctionInterface.js";

export class MassOnSpring {
    m: number = 1;
    k: number = 1;
    x: number = 0;
    v: number = 0;
    private t: number = 0;
    stepFunc: StepFunction;
    private amplitude: number;

    constructor(stepFunction, mass, k, initialDisplacement) {
        this.m = mass;
        this.k = k;
        this.x = initialDisplacement;
        this.amplitude = this.x;
        this.stepFunc = stepFunction;
    }

    getAmplitude(): number {
        return this.amplitude;
    }

    preIntegratedStep(dt) {
        this.t += dt;
        // Phase offset of 90 degrees because system is initialized with max displacement
        const phase = Math.PI / 2;
        const freq = Math.sqrt(this.k / this.m);
        this.x = this.amplitude * Math.sin(freq * this.t + phase);
        this.v = freq * this.amplitude * Math.cos(freq * this.t + phase);
    }

    step(dt) {
        const result = this.stepFunc(dt, this.k, this.m, this.v, this.x);
        this.x = result.x2;
        this.v = result.v2;
    }
}
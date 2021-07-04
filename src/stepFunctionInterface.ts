export interface StepFunction {
    (dt: number, k: number, m: number, v: number, x: number): {v2: number, x2: number};
};
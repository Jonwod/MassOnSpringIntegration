import { MassOnSpring } from "./massOnSpring.js";
import {naiveStep, variableVelocityStep, variableAccelerationStep} from "./stepFunctions.js"
import { MassOnSpringView } from "./massOnSpringView.js";

const M = 1;
const K = 2;
const X = 100;

let body = <HTMLBodyElement>document.getElementsByTagName("body")[0];

let mosIdeal = new MassOnSpring(null, M, K, X);
let mosIdealView = new MassOnSpringView(mosIdeal, "Ideal model");
body.appendChild(mosIdealView.createHtml());

let mosNaive = new MassOnSpring(naiveStep, M, K, X);
let mosNaiveView = new MassOnSpringView(mosNaive, "Naive integration");
body.appendChild(mosNaiveView.createHtml());

let mosVarVel = new MassOnSpring(variableVelocityStep, M, K, X);
let mosVarVelView = new MassOnSpringView(mosVarVel, "Accounting for variable velocity");
body.appendChild(mosVarVelView.createHtml());

let mosIterative = new MassOnSpring(variableAccelerationStep, M, K, X);
let mosIterativeView = new MassOnSpringView(mosIterative, "Accounting for variable acceleration");
body.appendChild(mosIterativeView.createHtml());

let last_t = 0;

function loop(t) {
    let dt = 1/60;//t - last_t;
    mosIdealView.draw();
    mosIdeal.preIntegratedStep(dt);
    mosNaiveView.draw();
    mosNaive.step(dt);
    mosVarVelView.draw();
    mosVarVel.step(dt);
    mosIterativeView.draw();
    mosIterative.step(dt);

    last_t = t;
    window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);

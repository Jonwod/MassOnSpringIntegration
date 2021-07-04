export function naiveStep(dt, k, m, v, x): {v2: number, x2: number} {
    const force = -x * k;
    const v2 = v + force * dt / m;
    const x2 = x + v * dt;
    return {v2, x2};
}


// This is a bit better than naiveStep because it at least takes into account that
// the velocity changes during the step. It falls short because it fails
// to account for the fact that the acceleration also changes.
export function variableVelocityStep(dt, k, m, v, x): {v2: number, x2: number} {
    const force = -x * k;
    const v2 = v + force * dt / m;
    const x2 = x + (v + v2) * dt / 2;
    return {v2, x2};
}


export function variableAccelerationStep(dt, k, m, v, x): {v2: number, x2: number} {
    // We have to account for the fact that the force is changing throughout the step.
    // In fact, it is a function of the displacement, just as the displacement is a function
    // of the force. This is quite a tricky problem.
    const F1 = -x * k;
    let Favg = F1;
    let x2, v2;
    for(let i = 0; i < 5; ++i) {
        v2 = v + Favg * dt / m;
        x2 = x + (v + v2) * dt / 2;
        let F2 = -x2 * k;
        Favg = (F1 + F2) / 2;
        v2 = v + Favg * dt / m;
        x2 = x + (v + v2) * dt / 2;
    }
    return {v2, x2};
}
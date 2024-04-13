export function expImpulse(x: number, k: number): number {
    let h = k * x;
    return h * Math.exp(1.0 - h);
}

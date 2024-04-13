export function lerp(
    a: { x: number, y: number },
    b: { x: number, y: number },
    alpha: number
): { x: number, y: number } {
    return {
        x: a.x + (b.x - a.x) * alpha,
        y: a.y + (b.y - a.y) * alpha
    };
}

export function lerpIn(
    dst: { x: number, y: number },
    a: { x: number, y: number },
    b: { x: number, y: number },
    alpha: number
): void {
    dst.x = a.x + (b.x - a.x) * alpha;
    dst.y = a.y + (b.y - a.y) * alpha;
}
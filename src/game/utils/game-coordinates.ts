export const WORLD_SIZE = 1000.0;
export const WORLD_UNIT_BOX_SIZE = 125.0;

export function worldToCanvas(
    worldPosition: { x: number, y: number },
    canvasSize: { width: number, height: number }
): { x: number, y: number } {
    const Rw = Math.min(canvasSize.width, canvasSize.height);
    const Rh = Rw;
    const Cx = canvasSize.width / 2;
    const Cy = canvasSize.height / 2;
    const topLeft = {
        x: Cx - Rw / 2,
        y: Cy - Rh / 2
    };
    const wpNorm = {
        x: Math.min(1.0, Math.max(0.0, worldPosition.x / WORLD_SIZE)),
        y: Math.min(1.0, Math.max(0.0, worldPosition.y / WORLD_SIZE))
    };
    return {
        x: topLeft.x + wpNorm.x * Rw,
        y: topLeft.y + wpNorm.y * Rh
    };
}

export function worldSizeToCanvas(worldSize: number, canvasSize: { width: number, height: number }): number {
    const Rw = Math.min(canvasSize.width, canvasSize.height);
    return worldSize / WORLD_SIZE * Rw;
}

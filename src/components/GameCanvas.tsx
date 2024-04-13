import {
    useRef,
    useEffect,
    useState
} from 'react';
import { IGameLogic } from "../game/IGameLogic";
import { IGameAssets } from '../game/IGameAssets';

export function GameCanvas(
    props: {
        gameLogic: IGameLogic
        gameAssets: IGameAssets
    }
) {
    const [initializing, setInitializing] = useState(true);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);

    useEffect(
        () => {
            if (initializing) {
                if (canvasRef.current) {
                    contextRef.current = canvasRef.current.getContext('2d');
                    props.gameLogic.initCanvas(
                        canvasRef.current,
                        contextRef.current
                    );
                    setInitializing(false);
                }
            }
        },
        []
    );

    return <div className="game-canvas">
        <canvas
            ref={canvasRef}
        />
    </div>;

}
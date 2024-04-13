import {
    useRef,
    useEffect,
    useState
} from 'react';
import { IGameLogic } from '../game/IGameLogic';
import { GameLogicImpl } from '../game/GameLogicImpl';
import { GameCanvas } from './GameCanvas';
import { GameUI } from './GameUI';

export function GameMain() {
    const [initializing, setInitializing] = useState(true);
    const gameLogicRef = useRef<IGameLogic | null>(null);

    useEffect(
        () => {
            if (initializing) {
                gameLogicRef.current = new GameLogicImpl();
                setInitializing(false);
            }
        },
        []
    );

    if (initializing) {
        return <div className="game-main">
            <p className="game-initializing">Initializing...</p>
        </div>;
    } else {
        return <div className="game-main">
            <GameCanvas gameLogic={gameLogicRef.current} />
            <GameUI gameLogic={gameLogicRef.current} />
        </div>;
    }
}
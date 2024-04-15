import {
    useRef,
    useEffect,
    useState
} from 'react';
import { IGameLogic } from '../game/IGameLogic';
import { GameLogicImpl } from '../game/GameLogicImpl';
import { GameCanvas } from './GameCanvas';
import { GameUI } from './GameUI';
import { IGameAssets } from '../game/IGameAssets';
import { GameAssetsImpl } from '../game/GameAssetsImpl';
import { GameOver } from './GameOver';

export function GameMain() {
    const [initializing, setInitializing] = useState(true);
    const [loading, setLoading] = useState(true);
    const [loadingError, setLoadingError] = useState<string | null>(null);
    const [gameState, setGameState] = useState<string>('playing');
    const gameAssetsRef = useRef<IGameAssets | null>(null);
    const gameLogicRef = useRef<IGameLogic | null>(null);

    useEffect(
        () => {
            if (initializing) {
                gameAssetsRef.current = new GameAssetsImpl();
                gameAssetsRef.current.addLoadingProgressListener(
                    ({ remaining }) => {
                        if (remaining === 0) {
                            setLoading(false);
                        }
                    }
                );
                gameAssetsRef.current.addLoadingErrorListener(
                    message => {
                        setLoadingError(message);
                        setLoading(false);
                    }
                );

                gameLogicRef.current = new GameLogicImpl(
                    gameAssetsRef.current
                );
                gameAssetsRef.current.populateLoadingQueue();
                setInitializing(false);

                gameLogicRef.current.addEventListener(
                    "level.lost",
                    () => {
                        setGameState('game-over');
                    }
                );
            }
        },
        []
    );

    if (initializing) {
        return <div className="game-main">
            <p className="game-initializing">Initializing...</p>
        </div>;
    } else if (loading) {
        return <div className="game-main">
            <p className="game-loading">Loading...</p>
        </div>;
    } else if (loadingError) {
        return <div className="game-main">
            <p className="game-loading-error">{loadingError}</p>
        </div>;
    } else {
        return <div className="game-main">
            {
                gameState === 'playing' && (<>
                    <GameUI gameLogic={gameLogicRef.current} gameAssets={gameAssetsRef.current} />
                    <GameCanvas gameLogic={gameLogicRef.current} gameAssets={gameAssetsRef.current} />
                </>)
            }
            {
                gameState === 'game-over' && (<>
                    <GameOver />
                </>)
            }
        </div>;
    }
}
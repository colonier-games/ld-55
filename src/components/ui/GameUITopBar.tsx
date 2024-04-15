import {
    useState,
    useEffect
} from "react";
import { IGameLogic } from "../../game/IGameLogic";
import { WAVE_COOLDOWN } from "../../game/entity/IWave";

export function GameUITopBar(
    props: {
        gameLogic: IGameLogic
        onBuildingMenu: () => void
        onSummonMenu: () => void
    }
) {
    const [playerMoney, setPlayerMoney] = useState(0);
    const [waveActive, setWaveActive] = useState(false);
    const [waveLost, setWaveLost] = useState(false);
    const [waveTimer, setWaveTimer] = useState(0);
    const [waveCooldown, setWaveCooldown] = useState(WAVE_COOLDOWN);
    const [waveNumber, setWaveNumber] = useState(1);

    useEffect(
        () => {
            props.gameLogic.addEventListener(
                'player.money.changed',
                (money: number) => {
                    setPlayerMoney(money);
                }
            );
        },
        []
    );

    useEffect(
        () => {
            props.gameLogic.addEventListener(
                'wave.timer.updated',
                (timer: number) => {
                    setWaveTimer(timer);
                }
            );
            props.gameLogic.addEventListener(
                'wave.activated',
                (wN: number) => {
                    setWaveActive(true);
                    setWaveNumber(wN);
                }
            );
            props.gameLogic.addEventListener(
                'wave.won',
                (wN: number) => {
                    setWaveActive(false);
                    setWaveNumber(wN);
                }
            );
            props.gameLogic.addEventListener(
                'wave.lost',
                (wN: number) => {
                    setWaveActive(false);
                    setWaveLost(true);
                }
            );
            props.gameLogic.addEventListener(
                'level.won',
                () => {
                    setWaveActive(false);
                    setWaveLost(false);
                    setWaveNumber(1);
                    setWaveTimer(0);
                }
            );

        },
        []
    );

    return <div className="game-ui-top-bar">
        <div className="game-ui-player-money">
            <i>Money: </i><b>{playerMoney}</b>
        </div>
        <div className="game-ui-wave-status">
            <b>{
                waveActive ?
                    (<>Wave {waveNumber} | Active</>)
                    :
                    (
                        waveLost ?
                            (<>Game Over</>)
                            :
                            (<>Wave {waveNumber} | Starting in {Math.ceil(waveCooldown - waveTimer)}s</>)
                    )
            }</b>
        </div>
        <div className="game-ui-top-bar-buttons">
            <></>
        </div>
    </div>
}
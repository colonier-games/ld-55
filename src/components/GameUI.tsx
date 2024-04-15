import { useState } from "react";
import { IGameAssets } from "../game/IGameAssets";
import { IGameLogic } from "../game/IGameLogic";
import { GameUIBottomBar } from "./ui/GameUIBottomBar";
import { GameUITopBar } from "./ui/GameUITopBar";
import { GameUIBuildingMenu } from "./ui/GameUIBuildingMenu";
import { GameUIShrineButton } from "./ui/GameUIShrineButton";
import { GameUISummoningMenu } from "./ui/GameUISummoningMenu";

export function GameUI(
    props: {
        gameLogic: IGameLogic
        gameAssets: IGameAssets
    }
) {
    const [buildingMenuOpened, setBuildingMenuOpened] = useState(false);
    const [summonMenuOpened, setSummonMenuOpened] = useState(false);

    const onToggleBuildingMenu = () => {
        setBuildingMenuOpened(!buildingMenuOpened);
    };

    const onToggleSummonMenu = () => {
        setSummonMenuOpened(!summonMenuOpened);
    };

    return <div className="game-ui">
        <GameUITopBar gameLogic={props.gameLogic} onBuildingMenu={onToggleBuildingMenu} onSummonMenu={onToggleSummonMenu} />
        <GameUIShrineButton gameLogic={props.gameLogic} />
        <GameUIBuildingMenu gameLogic={props.gameLogic} opened={buildingMenuOpened} />
        <GameUISummoningMenu gameLogic={props.gameLogic} opened={summonMenuOpened} />
    </div>
}
import { useState } from "react";
import { IGameAssets } from "../game/IGameAssets";
import { IGameLogic } from "../game/IGameLogic";
import { GameUIBottomBar } from "./ui/GameUIBottomBar";
import { GameUITopBar } from "./ui/GameUITopBar";
import { GameUIBuildingMenu } from "./ui/GameUIBuildingMenu";
import { GameUIShrineButton } from "./ui/GameUIShrineButton";
import { GameUISummoningMenu } from "./ui/GameUISummoningMenu";
import { GameUIBackground } from "./ui/GameUIBackground";

export function GameUI(
    props: {
        gameLogic: IGameLogic
        gameAssets: IGameAssets
    }
) {
    return <div className="game-ui">
        <div className="game-ui-layer one">
            <GameUIBackground />
        </div>
        <div className="game-ui-layer two">
            <div className="game-ui-container">
                <GameUITopBar gameLogic={props.gameLogic} />
                <GameUIBuildingMenu gameLogic={props.gameLogic} />
            </div>
        </div>
    </div>
}
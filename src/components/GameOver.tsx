import { GameUICard } from "./ui/GameUICard";

export function GameOver() {
    return <div className="game-over">
        <div className="game-over-background"></div>
        <div className="game-over-content">
            <div>
                <GameUICard title="Game Over"
                    description={
                        <div>
                            <p>You have lost the game</p>
                        </div>
                    }
                    action="Restart"
                    imageUrl="assets/icons/cauldron.png"
                    onAction={() => window.location.reload()}
                />
            </div>
        </div>
    </div>
}
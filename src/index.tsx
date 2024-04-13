import { createRoot } from "react-dom/client";
import { GameMain } from "./components/GameMain";

async function startGame() {

    console.log("[startGame]", "Starting game ...");

    const rootEl = document.getElementById("root");
    if (!rootEl) {
        throw new Error("Root element not found");
    }

    createRoot(rootEl).render(
        <GameMain />
    );

    console.log("[startGame]", "Game main component rendered");

}

startGame()
    .then(() => console.log("[main]", "Game started"))
    .catch((err) => console.error("[main]", "Error starting game", err));

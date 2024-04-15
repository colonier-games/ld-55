export function GameUICard(
    props: {
        imageUrl: string
        title: string
        description: string | any
        action: string
        onAction: () => void
    }
) {
    return <div className="game-ui-card">
        <div className="game-ui-card-image-box">
            <img src={props.imageUrl} alt={props.title} />
        </div>
        <div className="game-ui-card-content">
            <div className="game-ui-card-title">{props.title}</div>
            <div className="game-ui-card-description">{props.description}</div>
            <div className="game-ui-card-action">
                <div className="game-ui-card-action-background"></div>
                <div className="game-ui-card-action-text" onClick={props.onAction}>{props.action}</div>
            </div>
        </div>
    </div>;
}
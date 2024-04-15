import { useRef, useState } from "react"

export function GameUICard(
    props: {
        imageUrl: string
        title: string
        description: string | any
        action: string
        onAction: () => void
        holdable?: boolean
        holdDuration?: number
    }
) {
    const [isHeld, setIsHeld] = useState(false);
    const holdTimeout = useRef<any>(null);

    const createHoldTimeout = () => {
        if (holdTimeout.current) {
            clearTimeout(holdTimeout.current);
        }
        setIsHeld(true);
        holdTimeout.current = setTimeout(() => {
            onHoldAction();
        }, (props.holdDuration || 1) * 1000);
    }

    const onHoldAction = () => {
        props.onAction();
        setIsHeld(false);
        setTimeout(
            () => { createHoldTimeout() },
            0
        );
    }

    const onStartHold = () => {
        setIsHeld(true);
        createHoldTimeout();
    };

    const onEndHold = () => {
        setIsHeld(false);
        if (holdTimeout.current) {
            clearTimeout(holdTimeout.current);
        }
    };

    return <div className="game-ui-card">
        <div className="game-ui-card-image-box">
            <img src={props.imageUrl} alt={props.title} />
        </div>
        <div className="game-ui-card-content">
            <div className="game-ui-card-title">{props.title}</div>
            <div className="game-ui-card-description">{props.description}</div>
            {!props.holdable && (<>
                <div className="game-ui-card-action">
                    <div className="game-ui-card-action-background"></div>
                    <div className="game-ui-card-action-text" onClick={props.onAction}>{props.action}</div>
                </div>
            </>)}

            {props.holdable && (<>
                <div className={"game-ui-card-action-holdable " + (isHeld ? 'held' : '')}>
                    <div className="game-ui-card-action-background"></div>
                    <div className="game-ui-card-action-progress" style={{ animation: isHeld ? `${(props.holdDuration || 1 - 0.1)}s linear infinite activate` : undefined }}></div>
                    <div className="game-ui-card-action-text" onMouseDown={onStartHold} onMouseUp={onEndHold}>{props.action}</div>
                </div>
            </>)}
        </div>
    </div>;
}
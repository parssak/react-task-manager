import React from 'react'

export default function FocusMode({ itemKey }) {
    return (
        <div className="focus-mode">
            <div className="focus-status">
                <h3>Currently focusing on:</h3>
                <h2>{itemKey}</h2>
            </div>
            <div className="h-wrapper">
                <button>End Focus</button>
                <button>Completed Task</button>
            </div>
        </div>
    )
}

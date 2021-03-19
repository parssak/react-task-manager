import React, { useEffect, useState, useContext } from 'react'
import ProfileContext from '../context/ProfileContext';

export default function FocusMode({ itemKey, stopFocus }) {
    const [beganFocus, setBeganFocus] = useState("");
    const { profile, profileDispatch } = useContext(ProfileContext);
    useEffect(() => {
        setBeganFocus(new Date().toLocaleTimeString());
    }, [])
    return (
        <div className="focus-mode">
            <div className="focus-status">
                <h3>Currently focusing on:</h3>
                <h2>{profile.items.filter(e => e.key === itemKey)[0].label}</h2>
                <h3>Began: {beganFocus}</h3>
            </div>
            <div className="h-wrapper">
                <button onClick={() => stopFocus()}>End Focus</button>
                <button onClick={() => {
                    profileDispatch({ type: 'COMPLETE_ITEM', payload: { completedItem: itemKey, completeStatus: true } });
                    stopFocus();
                }}>Completed Task</button>
            </div>
        </div>
    )
}

import React from 'react';

const Settings = ({toggleAddForm, toggleForm, setSort, sortOptions, toggleWallpaper}) => {
    return (
        <div>
            <button className="focus-mode" onClick={() => toggleAddForm()}>{!toggleForm ? "" : "Focus Mode"}</button>
            <button className="focus-mode" onClick={() => setSort(sortOptions[0])}>Duration</button>
            <button className="focus-mode" onClick={() => setSort(sortOptions[1])}>Date</button>
            <button className="focus-mode" onClick={() => setSort(sortOptions[2])}>Tag</button>
            <button className="focus-mode" onClick={() => toggleWallpaper(wallpaper => !wallpaper)}>Wallpaper</button>
        </div>
    );
}

export default Settings;

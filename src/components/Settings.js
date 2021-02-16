import React, { useState } from 'react';
const appearence = 'Appereance';
const account = 'Account';
const general = 'General';

const GeneralSettings = () => {
    return <>
        <div className="option">
            <label>Default duration</label>
            <input type="number" name="DefaultDuration" id="defaultduration" defaultValue={30} />
        </div>
        <div className="option">
            <label>Default duration</label>
            <input type="number" name="DefaultDuration" id="defaultduration" defaultValue={30} />
        </div>
    </>
}
const AppearenceSettings = ({ toggleWallpaper }) => {
    return (<>
        <button className="settings-button glassy-inner">Toggle theme</button>
        <button className="settings-button glassy-inner" onClick={() => toggleWallpaper(wallpaper => !wallpaper)}>Toggle wallpaper</button>
    </>)
}

const UserSettings = () => {
    return <>Not implemented yet!</>
}

const Settings = ({ toggleAddForm, toggleForm, toggleWallpaper, close }) => {
    const [selectedSection, setSelectedSection] = useState(general);
    return (
        <React.Fragment>
            {!toggleForm ? <button onClick={() => toggleAddForm()}>...</button> :
                <div className="settings">
                    <div className="h-wrapper-spaced">
                        <h1>Preferences</h1>
                        <button className="exit" onClick={() => close()}>Exit</button>
                    </div>
                    <div className="settings-wrapper">
                        <div className="sidebar">
                            <button onClick={() => setSelectedSection(general)}>General</button>
                            <button onClick={() => setSelectedSection(appearence)}>Appearence</button>
                            <button className="account" onClick={() => setSelectedSection(account)}>Account</button>
                        </div>
                        <div className="v-line"></div>
                        <div className="content">
                            <h3>{selectedSection}</h3>
                            <div className="v-wrapper">
                                {selectedSection === appearence && <AppearenceSettings toggleWallpaper={toggleWallpaper} />}
                                {selectedSection === account && <UserSettings />}
                                {selectedSection === general && <GeneralSettings />}
                            </div>
                        </div>
                    </div>
                </div>}
        </React.Fragment>
    );
}

export default Settings;

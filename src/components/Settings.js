import React, { useContext, useState, useEffect } from 'react';
import ProfileContext from '../context/ProfileContext';
const appearence = 'Appereance';
const account = 'Account';
const general = 'General';

const packageGeneral = (duration, tags) => {
    return {
        default_duration: duration,
        tags: tags
    }
}

const packageAppearence = (theme, style, wallpaper) => {
    return {
        theme,
        style,
        wallpaper
    }
}

const GeneralSettings = () => {
    const { profile, profileDispatch } = useContext(ProfileContext);
    const [defaultDuration, setDefaultDuration] = useState(profile.prefs.general.default_duration);
    const [tags, setTags] = useState(profile.prefs.general.tags);

    useEffect(() => {
        console.log('changed!')
        profileDispatch({ type: 'CHANGE_GENERAL', payload: packageGeneral(defaultDuration, tags) });
    }, [defaultDuration, profileDispatch, tags]);

    return <>
        <div className="option">
            <label>Default duration</label>
            <input type="number" name="DefaultDuration" id="defaultduration"
                value={defaultDuration || 69}
                onChange={e => setDefaultDuration(parseInt(e.target.value))} />
        </div>
        <div className="option">

        </div>
    </>
}
const AppearenceSettings = () => {
    const { profile, profileDispatch } = useContext(ProfileContext);
    const [theme, setTheme] = useState(profile.prefs.appearence.theme);
    const [style, setStyle] = useState(profile.prefs.appearence.style);
    const [wallpaper, setWallpaper] = useState(profile.prefs.appearence.wallpaper);

    useEffect(() => {
        console.log('changed! appearence')
        profileDispatch({ type: 'CHANGE_APPEARENCE', payload: { theme, style, wallpaper } });
    }, [theme, style, wallpaper, profileDispatch]);

    return (<>
        <button className="settings-button glassy-inner" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Toggle theme</button>
        <button className="settings-button glassy-inner" onClick={() => setWallpaper(wallpaper => !wallpaper)}>Toggle wallpaper</button>
    </>)
}

const UserSettings = () => {
    return <>Not implemented yet!</>
}

const Settings = ({ toggleAddForm, toggleForm, close }) => {
    const [selectedSection, setSelectedSection] = useState(general);
    const { profile } = useContext(ProfileContext);

    return (
        <React.Fragment>
            {!toggleForm ? <button onClick={() => toggleAddForm()}>...</button> :
                <div className={`settings ${profile.prefs.appearence.theme}`}>
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
                                {selectedSection === appearence && <AppearenceSettings/>}
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

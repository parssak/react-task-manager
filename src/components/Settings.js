import React, { useContext, useState, useEffect } from 'react';
import ProfileContext from '../context/ProfileContext';
import { CirclePicker } from 'react-color';
import Select from "react-dropdown-select";
const appearence = 'Appearence';
const account = 'Account';
const general = 'General';
const colors = ['hsl(214, 98%, 19%)', 'hsl(181, 77%, 25%)', 'hsl(350, 72%, 48%)', 'hsl(266, 24%, 59%)', 'hsl(18, 83%, 63%)', 'hsl(150, 72%, 48%)', 'hsl(30, 98%, 19%)']
const packageGeneral = (duration, tags) => {
    return {
        default_duration: duration,
        tags: tags
    }
}

const Tag = ({ label, color, changeColor, removeTag }) => {
    const [showColorOptions, setShowColorOptions] = useState(false);
    return <div className="settings-tag tag" style={{ background: color }} onMouseOver={() => setShowColorOptions(true)} onMouseLeave={() => setShowColorOptions(false)}>
        <div className="label">{label}</div>
        {showColorOptions && <CirclePicker width={'300px'}colors={colors} onChange={(color, event) => {
            console.log(color)
            changeColor(color.hsl, label)
        }} />}
        <button onClick={() => removeTag(label)}>Remove tag</button>
    </div>
}

const GeneralSettings = ({ refresh }) => {
    const { profile, profileDispatch } = useContext(ProfileContext);
    const [defaultDuration, setDefaultDuration] = useState(profile.prefs.general.default_duration);
    const [tags, setTags] = useState(profile.prefs.general.tags);
    const [newTag, setNewTag] = useState('');
    useEffect(() => {
        profileDispatch({ type: 'CHANGE_GENERAL', payload: packageGeneral(defaultDuration, tags) });
        refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultDuration, profileDispatch, tags]);

    const changeColor = (color, label) => {
        const refreshed = tags.filter(t => t.label !== label);
        const changeTag = tags.filter(t => t.label === label)[0];
        changeTag.color = `hsl(${color.h},${color.s*100}%,${color.l*100}%)`;
        refreshed.push(changeTag);
        setTags(refreshed);
    }

    const createNewTag = () => {
        const newTagObj = {
            value: newTag,
            label: newTag,
            color: '#0f0f0f'
        }
        setTags([...tags, newTagObj])
        setNewTag('')
    }

    const removeTag = (label) => {
        const removedVersion = tags.filter(tag => tag.label !== label);
        setTags(removedVersion);
    }
    return <>
        <div className="option">  </div>
        <div className="option">
            <label><strong>Default duration</strong></label>
            <input type="number" name="DefaultDuration" id="defaultduration"
                value={defaultDuration || 69}
                onChange={e => setDefaultDuration(parseInt(e.target.value))} />
        </div>
        <div className="option">  </div>
        <div className="option">
            <label><strong>Labels</strong></label>
            <input type="text" className="settings-tag add-label tag" value={newTag} placeholder={'Add new label...'} onKeyDown={e => e.key === 'Enter' && createNewTag()} onChange={e => setNewTag(e.target.value)} />
        </div>

        <div className="labels">
            {
                tags.map(tag => {
                    return <Tag label={tag.label} color={tag.color} key={tag.value} changeColor={changeColor} removeTag={removeTag} />
                })
            }
        </div>
        <div className="option">
        </div>
    </>
}
const styleOptions = [
    { value: 'Regular',  label: 'Regular'  },
    { value: 'Vibrant',  label: 'Vibrant'  },
    { value: 'Monotone', label: 'Monotone' },
    { value: 'Compact',  label: 'Compact'  }
]

const AppearenceSettings = ({ refresh }) => {
    const { profile, profileDispatch } = useContext(ProfileContext);
    const [theme, setTheme] = useState(profile.prefs.appearence.theme);
    const [style, setStyle] = useState(profile.prefs.appearence.style);
    const [wallpaper, setWallpaper] = useState(profile.prefs.appearence.wallpaper);

    useEffect(() => {
        profileDispatch({ type: 'CHANGE_APPEARENCE', payload: { theme, style, wallpaper } });
        refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme, style, wallpaper, profileDispatch]);

    return (<>
        <div className="option">
            <label>Toggle theme </label>
            <button className="settings-button glassy-inner" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{theme}</button>
        </div>
        <div className="option">
            <label>Toggle Wallpaper </label>
            <button className="settings-button glassy-inner" onClick={() => setWallpaper(wallpaper => !wallpaper)}>{wallpaper ? 'Disabled': 'Active'}</button>
        </div>
        <div className="option">
            <label>Tasks style </label>
            <Select
                options={styleOptions}
                onChange={(value) => {
                    console.log(value);
                    setStyle(value[0].value)
                }}
                placeholder={style}

                wrapperClassName={`selector ${profile.prefs.appearence.theme}`} className={`selector glassy-inner ${profile.prefs.appearence.theme}`} />
        </div>
        
    </>)
}

const UserSettings = ({refresh}) => {
    return <>Not implemented yet!</>
}

const Settings = ({ toggleAddForm, toggleForm, close, refresh }) => {
    const [selectedSection, setSelectedSection] = useState(general);
    const { profile } = useContext(ProfileContext);
    return (
        <React.Fragment>
            {!toggleForm ? <button onClick={() => toggleAddForm()}>...</button> :
                <div className={`settings ${profile.prefs.appearence.theme}`}>
                    <div className="h-wrapper-spaced">
                        <h1>Settings</h1>
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
                                {selectedSection === appearence && <AppearenceSettings refresh={ refresh }/>}
                                {selectedSection === account && <UserSettings refresh={refresh}/>}
                                {selectedSection === general && <GeneralSettings refresh={refresh}/>}
                            </div>
                        </div>
                    </div>
                </div>}
        </React.Fragment>
    );
}

export default Settings;

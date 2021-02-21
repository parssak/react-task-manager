import React, { useState, useEffect, useReducer } from 'react';
// State management
import ProfileContext from '../context/ProfileContext';
import itemsReducer from '../reducers/items';
import prefsReducer from '../reducers/prefs';
import combineReducers from 'react-combine-reducers';
// Components
import AddItemForm from './AddItemForm';
import Header from './Header';
import Settings from './Settings';
import ItemListView from './ItemListView';
import UpdateItemsPrompt from './UpdateItemsPrompt';
import daysIntoYear from '../helper-functions/daysIntoYear';
import './styles/App.scss';

let initialItems = [];
const items = JSON.parse(localStorage.getItem('items'));
if (items) {
  initialItems = items;
}

let initialPrefs = {
  general: {
    default_duration: 50,
    tags: [
      { value: 'Personal Projects', label: 'Personal Projects', color: '#bd3a61' },
    ]
  },
  appearence: {
    theme: 'dark',
    style: 'regular',
    wallpaper: false
  },
}
const pastPrefs = JSON.parse(localStorage.getItem('prefs'));
if (pastPrefs) {
  initialPrefs = pastPrefs;
}

const [profileReducer, initialProfile] = combineReducers({
  items: [itemsReducer, initialItems],
  prefs: [prefsReducer, initialPrefs]
});

function App() {
  const [profile, profileDispatch] = useReducer(profileReducer, initialProfile);
  const [focusMode, setFocusMode] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [oldTasks, setOldTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(profile.items));
    setOldTasks(profile.items.filter(item => !item.completed).filter(item => daysIntoYear(new Date(item.data.date)) < daysIntoYear(new Date())));
  }, [profile.items]);

  function toggleAddForm() {
    setFocusMode(focusMode => !focusMode);
  }

  function toggleSettings() {
    setShowSettings(showSettings => !showSettings);
  }

  function refreshMain() {
    if (refresh) setRefresh(refresh => !refresh);
    else setRefresh(refresh => !refresh);
  }

  return (
    <ProfileContext.Provider value={{ profile, profileDispatch}}>
      <div className={`App ${profile.prefs.appearence.theme}`} style={{
        background: profile.prefs.appearence.wallpaper && (profile.prefs.appearence.theme === 'light' ?  'hsl(0, 0%, 80%)': 'hsl(0, 0%, 5%)')
      }}>
        <div className={`main-content ${profile.prefs.appearence.theme}`} >
          <Header />
          <AddItemForm subtaskKey={''} />
          <ItemListView showCompleted={showCompleted} />
          <UpdateItemsPrompt tasks={oldTasks} />
          <div className="option-row">
            <button onClick={() => { setShowCompleted(showCompleted => !showCompleted) }}>Show Completed</button>
            <button onClick={() => { setShowSettings(showSettings => !showSettings) }}>Settings</button>
          </div>
        </div>
        <Settings
          showSettings = {showSettings}
          toggleSettings={toggleSettings}
          close={() => setShowSettings(false)}
          refresh={refreshMain}
        />
        <img className="background-img" src="https://source.unsplash.com/1600x900/?nature" alt="imag" />
      </div>
     </ProfileContext.Provider>
  );
}

export default App;

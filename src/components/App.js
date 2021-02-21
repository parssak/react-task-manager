import React, { useState, useEffect, useReducer } from 'react';
// State management
import ProfileContext from '../context/ProfileContext';
import itemsReducer from '../reducers/items';
import prefsReducer from '../reducers/prefs';
import combineReducers from 'react-combine-reducers';
// Components
import Header from './Header';
import Settings from './Settings';
import EditItem from './EditItem';
import ItemListView from './ItemListView';
import UpdateItemsPrompt from './UpdateItemsPrompt';
import daysIntoYear from '../helper-functions/daysIntoYear';
import './styles/App.scss';
import Sidebar from './Sidebar';

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
const DURATION = "DURATION";
const DATE = "DATE";
const TAG = "TAG";
const TODAY = "TODAY";
const LABEL = "LABEL";

const sortOptions = [DURATION, DATE, TAG, TODAY, LABEL];

function App() {
  const [profile, profileDispatch] = useReducer(profileReducer, initialProfile);
  // const [focusMode, setFocusMode] = useState(true);

  const [showSettings, setShowSettings] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [oldTasks, setOldTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sort, setSort] = useState(sortOptions[4]);

  function selectItem(key) {
    console.log('selected', key);
    setSelectedItem(key);
  }

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(profile.items));
    setOldTasks(profile.items.filter(item => !item.completed).filter(item => daysIntoYear(new Date(item.data.date)) < daysIntoYear(new Date())));
  }, [profile.items]);

  // function toggleAddForm() {
  //   setFocusMode(focusMode => !focusMode);
  // }
  if (profile.prefs.appearence.theme === 'dark') {
    document.querySelector("body").style.backgroundColor = 'hsl(0, 0%, 5%)';
  }

  function toggleSettings() {
    console.log('called toggle settings');
    setShowSettings(showSettings => !showSettings);
  }

  function refreshMain() {
    if (refresh) setRefresh(refresh => !refresh);
    else setRefresh(refresh => !refresh);
  }

  const toggleNav = () => setShowNav(showNav => !showNav)

  return (
    <ProfileContext.Provider value={{ profile, profileDispatch }}>
      <div id="main" className={`App ${profile.prefs.appearence.theme}`} style={{
        background: profile.prefs.appearence.wallpaper && (profile.prefs.appearence.theme === 'light' ? 'hsl(0, 0%, 80%)' : 'hsl(0, 0%, 5%)')
      }}>
        <Header />
        <EditItem itemKey={selectedItem} cancel={() => setSelectedItem(null)} />
        <button onClick={() => { setShowCompleted(showCompleted => !showCompleted) }}>Show Completed</button>
        <button onClick={() => toggleNav()}>Toggle Nav</button>
        <button className="settings-button glassy-inner" onClick={() => setSort(sortOptions[0])}>Duration</button>
        <button className="settings-button glassy-inner" onClick={() => setSort(sortOptions[1])}>Date</button>
        <button className="settings-button glassy-inner" onClick={() => setSort(sortOptions[2])}>Tag</button>
        <button className="settings-button glassy-inner" onClick={() => setSort(sortOptions[3])}>Today</button>
        <div className={`main-content ${profile.prefs.appearence.theme}`} >
          <ItemListView sort={sort} showCompleted={showCompleted} selectItem={selectItem} selectedItem={selectedItem} />
          <UpdateItemsPrompt tasks={oldTasks} />
        </div>
        <Sidebar showNav={showNav} toggleNav={toggleNav} toggleSettings={() => !showSettings && setShowSettings(true)} />
        <Settings
          showSettings={showSettings}
          toggleSettings={toggleSettings}
          close={() => setShowSettings(false)}
          refresh={refreshMain}
        />
        {/* <img className="background-img" src="https://source.unsplash.com/1600x900/?nature" alt="imag" /> */}
      </div>
    </ProfileContext.Provider>
  );
}

export default App;

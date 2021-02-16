import React, { useState, useEffect, useReducer } from 'react';
// State management
import ItemsContext from '../context/items-context';
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
import getTodayInYear from '../helper-functions/getTodayInYear';
import './styles/App.scss';

let initialItems = [];
const items = JSON.parse(localStorage.getItem('items'));
if (items) {
  initialItems = items;
}

const initialPrefs = {
  general: {
    default_duration: 30,
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

const [profileReducer, initialProfile] = combineReducers({
  items: [itemsReducer, initialItems],
  prefs: [prefsReducer, initialPrefs]
});


function App() {
  // const [items, itemsDispatch] = useReducer(itemsReducer, []);
  const [profile, profileDispatch] = useReducer(profileReducer, initialProfile);
  const [focusMode, setFocusMode] = useState(true);
  const [wallpaper, toggleWallpaper] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [oldTasks, setOldTasks] = useState([]);

  useEffect(() => {

  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(profile.items));
    setOldTasks(items.filter(item => item.data.date.dayInYear < getTodayInYear()));
  }, [profile.items]);

  function toggleAddForm() {
    setFocusMode(focusMode => !focusMode);
  }

  console.log("app > ",profile);
  return (
    <ProfileContext.Provider value={{ profile, profileDispatch}}>
      <div className="App" style={{ background: wallpaper && 'hsl(0, 0%, 5%)' }}>
        <div className="main-content">
          <Header />
          {focusMode && <AddItemForm subtaskKey={''} />}
          <ItemListView />
          {oldTasks.length > 0 && <UpdateItemsPrompt tasks={oldTasks} />}
          <button onClick={() => { setShowSettings(showSettings => !showSettings) }}>Settings</button>
        </div>
        {showSettings && <Settings
          toggleAddForm={toggleAddForm}
          // setSort={setSort}
          toggleForm={focusMode}
          toggleWallpaper={toggleWallpaper}
          // sortOptions={sortOptions}
          close={() => setShowSettings(false)}
        />}
        <img className="background-img" src="https://source.unsplash.com/1600x900/?nature" alt="imag" />
      </div>
     </ProfileContext.Provider>
  );
}

export default App;

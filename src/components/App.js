import React, { useState, useEffect, useReducer } from 'react';
import ItemsContext from '../context/items-context';
import itemsReducer from '../reducers/items';
import AddItemForm from './AddItemForm';
import './styles/App.scss';
import Header from './Header';
import Settings from './Settings';
import ItemListView from './ItemListView';
import UpdateItemsPrompt from './UpdateItemsPrompt';
import getTodayInYear from '../helper-functions/getTodayInYear';
import combineReducers from 'react-combine-reducers';

function App() {
  const [items, itemsDispatch] = useReducer(itemsReducer, []);
  const [focusMode, setFocusMode] = useState(true);
  const [wallpaper, toggleWallpaper] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [oldTasks, setOldTasks] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items'));
    if (items) {
      itemsDispatch({ type: 'POPULATE_ITEMS', items });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
    setOldTasks(items.filter(item => item.data.date.dayInYear < getTodayInYear()));
  }, [items]);

  function toggleAddForm() {
    setFocusMode(focusMode => !focusMode);
  }

  return (
    <ItemsContext.Provider value={{ items, itemsDispatch }}>
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
    </ItemsContext.Provider>
  );
}

export default App;

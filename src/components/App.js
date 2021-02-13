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
import EditItem from './EditItem';


const DURATION = "DURATION";
const DATE = "DATE";
const TAG = "TAG";
const TODAY = "TODAY";

const sortOptions = [DURATION, DATE, TAG, TODAY];

function App() {
  const [items, itemsDispatch] = useReducer(itemsReducer, []);
  const [focusMode, setFocusMode] = useState(true);
  const [wallpaper, toggleWallpaper] = useState(true);
  const [sort, setSort] = useState(sortOptions[2]);
  const [selectedItem, setSelectedItem] = useState(null);

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

  function selectItem(key) {
    setSelectedItem(key);
  }

  return (
    <ItemsContext.Provider value={{ items, itemsDispatch }}>
      <div className="App">
        <Header />
        
        {wallpaper && <img className="background-img" src="https://source.unsplash.com/1600x900/?abstract" alt="imag" />}
        {focusMode && <AddItemForm subtaskKey={''} />}
        {selectedItem &&
          <EditItem itemKey={selectedItem} cancel={() => selectItem(false)} />
        }
        <ItemListView sort={sort} selectItem={selectItem} selectedItem={selectedItem} />
        {oldTasks.length > 0 && <UpdateItemsPrompt tasks={ oldTasks}/>}
        <Settings toggleAddForm={toggleAddForm} setSort={setSort} toggleForm={focusMode} toggleWallpaper={toggleWallpaper} sortOptions={sortOptions} />
      </div>
    </ItemsContext.Provider>
  );
}

export default App;

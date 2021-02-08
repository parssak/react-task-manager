import React, { useState, useEffect, useReducer } from 'react';
import ItemsContext from '../context/items-context';
import itemsReducer from '../reducers/items';
import AddItemForm from './AddItemForm';
import './App.scss';
import ItemList from './ItemList';
import Header from './Header';
const DURATION = "DURATION";
const DATE = "DATE";
const TAG = "TAG";

const sortOptions = [DURATION, DATE, TAG];

function App() {
  const [items, itemsDispatch] = useReducer(itemsReducer, []);
  const [toggleForm, setToggleForm] = useState(true);
  const [wallpaper, toggleWallpaper] = useState(true);
  const [sort, setSort] = useState(sortOptions[2]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items'));
    if (items) {
      itemsDispatch({ type: 'POPULATE_ITEMS', items });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  function toggleAddForm() {
    setToggleForm(toggleForm => !toggleForm);
  }
  return (
    <ItemsContext.Provider value={{ items, itemsDispatch }}>
      <div className="App">
        <Header />
        {wallpaper && <img className="background-img" src="https://source.unsplash.com/1600x900/?abstract" alt="imag" />}
        {toggleForm && <AddItemForm />}
        <ItemList sort={sort} />
        <div className="h-wrap">
          <button className="focus-mode" onClick={() => toggleAddForm()}>{!toggleForm ? "" : "Focus Mode"}</button>
          <button className="focus-mode" onClick={() => setSort(sortOptions[0])}>Duration</button>
          <button className="focus-mode" onClick={() => setSort(sortOptions[1])}>Date</button>
          <button className="focus-mode" onClick={() => setSort(sortOptions[2])}>Tag</button>
          <button className="focus-mode" onClick={() => toggleWallpaper(wallpaper => !wallpaper)}>Wallpaper</button>
        </div>
      </div>
    </ItemsContext.Provider>
  );
}

export default App;

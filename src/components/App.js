import React, { useState, useEffect, useReducer } from 'react';
import ItemsContext from '../context/items-context';
import itemsReducer from '../reducers/items';
import AddItemForm from './AddItemForm';
import './App.scss';
import ItemList from './ItemList';
import Header from './Header';
import Settings from './Settings';

const DURATION = "DURATION";
const DATE = "DATE";
const TAG = "TAG";
const TODAY = "TODAY";

const sortOptions = [DURATION, DATE, TAG, TODAY];

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
        <Settings toggleAddForm={toggleAddForm} setSort={setSort} toggleForm={toggleForm} toggleWallpaper={toggleWallpaper} sortOptions={sortOptions} />
      </div>
    </ItemsContext.Provider>
  );
}

export default App;

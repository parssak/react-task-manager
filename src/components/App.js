import React, { useState, useEffect, useReducer } from 'react';
import ItemsContext from '../context/items-context';
import itemsReducer from '../reducers/items';
import AddItemForm from './AddItemForm';
import './App.scss';
import ItemList from './ItemList';

function App() {
  const [items, itemsDispatch] = useReducer(itemsReducer, []);
  const [toggleForm, setToggleForm] = useState(true);
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
        {toggleForm && <AddItemForm />}
        <ItemList />
        <button className="focus-mode" onClick={() => toggleAddForm()}>{!toggleForm ? "" : "Focus Mode"}</button>
      </div>
    </ItemsContext.Provider>
  );
}

export default App;

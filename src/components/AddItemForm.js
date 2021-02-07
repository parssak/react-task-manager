import React, { useContext, useState } from 'react';
import ItemsContext from '../context/items-context';
import { v4 as uuidv4 } from 'uuid';
import Select from "react-dropdown-select";

const options = [
  { value: 'CSC209', label: 'CSC209', color:'#f53b57' },
  { value: 'CSC263', label: 'CSC263', color: '#3c40c6' },
  { value: 'CSC258', label: 'CSC258', color: '#f35423' },
  { value: 'STA238', label: 'STA238', color: '#05c46b' },
]

const defaultDur = 30;
const AddItemForm = () => {
  const [label, setLabel] = useState('');
  const [duration, setDuration] = useState(defaultDur);
  const [tag, setTag] = useState('');

  const { itemsDispatch } = useContext(ItemsContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (label === '') return;
    console.log(tag[0]);
    const item = {
      label: label,
      duration: duration,
      tag: tag[0],
      key: uuidv4()
    }
    itemsDispatch({ type: 'ADD_ITEM', item });
    setLabel('');
  };

  return (
    <div className="add-item">
      <input value={label}
        onChange={(e) => setLabel(e.target.value)}
        onKeyPress={e => e.key === "Enter" && handleSubmit(e)} />
      <input type="number" value={duration} onChange={e => {
        setDuration(e.target.value);
      }}
        onKeyPress={e => e.key === "Enter" && handleSubmit(e)}/>
      <Select options={options} onChange={(value) => setTag(value)} />
      {/* <button onClick={e => handleSubmit(e)}>Add Item</button> */}
    </div>
  );
};

export { AddItemForm as default };

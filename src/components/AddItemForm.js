import React, { useContext, useState } from 'react';
import ItemsContext from '../context/items-context';
import { v4 as uuidv4 } from 'uuid';
import Select from "react-dropdown-select";
import DatePicker from 'react-date-picker';
import getDateValues from '../helper-functions/getDateValues';
import { options } from '../helper-functions/options';

const createItem = (label, duration, tag, date) => {
  const [day, month, year, dayOfWeek, formattedDate, dateString, dayInYear] = getDateValues(date);
  const item = {
    label: label,
    duration: duration,
    data:
    {
      tag: tag[0] || { label:"NULL"},
      date: {
        day,
        month,
        year,
        dayOfWeek,
        formattedDate,
        dateString,
        dayInYear
      }
    },
    key: uuidv4()
  }
  return item;
}



const defaultDur = 30;

const AddItemForm = () => {
  const [label, setLabel] = useState('');
  const [duration, setDuration] = useState(defaultDur);
  const [tag, setTag] = useState('');
  const [date, setDate] = useState(new Date());

  const { itemsDispatch } = useContext(ItemsContext);

  const [commands, showCommands] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (label === '') return;
    const item = createItem(label, duration, tag, date);
    itemsDispatch({ type: 'ADD_ITEM', item });
    setLabel('');
  };

  const handleKeyPress = e => {
    switch (e.key) {
      case "Enter": handleSubmit(e); return;
      case "Escape": commands && showCommands(false); return;
      case "/": !commands && showCommands(true); return;
      default: return;
    }
  }
  return (
    <div className="add-item glassy">
      <input type="text" value={label} onChange={e => setLabel(e.target.value)}
        onKeyDown={e => handleKeyPress(e)} className="glassy-inner"/> 
      <input type="number" value={duration} onChange={e => setDuration(e.target.value)}
        onKeyPress={e => e.key === "Enter" && handleSubmit(e)} className="glassy-inner"/>
      <Select options={options} onChange={(value) => setTag(value)}
        wrapperClassName={"selector"} className={"selector glassy-inner"} />
      <DatePicker onChange={setDate} value={date} calendarIcon={null} clearIcon={null} calendarClassName="date-picker-calendar" className="date-picker"/>
    </div>
  );
};

export { AddItemForm as default };

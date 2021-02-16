import React, { useContext, useState, useRef } from 'react';
import ProfileContext from '../context/ProfileContext';
import { v4 as uuidv4 } from 'uuid';
import Select from "react-dropdown-select";
import DatePicker from 'react-date-picker';
import getDateValues from '../helper-functions/getDateValues';
import { options } from '../helper-functions/options';
const createItem = (label, duration, tag, date, parent) => {
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
      },
      parent: parent,
      children: []
    },
    key: uuidv4()
  }
  return item;
}
const defaultDur = 30;

const AddItemForm = ({subtaskKey, addedSubtask, addingSubtask}) => {
  const [label, setLabel] = useState('');
  const [duration, setDuration] = useState(defaultDur);
  const [tag, setTag] = useState('');
  const [date, setDate] = useState(new Date());
  const thisElement = useRef();
  const { profileDispatch } = useContext(ProfileContext);

  const [commands, showCommands] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (label === '') return;
    const item = createItem(label, duration, tag, date, subtaskKey);
    console.log("made >>>",item);
    profileDispatch({ type: 'ADD_ITEM', item });
    setLabel('');
    if (subtaskKey !== '') {
      addedSubtask(item.key);
    }
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
    <div className={`add-item ${subtaskKey ? 'glassy-without' : 'glassy'}`} ref={thisElement} style={{  flexDirection: subtaskKey && 'column' }}>
      <div className="group">
        <input type="text" value={label} onChange={e => setLabel(e.target.value)} autoFocus={true} style={{ flexGrow: !addingSubtask && 1, flexBasis: !addingSubtask && 'content'}}
          onKeyDown={e => handleKeyPress(e)} className="glassy-inner" placeholder={addingSubtask ? 'Add subtask...' : 'Add task'} />
        <input type="number" value={duration} onChange={e => setDuration(e.target.value)}
          onKeyPress={e => e.key === "Enter" && handleSubmit(e)} className="glassy-inner" />  
      </div>
      <div className="group">
        <DatePicker onChange={setDate} value={date} calendarIcon={null} clearIcon={null} calendarClassName="date-picker-calendar" className="date-picker" />
        <Select
          options={options}
          onChange={(value) => setTag(value)}
          create
          onCreateNew={(item) => console.log('%c New item created ', 'background: #555; color: tomato', item)}
          wrapperClassName={"selector"} className={"selector glassy-inner"} />

      </div>
      </div>
      
  );
};

export { AddItemForm as default };

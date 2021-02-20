import React, { useContext, useState, useRef } from 'react';
import ProfileContext from '../context/ProfileContext';
import { v4 as uuidv4 } from 'uuid';
import Select from "react-dropdown-select";
import DatePicker from 'react-date-picker';
import getDateValues from '../helper-functions/getDateValues';
const createItem = (label, duration, tag, date, parent) => {
  const [day, month, year, dayOfWeek, formattedDate, dateString, dayInYear] = getDateValues(date);
  let actualTag = tag;
  if (actualTag.length !== 0) {
    actualTag = tag[0].value;
  }

  const item = {
    label: label,
    duration: duration,
    completed: false,
    data:
    {
      tag: actualTag || 'NULL',
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

const AddItemForm = ({ subtaskKey, addedSubtask, addingSubtask }) => {
  const { profile, profileDispatch } = useContext(ProfileContext);

  const [label, setLabel] = useState('');
  const [duration, setDuration] = useState(profile.prefs.general.default_duration);
  const [tag, setTag] = useState('');
  const [date, setDate] = useState(new Date());
  const thisElement = useRef();

  const [commands, showCommands] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (label === '') return;
    const item = createItem(label, duration, tag, date, subtaskKey);
    console.log("made >>>", item);
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
      case "/":
        e.preventDefault();
        !commands && showCommands(true);
        return;
      default: return;
    }
  }
  return (
    <div className={`add-item ${subtaskKey ? 'glassy-without' : 'glassy'}`} ref={thisElement} style={{ flexDirection: subtaskKey && 'column' }}>
      <input type="text" value={label} onChange={e => setLabel(e.target.value)} autoFocus={true} style={{ flexGrow: !addingSubtask && 1, flexBasis: !addingSubtask && 'content' }}
        onKeyDown={e => handleKeyPress(e)} className="glassy-inner" placeholder={addingSubtask ? 'Add subtask...' : 'Add task'} />
      { commands && 
      <div className="group">
        <input type="number" value={duration} onChange={e => setDuration(e.target.value)}
          onKeyPress={e => e.key === "Enter" && handleSubmit(e)} className="duration-selector glassy-inner right-margin" />
        <DatePicker onChange={setDate} value={date} calendarIcon={null} clearIcon={null} calendarClassName={`date-picker-calendar ${profile.prefs.appearence.theme}`} className={`date-picker right-margin ${profile.prefs.appearence.theme}`} />
        <Select
          options={profile.prefs.general.tags}
          onChange={(value) => setTag(value)}
          create
          styles={{
            // Fixes the overlapping problem of the component
            menu: provided => ({ ...provided, zIndex: 9999 })
          }}
          onCreateNew={(item) => console.log('%c New item created ', 'background: #555; color: tomato', item)}
          wrapperClassName={`selector ${profile.prefs.appearence.theme}`} className={`selector glassy-inner ${profile.prefs.appearence.theme}`} />
        </div>}
    </div>

  );
};

export { AddItemForm as default };

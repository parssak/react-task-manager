import React, { useContext, useState } from 'react';
import ItemsContext from '../context/items-context';
import calculateHeight from '../helper-functions/calculateHeight'
import formatTime from '../helper-functions/formatTime'
import daysIntoYear from '../helper-functions/daysIntoYear';
import EditItem from './EditItem';

const Item = ({ item, min, max, updated, selectItem, isSelected }) => {
  const { itemsDispatch } = useContext(ItemsContext);
  const today = daysIntoYear(new Date());
  const [hovering, setHovering] = useState(false);
  const [addSubtask, setAddSubtask] = useState(false);

  let formattedDate = item.data.date.formattedDate;
  let diff = item.data.date.dayInYear - today;
  if (diff === 0)
    formattedDate = "Today"
  else if (diff === 1)
    formattedDate = "Tomorrow"
  else if (diff === 7)
    formattedDate = "Next Week"
  else if (diff === -1)
    formattedDate = "Yesterday"

  function removeItem() {
    updated();
    itemsDispatch({ type: 'REMOVE_ITEM', itemToBeDeleted: item.key });
  }


  return (
    <>
      {isSelected ? <EditItem itemKey={item.key} cancel={() => selectItem(false)} addingSubtask={addSubtask}/> :
        <div className="item glassy-inner"
          style={{ minHeight: calculateHeight(item.duration, min, max), backgroundColor: hovering && 'rgb(45,50,70)' }}
          onClick={() => selectItem(isSelected ? null : item.key)}
          onMouseOver={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <div className="text-wrapper">
            <div className="h-wrapper">
            {hovering ? <div className="center-align">
                <button onClick={() => removeItem()} />
                <span className="label">{item.label}</span>
              </div> : <span className="label">{item.label}</span>}
          
            </div>
              <div className="wrap">
              <span className="duration">{formattedDate}</span>
              <span className="duration"> | </span>
              <span className="duration">{formatTime(item.duration)}</span>
            </div>
          </div>
          <div className="center-align tag">
            {hovering && <button className="add-subtask" onClick={e => setAddSubtask(true)}>Add subtask</button>}
            {item.data.tag.label !== "NULL" && <span className="tag" style={{ backgroundColor: item.data.tag.color }}>{item.data.tag.label}</span>}
          </div>
        </div>
        }
    </>
  );
};

export { Item as default };

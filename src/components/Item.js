import React, { useContext, useState } from 'react';
import ItemsContext from '../context/items-context';
import calculateHeight from '../helper-functions/calculateHeight'
import formatTime from '../helper-functions/formatTime'
import daysIntoYear from '../helper-functions/daysIntoYear';

const Item = ({ item, min, max, updated }) => {
  const { itemsDispatch } = useContext(ItemsContext);
  const [current, setCurrent] = useState(false);
  const today = daysIntoYear(new Date());

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
      itemsDispatch({ type: 'REMOVE_ITEM', itemToBeDeleted: item });
    }
  return (
    <div className="item" style={{ minHeight: calculateHeight(item.duration, min, max), backgroundColor: current && '#060154' }} onDoubleClick={() => setCurrent(current => !current)}>
      <button onClick={() => removeItem()} />
      <div className="text-wrapper">
        <span className="label">{item.label}</span>
        <div className="wrap">
          <span className="duration">{formattedDate}</span>
          <span className="duration"> | </span>
          <span className="duration">{formatTime(item.duration)}</span>

        </div>
      </div>
      {item.data.tag.label !== "NULL" && <span className="tag" style={{ backgroundColor: item.data.tag.color }}>{item.data.tag.label}</span>}
      
    </div>
  );
};

export { Item as default };

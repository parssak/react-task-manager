import React, { useContext, useState } from 'react';
import ItemsContext from '../context/items-context';
import calculateHeight from '../helper-functions/calculateHeight'
import formatTime from '../helper-functions/formatTime'

const Item = ({ item, min, max, updated }) => {
  const { itemsDispatch } = useContext(ItemsContext);
  const [current, setCurrent] = useState(false);
  function removeItem() {
    updated();
    itemsDispatch({ type: 'REMOVE_ITEM', itemToBeDeleted: item });
  }
  return (
    <div className="item" style={{ minHeight: calculateHeight(item.duration, min, max), backgroundColor: current &&'#060154' }} onDoubleClick={() => setCurrent(current => !current)}>
      <button onClick={() => removeItem()}/>
      <div className="text-wrapper">
        <span className="label">{item.label}</span>
        <span className="duration">{formatTime(item.duration)}</span>
      </div>
      {item.tag && <span className="tag" style={{ backgroundColor: item.tag.color }}>{item.tag.label}</span>}

    </div>
  );
};

export { Item as default };

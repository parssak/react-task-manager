import React, { useContext, useState } from 'react';
import ItemsContext from '../context/items-context';
import calculateHeight from '../helper-functions/calculateHeight'
import formatTime from '../helper-functions/formatTime'
import daysIntoYear from '../helper-functions/daysIntoYear';
import EditItem from './EditItem';
import modifyItem from '../helper-functions/modifyItem';

const Item = ({ item, min, max, updated, selectItem, selectedItem, className }) => {
  const { items, itemsDispatch } = useContext(ItemsContext);
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

  function removeItem(key) {
    // updated();
    if (item.data.children.length > 0) {
      item.data.children.forEach(childKey => itemsDispatch({ type: 'REMOVE_ITEM', itemToBeDeleted: key }));
    }
    itemsDispatch({ type: 'REMOVE_ITEM', itemToBeDeleted: key });
  }

  const drop = e => {
    e.preventDefault();
    const card_id = e.dataTransfer.getData('card_id');
    if (card_id !== item.key && card_id !== item.data.parent && !item.data.children.includes(card_id)) {
      // console.log("dropped", card_id, "on me,", item.label);
      // console.log([...item.data.children, card_id]);
      console.log("CALLED DROP");
      const payload = {
        parent: item.key,
        child: card_id
      }
      // const payload = modifyItem(item.label, item.duration, item.data.tag, item.data.date, [...item.data.children, card_id], item.data.parent, item.key);
      itemsDispatch({ type: 'ADD_CHILD', payload })
    }
  }

  const dragStart = e => {
    const target = e.target;
    e.dataTransfer.setData('card_id', target.id);
    setTimeout(() => { }, 0)
  }

  return (
    <div className={className}>
      <div className="item glassy-inner" id={item.key}
        style={{ minHeight: calculateHeight(item.duration, min, max), backgroundColor: hovering && 'rgb(45,50,70)' }}
        onClick={e => {
          if (!e) e = window.event;
          e.cancelBubble = true;
          if (e.stopPropagation) e.stopPropagation();
          selectItem(item.key === selectedItem ? null : item.key);
        }}
        onMouseOver={e => { e.stopPropagation(); setHovering(true); }}
        onMouseLeave={e => { e.stopPropagation(); setHovering(false); }}
        draggable="true"
        onDragOver={e => e.preventDefault()}
        onDragStart={e => dragStart(e)}
        onDrop={e => drop(e)}
      >
        <div className="text-wrapper">
          <div className="h-wrapper">
            {
              hovering ?
                <div className="center-align">
                  <button onClick={() => removeItem(item.key)} />
                  <span className={`label ${item.data.children.length > 0 && 'parent-label'}`}>{item.label}</span>
                </div> :
                <span className={`label ${item.data.children.length > 0 && 'parent-label'}`}>{item.label}</span>
            }
          </div>
          <div className="wrap">
            <span className="duration">{formattedDate}</span>
            {item.data.children.length === 0 && <span className="duration"> | </span>}
            {item.data.children.length === 0 && <span className="duration">{formatTime(item.duration)}</span>}
          </div>
        </div>
        <div className="children">
          {items.filter(a => a.data.parent === item.key).map((b) => (
            <Item itemKey={b.key} item={b} min={min} max={max} updated={updated} selectedItem={selectedItem} selectItem={selectItem} key={b.key} className="child" />
          ))}
        </div>
        <div className="center-align tag">
          {hovering && item.data.parent === '' && <button className="add-subtask" onClick={e => setAddSubtask(true)}>Add subtask</button>}
          {item.data.tag.label !== "NULL" && <span className="tag" style={{ backgroundColor: item.data.tag.color }}>{item.data.tag.label}</span>}
        </div>
      </div>
    </div>
  );
};

export { Item as default };

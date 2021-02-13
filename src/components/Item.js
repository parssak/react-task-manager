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

  if (item.data.children.length > 0) {
    const children = items.filter(a => a.data.parent === item.key);
    if (children.length === 0) {
      const payload = modifyItem(item.label, item.duration, item.data.tag, item.data.date, [], item.data.parent, item.key);
      itemsDispatch({ type: 'EDIT_ITEM', payload })
    }
  }

  return (
    <div className={className}>
      {/* {item.key === selectedItem ? <EditItem itemKey={item.key} cancel={() => selectItem(false)} addingSubtask={addSubtask} /> : */}
          <div className="item glassy-inner"
            style={{ minHeight: calculateHeight(item.duration, min, max), backgroundColor: hovering && 'rgb(45,50,70)' }}
            onClick={e => {
              if (!e) var e = window.event;
              e.cancelBubble = true;
              if (e.stopPropagation) e.stopPropagation();
              selectItem(item.key === selectedItem ? null : item.key);
            }}
            onMouseOver={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <div className="text-wrapper">
              <div className="h-wrapper">
                {
                  hovering ?
                    <div className="center-align">
                      <button onClick={() => removeItem(item.key)} />
                      <span className="label">{item.label}</span>
                    </div> :
                    <span className="label">{item.label}</span>
                }
              </div>
              <div className="wrap">
                <span className="duration">{formattedDate}</span>
                <span className="duration"> | </span>
                <span className="duration">{formatTime(item.duration)}</span>
              </div>
            </div>
            <div className="children">
              {items.filter(a => a.data.parent === item.key).map((b) => (
                <Item itemKey={b.key} item={b} updated={updated} selectedItem={selectedItem} selectItem={selectItem} key={b.key} className="child" />
              ))}
            </div>
            <div className="center-align tag">
              {hovering && item.data.parent === '' && <button className="add-subtask" onClick={e => setAddSubtask(true)}>Add subtask</button>}
              {item.data.tag.label !== "NULL" && <span className="tag" style={{ backgroundColor: item.data.tag.color }}>{item.data.tag.label}</span>}
            </div>
          </div>
      {/* } */}
    </div>
  );
};

export { Item as default };

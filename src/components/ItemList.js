import React, { useContext, useState } from 'react';
import ProfileContext from '../context/ProfileContext';
import Item from './Item';
import daysIntoYear from '../helper-functions/daysIntoYear';

function recalculateSizes(items) {
  let a = 9999;
  let b = -1;
  items
    .filter(item => !item.completed)
    .forEach(e => {
      const d = parseInt(e.duration);
      if (d <= a) a = d;
      if (d >= b) b = d;
    })
  return [a, b]
}

const ItemList = ({ sort, select, selectedItem, completed }) => {
  const { profile, profileDispatch } = useContext(ProfileContext);
  const [, setToggle] = useState(true);
  let [min, max] = recalculateSizes(profile.items);
  recalculateSizes(profile.items);

  const updated = () => {
    setToggle(toggle => !toggle);
  }

  switch (sort) {
    case "DURATION":
      profile.items.sort((a, b) => (parseInt(a.duration) > parseInt(b.duration)) ? 1 : ((parseInt(b.duration) > parseInt(a.duration)) ? -1 : 0))
      break;
    case "DATE":
      // profile.items.sort((a, b) => daysIntoYear(new Date(a.data.date)) > daysIntoYear(new Date(b.data.date)) ? 1 : (daysIntoYear(new Date(b.data.date)) > daysIntoYear(new Date(a.data.date)) ? -1 : 0))
      break;
    case "TAG":
      profile.items.sort((a, b) => {
        if (!a.data.tag) return -1;
        if (!b.data.tag) return -1;
        return a.data.tag.localeCompare(b.data.tag, 'en')
      })
      break;
    default:
      profile.items.sort((a, b) => a.label.localeCompare(b.label, 'en'))
      break;
  }

  return (
    <div className="items-container glassy view-section" onDragOver={e => e.preventDefault()} onDrop={e => {
      e.preventDefault();
      const card_id = e.dataTransfer.getData('card_id');
      const item = profile.items.filter(item => item.key === card_id)[0];
      if (completed !== item.completed) {
        profileDispatch({ type: 'COMPLETE_ITEM', payload: { completedItem: card_id, completeStatus: completed } });
      } else {
        const payload = {
          parent: '',
          child: card_id,
          oldParent: item.data.parent
        }
        profileDispatch({ type: 'ADD_CHILD', payload })
      }
    }}>
      { completed ? profile.items
        .filter((item) => item.data.parent === '')
        .filter(item => item.completed)
        .map((item) => (
          <Item key={item.key} item={item} min={min} max={max} updated={updated} selectItem={select} selectedItem={selectedItem} />
        )) :
        (sort === "TODAY") ?
          profile.items
            .filter((item) => item.data.parent === '')
            .filter(item => !item.completed)
            .filter((item) => daysIntoYear(new Date(item.data.date)) - daysIntoYear(new Date()) === 0)
            .map((item) => (
              <Item key={item.key} item={item} min={min} max={max} updated={updated} selectItem={select} selectedItem={selectedItem} />
            )) :
          profile.items
            .filter((item) => item.data.parent === '')
            .filter(item => !item.completed)
            .map((item) => (
              <Item key={item.key} item={item} min={min} max={max} updated={updated} selectItem={select} selectedItem={selectedItem} />
            ))
      }
    </div>
  );
}

export { ItemList as default };

import React, { useContext, useState, useEffect } from 'react';
import ProfileContext from '../context/ProfileContext';
import Item from './Item';
import daysIntoYear from '../helper-functions/daysIntoYear';
import modifyItem from '../helper-functions/modifyItem';

function recalculateSizes(items) {
  let a = 9999;
  let b = -1;
  items.forEach(e => {
    const d = parseInt(e.duration);
    if (d <= a) a = d;
    if (d >= b) b = d;
  })
  return [a, b]
}

const ItemList = ({ sort, select, selectedItem }) => {
  const { profile, profileDispatch } = useContext(ProfileContext);
  const [, setToggle] = useState(true);
  const today = daysIntoYear(new Date());
  let [min, max] = recalculateSizes([profile.items]);
  recalculateSizes(profile.items);
  
  const updated = () => {
    setToggle(toggle => !toggle);
  }

  switch (sort) {
    case "DURATION":
      profile.items.sort((a, b) => (parseInt(a.duration) > parseInt(b.duration)) ? 1 : ((parseInt(b.duration) > parseInt(a.duration)) ? -1 : 0))
      break;
    case "DATE":
      profile.items.sort((a, b) => (parseInt(a.data.date.day) > parseInt(b.data.date.day)) ? 1 : ((parseInt(b.data.date.day) > parseInt(a.data.date.day)) ? -1 : 0))
      break;
    case "TAG":
      profile.items.sort((a, b) => {
        if (!a.data.tag) return -1;
        if (!b.data.tag) return -1;
        return a.data.tag.label.localeCompare(b.data.tag.label, 'en')
      })
      break;
    default:
      break;
  }

  return (
    <div className="items-container glassy">
      <button onClick={() => console.log(profile.items)}>Print items</button>
      <button onClick={() => profileDispatch({ type: 'CLEAR_ALL', payload: null })}>Clear items</button>
      {
        (sort === "TODAY") ?
          profile.items.filter((item) => item.data.parent === '').filter((item) => item.data.date.dayInYear - today === 0)
            .map((item) => (
              <Item key={item.key} item={item} min={min} max={max} updated={updated} selectItem={select} selectedItem={selectedItem} />
            )) :
          profile.items.filter((item) => item.data.parent === '').map((item) => (
            <Item key={item.key} item={item} min={min} max={max} updated={updated} selectItem={select} selectedItem={selectedItem} />
          ))
      }
    </div>
  );
}

export { ItemList as default };

import React, { useContext, useState } from 'react';
import ItemsContext from '../context/items-context';
import Item from './Item';
import daysIntoYear from '../helper-functions/daysIntoYear';

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
  const { items } = useContext(ItemsContext);
  const [, setToggle] = useState(true);
  const today = daysIntoYear(new Date());
  let [min, max] = recalculateSizes(items);
  
  recalculateSizes(items);

  const updated = () => {
    setToggle(toggle => !toggle);
  }

  switch (sort) {
    case "DURATION":
      items.sort((a, b) => (parseInt(a.duration) > parseInt(b.duration)) ? 1 : ((parseInt(b.duration) > parseInt(a.duration)) ? -1 : 0))
      break;
    case "DATE":
      items.sort((a, b) => (parseInt(a.data.date.day) > parseInt(b.data.date.day)) ? 1 : ((parseInt(b.data.date.day) > parseInt(a.data.date.day)) ? -1 : 0))
      break;
    case "TAG":
      items.sort((a, b) => {
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
      {
        (sort === "TODAY") ?
          items.filter((item) => item.data.date.dayInYear - today === 0)
          .map((item) => (
            <Item key={item.key} item={item} min={min} max={max} updated={updated} selectItem={select} isSelected={item.key === selectedItem}/>
          )) :
          items.map((item) => (
            <Item key={item.key} item={item} min={min} max={max} updated={updated} selectItem={select} isSelected={item.key === selectedItem}/>
          ))
      }
    </div>
  );
};

export { ItemList as default };

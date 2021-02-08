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


const ItemList = ({ sort }) => {
  const { items } = useContext(ItemsContext);
  const [, setToggle] = useState(true);
  const today = daysIntoYear(new Date());
  let [min, max] = recalculateSizes(items);
  recalculateSizes(items);
  const updated = () => {
    setToggle(toggle => !toggle);
  }

  if (sort === "DURATION")
    items.sort((a, b) => (parseInt(a.duration) > parseInt(b.duration)) ? 1 : ((parseInt(b.duration) > parseInt(a.duration)) ? -1 : 0))
  else if (sort === "DATE")
    items.sort((a, b) => (parseInt(a.data.date.day) > parseInt(b.data.date.day)) ? 1 : ((parseInt(b.data.date.day) > parseInt(a.data.date.day)) ? -1 : 0))
  else if (sort === "TAG") {
    items.sort((a, b) => {
      if (!a.data.tag) return -1;
      if (!b.data.tag) return -1;
      console.log(a.data.tag.label.localeCompare(b.data.tag.label, 'en'))
      return a.data.tag.label.localeCompare(b.data.tag.label, 'en')
    })
  } else if (sort === "TODAY") {
    items.filter((item) => item.data.date.dayInYear - today === 0)
  }

  return (
    <div className="items-container glassy">
      {
        (sort === "TODAY") ? items
          .filter((item) => item.data.date.dayInYear - today === 0)
          .map((item) => (
            <Item key={item.key} item={item} min={min} max={max} updated={updated} />
          )) :
          items.map((item) => (
            <Item key={item.key} item={item} min={min} max={max} updated={updated} />
          ))
      }
    </div>
  );
};

export { ItemList as default };

import React, { useContext, useState } from 'react';
import ItemsContext from '../context/items-context';
import Item from './Item';

const ItemList = () => {
  const { items } = useContext(ItemsContext);
  function recalculateSizes() {
    let min = 9999;
    let max = -1;
    items.forEach(e => {
      if (e.duration <= min) min = e.duration;
      if (e.duration >= max) max = e.duration;
    })

    return [min, max]

  }
  let [min, max] = recalculateSizes();
  
  const [,setToggle] = useState(true);
  
  const updated = () => {
    setToggle(toggle => !toggle);
  }
  return (
    <div className="items-container">
        {items.map((item) => (
          <Item key={item.key} item={item} min={min} max={max} updated={updated}/>
        ))}
    </div>
  );
};

export { ItemList as default };

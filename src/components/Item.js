import React, { useContext, useState } from 'react';
import ProfileContext from '../context/ProfileContext';
import calculateHeight from '../helper-functions/calculateHeight'
import formatTime from '../helper-functions/formatTime'
import daysIntoYear from '../helper-functions/daysIntoYear';
import AnimateHeight from 'react-animate-height';

const findColor = (label, labels, theme) => {
  const element = labels.filter(e => e.label === label)[0];
  console.log(theme)
  if (element) return element.color;
  else return theme === 'dark' ? 'rgb(50, 50, 50)' : 'rgb(50, 50, 50)';

}

const Item = ({ item, min, max, updated, selectItem, selectedItem, className }) => {
  const { profile, profileDispatch } = useContext(ProfileContext);
  const today = daysIntoYear(new Date());
  const [hovering, setHovering] = useState(false);
  const [collapse, setCollapse] = useState(false);

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
      item.data.children.forEach(childKey => profileDispatch({ type: 'REMOVE_ITEM', itemToBeDeleted: key }));
    }
    profileDispatch({ type: 'REMOVE_ITEM', itemToBeDeleted: key });
  }

  const drop = e => {
    e.preventDefault();
    const card_id = e.dataTransfer.getData('card_id');
    if (card_id !== item.key && card_id !== item.data.parent && !item.data.children.includes(card_id)) {
      const payload = {
        parent: item.key,
        child: card_id
      }
      profileDispatch({ type: 'ADD_CHILD', payload })
    }
  }

  const dragStart = e => {
    const target = e.target;
    e.dataTransfer.setData('card_id', target.id);
    setTimeout(() => { }, 0)
  }
  let color = '';
  color = `${findColor(item.data.tag, profile.prefs.general.tags, profile.prefs.appearence.theme)}`;

  return (
    <div className={'bob'}>
      <div className="item glassy-inner" id={item.key}
        style={{
          minHeight: calculateHeight(item.duration, min, max, profile.prefs.appearence.style === 'Compact'),
          backgroundColor: profile.prefs.appearence.style === 'Vibrant' && color
        }}
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
            <div className="v-wrapper">
              <div className="center-align">
                <button onClick={() => removeItem(item.key)} />
                <span className={`label ${item.data.children.length > 0 && 'parent-label'}`}>{item.label}</span>
                {collapse && <>{`${item.data.children.length} tasks`}</>}
              </div>
              {hovering && item.data.children.length > 0 && <div className="collapse" onClick={e => { e.stopPropagation(); setCollapse(collapse => !collapse) }}>Collapse...</div>}
            </div>
            
          </div>
          <div className="wrap">
            <span className="duration">{formattedDate}</span>
            {item.data.children.length === 0 && <span className="duration"> | </span>}
            {item.data.children.length === 0 && <span className="duration">{formatTime(item.duration)}</span>}
          </div>
        </div>
        {collapse ? <></> :
          <div className="children">
            {profile.items.filter(a => a.data.parent === item.key).map((b) => (
              <Item itemKey={b.key} item={b} min={min} max={max} updated={updated} selectedItem={selectedItem} selectItem={selectItem} key={b.key} className="child" />
            ))}
          </div>
        }
        <div className="center-align tag">
          {item.data.tag !== "NULL" && <span className="tag" style={{ backgroundColor: profile.prefs.appearence.style !== 'Monotone' && color }}>{item.data.tag}</span>}
        </div>
      </div>
    </div>
  );
};

export { Item as default };

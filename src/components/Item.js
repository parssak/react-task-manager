import React, { useContext, useState } from 'react';
import ProfileContext from '../context/ProfileContext';
import calculateHeight from '../helper-functions/calculateHeight'
import formatTime from '../helper-functions/formatTime'
import daysIntoYear from '../helper-functions/daysIntoYear';

const findColor = (label, labels, theme) => {
  const element = labels.filter(e => e.label === label)[0];
  if (element) return element.color;
  else return theme === 'dark' ? 'rgb(50, 50, 50)' : 'hsl(0, 0%, 80%)';
}

const Duration = ({ item, theme }) => {
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

  return (<div className="wrap">
    <span className="duration" style={{ color: (theme === 'Vibrant' || theme === 'Compact') && 'white' }}>{formattedDate}</span>
    {item.data.children.length === 0 && <span className="duration" style={{ color: (theme === 'Vibrant' || theme === 'Compact') && 'white'}}> | </span>}
    {item.data.children.length === 0 && <span className="duration" style={{ color: (theme === 'Vibrant' || theme === 'Compact') && 'white' }}>{formatTime(item.duration)}</span>}
  </div>)
}

const Item = ({ item, min, max, updated, selectItem, selectedItem, className }) => {
  const { profile, profileDispatch } = useContext(ProfileContext);
  const [hovering, setHovering] = useState(false);
  const [collapse, setCollapse] = useState(false);

  function removeItem(key) {
    if (item.data.children.length > 0) {
      item.data.children.forEach(childKey => profileDispatch({ type: 'REMOVE_ITEM', itemToBeDeleted: key }));
    }
    profileDispatch({ type: 'REMOVE_ITEM', itemToBeDeleted: key });
  }

  function completeItem(key) {
    profileDispatch({ type: 'COMPLETE_ITEM', payload: { completedItem: key, completeStatus: !item.completed } });
  }

  const drop = e => {
    e.preventDefault();
    e.stopPropagation();

    const card_id = e.dataTransfer.getData('card_id');
    let p = profile.items.filter(a => a.key === item.key)[0];
    let isRecursiveChild = false;
    while (p && p.key !== '' && !isRecursiveChild) {
      console.log(p.key, item.key);
      if (p.key === '') { console.log('empty string'); break; }
      if (p.key === card_id) {
        isRecursiveChild = true;
        break;
      }
      const pParent = p.data.parent;
      p = profile.items.filter(b => b.key === pParent)[0];

    }
    if (!isRecursiveChild) {
      console.log('eligible', p)
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
          backgroundColor: profile.prefs.appearence.style !== 'Monotone' && profile.prefs.appearence.style !== 'Regular' && color,
          padding: profile.prefs.appearence.style === 'Compact' && '0.3rem'
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
        onDragOver={e => { e.preventDefault(); }}
        onDragStart={e => dragStart(e)}
        onDrop={e => drop(e)}
      >
        <div className="text-wrapper">
          <div className="center-align">
            <button onClick={() => completeItem(item.key)} style={{ backgroundColor: item.completed && 'rgb(78, 194, 117)' }} />
            <div className="v-wrapper">
              <span className={`label ${item.data.children.length > 0 && 'parent-label'}`} style={{ fontSize: profile.prefs.appearence.style === 'Compact' && '1.2rem', color: (profile.prefs.appearence.style === 'Vibrant' || profile.prefs.appearence.style === 'Compact') && 'white'}}>{item.label}</span>
              <Duration item={item} theme={profile.prefs.appearence.style}/>
            </div>
          </div>
        </div>

        {!collapse &&
          <div className="children">
            {profile.items.filter(a => a.data.parent === item.key).map((b) => (
              <Item itemKey={b.key} item={b} min={min} max={max} updated={updated} selectedItem={selectedItem} selectItem={selectItem} key={b.key} className="child" />
            ))}
          </div>
        }
        {hovering && item.data.children.length > 0 && <div className="collapse" onClick={e => { e.stopPropagation(); setCollapse(collapse => !collapse) }}>{!collapse ? 'Collapse...' : 'Expand'}</div>}
        <div className="center-align tag">
          <svg onClick={() => hovering && removeItem(item.key)} style={{ fill: !hovering ? 'transparent' : 'white'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="1.5rem" height="1.5rem"><path d="M 21 2 C 19.354545 2 18 3.3545455 18 5 L 18 7 L 10.154297 7 A 1.0001 1.0001 0 0 0 9.984375 6.9863281 A 1.0001 1.0001 0 0 0 9.8398438 7 L 8 7 A 1.0001 1.0001 0 1 0 8 9 L 9 9 L 9 45 C 9 46.645455 10.354545 48 12 48 L 38 48 C 39.645455 48 41 46.645455 41 45 L 41 9 L 42 9 A 1.0001 1.0001 0 1 0 42 7 L 40.167969 7 A 1.0001 1.0001 0 0 0 39.841797 7 L 32 7 L 32 5 C 32 3.3545455 30.645455 2 29 2 L 21 2 z M 21 4 L 29 4 C 29.554545 4 30 4.4454545 30 5 L 30 7 L 20 7 L 20 5 C 20 4.4454545 20.445455 4 21 4 z M 11 9 L 18.832031 9 A 1.0001 1.0001 0 0 0 19.158203 9 L 30.832031 9 A 1.0001 1.0001 0 0 0 31.158203 9 L 39 9 L 39 45 C 39 45.554545 38.554545 46 38 46 L 12 46 C 11.445455 46 11 45.554545 11 45 L 11 9 z M 18.984375 13.986328 A 1.0001 1.0001 0 0 0 18 15 L 18 40 A 1.0001 1.0001 0 1 0 20 40 L 20 15 A 1.0001 1.0001 0 0 0 18.984375 13.986328 z M 24.984375 13.986328 A 1.0001 1.0001 0 0 0 24 15 L 24 40 A 1.0001 1.0001 0 1 0 26 40 L 26 15 A 1.0001 1.0001 0 0 0 24.984375 13.986328 z M 30.984375 13.986328 A 1.0001 1.0001 0 0 0 30 15 L 30 40 A 1.0001 1.0001 0 1 0 32 40 L 32 15 A 1.0001 1.0001 0 0 0 30.984375 13.986328 z" /></svg>
          {collapse && <div className={'task-count'}>{`${item.data.children.length} tasks`}</div>}
          {item.data.tag !== "NULL" && <span className="tag" style={{ backgroundColor: profile.prefs.appearence.style !== 'Monotone' && color, fontSize: profile.prefs.appearence.style === 'Compact' && '0.9rem' }}>{item.data.tag}</span>}
        </div>
      </div>
    </div>
  );
};


export { Item as default };

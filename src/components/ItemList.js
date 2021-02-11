import React, { useContext, useState } from 'react';
import ItemsContext from '../context/items-context';
import Item from './Item';
import daysIntoYear from '../helper-functions/daysIntoYear';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

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

const getItems = items =>
  Array.from({ length: 10 }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));


const ItemList = ({ sort, select, selectedItem }) => {
  const { items } = useContext(ItemsContext);
  const [, setToggle] = useState(true);
  const today = daysIntoYear(new Date());
  let [min, max] = recalculateSizes(items);

  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    setDisplayItems(items => reorder(
      items,
      result.source.index,
      result.destination.index
    ));
  }

  const [displayItems, setDisplayItems] = useState(getItems(items));

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
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {displayItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {
        (sort === "TODAY") ?
          items.filter((item) => item.data.date.dayInYear - today === 0)
            .map((item) => (
              <Item key={item.key} item={item} min={min} max={max} updated={updated} selectItem={select} isSelected={item.key === selectedItem} />
            )) :
          items.map((item) => (
            <Item key={item.key} item={item} min={min} max={max} updated={updated} selectItem={select} isSelected={item.key === selectedItem} />
          ))
      }
    </div>
  );
};

export { ItemList as default };

import React, { useState } from 'react';
import ItemList from './ItemList';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
// fake data generator

const ItemListView = ({ sort, selectItem, selectedItem }) => {

    return (
        <div className="item-list-view" >

            <ItemList sort={sort} select={selectItem} selectedItem={selectedItem} />
        </div>
    );
}

export default ItemListView;

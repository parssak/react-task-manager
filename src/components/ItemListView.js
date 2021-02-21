import React, { useState } from 'react';
import ItemList from './ItemList';
import AddItemForm from './AddItemForm';

const ItemListView = ({ sort, showCompleted, selectItem, selectedItem }) => {
    return (
        <div className={`item-list-view v-wrapper`}>
            <div className="lists">
                <ItemList sort={sort} select={selectItem} selectedItem={selectedItem} completed={false} />
                {showCompleted && <ItemList sort={sort} select={selectItem} selectedItem={selectedItem} completed={true} />}
            </div>
            <div className="fixed-bottom">
                <AddItemForm />
            </div>
        </div>
    );
}

export default ItemListView;

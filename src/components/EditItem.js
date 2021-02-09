import React, { useContext, useEffect, useState } from 'react';
import ItemsContext from '../context/items-context';
import { EditText, EditTextarea } from 'react-edit-text';

const EditItem = ({ itemKey }) => {
    const { items, itemsDispatch } = useContext(ItemsContext);
    
    const [label, setLabel] = useState("");
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        // set up
        const selectedItem = items.filter(item => item.key === itemKey)[0];
        setLabel(selectedItem.label);
        setDuration(selectedItem.duration);
    }, [itemKey])
    

    const updateItem = () => {
        console.log(12, "thats a numver", parseInt(duration))
        const payload = {
            key: itemKey,
            label: label,
            duration: duration,
            data: items.filter(item => item.key === itemKey)[0].data
        }
        console.log("New payload is:", payload)
        itemsDispatch({ type: 'EDIT_ITEM', payload })
    }
    return (
        <div className="edit-item glassy">
            <EditText className="item-name" inline value={label} onChange={e => setLabel(e)} onSave={updateItem} />
            <EditText className="item-name" inline value={duration.toString()} onChange={e => setDuration(e)} onSave={updateItem} />
            {/* <p>{duration}</p> */}
        </div>
    );
}

export default EditItem;

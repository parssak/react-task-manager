import React, { useContext, useEffect, useState } from 'react';
import ProfileContext from '../context/ProfileContext';
import { EditText } from 'react-edit-text';
import DatePicker from 'react-date-picker';
import Select from "react-dropdown-select";
import AddItemForm from './AddItemForm';
import modifyItem from '../helper-functions/modifyItem';

const EditItem = ({ itemKey, cancel }) => {
    const { profile, profileDispatch } = useContext(ProfileContext);
    const [tag, setTag] = useState('NULL');
    const [label, setLabel] = useState("");
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());
    const [children, setChildren] = useState([]);
    const [parent, setParent] = useState('');

    useEffect(() => {
        // set up
        const selectedItem = profile.items.filter(item => item.key === itemKey)[0];
        if (selectedItem === undefined) {
            cancel()
            return
        }
        console.log(selectedItem);
        setLabel(selectedItem.label);
        setDuration(selectedItem.duration);
        let date = new Date(`${selectedItem.data.date.month.substring(0, 3)} ${selectedItem.data.date.day}, ${selectedItem.data.date.year}`)
        setTag(selectedItem.data.tag)
        setDate(date);
        setChildren(selectedItem.data.children);
        setParent(selectedItem.data.parent);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemKey])

    const changeDate = e => {
        setDate(e);
    }

    function addedSubtask(childKey) {
        console.log("added subtask ", childKey);
        setChildren([...children, childKey]);
    }

    useEffect(() => {
        updateItem()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date, tag, children])

    const updateItem = () => {
        const payload = modifyItem(label, duration, tag, date, children, parent, itemKey);
        profileDispatch({ type: 'EDIT_ITEM', payload })
    }

    const deleteItem = () => {
        profileDispatch({ type: 'REMOVE_ITEM', itemToBeDeleted: itemKey });
    }

    return (
        <div className="edit-item" onDoubleClick={() => { cancel() }}>
            <div className="glassy-without">
                <div className="top-portion edit-item-top">
                    <EditText className="item-name" inline value={label} onChange={e => setLabel(e)} onSave={updateItem} />
                    <div className="h-wrapper">
                        <button onClick={() => { deleteItem() }}>Delete</button>
                        <button onClick={() => { cancel() }}>Cancel</button>
                    </div>
                </div>
                <div className="edit-item-top">
                    <EditText type='number' className="item-duration" inline value={duration.toString()} onChange={e => setDuration(e)} onSave={updateItem} />
                    <DatePicker onChange={changeDate} value={date} calendarIcon={null} clearIcon={null} calendarClassName="date-picker-calendar" className="date-picker" />
                    <Select options={profile.prefs.general.tags} onChange={(value) => setTag(value[0].value)} wrapperClassName={"selector"} className={"selector glassy-inner"} placeholder={tag} />

                </div>
            </div>
            <AddItemForm subtaskKey={itemKey} addedSubtask={addedSubtask} addingSubtask />
        </div>
    );
}

export default EditItem;

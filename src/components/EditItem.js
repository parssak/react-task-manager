import React, { useContext, useEffect, useState, useCallback } from 'react';
import ProfileContext from '../context/ProfileContext';
import { EditText } from 'react-edit-text';
import DatePicker from 'react-date-picker';
import Select from "react-dropdown-select";
import AddItemForm from './AddItemForm';
import modifyItem from '../helper-functions/modifyItem';

const EditItem = ({ itemKey, cancel, focusMode }) => {
    const { profile, profileDispatch } = useContext(ProfileContext);
    const [tag, setTag] = useState('NULL');
    const [label, setLabel] = useState("");
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());
    const [children, setChildren] = useState([]);
    const [parent, setParent] = useState('');
    const [createdDate, setCreatedDate] = useState('');
    const [completedDate, setCompletedDate] = useState('');

    useEffect(() => {
        // set up
        const selectedItem = profile.items.filter(item => item.key === itemKey)[0];
        if (selectedItem === undefined) {
            document.getElementById("editItem").style.width = "0";
            document.getElementById("editItem").style.padding = "0";
            document.getElementById("main").style.marginRight = "0";
            cancel()
            return
        }
        let sideBarWidth = "25ch"
        if (itemKey !== null) {
            document.getElementById("editItem").style.width = sideBarWidth;
            document.getElementById("editItem").style.height = '500px';
            document.getElementById("main").style.marginRight = sideBarWidth;
            document.getElementById("editItem").style.padding = "initial";
        }

        setLabel(selectedItem.label);
        setDuration(selectedItem.duration);
        setTag(selectedItem.data.tag)
        setDate(new Date(selectedItem.data.date));
        setChildren(selectedItem.data.children);
        setParent(selectedItem.data.parent);
        setCreatedDate(selectedItem.data.created_on);
        setCompletedDate(selectedItem.data.completedDate);
        setCompletedDate(selectedItem.data.created_on);
        setCompletedDate(selectedItem.data.completed_on);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemKey])

    const changeDate = e => {
        if (e !== date) {
            setDate(e);
        }
    }

    function addedSubtask(childKey) {
        setChildren([...children, childKey]);
    }


    const updateItem = useCallback(() => {
        if (label !== '') {
            const payload = modifyItem(label, duration, tag, date.toDateString(), children, parent, itemKey, createdDate, completedDate);
            profileDispatch({ type: 'EDIT_ITEM', payload })
        }
    }, [children, completedDate, createdDate, date, duration, itemKey, label, parent, profileDispatch, tag])

    const deleteItem = () => {
        profileDispatch({ type: 'REMOVE_ITEM', itemToBeDeleted: itemKey });
        cancel();
    }
    useEffect(() => {
        updateItem()
    }, [tag, updateItem])
    return (
        <div id="editItem" className="sidebar right edit-item" onDoubleClick={() => { cancel() }}>
            <div className="top-portion edit-item-section">
                <EditText className="item-name" inline value={label} placeholder={"Task"} onChange={e => setLabel(e)} onSave={updateItem} />
            </div>
            <div className="edit-item-section">
                <label>Duration</label>
                <EditText type='number' className="item-duration  right-margin" inline value={duration.toString()} onChange={e => setDuration(e)} onSave={updateItem} />
            </div>
            <div className="edit-item-section">
                <label>Date</label>
                <input type="date" name="date-picker" id="dp"/>
                {/* <DatePicker onChange={e => changeDate(e)} value={date} calendarIcon={null} clearIcon={null} calendarClassName="date-picker-calendar" className="date-picker  right-margin" /> */}
            </div>
            <div className="edit-item-section">
                <label>Tag</label>
                <Select
                    options={profile.prefs.general.tags}
                    onChange={(value) => setTag(value[0].value)}
                    wrapperClassName={"selector"}
                    className={"selector glassy-inner"}
                    placeholder={tag}
                />
            </div>
            <div className="edit-item-section">
                <div className="h-wrapper">
                <button onClick={() => { deleteItem() }}>Delete</button>
                <button onClick={() => { cancel() }}>Cancel</button>
                </div>
            </div>
            <div className="edit-item-section">
                <button onClick={() => focusMode(itemKey)}>Focus Mode</button>
            </div>
            {/* <AddItemForm subtaskKey={itemKey} addedSubtask={addedSubtask} addingSubtask /> */}
            <p className="edit-item-section">{`Created on ${createdDate}`}</p>
        </div>
    );
}

export default EditItem;

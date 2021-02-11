import React, { useContext, useEffect, useState } from 'react';
import ItemsContext from '../context/items-context';
import { EditText } from 'react-edit-text';
import DatePicker from 'react-date-picker';
import getDateValues from '../helper-functions/getDateValues';
import Select from "react-dropdown-select";
import { options } from '../helper-functions/options';

const EditItem = ({ itemKey, cancel }) => {
    const { items, itemsDispatch } = useContext(ItemsContext);
    const [tag, setTag] = useState('');
    const [label, setLabel] = useState("");
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        // set up
        const selectedItem = items.filter(item => item.key === itemKey)[0];
        setLabel(selectedItem.label);
        setDuration(selectedItem.duration);
        let date = new Date(`${selectedItem.data.date.month.substring(0, 3)} ${selectedItem.data.date.day}, ${selectedItem.data.date.year}`)
        setTag(selectedItem.data.tag)
        setDate(date);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemKey])

    const changeDate = e => {
        setDate(e);
    }

    useEffect(() => {
        updateItem()
    }, [date, tag])

    const updateItem = () => {
        const [day, month, year, dayOfWeek, formattedDate, dateString, dayInYear] = getDateValues(date);
        console.log(day, month, year, dayOfWeek, tag[0]);
        const payload = {
            key: itemKey,
            label: label,
            duration: duration,
            data: {
                tag: tag[0] || tag,
                date: {
                    day,
                    month,
                    year,
                    dayOfWeek,
                    formattedDate,
                    dateString,
                    dayInYear
                }
            }
        }
        console.log("New payload is:", payload)
        itemsDispatch({ type: 'EDIT_ITEM', payload })
    }
    return (
        <div className="edit-item glassy" onDoubleClick={() => { cancel() }}>
            <div className="edit-item-top">
                <EditText className="item-name" inline value={label} onChange={e => setLabel(e)} onSave={updateItem} />
                <button onClick={() => { cancel() }}>Cancel</button>
            </div>
            <EditText type='number' className="item-duration" inline value={duration} onChange={e => setDuration(e)} onSave={updateItem} />
            <div className="edit-item-top">
                <Select options={options} onChange={(value) => setTag(value)}
                    wrapperClassName={"selector"} className={"selector glassy-inner"} placeholder={tag.label} />
                <DatePicker onChange={changeDate} value={date} calendarIcon={null} clearIcon={null} calendarClassName="date-picker-calendar" className="date-picker" />
            </div>
        </div>
    );
}

export default EditItem;

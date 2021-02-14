import getDateValues from '../helper-functions/getDateValues';

export default function modifyItem(label, duration, tag, date, children, parent, key) {
    const [day, month, year, dayOfWeek, formattedDate, dateString, dayInYear] = getDateValues(date);
    // console.log(day, month, year, dayOfWeek, formattedDate, dateString, dayInYear);
    const item = {
        label: label,
        duration: duration,
        data:
        {
            tag: tag || { label: "NULL" },
            date: {
                day,
                month,
                year,
                dayOfWeek,
                formattedDate,
                dateString,
                dayInYear
            },
            parent: parent,
            children: children
        },
        key: key
    }
    return item;
}
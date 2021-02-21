export default function modifyItem(label, duration, tag, date, children, parent, key, created_on, completed_on) {
    const item = {
        label: label,
        duration: duration,
        data:
        {
            tag: tag || { label: "NULL" },
            date: date,
            created_on: created_on,
            completed_on: completed_on,
            parent: parent,
            children: children
        },
        key: key
    }
    return item;
}
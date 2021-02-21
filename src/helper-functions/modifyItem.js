export default function modifyItem(label, duration, tag, date, children, parent, key) {
    const item = {
        label: label,
        duration: duration,
        data:
        {
            tag: tag || { label: "NULL" },
            date: date,
            parent: parent,
            children: children
        },
        key: key
    }
    return item;
}
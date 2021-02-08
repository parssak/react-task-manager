import daysIntoYear from './daysIntoYear';
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
/**
 * 
 * @param {data} date 
 * @return [day, month, year, dayOfWeek, formattedDate, dateString, dayInYear]
 */
export default function getDateValues(date) {
    const day = date.getDate();
    const dayOfWeek = date.getDay();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const dayOfWeekFormatted = daysOfWeek[dayOfWeek];
    const formattedDate = `${dayOfWeekFormatted}, ${month} ${day}`;
    const dateString = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    const dayInYear = daysIntoYear(date);
    return [day, month, year, dayOfWeek, formattedDate, dateString, dayInYear]
}
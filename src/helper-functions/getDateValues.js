// import daysIntoYear from './daysIntoYear';
// const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
// /**
//  * 
//  * @param {data} date 
//  * @return [day, month, year, dayOfWeek, formattedDate, dateString, dayInYear]
//  */
// export default function getDateValues(date) {
//     if (date.formattedDate !== undefined) {
//         return [date.day, date.month, date.year, date.dayOfWeek, date.formattedDate, date.dateString, date.dayInYear]
//     } 
//     const day = date.getDate();
//     const dayOfWeek = date.getDay();
//     const month = date.toLocaleString('default', { month: 'short' }).substring(0,3);
//     const year = date.getFullYear();
//     const dayOfWeekFormatted = daysOfWeek[dayOfWeek];
//     const formattedDate = `${dayOfWeekFormatted}, ${month} ${day}`;
//     const dateString = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
//     const dayInYear = daysIntoYear(date);
//     return [day, month, year, dayOfWeek, formattedDate, dateString, dayInYear]
// }
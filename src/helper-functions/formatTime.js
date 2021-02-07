export default function formatTime(minutes) {
    if (minutes < 60) return `${minutes}min`
    const hours = Math.round(minutes / 60);
    const remainder = minutes % 60;
    return `${hours}hr${remainder}min`;

}
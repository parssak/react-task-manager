export default function formatTime(minutes) {
    if (minutes < 60) return `${minutes}min`
    const hours = Math.round(minutes / 60);
    const remainder = minutes % 60;
    if (remainder === 0) return `${hours}hr`;
    else if (hours === 0) return `${remainder}min`;
    return `${hours}hr${remainder}min`;
}

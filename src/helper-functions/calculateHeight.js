const GROWBASE = 10;      // rem
const MAX = 15;
const BASELINE = 0.5;  // rem

export default function calculateHeight(duration, minDuration, maxDuration) {
    duration = parseInt(duration);
    let normalized = maxDuration - minDuration;
    let height = GROWBASE;
    if ((normalized === 0) || (duration === minDuration)) {
        height = BASELINE;
    } else {
        let diff = duration / maxDuration;
        height *= diff;
    }
    height = height > MAX ? MAX : height;
    console.log(height);
    return `${height}rem`;
}
const BASELINE = 1;  // rem
const GROWBASE = 7;      // rem
const MIN = 2;
const MAX = 10;

export default function calculateHeight(duration, minDuration, maxDuration) {
    let normalized = maxDuration - minDuration;
    let height = GROWBASE;
    if ((normalized === 0) || (duration === minDuration)) {
        height = BASELINE;
    } else {

        let diff = duration / maxDuration;
        height *= diff;
    }
    height = height > MAX ? MAX : height;
    height = height < MIN ? MIN : height;
    console.log(height);
    return `${height}rem`;
}
let GROWBASE = 7;      
const MAX = 20;
const BASELINE = 0.5;  

export default function calculateHeight(duration, minDuration, maxDuration, isCompact) {
    duration = parseInt(duration);
    if (isCompact) { GROWBASE = 4; console.log('msdfmksdkfmsd'); }
    
    let normalized = maxDuration - minDuration;
    let height = GROWBASE;
    if ((normalized === 0) || (duration === minDuration)) {
        height = BASELINE;
    } else {
        let diff = duration / maxDuration;
        height *= diff;
    }
    height = height > MAX ? MAX : height;
    return `${height}rem`;
}
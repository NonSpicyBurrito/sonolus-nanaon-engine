type Seconds = number | [min: number, max: number]

const fromSeconds = (perfect: Seconds, great: Seconds, good: Seconds) => {
    const toWindow = (seconds: Seconds) =>
        typeof seconds === 'number'
            ? { min: -seconds, max: seconds }
            : { min: seconds[0], max: seconds[1] }

    return {
        perfect: toWindow(perfect),
        great: toWindow(great),
        good: toWindow(good),
    }
}

export const windows = {
    tapNote: fromSeconds(0.06, 0.1, 0.2),
    flickNote: fromSeconds(0.06, 0.1, 0.2),
    slideStartNote: fromSeconds(0.06, 0.1, 0.2),
    slideTickNote: fromSeconds([0, 0.06], [0, 0.1], [0, 0.2]),
    slideEndNote: fromSeconds(0.06, 0.1, 0.2),
    slideEndFlickNote: fromSeconds([0, 0.06], [0, 0.1], [0, 0.2]),

    minGood: -0.2,
}

import { options } from '../configuration/options.mjs'

export const note = {
    h: 0.075,

    get duration() {
        return (12 - options.noteSpeed) / 2
    },
}

export const approach = (fromTime: number, toTime: number, now: number) =>
    Math.lerp(0.1, 1, 71.7675 ** Math.remap(fromTime, toTime, -1, 0, now))

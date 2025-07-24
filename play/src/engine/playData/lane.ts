import { lane as _lane } from '../../../../shared/src/engine/data/lane.js'
import { skin } from './skin.js'

export const lane = {
    ..._lane,

    hitbox: {
        l: -2.5,
        r: 2.5,
        t: 0.5,
        b: 1.5,
    },
}

export const getHitbox = ({ l, r }: { l: number; r: number }) =>
    new Rect({
        l: l - 0.75,
        r: r + 0.75,
        b: lane.hitbox.b,
        t: lane.hitbox.t,
    }).transform(skin.transform)

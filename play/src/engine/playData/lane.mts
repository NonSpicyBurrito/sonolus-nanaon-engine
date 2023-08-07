import { skin } from './skin.mjs'

export const lane = {
    t: 0.1,
    b: 1,

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

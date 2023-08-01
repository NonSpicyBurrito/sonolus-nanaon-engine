import { layer } from '../layer.mjs'
import { scaledScreen, segment } from '../shared.mjs'
import { skin } from '../skin.mjs'
import { approach, leftRotated, rightRotated } from '../utils.mjs'

const sprites = {
    arrow: skin.sprites.flickArrow,
}

let mode = tutorialMemory(DataType<0 | 1 | 2 | 3>)

export const flickArrow = {
    update() {
        if (!mode) return

        if (mode === 1) {
            const a = Math.unlerpClamped(1, 0.75, segment.time)

            const w = 2 / 3
            const h = w * scaledScreen.wToH

            const b = 0.5 - 0.4 * h
            const t = b - h

            const gap = w * 0.75 * 0.5
            const ml = -gap
            const mr = +gap

            const l = ml - w
            const r = mr + w

            const left = leftRotated({ l, r: ml, b, t })
            const right = rightRotated({ l: mr, r, b, t })

            sprites.arrow.draw(left, layer.note.arrow, a)
            sprites.arrow.draw(right, layer.note.arrow, a)
        } else {
            const y = mode === 2 ? approach(segment.time) : 1

            const w = 1 / 3
            const h = w * scaledScreen.wToH

            const b = 1 - 0.4 * h
            const t = b - h

            const gap = w * 0.75 * 0.5
            const ml = -gap
            const mr = +gap

            const l = ml - w
            const r = mr + w

            const left = leftRotated({ l, r: ml, b, t })
            const right = rightRotated({ l: mr, r, b, t })

            sprites.arrow.draw(left.mul(y), layer.note.arrow, 1)
            sprites.arrow.draw(right.mul(y), layer.note.arrow, 1)
        }
    },

    showOverlay() {
        mode = 1
    },

    showFall() {
        mode = 2
    },

    showFrozen() {
        mode = 3
    },

    clear() {
        mode = 0
    },
}

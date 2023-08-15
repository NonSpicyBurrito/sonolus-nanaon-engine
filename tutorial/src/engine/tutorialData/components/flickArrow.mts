import { approach } from '../../../../../shared/src/engine/data/note.mjs'
import { leftRotated, rightRotated } from '../../../../../shared/src/engine/data/utils.mjs'
import { scaledScreen } from '../scaledScreen.mjs'
import { segment } from '../segment.mjs'
import { layer, skin } from '../skin.mjs'

const sprites = {
    arrow: skin.sprites.flickArrow,
}

enum Mode {
    None,
    Overlay,
    Fall,
    Frozen,
}

let mode = tutorialMemory(DataType<Mode>)

export const flickArrow = {
    update() {
        if (!mode) return

        if (mode === Mode.Overlay) {
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
            const y = mode === Mode.Fall ? approach(0, 2, segment.time) : 1

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
        mode = Mode.Overlay
    },

    showFall() {
        mode = Mode.Fall
    },

    showFrozen() {
        mode = Mode.Frozen
    },

    clear() {
        mode = Mode.None
    },
}

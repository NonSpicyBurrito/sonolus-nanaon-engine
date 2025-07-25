import { approach, note } from '../../../../../shared/src/engine/data/note.js'
import { perspectiveLayout } from '../../../../../shared/src/engine/data/utils.js'
import { segment } from '../segment.js'
import { layer, skin } from '../skin.js'

const noteSprites = {
    tapNote: skin.sprites.tapNote,
    flickNote: skin.sprites.flickNote,
    flickEndNote: skin.sprites.flickEndNote,
    slideStartNote: skin.sprites.slideStartNote,
    slideEndNote: skin.sprites.slideEndNote,
}

enum Mode {
    None,
    Overlay,
    Fall,
    Frozen,
}

let mode = tutorialMemory(DataType<Mode>)

let id = tutorialMemory(SkinSpriteId)

export const noteDisplay = {
    update() {
        if (!mode) return

        if (mode === Mode.Overlay) {
            const a = Math.unlerpClamped(1, 0.75, segment.time)

            const l = -1
            const r = 1

            const t = 0.5 - note.h * 2
            const b = 0.5 + note.h * 2

            skin.sprites.draw(id, new Rect({ l, r, t, b }), layer.note.body, a)
        } else {
            const y = mode === Mode.Fall ? approach(0, 2, segment.time) : 1

            const l = -0.5
            const r = 0.5

            const t = 1 - note.h
            const b = 1 + note.h

            skin.sprites.draw(id, perspectiveLayout({ l, r, t, b }).mul(y), layer.note.body, 1)
        }
    },

    showOverlay(type: keyof typeof noteSprites) {
        mode = Mode.Overlay
        this.setType(type)
    },

    showFall(type: keyof typeof noteSprites) {
        mode = Mode.Fall
        this.setType(type)
    },

    showFrozen(type: keyof typeof noteSprites) {
        mode = Mode.Frozen
        this.setType(type)
    },

    clear() {
        mode = Mode.None
    },

    setType(type: keyof typeof noteSprites) {
        for (const [key, sprite] of Object.entries(noteSprites)) {
            if (key !== type) continue

            id = sprite.id
        }
    },
}

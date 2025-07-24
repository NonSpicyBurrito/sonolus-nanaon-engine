import { note } from '../../../../../shared/src/engine/data/note.js'
import { perspectiveLayout } from '../../../../../shared/src/engine/data/utils.js'
import { layer, skin } from '../skin.js'

const sprites = {
    stage: skin.sprites.nanaonStage,

    slot: skin.sprites.slot,
    judgmentLine: skin.sprites.judgmentLine,

    fallback: {
        lane: skin.sprites.lane,
    },

    get useFallbackStage() {
        return !this.stage.exists
    },
}

export const stage = {
    update() {
        if (sprites.useFallbackStage) {
            this.drawFallbackStage()
        } else {
            this.drawNanaonStage()
        }

        this.drawJudgmentLine()
        this.drawSlots()
    },

    drawNanaonStage() {
        const layout = new Rect({
            l: -2.51,
            r: 2.51,
            t: 0.06,
            b: 1,
        })

        sprites.stage.draw(layout, layer.stage, 1)
    },

    drawFallbackStage() {
        for (let i = 0; i < 5; i++) {
            const layout = perspectiveLayout({
                l: i - 2.5,
                r: i - 1.5,
                t: 0.1,
                b: 1,
            })

            skin.sprites.lane.draw(layout, layer.stage, 1)
        }
    },

    drawJudgmentLine() {
        const layout = perspectiveLayout({
            l: -2.5,
            r: 2.5,
            t: 1 - note.h,
            b: 1 + note.h,
        })

        skin.sprites.judgmentLine.draw(layout, layer.judgmentLine, 1)
    },

    drawSlots() {
        for (let i = 0; i < 5; i++) {
            const layout = perspectiveLayout({
                l: i - 2.5,
                r: i - 1.5,
                t: 1 - note.h,
                b: 1 + note.h,
            })

            skin.sprites.slot.draw(layout, layer.slot, 1)
        }
    },
}

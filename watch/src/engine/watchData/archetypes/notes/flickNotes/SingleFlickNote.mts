import { leftRotated, rightRotated } from '../../../../../../../shared/src/engine/data/utils.mjs'
import { options } from '../../../../configuration/options.mjs'
import { effect } from '../../../effect.mjs'
import { particle } from '../../../particle.mjs'
import { scaledScreen } from '../../../scaledScreen.mjs'
import { getZ, layer, skin } from '../../../skin.mjs'
import { Note } from '../Note.mjs'

export abstract class SingleFlickNote extends Note {
    clips = {
        perfect: effect.clips.flickPerfect,
        great: effect.clips.flickGreat,
        good: effect.clips.flickGood,
    }

    effects = {
        circular: particle.effects.flickNoteCircular,
        linear: particle.effects.flickNoteLinear,
    }

    arrow = this.entityMemory({
        layouts: [Quad, Quad],
        z: Number,
    })

    globalInitialize() {
        super.globalInitialize()

        const w = options.noteSize / 3
        const h = w * scaledScreen.wToH

        const b = 1 - 0.4 * h
        const t = b - h

        const gap = w * 0.75 * 0.5
        const ml = this.import.lane - gap
        const mr = this.import.lane + gap

        const l = ml - w
        const r = mr + w

        leftRotated({ l, r: ml, b, t }).copyTo(this.arrow.layouts[0])
        rightRotated({ l: mr, r, b, t }).copyTo(this.arrow.layouts[1])

        this.arrow.z = getZ(layer.note.arrow, this.targetTime, this.import.lane)
    }

    render() {
        super.render()

        for (const layout of this.arrow.layouts) {
            skin.sprites.flickArrow.draw(layout.mul(this.y), this.arrow.z, 1)
        }
    }
}

import { leftRotated, rightRotated } from '../../../../../../../shared/src/engine/data/utils.mjs'
import { options } from '../../../../configuration/options.mjs'
import { scaledScreen } from '../../../scaledScreen.mjs'
import { getZ, layer, skin } from '../../../skin.mjs'
import { Note } from '../Note.mjs'

export abstract class SingleFlickNote extends Note {
    render() {
        const { time, pos } = super.render()

        const z = getZ(layer.note.arrow, time, this.data.lane)

        const w = options.noteSize / 3
        const h = w * scaledScreen.wToH

        const b = 0.4 * h
        const t = b + h

        const gap = w * 0.75 * 0.5
        const ml = this.data.lane - gap
        const mr = this.data.lane + gap

        const l = ml - w
        const r = mr + w

        skin.sprites.flickArrow.draw(leftRotated({ l, r: ml, b, t }).add(pos), z, 1)
        skin.sprites.flickArrow.draw(rightRotated({ l: mr, r, b, t }).add(pos), z, 1)

        return { time, pos }
    }
}

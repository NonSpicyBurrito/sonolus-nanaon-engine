import { leftRotated, rightRotated } from '../../../../../../../shared/src/engine/data/utils.js'
import { options } from '../../../../configuration/options.js'
import { scaledScreen } from '../../../scaledScreen.js'
import { getZ, layer, skin } from '../../../skin.js'
import { Note } from '../Note.js'

export abstract class SingleFlickNote extends Note {
    render() {
        const { time, pos } = super.render()

        const z = getZ(layer.note.arrow, time, this.import.lane)

        const w = options.noteSize / 3
        const h = w * scaledScreen.wToH

        const b = 0.4 * h
        const t = b + h

        const gap = w * 0.75 * 0.5
        const ml = this.import.lane - gap
        const mr = this.import.lane + gap

        const l = ml - w
        const r = mr + w

        skin.sprites.flickArrow.draw(leftRotated({ l, r: ml, b, t }).add(pos), z, 1)
        skin.sprites.flickArrow.draw(rightRotated({ l: mr, r, b, t }).add(pos), z, 1)

        return { time, pos }
    }
}

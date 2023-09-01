import { EngineArchetypeDataName } from 'sonolus-core'
import { options } from '../../../configuration/options.mjs'
import { chart } from '../../chart.mjs'
import { note } from '../../note.mjs'
import { panel } from '../../panel.mjs'
import { getZ, layer } from '../../skin.mjs'

export abstract class Note extends Archetype {
    abstract sprite: SkinSprite

    data = this.defineData({
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
        lane: { name: 'lane', type: Number },
    })

    preprocess() {
        chart.beats = Math.max(chart.beats, this.data.beat)
        chart.duration = Math.max(chart.duration, bpmChanges.at(this.data.beat).time)

        if (options.mirror) this.data.lane *= -1
    }

    render() {
        const time = bpmChanges.at(this.data.beat).time
        const pos = panel.getPos(time)

        const z = getZ(layer.note.body, time, this.data.lane)

        this.sprite.draw(
            new Rect({
                l: this.data.lane - 0.5 * options.noteSize,
                r: this.data.lane + 0.5 * options.noteSize,
                b: -note.h * options.noteSize,
                t: note.h * options.noteSize,
            }).add(pos),
            z,
            1,
        )

        return { time, pos }
    }
}

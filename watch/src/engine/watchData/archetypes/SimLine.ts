import { approach } from '../../../../../shared/src/engine/data/note.js'
import { perspectiveLayout } from '../../../../../shared/src/engine/data/utils.js'
import { options } from '../../configuration/options.js'
import { note } from '../note.js'
import { getZ, layer, skin } from '../skin.js'
import { archetypes } from './index.js'

export class SimLine extends Archetype {
    import = this.defineImport({
        aRef: { name: 'a', type: Number },
        bRef: { name: 'b', type: Number },
    })

    initialized = this.entityMemory(Boolean)

    targetTime = this.entityMemory(Number)

    visualTime = this.entityMemory(Range)
    hiddenTime = this.entityMemory(Number)

    spriteLayout = this.entityMemory(Quad)
    z = this.entityMemory(Number)

    y = this.entityMemory(Number)

    preprocess() {
        if (!options.simLineEnabled) return

        this.targetTime = bpmChanges.at(this.aImport.beat).time

        this.visualTime.copyFrom(Range.l.mul(note.duration).add(this.targetTime))
    }

    spawnTime() {
        return this.visualTime.min
    }

    despawnTime(): number {
        return replay.isReplay
            ? Math.min(
                  this.visualTime.max,
                  this.aSharedMemory.despawnTime,
                  this.bSharedMemory.despawnTime,
              )
            : this.visualTime.max
    }

    initialize() {
        if (this.initialized) return
        this.initialized = true

        this.globalInitialize()
    }

    updateParallel() {
        if (options.hidden > 0 && time.now > this.hiddenTime) return

        this.render()
    }

    get aImport() {
        return archetypes.TapNote.import.get(this.import.aRef)
    }

    get aSharedMemory() {
        return archetypes.TapNote.sharedMemory.get(this.import.aRef)
    }

    get bImport() {
        return archetypes.TapNote.import.get(this.import.bRef)
    }

    get bSharedMemory() {
        return archetypes.TapNote.sharedMemory.get(this.import.bRef)
    }

    globalInitialize() {
        if (options.hidden > 0)
            this.hiddenTime = this.visualTime.max - note.duration * options.hidden

        const h = note.h * options.noteSize

        let l = this.aImport.lane
        let r = this.bImport.lane
        if (l > r) [l, r] = [r, l]

        const b = 1 + h
        const t = 1 - h

        perspectiveLayout({ l, r, b, t }).copyTo(this.spriteLayout)

        this.z = getZ(layer.simLine, this.targetTime, l)
    }

    render() {
        this.y = approach(this.visualTime.min, this.visualTime.max, time.now)

        skin.sprites.simLine.draw(this.spriteLayout.mul(this.y), this.z, 1)
    }
}

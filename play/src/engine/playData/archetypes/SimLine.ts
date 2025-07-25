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

    targetTime = this.entityMemory(Number)

    visualTime = this.entityMemory(Range)
    hiddenTime = this.entityMemory(Number)

    spawnTime = this.entityMemory(Number)

    spriteLayout = this.entityMemory(Quad)
    z = this.entityMemory(Number)

    y = this.entityMemory(Number)

    preprocess() {
        if (!options.simLineEnabled) return

        this.targetTime = bpmChanges.at(this.aImport.beat).time

        this.visualTime.copyFrom(Range.l.mul(note.duration).add(this.targetTime))

        this.spawnTime = this.visualTime.min
    }

    spawnOrder() {
        if (!options.simLineEnabled) return 100000

        return 1000 + this.spawnTime
    }

    shouldSpawn() {
        if (!options.simLineEnabled) return false

        return time.now >= this.spawnTime
    }

    initialize() {
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

    updateParallel() {
        if (
            time.now > this.visualTime.max ||
            this.aInfo.state === EntityState.Despawned ||
            this.bInfo.state === EntityState.Despawned
        ) {
            this.despawn = true
            return
        }

        if (options.hidden > 0 && time.now > this.hiddenTime) return

        this.render()
    }

    get aImport() {
        return archetypes.TapNote.import.get(this.import.aRef)
    }

    get aInfo() {
        return entityInfos.get(this.import.aRef)
    }

    get bImport() {
        return archetypes.TapNote.import.get(this.import.bRef)
    }

    get bInfo() {
        return entityInfos.get(this.import.bRef)
    }

    render() {
        this.y = approach(this.visualTime.min, this.visualTime.max, time.now)

        skin.sprites.simLine.draw(this.spriteLayout.mul(this.y), this.z, 1)
    }
}

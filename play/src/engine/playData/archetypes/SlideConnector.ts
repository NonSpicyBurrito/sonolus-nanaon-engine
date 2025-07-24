import { approach } from '../../../../../shared/src/engine/data/note.js'
import { options } from '../../configuration/options.js'
import { effect } from '../effect.js'
import { note } from '../note.js'
import { circularEffectLayout, linearEffectLayout, particle } from '../particle.js'
import { getZ, layer, skin } from '../skin.js'
import { archetypes } from './index.js'

export class SlideConnector extends Archetype {
    import = this.defineImport({
        headRef: { name: 'head', type: Number },
        tailRef: { name: 'tail', type: Number },
    })

    head = this.entityMemory({
        time: Number,
        lane: Number,

        l: Number,
        r: Number,
    })
    tail = this.entityMemory({
        time: Number,
        lane: Number,

        l: Number,
        r: Number,
    })

    visualTime = this.entityMemory({
        min: Number,
    })
    hiddenTime = this.entityMemory(Number)

    spawnTime = this.entityMemory(Number)

    connector = this.entityMemory({
        z: Number,
    })

    preprocess() {
        this.head.time = bpmChanges.at(this.headImport.beat).time
        this.tail.time = bpmChanges.at(this.tailImport.beat).time

        this.visualTime.min = this.head.time - note.duration

        this.spawnTime = this.visualTime.min

        if (this.shouldScheduleSFX) this.scheduleSFX()
    }

    spawnOrder() {
        return 1000 + this.spawnTime
    }

    shouldSpawn() {
        return time.now >= this.spawnTime
    }

    initialize() {
        const w = 0.5 * options.noteSize

        this.head.lane = this.headImport.lane
        this.head.l = this.head.lane - w
        this.head.r = this.head.lane + w

        this.tail.lane = this.tailImport.lane
        this.tail.l = this.tail.lane - w
        this.tail.r = this.tail.lane + w

        if (options.hidden > 0) this.hiddenTime = this.tail.time - note.duration * options.hidden

        this.connector.z = getZ(layer.note.connector, this.head.time, this.headImport.lane)
    }

    updateParallel() {
        if (
            time.now >= this.tail.time ||
            (this.headInfo.state === EntityState.Despawned &&
                !this.headSharedMemory.activatedTouchId) ||
            this.tailInfo.state === EntityState.Despawned
        ) {
            this.despawn = true
            return
        }

        if (time.now < this.visualTime.min) return

        this.renderConnector()

        if (time.now < this.head.time) return

        this.updateEffects()
    }

    get headInfo() {
        return entityInfos.get(this.import.headRef)
    }

    get headImport() {
        return archetypes.SlideStartNote.import.get(this.import.headRef)
    }

    get headSharedMemory() {
        return archetypes.SlideStartNote.sharedMemory.get(this.import.headRef)
    }

    get tailImport() {
        return archetypes.SlideStartNote.import.get(this.import.tailRef)
    }

    get tailInfo() {
        return entityInfos.get(this.import.tailRef)
    }

    get shouldScheduleSFX() {
        return options.sfxEnabled && effect.clips.hold.exists && options.autoSFX
    }

    get shouldUpdateCircularEffect() {
        return options.noteEffectEnabled && particle.effects.holdCircular.exists
    }

    get shouldUpdateLinearEffect() {
        return options.noteEffectEnabled && particle.effects.holdLinear.exists
    }

    scheduleSFX() {
        const id = effect.clips.hold.scheduleLoop(this.head.time)
        effect.clips.scheduleStopLoop(id, this.tail.time)
    }

    renderConnector() {
        if (options.hidden > 0 && time.now > this.hiddenTime) return

        const hiddenDuration = options.hidden > 0 ? note.duration * options.hidden : 0

        const visibleTime = {
            min: Math.max(this.head.time, time.now + hiddenDuration),
            max: Math.min(this.tail.time, time.now + note.duration),
        }

        const l = {
            min: this.getL(visibleTime.min),
            max: this.getL(visibleTime.max),
        }

        const r = {
            min: this.getR(visibleTime.min),
            max: this.getR(visibleTime.max),
        }

        const y = {
            min: approach(visibleTime.min - note.duration, visibleTime.min, time.now),
            max: approach(visibleTime.max - note.duration, visibleTime.max, time.now),
        }

        const layout = {
            x1: l.min * y.min,
            x2: l.max * y.max,
            x3: r.max * y.max,
            x4: r.min * y.min,
            y1: y.min,
            y2: y.max,
            y3: y.max,
            y4: y.min,
        }

        skin.sprites.connector.draw(layout, this.connector.z, options.connectorAlpha)
    }

    updateEffects() {
        const lane = this.getLane(time.now)

        if (this.shouldUpdateCircularEffect) this.updateCircularEffect(lane)
        if (this.shouldUpdateLinearEffect) this.updateLinearEffect(lane)
    }

    updateCircularEffect(lane: number) {
        const layout = circularEffectLayout({
            lane,
            w: 0.9,
            h: 0.6,
        })

        particle.effects.move(this.headSharedMemory.effectInstanceIds.circular, layout)
    }

    updateLinearEffect(lane: number) {
        const layout = linearEffectLayout({
            lane,
            size: 0.5,
        })

        particle.effects.move(this.headSharedMemory.effectInstanceIds.linear, layout)
    }

    getLane(time: number) {
        return Math.remap(this.head.time, this.tail.time, this.head.lane, this.tail.lane, time)
    }

    getL(time: number) {
        return Math.remap(this.head.time, this.tail.time, this.head.l, this.tail.l, time)
    }

    getR(time: number) {
        return Math.remap(this.head.time, this.tail.time, this.head.r, this.tail.r, time)
    }
}

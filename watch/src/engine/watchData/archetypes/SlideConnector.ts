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

    initialized = this.entityMemory(Boolean)

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

    connector = this.entityMemory({
        z: Number,
    })

    effectInstanceIds = this.entityMemory({
        circular: ParticleEffectInstanceId,
        linear: ParticleEffectInstanceId,
    })

    preprocess() {
        this.head.time = bpmChanges.at(this.headImport.beat).time
        this.tail.time = bpmChanges.at(this.tailImport.beat).time

        this.visualTime.min = this.head.time - note.duration

        if (options.sfxEnabled) {
            if (replay.isReplay) {
                this.scheduleReplaySFX()
            } else {
                this.scheduleSFX()
            }
        }
    }

    spawnTime() {
        return this.visualTime.min
    }

    despawnTime(): number {
        return replay.isReplay
            ? Math.min(
                  this.headImport.judgment
                      ? this.tailSharedMemory.despawnTime
                      : this.headSharedMemory.despawnTime,
                  this.tail.time,
              )
            : this.tail.time
    }

    initialize() {
        if (this.initialized) return
        this.initialized = true

        this.globalInitialize()
    }

    updateParallel() {
        this.renderConnector()

        if (time.skip) {
            if (this.shouldScheduleCircularEffect) this.effectInstanceIds.circular = 0

            if (this.shouldScheduleLinearEffect) this.effectInstanceIds.linear = 0
        }

        if (time.now < this.head.time) return

        if (time.now < this.headSharedMemory.despawnTime) return

        if (this.shouldScheduleCircularEffect && !this.effectInstanceIds.circular)
            this.spawnCircularEffect()

        if (this.shouldScheduleLinearEffect && !this.effectInstanceIds.linear)
            this.spawnLinearEffect()

        if (this.effectInstanceIds.circular) this.updateCircularEffect()

        if (this.effectInstanceIds.linear) this.updateLinearEffect()
    }

    terminate() {
        if (this.shouldScheduleCircularEffect && this.effectInstanceIds.circular)
            this.destroyCircularEffect()

        if (this.shouldScheduleLinearEffect && this.effectInstanceIds.linear)
            this.destroyLinearEffect()
    }

    get headImport() {
        return archetypes.SlideStartNote.import.get(this.import.headRef)
    }

    get headSharedMemory() {
        return archetypes.TapNote.sharedMemory.get(this.import.headRef)
    }

    get tailImport() {
        return archetypes.SlideStartNote.import.get(this.import.tailRef)
    }

    get tailSharedMemory() {
        return archetypes.TapNote.sharedMemory.get(this.import.tailRef)
    }

    get shouldScheduleCircularEffect() {
        return options.noteEffectEnabled && particle.effects.holdCircular.exists
    }

    get shouldScheduleLinearEffect() {
        return options.noteEffectEnabled && particle.effects.holdLinear.exists
    }

    globalInitialize() {
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

    scheduleSFX() {
        const id = effect.clips.hold.scheduleLoop(this.head.time)
        effect.clips.scheduleStopLoop(id, this.tail.time)
    }

    scheduleReplaySFX() {
        if (!this.headImport.judgment) return

        const start = Math.max(this.head.time, this.headSharedMemory.despawnTime)
        const end = Math.min(this.tail.time, this.tailSharedMemory.despawnTime)
        if (start >= end) return

        const id = effect.clips.hold.scheduleLoop(start)
        effect.clips.scheduleStopLoop(id, end)
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

    spawnCircularEffect() {
        this.effectInstanceIds.circular = particle.effects.holdCircular.spawn(new Quad(), 1, true)
    }

    updateCircularEffect() {
        const layout = circularEffectLayout({
            lane: this.getLane(time.now),
            w: 0.9,
            h: 0.6,
        })

        particle.effects.move(this.effectInstanceIds.circular, layout)
    }

    destroyCircularEffect() {
        particle.effects.destroy(this.effectInstanceIds.circular)
        this.effectInstanceIds.circular = 0
    }

    spawnLinearEffect() {
        this.effectInstanceIds.linear = particle.effects.holdLinear.spawn(new Quad(), 1, true)
    }

    updateLinearEffect() {
        const layout = linearEffectLayout({
            lane: this.getLane(time.now),
            size: 0.5,
        })

        particle.effects.move(this.effectInstanceIds.linear, layout)
    }

    destroyLinearEffect() {
        particle.effects.destroy(this.effectInstanceIds.linear)
        this.effectInstanceIds.linear = 0
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

import { EngineArchetypeDataName } from '@sonolus/core'
import { lane } from '../../../../../../shared/src/engine/data/lane.js'
import { approach } from '../../../../../../shared/src/engine/data/note.js'
import { perspectiveLayout } from '../../../../../../shared/src/engine/data/utils.js'
import { toBucketWindows, Windows } from '../../../../../../shared/src/engine/data/windows.js'
import { options } from '../../../configuration/options.js'
import { sfxDistance } from '../../effect.js'
import { note } from '../../note.js'
import { circularEffectLayout, linearEffectLayout, particle } from '../../particle.js'
import { getZ, layer } from '../../skin.js'

export abstract class Note extends Archetype {
    hasInput = true

    abstract sprite: SkinSprite

    abstract clips: {
        perfect: EffectClip
        great: EffectClip
        good: EffectClip
    }

    abstract effects: {
        circular: ParticleEffect
        linear: ParticleEffect
    }

    abstract windows: Windows

    abstract bucket: Bucket

    import = this.defineImport({
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
        lane: { name: 'lane', type: Number },
        judgment: { name: EngineArchetypeDataName.Judgment, type: DataType<Judgment> },
        accuracy: { name: EngineArchetypeDataName.Accuracy, type: Number },
        accuracyDiff: { name: 'accuracyDiff', type: Number },
    })

    sharedMemory = this.defineSharedMemory({
        despawnTime: Number,
    })

    initialized = this.entityMemory(Boolean)

    targetTime = this.entityMemory(Number)

    visualTime = this.entityMemory(Range)
    hiddenTime = this.entityMemory(Number)

    layout = this.entityMemory(Quad)
    z = this.entityMemory(Number)

    y = this.entityMemory(Number)

    globalPreprocess() {
        this.bucket.set(toBucketWindows(this.windows))

        this.life.miss = -40
    }

    preprocess() {
        this.targetTime = bpmChanges.at(this.import.beat).time

        this.visualTime.copyFrom(Range.l.mul(note.duration).add(this.targetTime))

        this.sharedMemory.despawnTime = this.hitTime

        if (options.mirror) this.import.lane *= -1

        if (options.sfxEnabled) {
            if (replay.isReplay) {
                this.scheduleReplaySFX()
            } else {
                this.scheduleSFX()
            }
        }

        this.result.time = this.targetTime

        if (!replay.isReplay) {
            this.result.bucket.index = this.bucket.index
        } else if (this.import.judgment) {
            this.result.bucket.index = this.bucket.index
            this.result.bucket.value = this.import.accuracy * 1000
        }
    }

    spawnTime() {
        return this.visualTime.min
    }

    despawnTime() {
        return this.sharedMemory.despawnTime
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

    terminate() {
        if (time.skip) return

        this.despawnTerminate()
    }

    get hitTime() {
        return (
            this.targetTime +
            (replay.isReplay ? this.import.accuracy + this.import.accuracyDiff : 0)
        )
    }

    globalInitialize() {
        if (options.hidden > 0)
            this.hiddenTime = this.visualTime.max - note.duration * options.hidden

        const w = 0.5 * options.noteSize
        const h = note.h * options.noteSize

        perspectiveLayout({
            l: this.import.lane - w,
            r: this.import.lane + w,
            t: 1 - h,
            b: 1 + h,
        }).copyTo(this.layout)
        this.z = getZ(layer.note.body, this.targetTime, this.import.lane)
    }

    scheduleSFX() {
        this.clips.perfect.schedule(this.hitTime, sfxDistance)
    }

    scheduleReplaySFX() {
        if (!this.import.judgment) return

        switch (this.import.judgment) {
            case Judgment.Perfect:
                this.clips.perfect.schedule(this.hitTime, sfxDistance)
                break
            case Judgment.Great:
                this.clips.great.schedule(this.hitTime, sfxDistance)
                break
            case Judgment.Good:
                this.clips.good.schedule(this.hitTime, sfxDistance)
                break
        }
    }

    render() {
        this.y = approach(this.visualTime.min, this.visualTime.max, time.now)

        this.sprite.draw(this.layout.mul(this.y), this.z, 1)
    }

    despawnTerminate() {
        if (replay.isReplay && !this.import.judgment) return

        if (options.noteEffectEnabled) this.playNoteEffects()
        if (options.laneEffectEnabled) this.playLaneEffects()
    }

    playNoteEffects() {
        this.playLinearNoteEffect()
        this.playCircularNoteEffect()
    }

    playLinearNoteEffect() {
        const layout = linearEffectLayout({
            lane: this.import.lane,
            size: 0.5,
        })

        this.effects.linear.spawn(layout, 0.4, false)
    }

    playCircularNoteEffect() {
        const layout = circularEffectLayout({
            lane: this.import.lane,
            w: 1.05,
            h: 0.7,
        })

        this.effects.circular.spawn(layout, 0.6, false)
    }

    playLaneEffects() {
        particle.effects.lane.spawn(
            perspectiveLayout({
                l: this.import.lane - 0.5,
                r: this.import.lane + 0.5,
                b: lane.b,
                t: lane.t,
            }),
            0.2,
            false,
        )
    }
}

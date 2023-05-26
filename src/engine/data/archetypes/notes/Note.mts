import { EngineArchetypeDataName } from 'sonolus-core'
import { options } from '../../../configuration/options.mjs'
import { particle } from '../../particle.mjs'
import { lane, minSFXDistance, note } from '../constants.mjs'
import { layer } from '../layer.mjs'
import {
    circularEffectLayout,
    getHitbox,
    getScheduleSFXTime,
    getZ,
    linearEffectLayout,
    perspectiveLayout,
} from '../utils.mjs'

export abstract class Note extends Archetype {
    hasInput = true

    abstract sprites: {
        note: SkinSprite
    }

    abstract clips: {
        perfect: EffectClip
        great: EffectClip
        good: EffectClip
    }

    abstract effects: {
        circular: ParticleEffect
        linear: ParticleEffect
    }

    abstract windows: JudgmentWindows

    abstract bucket: Bucket

    data = this.defineData({
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
        lane: { name: 'lane', type: Number },
    })

    targetTime = this.entityMemory(Number)

    spawnTime = this.entityMemory(Number)

    hitbox = this.entityMemory(Rect)

    scheduleSFXTime = this.entityMemory(Number)

    visualTime = this.entityMemory({
        min: Number,
        max: Number,
        hidden: Number,
    })

    hasSFXScheduled = this.entityMemory(Boolean)

    inputTime = this.entityMemory({
        min: Number,
        max: Number,
    })

    layout = this.entityMemory(Quad)
    z = this.entityMemory(Number)

    y = this.entityMemory(Number)

    globalPreprocess() {
        const toMs = ({ min, max }: JudgmentWindow) => ({
            min: Math.round(min * 1000),
            max: Math.round(max * 1000),
        })

        this.bucket.set({
            perfect: toMs(this.windows.perfect),
            great: toMs(this.windows.great),
            good: toMs(this.windows.good),
        })

        this.life.miss = -40
    }

    preprocess() {
        this.targetTime = bpmChanges.at(this.data.beat).time

        this.scheduleSFXTime = getScheduleSFXTime(this.targetTime)

        this.visualTime.max = this.targetTime
        this.visualTime.min = this.visualTime.max - Note.duration

        this.spawnTime = Math.min(this.visualTime.min, this.scheduleSFXTime)

        if (options.mirror) this.data.lane *= -1
    }

    spawnOrder() {
        return 1000 + this.spawnTime
    }

    shouldSpawn() {
        return time.now >= this.spawnTime
    }

    initialize() {
        if (options.hidden > 0)
            this.visualTime.hidden = this.visualTime.max - Note.duration * options.hidden

        this.inputTime.min = this.targetTime + this.windows.good.min + input.offset
        this.inputTime.max = this.targetTime + this.windows.good.max + input.offset

        const w = 0.5 * options.noteSize
        const h = note.h * options.noteSize

        perspectiveLayout({
            l: this.data.lane - w,
            r: this.data.lane + w,
            t: 1 - h,
            b: 1 + h,
        }).copyTo(this.layout)
        this.z = getZ(layer.note.body, this.targetTime, this.data.lane)

        getHitbox({
            l: this.data.lane,
            r: this.data.lane,
        }).copyTo(this.hitbox)

        if (options.autoplay) {
            this.result.judgment = Judgment.Perfect

            this.result.bucket.index = this.bucket.index
        } else {
            this.result.accuracy = this.windows.good.max
        }
    }

    touchOrder = 1

    updateParallel() {
        if (options.autoplay && time.now >= this.targetTime) this.despawn = true
        if (time.now > this.inputTime.max) this.despawn = true
        if (this.despawn) return

        if (this.shouldScheduleSFX && !this.hasSFXScheduled) this.scheduleSFX()

        if (time.now < this.visualTime.min) return
        if (options.hidden > 0 && time.now > this.visualTime.hidden) return

        this.render()
    }

    terminate() {
        if (!options.autoplay) return

        if (options.noteEffectEnabled) this.playNoteEffects()
        if (options.laneEffectEnabled) this.playLaneEffects()
    }

    get shouldScheduleSFX() {
        return options.sfxEnabled && (options.autoplay || options.autoSFX)
    }

    get shouldPlaySFX() {
        return options.sfxEnabled && !options.autoplay && !options.autoSFX
    }

    scheduleSFX() {
        this.clips.perfect.schedule(this.targetTime, minSFXDistance)

        this.hasSFXScheduled = true
    }

    render() {
        this.y = Note.approach(this.visualTime.min, this.visualTime.max, time.now)

        this.sprites.note.draw(this.layout.mul(this.y), this.z, 1)
    }

    playHitEffects() {
        if (this.shouldPlaySFX) this.playSFX()
        if (options.noteEffectEnabled) this.playNoteEffects()
        if (options.laneEffectEnabled) this.playLaneEffects()
    }

    playSFX() {
        if (this.result.judgment === Judgment.Perfect) {
            this.clips.perfect.play(minSFXDistance)
        } else if (this.result.judgment === Judgment.Great) {
            this.clips.great.play(minSFXDistance)
        } else if (this.result.judgment === Judgment.Good) {
            this.clips.good.play(minSFXDistance)
        }
    }

    playNoteEffects() {
        this.playLinearNoteEffect()
        this.playCircularNoteEffect()
    }

    playLinearNoteEffect() {
        const layout = linearEffectLayout({
            lane: this.data.lane,
            size: 0.5,
        })

        this.effects.linear.spawn(layout, 0.4, false)
    }

    playCircularNoteEffect() {
        const layout = circularEffectLayout({
            lane: this.data.lane,
            w: 1.05,
            h: 0.7,
        })

        this.effects.circular.spawn(layout, 0.6, false)
    }

    playLaneEffects() {
        particle.effects.lane.spawn(
            perspectiveLayout({
                l: this.data.lane - 0.5,
                r: this.data.lane + 0.5,
                b: lane.b,
                t: lane.t,
            }),
            0.2,
            false,
        )
    }

    static approach(fromTime: number, toTime: number, now: number) {
        return Math.lerp(0.1, 1, 71.7675 ** Math.remap(fromTime, toTime, -1, 0, now))
    }

    static get duration() {
        return (12 - options.noteSpeed) / 2
    }
}
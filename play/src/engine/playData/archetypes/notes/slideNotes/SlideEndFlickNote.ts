import { leftRotated, rightRotated } from '../../../../../../../shared/src/engine/data/utils.js'
import { windows } from '../../../../../../../shared/src/engine/data/windows.js'
import { options } from '../../../../configuration/options.js'
import { buckets } from '../../../buckets.js'
import { effect } from '../../../effect.js'
import { flick } from '../../../flick.js'
import { particle } from '../../../particle.js'
import { scaledScreen } from '../../../scaledScreen.js'
import { getZ, layer, skin } from '../../../skin.js'
import { SlideNote } from './SlideNote.js'

export class SlideEndFlickNote extends SlideNote {
    sprites = {
        note: skin.sprites.flickEndNote,
        arrow: skin.sprites.flickArrow,
    }

    clips = {
        perfect: effect.clips.flickPerfect,
        great: effect.clips.flickGreat,
        good: effect.clips.flickGood,
    }

    effects = {
        circular: particle.effects.flickNoteCircular,
        linear: particle.effects.flickNoteLinear,
    }

    windows = windows.slideEndFlickNote

    bucket = buckets.slideEndFlickNote

    arrow = this.entityMemory({
        layouts: [Quad, Quad],
        z: Number,
    })

    activatedTouch = this.entityMemory({
        id: TouchId,
        position: Vec,
    })

    preprocess() {
        super.preprocess()

        const minPrevInputTime =
            bpmChanges.at(this.prevImport.beat).time + windows.minGood + input.offset

        this.spawnTime = Math.min(this.spawnTime, minPrevInputTime)
    }

    initialize() {
        super.initialize()

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

    touch() {
        const id = this.prevSharedMemory.activatedTouchId
        if (id && time.now > this.inputTime.max) {
            this.endSlideEffects()
            return
        }

        if (!this.activatedTouch.id) this.touchActivate(id)

        if (this.activatedTouch.id) this.touchComplete()
    }

    touchActivate(id: TouchId) {
        if (id) {
            for (const touch of touches) {
                if (touch.id !== id) continue

                if (time.now >= this.inputTime.min && this.hitbox.contains(touch.position)) {
                    this.activate(touch)
                } else if (touch.ended) {
                    this.incomplete(touch.t)
                    this.endSlideEffects()
                }
                return
            }

            this.incomplete(time.now)
            this.endSlideEffects()
            return
        }

        if (this.prevInfo.state !== EntityState.Despawned) return
        if (time.now < this.inputTime.min) return

        for (const touch of touches) {
            if (!this.hitbox.contains(touch.position)) continue

            this.activate(touch)
            return
        }
    }

    activate(touch: Touch) {
        this.activatedTouch.id = touch.id
        this.activatedTouch.position.x = touch.position.x
        this.activatedTouch.position.y = touch.position.y
    }

    touchComplete() {
        for (const touch of touches) {
            if (touch.id !== this.activatedTouch.id) continue

            const d = touch.position.sub(this.activatedTouch.position).length

            if (d >= 0.04 * flick.distance) {
                this.complete(touch)
                this.endSlideEffects()
            } else if (touch.ended) {
                this.incomplete(touch.t)
                this.endSlideEffects()
            }
            return
        }
    }

    complete(touch: Touch) {
        this.result.judgment = input.judge(touch.time, this.targetTime, this.windows)
        this.result.accuracy = touch.time - this.targetTime
        this.export('accuracyDiff', time.now - touch.time)

        this.result.bucket.index = this.bucket.index
        this.result.bucket.value = this.result.accuracy * 1000

        this.playHitEffects()

        this.despawn = true
    }

    render() {
        super.render()

        for (const layout of this.arrow.layouts) {
            this.sprites.arrow.draw(layout.mul(this.y), this.arrow.z, 1)
        }
    }
}

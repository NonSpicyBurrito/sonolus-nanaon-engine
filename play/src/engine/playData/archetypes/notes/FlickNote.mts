import { leftRotated, rightRotated } from '../../../../../../shared/src/engine/data/utils.mjs'
import { options } from '../../../configuration/options.mjs'
import { buckets } from '../../buckets.mjs'
import { effect } from '../../effect.mjs'
import { flick } from '../../flick.mjs'
import { particle } from '../../particle.mjs'
import { scaledScreen } from '../../scaledScreen.mjs'
import { getZ, layer, skin } from '../../skin.mjs'
import { windows } from '../../windows.mjs'
import { isUsed, markAsUsed } from '../InputManager.mjs'
import { Note } from './Note.mjs'

export class FlickNote extends Note {
    sprites = {
        note: skin.sprites.flickNote,
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

    windows = windows.flickNote

    bucket = buckets.flickNote

    arrow = this.entityMemory({
        layouts: [Quad, Quad],
        z: Number,
    })

    activatedTouchId = this.entityMemory(TouchId)

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
        if (time.now < this.inputTime.min) return

        if (!this.activatedTouchId) this.touchActivate()

        if (this.activatedTouchId) this.touchComplete()
    }

    touchActivate() {
        for (const touch of touches) {
            if (!touch.started) continue
            if (!this.hitbox.contains(touch.position)) continue
            if (isUsed(touch)) continue

            markAsUsed(touch)

            this.activate(touch)
            return
        }
    }

    activate(touch: Touch) {
        this.activatedTouchId = touch.id
    }

    touchComplete() {
        for (const touch of touches) {
            if (touch.id !== this.activatedTouchId) continue

            const d = touch.position.sub(touch.startPosition).length

            if (d >= 0.04 * flick.distance) {
                this.complete(touch)
            } else if (touch.ended) {
                this.incomplete(touch.t)
            }
            return
        }
    }

    complete(touch: Touch) {
        this.result.judgment = input.judge(touch.startTime, this.targetTime, this.windows)
        this.result.accuracy = touch.startTime - this.targetTime
        this.export('accuracyDiff', time.now - touch.startTime)

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

import { windows } from '../../../../../../../shared/src/engine/data/windows.js'
import { buckets } from '../../../buckets.js'
import { effect } from '../../../effect.js'
import { particle } from '../../../particle.js'
import { skin } from '../../../skin.js'
import { isUsed, markAsUsed } from '../../InputManager.js'
import { SlideNote } from './SlideNote.js'

export class SlideStartNote extends SlideNote {
    sprites = {
        note: skin.sprites.slideStartNote,
    }

    clips = {
        perfect: effect.clips.tapPerfect,
        great: effect.clips.tapGreat,
        good: effect.clips.tapGood,
    }

    effects = {
        circular: particle.effects.tapNoteCircular,
        linear: particle.effects.tapNoteLinear,
    }

    windows = windows.slideStartNote

    bucket = buckets.slideStartNote

    touch() {
        if (time.now < this.inputTime.min) return

        for (const touch of touches) {
            if (!touch.started) continue
            if (!this.hitbox.contains(touch.position)) continue
            if (isUsed(touch)) continue

            this.complete(touch)
            this.startSlideEffects()
            return
        }
    }

    complete(touch: Touch) {
        markAsUsed(touch)
        this.sharedMemory.activatedTouchId = touch.id

        this.result.judgment = input.judge(touch.startTime, this.targetTime, this.windows)
        this.result.accuracy = touch.startTime - this.targetTime

        this.result.bucket.index = this.bucket.index
        this.result.bucket.value = this.result.accuracy * 1000

        this.playHitEffects()

        this.despawn = true
    }

    render() {
        if (time.now >= this.targetTime) return

        super.render()
    }
}

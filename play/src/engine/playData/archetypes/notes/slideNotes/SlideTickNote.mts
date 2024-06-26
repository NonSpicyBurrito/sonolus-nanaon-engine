import { windows } from '../../../../../../../shared/src/engine/data/windows.mjs'
import { buckets } from '../../../buckets.mjs'
import { effect } from '../../../effect.mjs'
import { particle } from '../../../particle.mjs'
import { skin } from '../../../skin.mjs'
import { SlideNote } from './SlideNote.mjs'

export class SlideTickNote extends SlideNote {
    sprites = {
        note: skin.sprites.slideTickNote,
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

    windows = windows.slideTickNote

    bucket = buckets.slideTickNote

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

    touch() {
        const id = this.prevSharedMemory.activatedTouchId
        if (id) {
            if (time.now > this.inputTime.max) {
                this.endSlideEffects()
                return
            }

            for (const touch of touches) {
                if (touch.id !== id) continue

                if (time.now >= this.inputTime.min && this.hitbox.contains(touch.position)) {
                    this.complete(id, touch.t)
                    this.continueSlideEffects()
                } else if (touch.ended) {
                    this.incomplete(touch.t)
                    this.endSlideEffects()
                }
                return
            }

            if (time.now >= this.inputTime.min) {
                this.complete(id, time.now)
                this.continueSlideEffects()
            } else {
                this.incomplete(time.now)
                this.endSlideEffects()
            }
            return
        }

        if (this.prevInfo.state !== EntityState.Despawned) return
        if (time.now < this.inputTime.min) return

        for (const touch of touches) {
            if (!this.hitbox.contains(touch.position)) continue

            this.complete(touch.id, touch.t)
            this.startSlideEffects()
            return
        }
    }

    complete(id: TouchId, hitTime: number) {
        this.sharedMemory.activatedTouchId = id

        hitTime = Math.max(hitTime, this.targetTime)

        this.result.judgment = input.judge(hitTime, this.targetTime, this.windows)
        this.result.accuracy = hitTime - this.targetTime

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

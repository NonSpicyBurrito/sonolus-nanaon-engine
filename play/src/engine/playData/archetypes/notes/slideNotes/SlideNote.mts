import { options } from '../../../../configuration/options.mjs'
import { effect } from '../../../effect.mjs'
import { circularEffectLayout, linearEffectLayout, particle } from '../../../particle.mjs'
import { Note } from '../Note.mjs'

export abstract class SlideNote extends Note {
    slideImport = this.defineImport({
        prevRef: { name: 'prev', type: Number },
    })

    sharedMemory = this.defineSharedMemory({
        activatedTouchId: TouchId,
        clipInstanceId: LoopedEffectClipInstanceId,
        effectInstanceIds: {
            circular: ParticleEffectInstanceId,
            linear: ParticleEffectInstanceId,
        },
    })

    get prevInfo() {
        return entityInfos.get(this.slideImport.prevRef)
    }

    get prevImport() {
        return this.import.get(this.slideImport.prevRef)
    }

    get prevSharedMemory() {
        return this.sharedMemory.get(this.slideImport.prevRef)
    }

    get shouldPlayHoldSFX() {
        return options.sfxEnabled && effect.clips.hold.exists && !options.autoSFX
    }

    get shouldPlayCircularHoldEffect() {
        return options.noteEffectEnabled && particle.effects.holdCircular.exists
    }

    get shouldPlayLinearHoldEffect() {
        return options.noteEffectEnabled && particle.effects.holdLinear.exists
    }

    playHoldSFX() {
        return effect.clips.hold.loop()
    }

    spawnCircularHoldEffect(lane: number) {
        const layout = circularEffectLayout({
            lane,
            w: 0.9,
            h: 0.6,
        })

        return particle.effects.holdCircular.spawn(layout, 1, true)
    }

    spawnLinearHoldEffect(lane: number) {
        const layout = linearEffectLayout({
            lane,
            size: 0.5,
        })

        return particle.effects.holdLinear.spawn(layout, 1, true)
    }

    startSlideEffects() {
        if (this.shouldPlayHoldSFX) this.sharedMemory.clipInstanceId = this.playHoldSFX()

        if (this.shouldPlayCircularHoldEffect)
            this.sharedMemory.effectInstanceIds.circular = this.spawnCircularHoldEffect(
                this.import.lane,
            )

        if (this.shouldPlayLinearHoldEffect)
            this.sharedMemory.effectInstanceIds.linear = this.spawnLinearHoldEffect(
                this.import.lane,
            )
    }

    continueSlideEffects() {
        if (this.shouldPlayHoldSFX)
            this.sharedMemory.clipInstanceId = this.prevSharedMemory.clipInstanceId

        if (this.shouldPlayCircularHoldEffect)
            this.sharedMemory.effectInstanceIds.circular =
                this.prevSharedMemory.effectInstanceIds.circular

        if (this.shouldPlayLinearHoldEffect)
            this.sharedMemory.effectInstanceIds.linear =
                this.prevSharedMemory.effectInstanceIds.linear
    }

    endSlideEffects() {
        if (this.shouldPlayHoldSFX) effect.clips.stopLoop(this.prevSharedMemory.clipInstanceId)

        if (this.shouldPlayCircularHoldEffect)
            particle.effects.destroy(this.prevSharedMemory.effectInstanceIds.circular)

        if (this.shouldPlayLinearHoldEffect)
            particle.effects.destroy(this.prevSharedMemory.effectInstanceIds.linear)
    }
}

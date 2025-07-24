import { connector } from '../../components/connector.js'
import { noteDisplay } from '../../components/noteDisplay.js'
import { effect } from '../../effect.js'
import { drawHand } from '../../instruction.js'
import { particle, spawnCircularHoldEffect, spawnLinearHoldEffect } from '../../particle.js'

let sfxInstanceId = tutorialMemory(LoopedEffectClipInstanceId)
const effectInstanceIds = tutorialMemory({
    circular: ParticleEffectInstanceId,
    linear: ParticleEffectInstanceId,
})

export const slideEndNoteFall = {
    enter() {
        noteDisplay.showFall('slideEndNote')
        connector.showFallOut()

        sfxInstanceId = effect.clips.hold.loop()
        effectInstanceIds.circular = spawnCircularHoldEffect()
        effectInstanceIds.linear = spawnLinearHoldEffect()
    },

    update() {
        drawHand(Math.PI / 3, 0, 1)
    },

    exit() {
        noteDisplay.clear()
        connector.clear()

        effect.clips.stopLoop(sfxInstanceId)
        particle.effects.destroy(effectInstanceIds.circular)
        particle.effects.destroy(effectInstanceIds.linear)
    },
}

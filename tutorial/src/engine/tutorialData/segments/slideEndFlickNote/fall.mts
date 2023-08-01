import { connector } from '../../components/connector.mjs'
import { flickArrow } from '../../components/flickArrow.mjs'
import { noteDisplay } from '../../components/noteDisplay.mjs'
import { effect } from '../../effect.mjs'
import { particle } from '../../particle.mjs'
import { drawHand, spawnCircularHoldEffect, spawnLinearHoldEffect } from '../../utils.mjs'

let sfxInstanceId = tutorialMemory(LoopedEffectClipInstanceId)
const effectInstanceIds = tutorialMemory({
    circular: ParticleEffectInstanceId,
    linear: ParticleEffectInstanceId,
})

export const slideEndFlickNoteFall = {
    enter() {
        flickArrow.showFall()
        noteDisplay.showFall('flickEndNote')
        connector.showFallOut()

        sfxInstanceId = effect.clips.hold.loop()
        effectInstanceIds.circular = spawnCircularHoldEffect()
        effectInstanceIds.linear = spawnLinearHoldEffect()
    },

    update() {
        drawHand(Math.PI / 3, 0, 1)
    },

    exit() {
        flickArrow.clear()
        noteDisplay.clear()
        connector.clear()

        effect.clips.stopLoop(sfxInstanceId)
        particle.effects.destroy(effectInstanceIds.circular)
        particle.effects.destroy(effectInstanceIds.linear)
    },
}

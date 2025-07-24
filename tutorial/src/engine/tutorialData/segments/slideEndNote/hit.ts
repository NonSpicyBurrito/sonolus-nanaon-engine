import { effect } from '../../effect.js'
import {
    particle,
    playCircularNoteEffect,
    playLaneEffects,
    playLinearNoteEffect,
} from '../../particle.js'

export const slideEndNoteHit = {
    enter() {
        effect.clips.tapPerfect.play(0)

        playLinearNoteEffect(particle.effects.tapNoteLinear)
        playCircularNoteEffect(particle.effects.tapNoteCircular)
        playLaneEffects()
    },
}

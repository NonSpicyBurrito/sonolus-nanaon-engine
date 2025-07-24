import { effect } from '../../effect.js'
import {
    particle,
    playCircularNoteEffect,
    playLaneEffects,
    playLinearNoteEffect,
} from '../../particle.js'

export const flickNoteHit = {
    enter() {
        effect.clips.flickPerfect.play(0)

        playLinearNoteEffect(particle.effects.flickNoteLinear)
        playCircularNoteEffect(particle.effects.flickNoteCircular)
        playLaneEffects()
    },
}

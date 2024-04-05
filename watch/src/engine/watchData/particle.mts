import { ParticleEffectName } from '@sonolus/core'
import { options } from '../configuration/options.mjs'
import { scaledScreen } from './scaledScreen.mjs'

export const particle = defineParticle({
    effects: {
        lane: ParticleEffectName.LaneLinear,

        tapNoteCircular: ParticleEffectName.NoteCircularTapCyan,
        tapNoteLinear: ParticleEffectName.NoteLinearTapCyan,

        flickNoteCircular: ParticleEffectName.NoteCircularAlternativeGreen,
        flickNoteLinear: ParticleEffectName.NoteLinearAlternativeGreen,

        holdCircular: ParticleEffectName.NoteCircularHoldPurple,
        holdLinear: ParticleEffectName.NoteLinearHoldPurple,
    },
})

export const circularEffectLayout = ({ lane, w, h }: { lane: number; w: number; h: number }) => {
    w *= options.noteEffectSize
    h *= options.noteEffectSize * scaledScreen.wToH

    return new Rect({
        l: lane - w,
        r: lane + w,
        t: 1 - h,
        b: 1 + h,
    })
}

export const linearEffectLayout = ({ lane, size }: { lane: number; size: number }) => {
    const w = size * options.noteEffectSize
    const h = 2 * size * options.noteEffectSize * scaledScreen.wToH

    return new Rect({
        l: lane - w,
        r: lane + w,
        t: 1 - h,
        b: 1,
    })
}

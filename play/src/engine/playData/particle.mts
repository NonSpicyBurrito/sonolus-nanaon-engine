import { ParticleEffectName } from 'sonolus-core'

export const particle = defineParticle({
    effects: {
        lane: ParticleEffectName.LaneLinear,
        slot: ParticleEffectName.SlotLinear,

        tapNoteCircular: ParticleEffectName.NoteCircularTapCyan,
        tapNoteLinear: ParticleEffectName.NoteLinearTapCyan,

        flickNoteCircular: ParticleEffectName.NoteCircularAlternativeGreen,
        flickNoteLinear: ParticleEffectName.NoteLinearAlternativeGreen,

        holdCircular: ParticleEffectName.NoteCircularHoldRed,
        holdLinear: ParticleEffectName.NoteLinearHoldRed,
    },
})

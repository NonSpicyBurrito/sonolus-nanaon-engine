import { EffectClipName } from '@sonolus/core'

export const effect = defineEffect({
    clips: {
        tapPerfect: EffectClipName.Perfect,
        tapGreat: EffectClipName.Great,
        tapGood: EffectClipName.Good,

        flickPerfect: EffectClipName.PerfectAlternative,
        flickGreat: EffectClipName.GreatAlternative,
        flickGood: EffectClipName.GoodAlternative,

        hold: EffectClipName.Hold,
    },
})

export const sfxDistance = 0.02

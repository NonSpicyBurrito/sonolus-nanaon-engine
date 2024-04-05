import { EffectClipName } from '@sonolus/core'

export const effect = defineEffect({
    clips: {
        stage: EffectClipName.Stage,

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

export const getScheduleSFXTime = (targetTime: number) =>
    targetTime - 0.5 - Math.max(audio.offset, 0)

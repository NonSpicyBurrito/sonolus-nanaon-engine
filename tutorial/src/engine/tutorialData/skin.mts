import { SkinSpriteName } from 'sonolus-core'

export const skin = defineSkin({
    sprites: {
        lane: SkinSpriteName.Lane,
        slot: SkinSpriteName.NoteSlot,
        judgmentLine: SkinSpriteName.JudgmentLine,

        nanaonStage: 'Nanaon Stage',

        tapNote: SkinSpriteName.NoteHeadCyan,

        flickNote: SkinSpriteName.NoteHeadGreen,
        flickEndNote: SkinSpriteName.NoteTailGreen,
        flickArrow: SkinSpriteName.DirectionalMarkerGreen,

        slideStartNote: SkinSpriteName.NoteHeadPurple,
        slideEndNote: SkinSpriteName.NoteTailPurple,

        connector: SkinSpriteName.NoteConnectionPurple,
    },
})

export const layer = {
    note: {
        arrow: 101,
        body: 100,
        connector: 99,
    },

    slot: 2,
    judgmentLine: 1,
    stage: 0,
}

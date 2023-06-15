import { SkinSpriteName } from 'sonolus-core'

export const skin = defineSkin({
    sprites: {
        cover: SkinSpriteName.StageCover,

        lane: SkinSpriteName.Lane,
        slot: SkinSpriteName.NoteSlot,
        judgmentLine: SkinSpriteName.JudgmentLine,
        note: SkinSpriteName.NoteHeadCyan,

        nanaonStage: 'Nanaon Stage',

        simLine: SkinSpriteName.SimultaneousConnectionNeutral,

        tapNote: SkinSpriteName.NoteHeadCyan,

        flickNote: SkinSpriteName.NoteHeadGreen,
        flickEndNote: SkinSpriteName.NoteTailGreen,
        flickArrow: SkinSpriteName.DirectionalMarkerGreen,

        slideStartNote: SkinSpriteName.NoteHeadPurple,
        slideTickNote: SkinSpriteName.NoteTickPurple,
        slideEndNote: SkinSpriteName.NoteTailPurple,

        connector: SkinSpriteName.NoteConnectionPurple,
    },
})

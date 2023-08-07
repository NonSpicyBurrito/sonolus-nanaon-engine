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

export const layer = {
    cover: 1000,

    note: {
        arrow: 101,
        body: 100,
        connector: 99,
    },

    simLine: 90,

    slot: 2,
    judgmentLine: 1,
    stage: 0,
}

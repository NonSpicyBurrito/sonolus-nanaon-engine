import { SkinSpriteName } from '@sonolus/core'
import { panel } from './panel.js'

export const skin = defineSkin({
    sprites: {
        lane: SkinSpriteName.Lane,
        laneAlternative: SkinSpriteName.LaneAlternative,

        simLine: SkinSpriteName.SimultaneousConnectionNeutral,

        tapNote: SkinSpriteName.NoteHeadCyan,

        flickNote: SkinSpriteName.NoteHeadGreen,
        flickEndNote: SkinSpriteName.NoteTailGreen,
        flickArrow: SkinSpriteName.DirectionalMarkerGreen,

        slideStartNote: SkinSpriteName.NoteHeadPurple,
        slideTickNote: SkinSpriteName.NoteTickPurple,
        slideEndNote: SkinSpriteName.NoteTailPurple,

        connector: SkinSpriteName.NoteConnectionPurple,

        beatLine: SkinSpriteName.GridNeutral,
        bpmChangeLine: SkinSpriteName.GridPurple,
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

    line: 10,

    stage: 0,
}

export const line = (sprite: SkinSprite, beat: number, a: number) => {
    const pos = panel.getPos(bpmChanges.at(beat).time)

    sprite.draw(
        new Rect({
            l: -2.5,
            r: 2.5,
            b: -panel.h * 0.0025,
            t: panel.h * 0.0025,
        }).add(pos),
        layer.line,
        a,
    )
}

export const getZ = (layer: number, time: number, lane: number) =>
    layer - time / 1000 - lane / 100000

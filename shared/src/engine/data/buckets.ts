import { EngineDataBucket, Text } from '@sonolus/core'

export const createBucketDefinition = (
    sprites: Record<
        | 'tapNote'
        | 'flickNote'
        | 'flickArrow'
        | 'connector'
        | 'slideStartNote'
        | 'slideTickNote'
        | 'slideEndNote'
        | 'flickEndNote',
        { id: number }
    >,
) =>
    ({
        tapNote: {
            sprites: [
                {
                    id: sprites.tapNote.id,
                    x: 0,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
            ],
            unit: Text.MillisecondUnit,
        },
        flickNote: {
            sprites: [
                {
                    id: sprites.flickNote.id,
                    x: 0,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
                {
                    id: sprites.flickArrow.id,
                    x: 1,
                    y: 0.58,
                    w: 0.67,
                    h: 0.67,
                    rotation: 0,
                },
                {
                    id: sprites.flickArrow.id,
                    x: 1,
                    y: -0.58,
                    w: 0.67,
                    h: 0.67,
                    rotation: 180,
                },
            ],
            unit: Text.MillisecondUnit,
        },
        slideStartNote: {
            sprites: [
                {
                    id: sprites.connector.id,
                    x: 0.5,
                    y: 0,
                    w: 2,
                    h: 5,
                    rotation: -90,
                },
                {
                    id: sprites.slideStartNote.id,
                    x: -2,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
            ],
            unit: Text.MillisecondUnit,
        },
        slideTickNote: {
            sprites: [
                {
                    id: sprites.connector.id,
                    x: 0,
                    y: 0,
                    w: 2,
                    h: 6,
                    rotation: -90,
                },
                {
                    id: sprites.slideTickNote.id,
                    x: 0,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
            ],
            unit: Text.MillisecondUnit,
        },
        slideEndNote: {
            sprites: [
                {
                    id: sprites.connector.id,
                    x: -0.5,
                    y: 0,
                    w: 2,
                    h: 5,
                    rotation: -90,
                },
                {
                    id: sprites.slideEndNote.id,
                    x: 2,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
            ],
            unit: Text.MillisecondUnit,
        },
        slideEndFlickNote: {
            sprites: [
                {
                    id: sprites.connector.id,
                    x: -0.5,
                    y: 0,
                    w: 2,
                    h: 5,
                    rotation: -90,
                },
                {
                    id: sprites.flickEndNote.id,
                    x: 2,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
                {
                    id: sprites.flickArrow.id,
                    x: 3,
                    y: 0.58,
                    w: 0.67,
                    h: 0.67,
                    rotation: 0,
                },
                {
                    id: sprites.flickArrow.id,
                    x: 3,
                    y: -0.58,
                    w: 0.67,
                    h: 0.67,
                    rotation: 180,
                },
            ],
            unit: Text.MillisecondUnit,
        },
    }) as const satisfies Record<string, EngineDataBucket>

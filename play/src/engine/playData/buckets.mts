import { Text } from 'sonolus-core'
import { skin } from './skin.mjs'

export const buckets = defineBuckets({
    tapNote: {
        sprites: [
            {
                id: skin.sprites.tapNote.id,
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
                id: skin.sprites.flickNote.id,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
            {
                id: skin.sprites.flickArrow.id,
                x: 1,
                y: 0.58,
                w: 0.67,
                h: 0.67,
                rotation: 0,
            },
            {
                id: skin.sprites.flickArrow.id,
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
                id: skin.sprites.connector.id,
                x: 0.5,
                y: 0,
                w: 2,
                h: 5,
                rotation: -90,
            },
            {
                id: skin.sprites.slideStartNote.id,
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
                id: skin.sprites.connector.id,
                x: 0,
                y: 0,
                w: 2,
                h: 6,
                rotation: -90,
            },
            {
                id: skin.sprites.slideTickNote.id,
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
                id: skin.sprites.connector.id,
                x: -0.5,
                y: 0,
                w: 2,
                h: 5,
                rotation: -90,
            },
            {
                id: skin.sprites.slideEndNote.id,
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
                id: skin.sprites.connector.id,
                x: -0.5,
                y: 0,
                w: 2,
                h: 5,
                rotation: -90,
            },
            {
                id: skin.sprites.flickEndNote.id,
                x: 2,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
            {
                id: skin.sprites.flickArrow.id,
                x: 3,
                y: 0.58,
                w: 0.67,
                h: 0.67,
                rotation: 0,
            },
            {
                id: skin.sprites.flickArrow.id,
                x: 3,
                y: -0.58,
                w: 0.67,
                h: 0.67,
                rotation: 180,
            },
        ],
        unit: Text.MillisecondUnit,
    },
})

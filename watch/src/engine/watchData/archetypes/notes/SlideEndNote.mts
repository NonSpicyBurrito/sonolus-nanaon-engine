import { windows } from '../../../../../../shared/src/engine/data/windows.mjs'
import { buckets } from '../../buckets.mjs'
import { effect } from '../../effect.mjs'
import { particle } from '../../particle.mjs'
import { skin } from '../../skin.mjs'
import { Note } from './Note.mjs'

export class SlideEndNote extends Note {
    sprite = skin.sprites.slideEndNote

    clips = {
        perfect: effect.clips.tapPerfect,
        great: effect.clips.tapGreat,
        good: effect.clips.tapGood,
    }

    effects = {
        circular: particle.effects.tapNoteCircular,
        linear: particle.effects.tapNoteLinear,
    }

    windows = windows.slideEndNote

    bucket = buckets.slideEndNote
}

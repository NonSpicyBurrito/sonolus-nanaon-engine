import { effect } from '../../effect.mjs'
import { particle } from '../../particle.mjs'
import { skin } from '../../skin.mjs'
import { Note } from './Note.mjs'

export class SlideTickNote extends Note {
    sprite = skin.sprites.slideTickNote

    clips = {
        perfect: effect.clips.tapPerfect,
        great: effect.clips.tapGreat,
        good: effect.clips.tapGood,
    }

    effects = {
        circular: particle.effects.tapNoteCircular,
        linear: particle.effects.tapNoteLinear,
    }

    render() {
        if (time.now >= this.targetTime) return

        super.render()
    }
}

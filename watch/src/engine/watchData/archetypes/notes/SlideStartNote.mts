import { windows } from '../../../../../../shared/src/engine/data/windows.mjs'
import { buckets } from '../../buckets.mjs'
import { effect } from '../../effect.mjs'
import { particle } from '../../particle.mjs'
import { skin } from '../../skin.mjs'
import { Note } from './Note.mjs'

export class SlideStartNote extends Note {
    sprite = skin.sprites.slideStartNote

    clips = {
        perfect: effect.clips.tapPerfect,
        great: effect.clips.tapGreat,
        good: effect.clips.tapGood,
    }

    effects = {
        circular: particle.effects.tapNoteCircular,
        linear: particle.effects.tapNoteLinear,
    }

    windows = windows.slideStartNote

    bucket = buckets.slideStartNote

    render() {
        if (time.now >= this.targetTime) return

        super.render()
    }
}

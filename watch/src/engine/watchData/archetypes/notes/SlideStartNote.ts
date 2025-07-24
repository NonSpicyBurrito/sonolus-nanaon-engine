import { windows } from '../../../../../../shared/src/engine/data/windows.js'
import { buckets } from '../../buckets.js'
import { effect } from '../../effect.js'
import { particle } from '../../particle.js'
import { skin } from '../../skin.js'
import { Note } from './Note.js'

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

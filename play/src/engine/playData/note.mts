import { note as _note } from '../../../../shared/src/engine/data/note.mjs'
import { options } from '../configuration/options.mjs'

export const note = {
    ..._note,

    get duration() {
        return (12 - options.noteSpeed) / 2
    },
}

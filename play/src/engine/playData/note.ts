import { note as _note } from '../../../../shared/src/engine/data/note.js'
import { options } from '../configuration/options.js'

export const note = {
    ..._note,

    get duration() {
        return (12 - options.noteSpeed) / 2
    },
}

import { flickArrow } from '../../components/flickArrow.mjs'
import { noteDisplay } from '../../components/noteDisplay.mjs'

export const flickNoteFall = {
    enter() {
        flickArrow.showFall()
        noteDisplay.showFall('flickNote')
    },

    exit() {
        flickArrow.clear()
        noteDisplay.clear()
    },
}

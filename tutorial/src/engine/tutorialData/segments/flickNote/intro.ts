import { flickArrow } from '../../components/flickArrow.js'
import { noteDisplay } from '../../components/noteDisplay.js'

export const flickNoteIntro = {
    enter() {
        flickArrow.showOverlay()
        noteDisplay.showOverlay('flickNote')
    },

    exit() {
        flickArrow.clear()
        noteDisplay.clear()
    },
}

import { connector } from '../../components/connector.js'
import { noteDisplay } from '../../components/noteDisplay.js'

export const slideStartNoteIntro = {
    enter() {
        noteDisplay.showOverlay('slideStartNote')
        connector.showOverlayIn()
    },

    exit() {
        noteDisplay.clear()
        connector.clear()
    },
}

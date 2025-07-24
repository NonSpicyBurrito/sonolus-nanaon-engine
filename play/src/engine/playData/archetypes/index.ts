import { Initialization } from './Initialization.js'
import { InputManager } from './InputManager.js'
import { SimLine } from './SimLine.js'
import { SlideConnector } from './SlideConnector.js'
import { Stage } from './Stage.js'
import { FlickNote } from './notes/FlickNote.js'
import { TapNote } from './notes/TapNote.js'
import { SlideEndFlickNote } from './notes/slideNotes/SlideEndFlickNote.js'
import { SlideEndNote } from './notes/slideNotes/SlideEndNote.js'
import { SlideStartNote } from './notes/slideNotes/SlideStartNote.js'
import { SlideTickNote } from './notes/slideNotes/SlideTickNote.js'

export const archetypes = defineArchetypes({
    Initialization,
    InputManager,

    Stage,

    TapNote,
    FlickNote,

    SlideStartNote,
    SlideTickNote,
    SlideEndNote,
    SlideEndFlickNote,

    SlideConnector,

    SimLine,
})

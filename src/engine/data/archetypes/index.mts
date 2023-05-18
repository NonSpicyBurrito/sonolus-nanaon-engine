import { Initialization } from './Initialization.mjs'
import { InputManager } from './InputManager.mjs'
import { SimLine } from './SimLine.mjs'
import { SlideConnector } from './SlideConnector.mjs'
import { Stage } from './Stage.mjs'
import { FlickNote } from './notes/FlickNote.mjs'
import { TapNote } from './notes/TapNote.mjs'
import { SlideEndFlickNote } from './notes/slideNotes/SlideEndFlickNote.mjs'
import { SlideEndNote } from './notes/slideNotes/SlideEndNote.mjs'
import { SlideStartNote } from './notes/slideNotes/SlideStartNote.mjs'
import { SlideTickNote } from './notes/slideNotes/SlideTickNote.mjs'

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

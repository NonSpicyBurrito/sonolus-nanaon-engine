import { Initialization } from './Initialization.mjs'
import { SimLine } from './SimLine.mjs'
import { SlideConnector } from './SlideConnector.mjs'
import { Stage } from './Stage.mjs'
import { SlideEndNote } from './notes/SlideEndNote.mjs'
import { SlideStartNote } from './notes/SlideStartNote.mjs'
import { SlideTickNote } from './notes/SlideTickNote.mjs'
import { TapNote } from './notes/TapNote.mjs'
import { FlickNote } from './notes/flickNotes/FlickNote.mjs'
import { SlideEndFlickNote } from './notes/flickNotes/SlideEndFlickNote.mjs'

export const archetypes = defineArchetypes({
    Initialization,

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

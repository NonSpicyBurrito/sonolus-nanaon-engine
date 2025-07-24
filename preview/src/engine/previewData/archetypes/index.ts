import { EngineArchetypeName } from '@sonolus/core'
import { BpmChange } from './BpmChange.js'
import { Initialization } from './Initialization.js'
import { SimLine } from './SimLine.js'
import { SlideConnector } from './SlideConnector.js'
import { Stage } from './Stage.js'
import { SlideEndNote } from './notes/SlideEndNote.js'
import { SlideStartNote } from './notes/SlideStartNote.js'
import { SlideTickNote } from './notes/SlideTickNote.js'
import { TapNote } from './notes/TapNote.js'
import { FlickNote } from './notes/flickNotes/FlickNote.js'
import { SlideEndFlickNote } from './notes/flickNotes/SlideEndFlickNote.js'

export const archetypes = defineArchetypes({
    Initialization,

    [EngineArchetypeName.BpmChange]: BpmChange,

    Stage,

    TapNote,
    SlideStartNote,
    SlideTickNote,
    SlideEndNote,

    FlickNote,
    SlideEndFlickNote,

    SlideConnector,

    SimLine,
})

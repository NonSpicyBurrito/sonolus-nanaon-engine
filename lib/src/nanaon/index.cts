export type NanaonChart = ChartObject[]

export type ChartObject = BPMObject | SingleObject | SlideObject

type ObjectBase = {
    beat: number
}

export type BPMObject = ObjectBase & {
    type: 'BPM'
    bpm: number
}

type NoteBase = ObjectBase & {
    lane: number
    flick?: true
}

export type SingleObject = NoteBase & {
    type: 'Single'
}

export type SlideObject = {
    type: 'Slide'
    connections: Connection[]
}

export type Connection = NoteBase

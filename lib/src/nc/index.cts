export type NC = NCObject[]

export type NCObject = NCBPMChangeObject | NCSingleNote | NCSlideNote

type BaseNCObject = {
    beat: number
}

export type NCBPMChangeObject = BaseNCObject & {
    type: 'bpm'
    bpm: number
}

type BaseNCNote = BaseNCObject & {
    lane: number
    flick?: true
}

export type NCSingleNote = BaseNCNote & {
    type: 'single'
}

export type NCSlideNote = {
    type: 'slide'
    connections: NCConnectionNote[]
}

export type NCConnectionNote = BaseNCNote

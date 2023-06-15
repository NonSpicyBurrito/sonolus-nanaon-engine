export type NoteData = {
    m_NoteList: NoteDataNote[]
}

export const NoteDataNoteType = {
    Normal: 1,
    Flick: 2,
} as const

export type NoteDataNoteType = (typeof NoteDataNoteType)[keyof typeof NoteDataNoteType]

export type NoteDataNote = {
    m_Id: number
    m_Line: number
    m_Time: number
    m_Type: NoteDataNoteType
    m_ParentId: number
    m_ChildId: number
}

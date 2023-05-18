export type NoteData = {
    m_NoteList: Note[]
}

export const NoteType = {
    Normal: 1,
    Flick: 2,
} as const

export type NoteType = (typeof NoteType)[keyof typeof NoteType]

export type Note = {
    m_Id: number
    m_Line: number
    m_Time: number
    m_Type: NoteType
    m_ParentId: number
    m_ChildId: number
}

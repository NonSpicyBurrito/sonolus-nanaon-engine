export type NoteData = {
    m_NoteList: NoteDataNote[]
}

export enum NoteDataNoteType {
    Normal = 1,
    Flick = 2,
}

export type NoteDataNote = {
    m_Id: number
    m_Line: number
    m_Time: number
    m_Type: NoteDataNoteType
    m_ParentId: number
    m_ChildId: number
}

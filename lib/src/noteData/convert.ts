import { NC, NCConnectionNote, NCSingleNote, NCSlideNote } from '../nc/index.js'
import { NoteData, NoteDataNoteType } from './index.js'

export const noteDataToNC = (noteData: NoteData): NC => {
    const nc: NC = [
        {
            type: 'bpm',
            beat: 0,
            bpm: 60,
        },
    ]

    const idToSlide = new Map<number, NCSlideNote>()

    for (const note of noteData.m_NoteList) {
        if (note.m_Id === 1) continue

        if (note.m_ParentId) {
            const connection: NCConnectionNote = {
                beat: note.m_Time,
                lane: note.m_Line - 2,
            }

            if (note.m_Type === NoteDataNoteType.Flick) connection.flick = true

            const slide = idToSlide.get(note.m_ParentId)
            if (!slide) throw new Error('Unexpected missing slide')

            idToSlide.set(note.m_Id, slide)
            slide.connections.push(connection)
        } else if (note.m_ChildId) {
            const slide: NCSlideNote = {
                type: 'slide',
                connections: [
                    {
                        beat: note.m_Time,
                        lane: note.m_Line - 2,
                    },
                ],
            }

            idToSlide.set(note.m_Id, slide)
            nc.push(slide)
        } else {
            const single: NCSingleNote = {
                type: 'single',
                beat: note.m_Time,
                lane: note.m_Line - 2,
            }

            if (note.m_Type === NoteDataNoteType.Flick) single.flick = true

            nc.push(single)
        }
    }

    return nc
}

import { Connection, NanaonChart, SingleObject, SlideObject } from '../nanaon/index.cjs'
import { NoteData, NoteType } from './index.cjs'

export const noteDataToNanaon = (noteData: NoteData): NanaonChart => {
    const nanaon: NanaonChart = [
        {
            type: 'BPM',
            beat: 0,
            bpm: 60,
        },
    ]

    const idToSlide = new Map<number, SlideObject>()

    for (const note of noteData.m_NoteList) {
        if (!note.m_Time) continue

        if (note.m_ParentId) {
            const connection: Connection = {
                beat: note.m_Time,
                lane: note.m_Line - 2,
            }

            if (note.m_Type === NoteType.Flick) connection.flick = true

            const slide = idToSlide.get(note.m_ParentId)
            if (!slide) throw 'Unexpected missing slide'

            idToSlide.set(note.m_Id, slide)
            slide.connections.push(connection)
        } else if (note.m_ChildId) {
            const slide: SlideObject = {
                type: 'Slide',
                connections: [
                    {
                        beat: note.m_Time,
                        lane: note.m_Line - 2,
                    },
                ],
            }

            idToSlide.set(note.m_Id, slide)
            nanaon.push(slide)
        } else {
            const single: SingleObject = {
                type: 'Single',
                beat: note.m_Time,
                lane: note.m_Line - 2,
            }

            if (note.m_Type === NoteType.Flick) single.flick = true

            nanaon.push(single)
        }
    }

    return nanaon
}

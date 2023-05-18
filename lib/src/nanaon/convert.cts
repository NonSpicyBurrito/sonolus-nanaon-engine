import {
    EngineArchetypeDataName,
    EngineArchetypeName,
    LevelData,
    LevelDataEntity,
} from 'sonolus-core'
import { BPMObject, ChartObject, NanaonChart, SingleObject, SlideObject } from './index.cjs'

type Intermediate = {
    archetype: string
    data: Record<string, number | Intermediate>
    sim: boolean
}

type Append = (intermediate: Intermediate) => void

type Handler<T extends ChartObject> = (object: T, append: Append) => void

export function nanaonToLevelData(chart: NanaonChart, bgmOffset = 0): LevelData {
    const entities: LevelDataEntity[] = []

    const beatToIntermediates = new Map<number, Intermediate[]>()

    const intermediateToRef = new Map<Intermediate, string>()
    const intermediateToEntity = new Map<Intermediate, LevelDataEntity>()

    let i = 0
    const getRef = (intermediate: Intermediate) => {
        let ref = intermediateToRef.get(intermediate)
        if (ref) return ref

        ref = (i++).toString(36)
        intermediateToRef.set(intermediate, ref)

        const entity = intermediateToEntity.get(intermediate)
        if (entity) entity.ref = ref

        return ref
    }

    const append: Append = (intermediate) => {
        const entity: LevelDataEntity = {
            archetype: intermediate.archetype,
            data: [],
        }

        if (intermediate.sim) {
            const beat = intermediate.data[EngineArchetypeDataName.Beat]
            if (typeof beat !== 'number') throw 'Unexpected beat'

            const intermediates = beatToIntermediates.get(beat)
            if (intermediates) {
                intermediates.push(intermediate)
            } else {
                beatToIntermediates.set(beat, [intermediate])
            }
        }

        const ref = intermediateToRef.get(intermediate)
        if (ref) entity.ref = ref

        intermediateToEntity.set(intermediate, entity)
        entities.push(entity)

        for (const [name, value] of Object.entries(intermediate.data)) {
            if (typeof value === 'number') {
                entity.data.push({
                    name,
                    value,
                })
            } else {
                entity.data.push({
                    name,
                    ref: getRef(value),
                })
            }
        }
    }

    append({
        archetype: 'Initialization',
        data: {},
        sim: false,
    })
    append({
        archetype: 'InputManager',
        data: {},
        sim: false,
    })
    append({
        archetype: 'Stage',
        data: {},
        sim: false,
    })

    const objects = repair(chart)

    for (const object of objects) {
        handlers[object.type](object as never, append)
    }

    for (const intermediates of beatToIntermediates.values()) {
        for (let i = 1; i < intermediates.length; i++) {
            append({
                archetype: 'SimLine',
                data: {
                    a: intermediates[i - 1],
                    b: intermediates[i],
                },
                sim: false,
            })
        }
    }

    return {
        bgmOffset,
        entities,
    }
}

const bpm: Handler<BPMObject> = (object, append) =>
    append({
        archetype: EngineArchetypeName.BpmChange,
        data: {
            [EngineArchetypeDataName.Beat]: object.beat,
            [EngineArchetypeDataName.Bpm]: object.bpm,
        },
        sim: false,
    })

const single: Handler<SingleObject> = (object, append) =>
    append({
        archetype: object.flick ? 'FlickNote' : 'TapNote',
        data: {
            [EngineArchetypeDataName.Beat]: object.beat,
            lane: object.lane,
        },
        sim: true,
    })

const slide: Handler<SlideObject> = (object, append) => {
    let prev: Intermediate | undefined

    for (const [i, connection] of object.connections.entries()) {
        if (!prev) {
            prev = {
                archetype: 'SlideStartNote',
                data: {
                    [EngineArchetypeDataName.Beat]: connection.beat,
                    lane: connection.lane,
                },
                sim: true,
            }

            append(prev)
            continue
        }

        const note = {
            archetype:
                i === object.connections.length - 1
                    ? connection.flick
                        ? 'SlideEndFlickNote'
                        : 'SlideEndNote'
                    : 'SlideTickNote',
            data: {
                [EngineArchetypeDataName.Beat]: connection.beat,
                lane: connection.lane,
                prev,
            },
            sim: true,
        }

        append(note)

        append({
            archetype: 'SlideConnector',
            data: {
                head: prev,
                tail: note,
            },
            sim: false,
        })

        prev = note
    }
}

const handlers: {
    [K in ChartObject['type']]: Handler<Extract<ChartObject, { type: K }>>
} = {
    BPM: bpm,
    Single: single,
    Slide: slide,
}

const repair = (objects: ChartObject[]) => {
    const replace = (o: ChartObject, n: ChartObject) => objects.splice(objects.indexOf(o), 1, n)

    const remove = (o: ChartObject) => objects.splice(objects.indexOf(o), 1)

    for (const object of objects) {
        if (object.type !== 'Slide') continue

        object.connections.sort((a, b) => a.beat - b.beat)

        switch (object.connections.length) {
            case 0:
                remove(object)
                break
            case 1: {
                const connection = object.connections[0]

                const single: SingleObject = {
                    type: 'Single',
                    lane: connection.lane,
                    beat: connection.beat,
                }
                if (connection.flick) single.flick = connection.flick

                replace(object, single)
                break
            }
        }
    }

    return objects
}

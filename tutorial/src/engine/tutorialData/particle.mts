import { ParticleEffectName } from '@sonolus/core'
import { lane } from '../../../../shared/src/engine/data/lane.mjs'
import { perspectiveLayout } from '../../../../shared/src/engine/data/utils.mjs'
import { scaledScreen } from './scaledScreen.mjs'

export const particle = defineParticle({
    effects: {
        lane: ParticleEffectName.LaneLinear,

        tapNoteCircular: ParticleEffectName.NoteCircularTapCyan,
        tapNoteLinear: ParticleEffectName.NoteLinearTapCyan,

        flickNoteCircular: ParticleEffectName.NoteCircularAlternativeGreen,
        flickNoteLinear: ParticleEffectName.NoteLinearAlternativeGreen,

        holdCircular: ParticleEffectName.NoteCircularHoldPurple,
        holdLinear: ParticleEffectName.NoteLinearHoldPurple,
    },
})

const circularEffectLayout = ({ w, h }: { w: number; h: number }) => {
    h *= scaledScreen.wToH

    return new Rect({
        l: -w,
        r: w,
        t: 1 - h,
        b: 1 + h,
    })
}

const linearEffectLayout = () =>
    new Rect({
        l: -0.5,
        r: 0.5,
        t: 1 - scaledScreen.wToH,
        b: 1,
    })

export const playLaneEffects = () =>
    particle.effects.lane.spawn(
        perspectiveLayout({ l: -0.5, r: 0.5, b: lane.b, t: lane.t }),
        0.2,
        false,
    )

export const playLinearNoteEffect = (effect: ParticleEffect) =>
    effect.spawn(linearEffectLayout(), 0.4, false)

export const playCircularNoteEffect = (effect: ParticleEffect) =>
    effect.spawn(circularEffectLayout({ w: 1.05, h: 0.7 }), 0.6, false)

export const spawnCircularHoldEffect = () =>
    particle.effects.holdCircular.spawn(circularEffectLayout({ w: 0.9, h: 0.6 }), 1, true)

export const spawnLinearHoldEffect = () =>
    particle.effects.holdLinear.spawn(linearEffectLayout(), 1, true)

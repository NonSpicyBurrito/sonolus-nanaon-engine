import { lane } from './constants.mjs'
import { instruction } from './instruction.mjs'
import { particle } from './particle.mjs'
import { hand, scaledScreen } from './shared.mjs'

export const leftRotated = ({ l, r, b, t }: RectLike) =>
    new Quad({
        x1: r,
        x2: l,
        x3: l,
        x4: r,
        y1: b,
        y2: b,
        y3: t,
        y4: t,
    })

export const rightRotated = ({ l, r, b, t }: RectLike) =>
    new Quad({
        x1: l,
        x2: r,
        x3: r,
        x4: l,
        y1: t,
        y2: t,
        y3: b,
        y4: b,
    })

export const perspectiveLayout = ({ l, r, b, t }: RectLike) =>
    new Quad({
        x1: l * b,
        x2: l * t,
        x3: r * t,
        x4: r * b,
        y1: b,
        y2: t,
        y3: t,
        y4: b,
    })

export const circularEffectLayout = ({ w, h }: { w: number; h: number }) => {
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

export const approach = (now: number) => Math.lerp(0.1, 1, 71.7675 ** Math.remap(0, 2, -1, 0, now))

export const drawHand = (angle: number, y: number, a: number) =>
    instruction.icons.hand.paint(
        new Vec(0, 1)
            .rotate(angle)
            .mul(0.25 * ui.configuration.instruction.scale)
            .add(hand.position)
            .translate(0, y),
        0.25 * ui.configuration.instruction.scale,
        (180 * angle) / Math.PI,
        0,
        a * ui.configuration.instruction.alpha,
    )

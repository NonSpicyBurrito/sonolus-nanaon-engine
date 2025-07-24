import { options } from '../../configuration/options.js'
import { flick } from '../flick.js'
import { particle } from '../particle.js'
import { scaledScreen } from '../scaledScreen.js'
import { skin } from '../skin.js'
import { archetypes } from './index.js'

export class Initialization extends Archetype {
    preprocess() {
        const targetAspectRatio = 16 / 9

        const stage = {
            w:
                options.lockStageAspectRatio && screen.aspectRatio > targetAspectRatio
                    ? screen.h * targetAspectRatio
                    : screen.w,

            h:
                options.lockStageAspectRatio && screen.aspectRatio < targetAspectRatio
                    ? screen.w / targetAspectRatio
                    : screen.h,
        }

        const t = stage.h * 0.5
        const b = stage.h * -0.32

        const w = stage.w * 0.165

        scaledScreen.l = screen.l / w
        scaledScreen.r = screen.r / w
        scaledScreen.b = screen.b / (b - t)
        scaledScreen.t = screen.t / (b - t)

        scaledScreen.wToH = w / (t - b)

        flick.distance = stage.w

        const transform = Mat.identity.scale(w, b - t).translate(0, t)
        skin.transform.set(transform)
        particle.transform.set(transform)

        score.base.set({
            perfect: 1,
            great: 0.7,
            good: 0.2,
        })
        score.consecutive.great.set({
            multiplier: 0.01,
            step: 100,
            cap: 1000,
        })

        const gap = 0.05
        const uiRect = screen.rect.shrink(gap, gap)

        ui.menu.set({
            anchor: uiRect.rt,
            pivot: { x: 1, y: 1 },
            size: new Vec(0.15, 0.15).mul(ui.configuration.menu.scale),
            rotation: 0,
            alpha: ui.configuration.menu.alpha,
            horizontalAlign: HorizontalAlign.Center,
            background: true,
        })

        ui.metric.primary.bar.set({
            anchor: uiRect.lt,
            pivot: { x: 0, y: 1 },
            size: new Vec(0.75, 0.15).mul(ui.configuration.metric.primary.scale),
            rotation: 0,
            alpha: ui.configuration.metric.primary.alpha,
            horizontalAlign: HorizontalAlign.Left,
            background: true,
        })
        ui.metric.primary.value.set({
            anchor: uiRect.lt.add(
                new Vec(0.715, -0.035).mul(ui.configuration.metric.primary.scale),
            ),
            pivot: { x: 1, y: 1 },
            size: new Vec(0, 0.08).mul(ui.configuration.metric.primary.scale),
            rotation: 0,
            alpha: ui.configuration.metric.primary.alpha,
            horizontalAlign: HorizontalAlign.Right,
            background: false,
        })

        ui.metric.secondary.bar.set({
            anchor: uiRect.rt
                .sub(new Vec(gap, 0))
                .sub(new Vec(0.15, 0).mul(ui.configuration.menu.scale)),
            pivot: { x: 1, y: 1 },
            size: new Vec(0.55, 0.15).mul(ui.configuration.metric.secondary.scale),
            rotation: 0,
            alpha: ui.configuration.metric.secondary.alpha,
            horizontalAlign: HorizontalAlign.Left,
            background: true,
        })
        ui.metric.secondary.value.set({
            anchor: uiRect.rt
                .sub(new Vec(gap, 0))
                .sub(new Vec(0.15, 0).mul(ui.configuration.menu.scale))
                .sub(new Vec(0.035, 0.035).mul(ui.configuration.metric.secondary.scale)),
            pivot: { x: 1, y: 1 },
            size: new Vec(0, 0.08).mul(ui.configuration.metric.secondary.scale),
            rotation: 0,
            alpha: ui.configuration.metric.secondary.alpha,
            horizontalAlign: HorizontalAlign.Right,
            background: false,
        })

        ui.combo.value.set({
            anchor: { x: stage.w * 0.35, y: Math.lerp(t, b, 0.5) },
            pivot: { x: 0.5, y: 0.5 },
            size: new Vec(0, stage.h * 0.12).mul(ui.configuration.combo.scale),
            rotation: 0,
            alpha: ui.configuration.combo.alpha,
            horizontalAlign: HorizontalAlign.Center,
            background: false,
        })
        ui.combo.text.set({
            anchor: { x: stage.w * 0.35, y: Math.lerp(t, b, 0.5) },
            pivot: { x: 0.5, y: 2.75 },
            size: new Vec(0, stage.h * 0.05).mul(ui.configuration.combo.scale),
            rotation: 0,
            alpha: ui.configuration.combo.alpha,
            horizontalAlign: HorizontalAlign.Center,
            background: false,
        })

        ui.judgment.set({
            anchor: { x: 0, y: Math.lerp(t, b, 0.87) },
            pivot: { x: 0.5, y: 0.5 },
            size: new Vec(0, stage.h * 0.075).mul(ui.configuration.judgment.scale),
            rotation: 0,
            alpha: ui.configuration.judgment.alpha,
            horizontalAlign: HorizontalAlign.Center,
            background: false,
        })

        for (const archetype of Object.values(archetypes)) {
            if (!('globalPreprocess' in archetype)) continue

            archetype.globalPreprocess()
        }
    }

    spawnOrder() {
        return 0
    }

    updateSequential() {
        archetypes.InputManager.spawn({})

        this.despawn = true
    }
}

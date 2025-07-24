import { lane } from '../../../../../shared/src/engine/data/lane.js'
import { perspectiveLayout } from '../../../../../shared/src/engine/data/utils.js'
import { options } from '../../configuration/options.js'
import { effect, sfxDistance } from '../effect.js'
import { note } from '../note.js'
import { scaledScreen } from '../scaledScreen.js'
import { layer, skin } from '../skin.js'
import { archetypes } from './index.js'

export class Stage extends Archetype {
    spawnTime() {
        return -999999
    }

    despawnTime() {
        return 999999
    }

    preprocess() {
        if (options.sfxEnabled) {
            let t = -999999
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            while (true) {
                const nt = streams.getNextKey(-9999, t)
                if (nt === t) break

                t = nt
                effect.clips.stage.schedule(t, sfxDistance)
            }
        }

        if (options.laneEffectEnabled || options.slotEffectEnabled) {
            for (let i = 0; i < 5; i++) {
                archetypes.EmptyEffect.spawn({
                    l: i - 2.5,
                })
            }
        }
    }

    updateParallel() {
        if (this.useFallbackStage) {
            this.drawFallbackStage()
        } else {
            this.drawNanaonStage()
        }

        this.drawJudgmentLine()
        this.drawSlots()
        this.drawStageCover()
    }

    get useFallbackStage() {
        return !skin.sprites.nanaonStage.exists
    }

    drawFallbackStage() {
        for (let i = 0; i < 5; i++) {
            const layout = perspectiveLayout({
                l: i - 2.5,
                r: i - 1.5,
                t: 0.1,
                b: 1,
            })

            if (i % 2 === 1) {
                skin.sprites.laneAlternative.draw(layout, layer.stage, 1)
            } else {
                skin.sprites.lane.draw(layout, layer.stage, 1)
            }
        }
    }

    drawNanaonStage() {
        const layout = new Rect({
            l: -2.51,
            r: 2.51,
            t: 0.06,
            b: 1,
        })

        skin.sprites.nanaonStage.draw(layout, layer.stage, 1)
    }

    drawSlots() {
        for (let i = 0; i < 5; i++) {
            const layout = perspectiveLayout({
                l: i - 2.5,
                r: i - 1.5,
                t: 1 - note.h,
                b: 1 + note.h,
            })

            skin.sprites.slot.draw(layout, layer.slot, 1)
        }
    }

    drawJudgmentLine() {
        const layout = perspectiveLayout({
            l: -2.5,
            r: 2.5,
            t: 1 - note.h,
            b: 1 + note.h,
        })

        skin.sprites.judgmentLine.draw(layout, layer.judgmentLine, 1)
    }

    drawStageCover() {
        if (options.stageCover <= 0) return

        skin.sprites.cover.draw(
            new Rect({
                l: scaledScreen.l,
                r: scaledScreen.r,
                t: scaledScreen.t,
                b: Math.lerp(lane.t, 1, options.stageCover),
            }),
            layer.cover,
            1,
        )
    }
}

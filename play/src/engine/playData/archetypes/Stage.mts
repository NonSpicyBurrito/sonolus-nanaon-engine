import { options } from '../../configuration/options.mjs'
import { effect, sfxDistance } from '../effect.mjs'
import { lane } from '../lane.mjs'
import { note } from '../note.mjs'
import { particle } from '../particle.mjs'
import { scaledScreen } from '../scaledScreen.mjs'
import { layer, skin } from '../skin.mjs'
import { perspectiveLayout } from '../utils.mjs'
import { isUsed } from './InputManager.mjs'

export class Stage extends Archetype {
    hitbox = this.entityMemory(Rect)

    spawnOrder() {
        return 2
    }

    initialize() {
        new Rect(lane.hitbox).transform(skin.transform).copyTo(this.hitbox)
    }

    touchOrder = 2
    touch() {
        if (options.autoplay) return

        for (const touch of touches) {
            if (!touch.started) continue
            if (!this.hitbox.contains(touch.position)) continue
            if (isUsed(touch)) continue

            this.onEmptyTap(touch)
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

    onEmptyTap(touch: Touch) {
        this.playEmptyEffects(this.xToL(touch.position.x))
    }

    xToL(x: number) {
        return Math.floor(Math.unlerp(this.hitbox.l, this.hitbox.r, x) * 5) - 2.5
    }

    playEmptyEffects(l: number) {
        if (options.sfxEnabled) this.playEmptySFX()
        if (options.laneEffectEnabled) this.playEmptyLaneEffects(l)
        if (options.slotEffectEnabled) this.playEmptySlotEffects(l)
    }

    playEmptySFX() {
        effect.clips.stage.play(sfxDistance)
    }

    playEmptyLaneEffects(l: number) {
        particle.effects.lane.spawn(
            perspectiveLayout({ l, r: l + 1, b: lane.b, t: lane.t }),
            0.2,
            false,
        )
    }

    playEmptySlotEffects(l: number) {
        const w = 0.5 * options.slotEffectSize
        const h = w * 2 * scaledScreen.wToH

        particle.effects.slot.spawn(
            new Rect({ l: l + 0.5 - w, r: l + 0.5 + w, t: 1 - h, b: 1 }),
            0.6,
            false,
        )
    }

    drawFallbackStage() {
        for (let i = 0; i < 5; i++) {
            const layout = perspectiveLayout({
                l: i - 2.5,
                r: i - 1.5,
                t: 0.1,
                b: 1,
            })

            skin.sprites.lane.draw(layout, layer.stage, 1)
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

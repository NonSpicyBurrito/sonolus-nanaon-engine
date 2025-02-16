import { EngineConfigurationOption, Text } from '@sonolus/core'

export const optionsDefinition = {
    speed: {
        name: Text.Speed,
        standard: true,
        advanced: true,
        type: 'slider',
        def: 1,
        min: 0.5,
        max: 2,
        step: 0.05,
        unit: Text.PercentageUnit,
    },
    hidden: {
        name: Text.Hidden,
        standard: true,
        advanced: true,
        type: 'slider',
        def: 0,
        min: 0,
        max: 1,
        step: 0.05,
        unit: Text.PercentageUnit,
    },
    noteSpeed: {
        name: Text.NoteSpeed,
        scope: 'Nanaon',
        type: 'slider',
        def: 5,
        min: 1,
        max: 11,
        step: 0.1,
    },
    mirror: {
        name: Text.Mirror,
        type: 'toggle',
        def: 0,
    },
    sfxEnabled: {
        name: Text.Effect,
        scope: 'Nanaon',
        type: 'toggle',
        def: 1,
    },
    autoSFX: {
        name: Text.EffectAuto,
        scope: 'Nanaon',
        type: 'toggle',
        def: 0,
    },
    noteSize: {
        name: Text.NoteSize,
        scope: 'Nanaon',
        type: 'slider',
        def: 1,
        min: 0.1,
        max: 2,
        step: 0.05,
        unit: Text.PercentageUnit,
    },
    noteEffectEnabled: {
        name: Text.NoteEffect,
        scope: 'Nanaon',
        type: 'toggle',
        def: 1,
    },
    noteEffectSize: {
        name: Text.NoteEffectSize,
        scope: 'Nanaon',
        type: 'slider',
        def: 1,
        min: 0.1,
        max: 2,
        step: 0.05,
        unit: Text.PercentageUnit,
    },
    simLineEnabled: {
        name: Text.Simline,
        scope: 'Nanaon',
        type: 'toggle',
        def: 1,
    },
    connectorAlpha: {
        name: Text.ConnectorAlpha,
        scope: 'Nanaon',
        type: 'slider',
        def: 0.8,
        min: 0.1,
        max: 1,
        step: 0.05,
        unit: Text.PercentageUnit,
    },
    laneEffectEnabled: {
        name: Text.LaneEffect,
        scope: 'Nanaon',
        type: 'toggle',
        def: 1,
    },
    slotEffectEnabled: {
        name: Text.SlotEffect,
        scope: 'Nanaon',
        type: 'toggle',
        def: 1,
    },
    slotEffectSize: {
        name: Text.SlotEffectSize,
        scope: 'Nanaon',
        type: 'slider',
        def: 1,
        min: 0,
        max: 2,
        step: 0.05,
        unit: Text.PercentageUnit,
    },
    stageCover: {
        name: Text.StageCoverVertical,
        scope: 'Nanaon',
        advanced: true,
        type: 'slider',
        def: 0,
        min: 0,
        max: 1,
        step: 0.05,
        unit: Text.PercentageUnit,
    },
    lockStageAspectRatio: {
        name: Text.StageAspectratioLock,
        scope: 'Nanaon',
        type: 'toggle',
        def: 1,
    },
    previewVerticalScale: {
        name: Text.PreviewScaleVertical,
        scope: 'Nanaon',
        type: 'slider',
        def: 1,
        min: 0.5,
        max: 2,
        step: 0.05,
        unit: Text.PercentageUnit,
    },
    previewMeasure: {
        name: Text.PreviewMeasure,
        scope: 'Nanaon',
        type: 'toggle',
        def: 1,
    },
    previewBeat: {
        name: Text.PreviewBeat,
        scope: 'Nanaon',
        type: 'toggle',
        def: 1,
    },
    previewTime: {
        name: Text.PreviewTime,
        scope: 'Nanaon',
        type: 'toggle',
        def: 1,
    },
    previewBpm: {
        name: Text.PreviewBpm,
        scope: 'Nanaon',
        type: 'toggle',
        def: 1,
    },
} satisfies Record<string, EngineConfigurationOption>

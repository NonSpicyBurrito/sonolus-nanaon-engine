import { DatabaseEngineItem } from '@sonolus/core'
import { resolve } from 'node:path'

export { ncToLevelData } from './nc/convert.cjs'
export * from './nc/index.cjs'
export { noteDataToNC } from './noteData/convert.cjs'
export * from './noteData/index.cjs'

export const version = '1.4.1'

export const databaseEngineItem = {
    name: 'nanaon',
    version: 12,
    title: {
        en: '22/7',
    },
    subtitle: {
        en: '22/7 Music Time',
        ja: '22/7 音楽の時間',
        zhs: '22/7 音乐的时间',
        zht: '22/7 音樂的時間',
    },
    author: {
        en: 'Burrito',
    },
    description: {
        en: [
            'A recreation of 22/7 Music Time engine in Sonolus.',
            '',
            'Version:',
            version,
            '',
            'GitHub Repository:',
            'https://github.com/NonSpicyBurrito/sonolus-nanaon-engine',
        ].join('\n'),
    },
} as const satisfies Partial<DatabaseEngineItem>

export const engineConfigurationPath = resolve(__dirname, 'EngineConfiguration')
export const enginePlayDataPath = resolve(__dirname, 'EnginePlayData')
export const engineWatchDataPath = resolve(__dirname, 'EngineWatchData')
export const enginePreviewDataPath = resolve(__dirname, 'EnginePreviewData')
export const engineTutorialDataPath = resolve(__dirname, 'EngineTutorialData')
export const engineThumbnailPath = resolve(__dirname, 'thumbnail.png')

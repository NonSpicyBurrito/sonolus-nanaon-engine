import { EngineInfo } from 'sonolus-core'
import { Resource } from './Resource.cjs'

export { ncToLevelData } from './nc/convert.cjs'
export * from './nc/index.cjs'
export { noteDataToNC } from './noteData/convert.cjs'
export * from './noteData/index.cjs'

export const version = '1.3.0'

export const engineInfo = {
    name: 'nanaon',
    version: 11,
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
} as const satisfies Partial<EngineInfo>

export const engineConfiguration = new Resource('EngineConfiguration')
export const enginePlayData = new Resource('EnginePlayData')
export const engineWatchData = new Resource('EngineWatchData')
export const enginePreviewData = new Resource('EnginePreviewData')
export const engineTutorialData = new Resource('EngineTutorialData')
export const engineThumbnail = new Resource('thumbnail.png')

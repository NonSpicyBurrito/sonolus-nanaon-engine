import { DatabaseEngineItem } from '@sonolus/core'

export { ncToLevelData } from './nc/convert.js'
export * from './nc/index.js'
export { noteDataToNC } from './noteData/convert.js'
export * from './noteData/index.js'

export const version = '1.5.4'

export const databaseEngineItem = {
    name: 'nanaon',
    version: 13,
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
        en: 'Burrito#1000',
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

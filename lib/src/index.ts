import { DatabaseEngineItem, TextFunction } from '@sonolus/core'

export { ncToLevelData } from './nc/convert.js'
export * from './nc/index.js'
export { noteDataToNC } from './noteData/convert.js'
export * from './noteData/index.js'

export const version = '1.6.3'

export const engineFullName = {
    en: '22/7 Music Time',
    ja: '22/7 音楽の時間',
    zhs: '22/7 音乐的时间',
    zht: '22/7 音樂的時間',
} as const

export const engineShortName = {
    en: '22/7',
} as const

export const databaseEngineItem = {
    name: 'nanaon',
    version: 13,
    title: { en: `${TextFunction.Localize}:${JSON.stringify(engineShortName)}` },
    subtitle: { en: `${TextFunction.Localize}:${JSON.stringify(engineFullName)}` },
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

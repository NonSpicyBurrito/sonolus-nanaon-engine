# Sonolus Nanaon Engine

A recreation of 22/7 Music Time engine in [Sonolus](https://sonolus.com).

## Links

- [Sonolus Website](https://sonolus.com)
- [Sonolus Wiki](https://github.com/NonSpicyBurrito/sonolus-wiki)

## Installation

```
npm install sonolus-nanaon-engine
```

## Custom Resources

### Skin Sprites

| Name           |
| -------------- |
| `Nanaon Stage` |

## Documentation

### `version`

Package version.

### `databaseEngineItem`

Partial database engine item compatible with [sonolus-express](https://github.com/NonSpicyBurrito/sonolus-express).

### `noteDataToNC(noteData)`

Converts note data to NC (Nanaon Chart).

- `noteData`: note data.

### `ncToLevelData(nc, offset?)`

Converts NC (Nanaon Chart) to Level Data.

- `nc`: Nanaon Chart.
- `offset`: offset (default: `0`).

### Assets

The following assets are exposed as package entry points:

- `EngineConfiguration`
- `EnginePlayData`
- `EngineWatchData`
- `EnginePreviewData`
- `EngineTutorialData`
- `EngineThumbnail`

In Node.js, you can obtain path to assets using `import.meta.resolve('sonolus-nanaon-engine/EngineConfiguration')`.

# Sonolus Nanaon Engine

A recreation of 22/7 Music Time engine in [Sonolus](https://sonolus.com).

## Links

-   [Sonolus Website](https://sonolus.com)
-   [Sonolus Wiki](https://github.com/NonSpicyBurrito/sonolus-wiki)

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

### `engineConfigurationPath`

Path to Engine Configuration file.

### `enginePlayDataPath`

Path to Engine Play Data file.

### `engineWatchDataPath`

Path to Engine Watch Data file.

### `enginePreviewDataPath`

Path to Engine Preview Data file.

### `engineTutorialDataPath`

Path to Engine Tutorial Data file.

### `engineThumbnailPath`

Path to Engine Thumbnail file.

### `noteDataToNC(noteData)`

Converts note data to NC (Nanaon Chart).

-   `noteData`: note data.

### `ncToLevelData(nc, offset?)`

Converts NC (Nanaon Chart) to Level Data.

-   `nc`: Nanaon Chart.
-   `offset`: offset (default: `0`).

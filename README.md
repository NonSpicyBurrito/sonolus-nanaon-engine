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

### `engineInfo`

Partial engine information compatible with [sonolus-express](https://github.com/NonSpicyBurrito/sonolus-express).

### `engineConfiguration`

Engine Configuration.

-   `engineConfiguration.path`: path to file.
-   `engineConfiguration.buffer`: buffer of file.
-   `engineConfiguration.hash`: hash of file.

### `enginePlayData`

Engine Play Data.

-   `enginePlayData.path`: path to file.
-   `enginePlayData.buffer`: buffer of file.
-   `enginePlayData.hash`: hash of file.

### `enginePreviewData`

Engine Preview Data.

-   `enginePreviewData.path`: path to file.
-   `enginePreviewData.buffer`: buffer of file.
-   `enginePreviewData.hash`: hash of file.

### `engineTutorialData`

Engine Tutorial Data.

-   `engineTutorialData.path`: path to file.
-   `engineTutorialData.buffer`: buffer of file.
-   `engineTutorialData.hash`: hash of file.

### `engineThumbnail`

Engine Thumbnail.

-   `engineThumbnail.path`: path to file.
-   `engineThumbnail.buffer`: buffer of file.
-   `engineThumbnail.hash`: hash of file.

### `noteDataToNC(noteData)`

Converts note data to NC (Nanaon Chart).

-   `noteData`: note data.

### `ncToLevelData(nc, offset?)`

Converts NC (Nanaon Chart) to Level Data.

-   `nc`: Nanaon Chart.
-   `offset`: offset (default: `0`).

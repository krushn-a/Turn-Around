# Turn Around - File Structure Plan

## Recommended Directory Structure

```
src/
├── config/
│   ├── gameConfig.ts          # Game constants (tunnel length, rotation threshold, etc.)
│   └── checkpoints.ts         # Checkpoint positions and event definitions
├── entities/
│   ├── GamePlayerEntity.ts    # Custom player with rotation tracking
│   └── TriggerEntity.ts       # Invisible checkpoint triggers
├── game/
│   ├── GameManager.ts         # Main game state management
│   ├── RotationTracker.ts     # Player rotation detection system
│   ├── CheckpointManager.ts   # Handles checkpoint events and progression
│   └── EndingManager.ts       # Manages good/bad ending sequences
├── systems/
│   ├── AudioSystem.ts         # Ambient sounds, whispers, positional audio
│   ├── LightingSystem.ts      # Dynamic lighting and flickering effects
│   ├── EffectsSystem.ts       # Visual effects (particles, screen effects)
│   └── UISystem.ts            # UI messages and fade transitions
└── utils/
    ├── math.ts                # Rotation calculations and utilities
    ├── timer.ts               # Delay and timing utilities
    └── constants.ts           # Game-wide constants
```

## Audio Assets Structure

```
assets/audio/
├── ambient/
│   ├── tunnel-hum.mp3         # Low ambient hum for tunnel atmosphere
│   └── calm-ambient.mp3       # Peaceful sound for good ending
├── whispers/
│   ├── hey.mp3                # CP1: "Hey…"
│   ├── wait.mp3               # CP2: "Wait…"
│   ├── look-at-me.mp3         # CP6: "Please… look at me."
│   └── i-told-you-not-to.mp3  # Bad ending whisper
├── effects/
│   ├── footsteps.mp3          # CP3: Following footsteps
│   ├── breathing.mp3          # CP5: Heavy breathing
│   ├── metal-scrape.mp3       # CP7: Metal scrape/knock
│   ├── crying.mp3             # CP4: Crying sound
│   ├── wall-rumble.mp3        # CP6: Wall shake/rumble
│   └── block-fall.mp3         # CP2: Small block fall
└── music/
    └── (horror ambient tracks)
```

## UI Assets Structure

```
assets/ui/
├── index.html                 # Main UI with fade overlays
├── styles.css                 # Horror-themed UI styling
└── scripts.js                 # Client-side UI interactions
```

## Particle Effects Structure

```
assets/particles/
├── dust-motes.json           # Atmospheric dust particles
├── sparks.json               # Light flicker sparks
└── debris.json               # Falling debris particles
```

## Core Files Description

### Configuration Files
- **gameConfig.ts**: Contains all game constants (tunnel dimensions, rotation thresholds, spawn positions)
- **checkpoints.ts**: Defines all 8 checkpoint positions and their associated events

### Entity Files
- **GamePlayerEntity.ts**: Custom player entity with rotation tracking capabilities
- **TriggerEntity.ts**: Invisible trigger volumes for checkpoint detection

### Game Logic Files
- **GameManager.ts**: Central game state management and coordination
- **RotationTracker.ts**: Handles player rotation detection and violation checking
- **CheckpointManager.ts**: Manages checkpoint progression and event triggering
- **EndingManager.ts**: Handles good/bad ending sequences and transitions

### System Files
- **AudioSystem.ts**: Manages all audio (ambient, positional whispers, effects)
- **LightingSystem.ts**: Handles dynamic lighting and flickering effects
- **EffectsSystem.ts**: Visual effects like particles and screen distortions
- **UISystem.ts**: UI messages, fade transitions, and text overlays

### Utility Files
- **math.ts**: Mathematical utilities for rotation calculations
- **timer.ts**: Timing utilities for delays and event scheduling
- **constants.ts**: Game-wide constant definitions

## Implementation Priority

1. **Core Structure**: gameConfig.ts, GameManager.ts, RotationTracker.ts
2. **Checkpoint System**: checkpoints.ts, CheckpointManager.ts, TriggerEntity.ts
3. **Audio System**: AudioSystem.ts + basic audio assets
4. **Player System**: GamePlayerEntity.ts with rotation tracking
5. **Ending System**: EndingManager.ts + UI transitions
6. **Polish**: LightingSystem.ts, EffectsSystem.ts, additional audio
# Turn Around - Development Action Plan

## Phase 1: Core Foundation (Days 1-2)

### Step 1.1: Project Setup & Basic Structure
- [ ] Initialize Hytopia project structure
- [ ] Create all directories from file-structure.md
- [ ] Set up basic package.json and dependencies
- [ ] Create placeholder files for all core modules

### Step 1.2: Game Configuration
- [ ] **Create `src/config/gameConfig.ts`**
  - Define tunnel dimensions (3x4x280 blocks)
  - Set rotation threshold (90 degrees)
  - Define spawn position and forward direction
  - Set checkpoint count and spacing

- [ ] **Create `src/config/checkpoints.ts`**
  - Define 8 checkpoint positions along tunnel
  - Map each checkpoint to its audio/visual events
  - Set checkpoint trigger zones

### Step 1.3: Basic Game Manager
- [ ] **Create `src/game/GameManager.ts`**
  - Initialize game state variables
  - Set up basic game loop structure
  - Create game start/end methods
  - Add player spawn logic

## Phase 2: Core Mechanics (Days 2-3)

### Step 2.1: Rotation Tracking System
- [ ] **Create `src/game/RotationTracker.ts`**
  - Implement rotation detection logic
  - Add threshold violation checking
  - Create rotation normalization utilities
  - Test rotation tracking accuracy

- [ ] **Create `src/utils/math.ts`**
  - Add angle normalization functions
  - Create rotation difference calculations
  - Add vector math utilities

### Step 2.2: Player Entity
- [ ] **Create `src/entities/GamePlayerEntity.ts`**
  - Extend base Hytopia player entity
  - Integrate rotation tracking
  - Add movement constraints (forward-only)
  - Implement fail state triggering

### Step 2.3: Basic World Generation
- [ ] Create tunnel structure (dark stone/obsidian)
- [ ] Add basic lighting (dim, atmospheric)
- [ ] Set up fog for distance obscuring
- [ ] Place player spawn point

## Phase 3: Checkpoint System (Days 3-4)

### Step 3.1: Trigger Entities
- [ ] **Create `src/entities/TriggerEntity.ts`**
  - Create invisible collision boxes
  - Implement one-time trigger logic
  - Add checkpoint identification
  - Test trigger detection

### Step 3.2: Checkpoint Management
- [ ] **Create `src/game/CheckpointManager.ts`**
  - Track checkpoint progression
  - Handle checkpoint event triggering
  - Manage checkpoint state
  - Implement checkpoint validation

### Step 3.3: Place Checkpoints in World
- [ ] Position 8 trigger entities along tunnel
- [ ] Test checkpoint detection accuracy
- [ ] Verify proper spacing and progression
- [ ] Debug trigger overlap issues

## Phase 4: Audio System (Days 4-5)

### Step 4.1: Audio System Framework
- [ ] **Create `src/systems/AudioSystem.ts`**
  - Set up Hytopia audio manager integration
  - Create positional audio utilities
  - Implement volume and distance controls
  - Add audio state management

### Step 4.2: Basic Audio Assets
- [ ] Record/find ambient tunnel hum
- [ ] Create whisper audio files (hey, wait, look-at-me)
- [ ] Add basic sound effects (footsteps, breathing)
- [ ] Test audio file loading and playback

### Step 4.3: Checkpoint Audio Events
- [ ] Implement CP1-CP8 audio triggers
- [ ] Add positional audio behind player
- [ ] Test volume scaling with progression
- [ ] Verify audio timing and overlap

## Phase 5: Game Flow & Endings (Days 5-6)

### Step 5.1: Ending System
- [ ] **Create `src/game/EndingManager.ts`**
  - Implement bad ending (turn around)
  - Create good ending (reach exit)
  - Add screen fade effects
  - Handle ending text display

### Step 5.2: UI System
- [ ] **Create `src/systems/UISystem.ts`**
  - Add "Don't turn around" start message
  - Implement fade-to-black/white effects
  - Create ending text overlays
  - Add horror-themed UI styling

### Step 5.3: Game State Management
- [ ] Integrate rotation violation → bad ending
- [ ] Connect final checkpoint → good ending
- [ ] Add game restart functionality
- [ ] Test complete game flow

## Phase 6: Polish & Effects (Days 6-7)

### Step 6.1: Lighting System
- [ ] **Create `src/systems/LightingSystem.ts`**
  - Implement flickering lights
  - Add progressive dimming per checkpoint
  - Create atmospheric lighting effects
  - Add light sources along tunnel

### Step 6.2: Visual Effects
- [ ] **Create `src/systems/EffectsSystem.ts`**
  - Add particle effects (dust, sparks)
  - Implement screen shake for CP6
  - Create visual temptations (light flickers)
  - Add atmospheric particles

### Step 6.3: Enhanced Audio
- [ ] Add remaining audio files (crying, metal scrape, rumble)
- [ ] Implement audio fading and transitions
- [ ] Add subtle ambient variations
- [ ] Test all audio event timing

## Phase 7: Testing & Optimization (Days 7-8)

### Step 7.1: Playtesting
- [ ] Test complete 5-10 minute playthrough
- [ ] Verify rotation detection accuracy
- [ ] Check audio event timing and positioning
- [ ] Test both ending conditions

### Step 7.2: Bug Fixes & Polish
- [ ] Fix rotation detection edge cases
- [ ] Smooth audio transitions
- [ ] Polish visual effects timing
- [ ] Optimize performance for target duration

### Step 7.3: Final Integration
- [ ] Add tunnel decorations (wall writings, debris)
- [ ] Fine-tune checkpoint spacing
- [ ] Balance audio volume levels
- [ ] Final lighting and atmosphere pass

## Phase 8: Final Build (Day 8)

### Step 8.1: Build Preparation
- [ ] Clean up debug code and comments
- [ ] Optimize asset loading
- [ ] Test final build performance
- [ ] Verify all assets are included

### Step 8.2: Final Testing
- [ ] Complete end-to-end testing
- [ ] Test on different hardware if possible
- [ ] Verify build packaging
- [ ] Create submission-ready build

## Development Tips

### Daily Goals
- **Day 1**: Foundation + Config
- **Day 2**: Rotation tracking + Player
- **Day 3**: Checkpoints + Triggers
- **Day 4**: Audio system + Basic sounds
- **Day 5**: Endings + UI
- **Day 6**: Polish + Effects
- **Day 7**: Testing + Bug fixes
- **Day 8**: Final build

### Testing Strategy
- Test rotation detection every time you modify it
- Playtest checkpoint progression frequently
- Verify audio positioning with each audio addition
- Test both endings regularly during development

### Risk Mitigation
- Start with basic versions of each system
- Test core mechanics early and often
- Keep backup saves of working versions
- Focus on core experience before polish features

## Success Criteria
- [ ] Player can walk through 280-block tunnel
- [ ] Rotation detection triggers bad ending at 90° threshold
- [ ] All 8 checkpoints trigger appropriate audio/visual events
- [ ] Good ending triggers when reaching tunnel exit
- [ ] Total experience lasts 5-10 minutes
- [ ] Audio creates proper horror atmosphere
- [ ] Game feels polished and complete
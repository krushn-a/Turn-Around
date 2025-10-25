# Turn Around Game Development Rules

## Core Development Guidelines

### 1. File Structure Adherence
- **ALWAYS** reference `Planning/file-structure.md` before creating any new files
- Follow the exact directory structure defined in the file structure plan
- Place files in their designated folders according to their purpose:
  - `src/config/` for configuration files
  - `src/entities/` for game entities
  - `src/game/` for core game logic
  - `src/systems/` for game systems
  - `src/utils/` for utility functions
- Use the exact naming conventions specified in the plan

### 2. Development Plan Compliance
- **ALWAYS** reference `Planning/development-plan.md` when implementing features
- Follow the 8-phase development sequence in order
- Complete each step's checklist items before moving to the next
- Test each phase thoroughly before proceeding
- Maintain the daily goals and milestone structure

### 3. Hytopia Best Practices
- Import from `hytopia` package for all engine functionality
- Use TypeScript for all source files with proper type definitions
- Follow Hytopia's entity-component-system architecture
- Utilize Hytopia's built-in systems (World, Entity, Audio, etc.)
- Implement proper lifecycle methods (onSpawn, onTick, onDestroy)
- Use Hytopia's coordinate system and world management
- Leverage Hytopia's audio positioning and 3D sound capabilities

### 4. Code Quality Standards
- Write **simple and elegant** code that is easy to understand
- Add **comprehensive comments** explaining:
  - Purpose of each class/function
  - Complex logic or calculations
  - Game-specific mechanics and behaviors
  - Integration points with other systems
- Use descriptive variable and function names
- Keep functions focused on single responsibilities
- Implement proper error handling and validation
- Use consistent code formatting and indentation

## Specific Implementation Rules

### Configuration Files
- Store all game constants in `src/config/gameConfig.ts`
- Define checkpoint data in `src/config/checkpoints.ts`
- Use `const` assertions for immutable configuration
- Export configuration objects with clear naming

### Entity Development
- Extend Hytopia's base entity classes appropriately
- Implement proper constructor patterns with dependency injection
- Use entity lifecycle methods for initialization and cleanup
- Keep entity logic focused and avoid bloated classes

### System Architecture
- Create systems that are independent and loosely coupled
- Use dependency injection for system communication
- Implement proper initialization and shutdown sequences
- Handle system state management consistently

### Audio Implementation
- Use Hytopia's 3D positional audio features
- Implement proper audio loading and caching
- Handle audio state management (play, pause, stop)
- Test audio positioning relative to player location

### Game State Management
- Centralize game state in `GameManager.ts`
- Use clear state transitions and validation
- Implement proper event handling between components
- Maintain clean separation between game logic and presentation

## Testing Requirements
- Test rotation detection accuracy at every implementation step
- Verify checkpoint triggering works correctly
- Validate audio positioning and timing
- Test both good and bad ending conditions
- Ensure game runs smoothly for the full 5-10 minute duration

## Code Review Checklist
Before completing any feature implementation:
- [ ] File is in correct location per file structure plan
- [ ] Development plan step is completed as specified
- [ ] Code follows Hytopia best practices
- [ ] Comments explain purpose and complex logic
- [ ] Variable and function names are descriptive
- [ ] Error handling is implemented where needed
- [ ] Integration with other systems is clean
- [ ] Feature has been tested and works correctly

## Emergency Debugging Protocol
If encountering issues:
1. Check file structure adherence first
2. Verify development plan step completion
3. Review Hytopia documentation for proper API usage
4. Test individual components in isolation
5. Check game state management and transitions
6. Validate audio and entity positioning
7. Test rotation detection edge cases

## Success Metrics
- Code is readable and well-documented
- File organization matches the planned structure
- Development progresses according to the 8-phase plan
- Game mechanics work as specified in game overview
- Audio creates the intended horror atmosphere
- Player experience matches the 5-10 minute target duration
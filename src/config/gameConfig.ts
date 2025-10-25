/**
 * Game configuration constants for "Turn Around" horror game.
 * Contains all core game parameters including tunnel dimensions,
 * rotation thresholds, and positioning data.
 */
export const GAME_CONFIG = {
  // Tunnel structure
  TUNNEL_LENGTH: 280,
  TUNNEL_WIDTH: 3,
  TUNNEL_HEIGHT: 4,
  
  // Player settings
  SPAWN_POSITION: { x: 0, y: 10, z: 0 },
  FORWARD_DIRECTION: 0, // degrees (Z-axis positive)
  
  // Rotation detection
  ROTATION_THRESHOLD: 90, // degrees - turning beyond this triggers fail state
  
  // Checkpoint system
  CHECKPOINT_COUNT: 8,
  CHECKPOINT_SPACING: 35, // blocks between checkpoints
  
  // Game timing
  TARGET_DURATION_MINUTES: 7, // target 5-10 minute experience
  
  // Audio settings
  AMBIENT_VOLUME: 0.3,
  WHISPER_VOLUME: 0.8,
  EFFECTS_VOLUME: 0.6,
  
  // Visual settings
  FOG_DENSITY: 0.6, // medium density to obscure distance
  INITIAL_LIGHT_LEVEL: 0.7, // starts faintly bright
  MINIMUM_LIGHT_LEVEL: 0.2, // dims to this level
} as const;

// Type for game configuration
export type GameConfig = typeof GAME_CONFIG;
import { DefaultPlayerEntity, Player, World, Vector3 } from 'hytopia';
import { GameManager } from '../game/GameManager';
import { GAME_CONFIG } from '../config/gameConfig';

/**
 * Custom player entity for "Turn Around" game.
 * Extends DefaultPlayerEntity with rotation tracking capabilities
 * and integration with the game manager.
 */
export class GamePlayerEntity extends DefaultPlayerEntity {
  private gameManager: GameManager;
  private lastRotation: number = 0;
  private hasStartedMoving: boolean = false;
  private spawnPosition: Vector3;

  constructor(options: {
    player: Player;
    name: string;
    gameManager: GameManager;
  }) {
    super({
      player: options.player,
      name: options.name,
    });
    
    this.gameManager = options.gameManager;
    // Initialize spawn position from config
    this.spawnPosition = new Vector3(
      GAME_CONFIG.SPAWN_POSITION.x,
      GAME_CONFIG.SPAWN_POSITION.y,
      GAME_CONFIG.SPAWN_POSITION.z
    );
  }

  /**
   * Override spawn to set up initial game state
   */
  public spawn(world: World, position: Vector3): void {
    super.spawn(world, position);
    
    // Store actual spawn position and initial facing direction
    this.spawnPosition = position;
    this.lastRotation = this.rotation.y;
    
    console.log(`GamePlayerEntity spawned at position:`, position);
    
    // Set up tick handler for continuous updates
    this.setupTickHandler();
    
    // TODO: Phase 2 - Initialize rotation tracking
    // TODO: Phase 3 - Set up checkpoint detection
  }

  /**
   * Set up tick handler for continuous game logic updates
   */
  private setupTickHandler(): void {
    // Use Hytopia's tick system for regular updates
    const tickInterval = setInterval(() => {
      if (!this.world) {
        // Entity has been despawned, clear the interval
        clearInterval(tickInterval);
        return;
      }
      
      this.handleGameTick();
    }, 50); // Update every 50ms (20 times per second)
  }

  /**
   * Handle game logic updates on each tick
   */
  private handleGameTick(): void {
    // Check if player started moving (triggers game start)
    if (!this.hasStartedMoving && this.hasPlayerMoved()) {
      this.hasStartedMoving = true;
      this.gameManager.startGame();
      console.log('Player started moving - game begins!');
    }
    
    // TODO: Phase 2 - Implement rotation violation checking
    // this.checkRotationViolation();
  }

  /**
   * Check if player has moved from spawn position
   */
  private hasPlayerMoved(): boolean {
    const currentPos = this.position;
    const threshold = 1.0; // blocks
    
    return Math.abs(currentPos.x - this.spawnPosition.x) > threshold ||
           Math.abs(currentPos.z - this.spawnPosition.z) > threshold;
  }

  /**
   * TODO: Phase 2 - Implement rotation violation checking
   */
  private checkRotationViolation(): void {
    // Will be implemented in Phase 2 with RotationTracker
    const currentRotation = this.rotation.y;
    
    // Calculate rotation difference from initial direction
    const rotationDiff = Math.abs(currentRotation - this.lastRotation);
    
    // Normalize to handle angle wrapping
    const normalizedDiff = Math.min(rotationDiff, 360 - rotationDiff);
    
    // Check if rotation exceeds threshold
    if (normalizedDiff > GAME_CONFIG.ROTATION_THRESHOLD) {
      console.log(`Rotation violation detected: ${normalizedDiff}° > ${GAME_CONFIG.ROTATION_THRESHOLD}°`);
      this.gameManager.endGame(this.player, false); // Bad ending
    }
  }

  /**
   * Get current facing direction in degrees
   */
  public getFacingDirection(): number {
    return this.rotation.y;
  }

  /**
   * Get initial facing direction
   */
  public getInitialDirection(): number {
    return this.lastRotation;
  }

  /**
   * Check if player has violated rotation rule
   */
  public hasViolatedRotation(): boolean {
    // TODO: Phase 2 - Implement with RotationTracker
    const currentRotation = this.rotation.y;
    const rotationDiff = Math.abs(currentRotation - this.lastRotation);
    const normalizedDiff = Math.min(rotationDiff, 360 - rotationDiff);
    
    return normalizedDiff > GAME_CONFIG.ROTATION_THRESHOLD;
  }

  /**
   * Reset player state (for game restarts)
   */
  public resetGameState(): void {
    this.hasStartedMoving = false;
    this.lastRotation = this.rotation.y;
    console.log('Player game state reset');
  }

  /**
   * Override despawn to clean up resources
   */
  public despawn(): void {
    console.log(`GamePlayerEntity despawning for player ${this.player.username}`);
    super.despawn();
  }
}
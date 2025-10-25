import { World, PlayerEvent, Player, Vector3 } from 'hytopia';
import { GamePlayerEntity } from '../entities/GamePlayerEntity';
import { GAME_CONFIG } from '../config/gameConfig';
import { AudioSystem } from '../systems/AudioSystem';

/**
 * Central game state management for "Turn Around" horror game.
 * Handles player spawning, game initialization, and coordinates
 * all game systems (rotation tracking, checkpoints, audio, etc.)
 */
export class GameManager {
  private world: World;
  private gameStarted: boolean = false;
  private gameEnded: boolean = false;
  private playerEntities: Map<string, GamePlayerEntity> = new Map();
  private audioSystem: AudioSystem;

  constructor(world: World) {
    this.world = world;
    this.audioSystem = new AudioSystem(world);
    this.setupEventListeners();
    this.initializeSystems();
  }

  /**
   * Initialize all game systems
   */
  private initializeSystems(): void {
    console.log('GameManager: Initializing game systems...');
    
    // Initialize audio system with ambient tunnel sounds
    this.audioSystem.initialize();
    
    // TODO: Phase 2 - Initialize rotation tracking system
    // TODO: Phase 3 - Initialize checkpoint system
    // TODO: Phase 5 - Initialize UI system
  }

  /**
   * Set up event listeners for player join/leave events
   */
  private setupEventListeners(): void {
    // Handle player joining the game
    this.world.on(PlayerEvent.JOINED_WORLD, ({ player }) => {
      this.handlePlayerJoin(player);
    });

    // Handle player leaving the game
    this.world.on(PlayerEvent.LEFT_WORLD, ({ player }) => {
      this.handlePlayerLeave(player);
    });
  }

  /**
   * Handle a new player joining the game world
   */
  private handlePlayerJoin(player: Player): void {
    console.log(`Player ${player.username} joined the game`);

    // Create custom game player entity with rotation tracking
    const playerEntity = new GamePlayerEntity({
      player,
      name: player.username,
      gameManager: this,
    });

    // Create Vector3 from config position
    const spawnPosition = new Vector3(
      GAME_CONFIG.SPAWN_POSITION.x,
      GAME_CONFIG.SPAWN_POSITION.y,
      GAME_CONFIG.SPAWN_POSITION.z
    );

    // Spawn player at tunnel entrance
    playerEntity.spawn(this.world, spawnPosition);

    // Store player entity reference
    this.playerEntities.set(player.id, playerEntity);

    // Load horror-themed UI
    player.ui.load('ui/index.html');

    // Send initial game instructions
    this.sendWelcomeMessages(player);

    // Initialize game state for this player
    this.initializeGameForPlayer(player);
  }

  /**
   * Handle player leaving the game world
   */
  private handlePlayerLeave(player: Player): void {
    console.log(`Player ${player.username} left the game`);

    // Get and despawn all entities for this player
    this.world.entityManager.getPlayerEntitiesByPlayer(player).forEach(entity => {
      entity.despawn();
    });

    // Clean up our player entity reference
    this.playerEntities.delete(player.id);
  }

  /**
   * Send initial welcome and instruction messages to player
   */
  private sendWelcomeMessages(player: Player): void {
    // Horror-themed welcome message
    this.world.chatManager.sendPlayerMessage(
      player, 
      'You wake up in a dark tunnel...', 
      'FF6B6B'
    );
    
    this.world.chatManager.sendPlayerMessage(
      player, 
      'DON\'T TURN AROUND.', 
      'FF0000'
    );
    
    this.world.chatManager.sendPlayerMessage(
      player, 
      'Walk forward to the exit. That\'s all you have to do.', 
      'FFFFFF'
    );
  }

  /**
   * Initialize game state for a specific player
   */
  private initializeGameForPlayer(player: Player): void {
    // TODO: Phase 2 - Initialize rotation tracker
    // TODO: Phase 3 - Initialize checkpoint manager
    // TODO: Phase 5 - Show "Don't turn around" UI message
    
    console.log(`Game initialized for player ${player.username}`);
  }

  /**
   * Start the game (called when player begins moving)
   */
  public startGame(): void {
    if (this.gameStarted) return;
    
    this.gameStarted = true;
    console.log('Game started');
    
    // Start game-specific audio
    this.audioSystem.startGameAudio();
    
    // TODO: Phase 3 - Activate checkpoint triggers
    // TODO: Phase 2 - Begin rotation tracking
  }

  /**
   * End the game with specified ending type
   */
  public endGame(player: Player, goodEnding: boolean): void {
    if (this.gameEnded) return;
    
    this.gameEnded = true;
    console.log(`Game ended for ${player.username} - Good ending: ${goodEnding}`);
    
    // Play appropriate ending audio
    if (goodEnding) {
      this.audioSystem.playGoodEndingAudio();
    } else {
      this.audioSystem.playBadEndingAudio();
    }
    
    // TODO: Phase 5 - Show ending UI
    // TODO: Phase 5 - Trigger ending sequence
  }

  /**
   * Handle checkpoint reached (called by checkpoint system)
   */
  public onCheckpointReached(checkpointId: number): void {
    console.log(`Checkpoint ${checkpointId} reached`);
    
    // Play checkpoint-specific audio
    this.audioSystem.playCheckpointAudio(checkpointId);
    
    // TODO: Phase 6 - Trigger visual effects
    // TODO: Phase 6 - Update lighting
  }

  /**
   * Get player entity by player instance
   */
  public getPlayerEntity(player: Player): GamePlayerEntity | undefined {
    return this.playerEntities.get(player.id);
  }

  /**
   * Check if game is currently running
   */
  public isGameActive(): boolean {
    return this.gameStarted && !this.gameEnded;
  }

  /**
   * Reset game state (for restarts)
   */
  public resetGame(): void {
    this.gameStarted = false;
    this.gameEnded = false;
    
    // Reset audio system
    this.audioSystem.reset();
    
    console.log('Game state reset');
  }

  /**
   * Get audio system reference
   */
  public getAudioSystem(): AudioSystem {
    return this.audioSystem;
  }
}
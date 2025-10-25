import { World, Audio } from 'hytopia';
import { GAME_CONFIG } from '../config/gameConfig';

/**
 * Audio system for "Turn Around" horror game.
 * Manages ambient sounds, whispers, positional audio, and all sound effects.
 * Coordinates with checkpoint events and game state changes.
 */
export class AudioSystem {
  private world: World;
  private ambientAudio: Audio | null = null;
  private activeAudios: Map<string, Audio> = new Map();
  private isGameStarted: boolean = false;

  constructor(world: World) {
    this.world = world;
  }

  /**
   * Initialize the audio system and start ambient tunnel atmosphere
   */
  public initialize(): void {
    console.log('AudioSystem: Initializing audio system...');
    this.startAmbientAudio();
  }

  /**
   * Start ambient tunnel atmosphere audio
   */
  private startAmbientAudio(): void {
    try {
      // TODO: Phase 4 - Replace with proper horror ambient audio (tunnel-hum.mp3)
      this.ambientAudio = new Audio({
        uri: 'audio/music/hytopia-main.mp3', // Temporary - will be replaced with tunnel-hum.mp3
        loop: true,
        volume: GAME_CONFIG.AMBIENT_VOLUME,
      });

      this.ambientAudio.play(this.world);
      console.log('AudioSystem: Ambient audio started');
    } catch (error) {
      console.error('AudioSystem: Failed to start ambient audio:', error);
    }
  }

  /**
   * Start game-specific audio when player begins moving
   */
  public startGameAudio(): void {
    if (this.isGameStarted) return;
    
    this.isGameStarted = true;
    console.log('AudioSystem: Game audio started');
    
    // TODO: Phase 4 - Start horror ambient sounds
    // TODO: Phase 4 - Begin subtle atmospheric changes
  }

  /**
   * Play checkpoint-specific audio event
   */
  public playCheckpointAudio(checkpointId: number): void {
    console.log(`AudioSystem: Playing checkpoint ${checkpointId} audio`);
    
    // TODO: Phase 4 - Implement checkpoint-specific audio events
    switch (checkpointId) {
      case 1:
        this.playWhisper('hey'); // "Hey…"
        break;
      case 2:
        this.playWhisper('wait'); // "Wait…"
        this.playEffect('block-fall');
        break;
      case 3:
        this.startFootsteps(); // Following footsteps
        break;
      case 4:
        this.playEffect('crying'); // Crying sound
        break;
      case 5:
        this.playEffect('breathing'); // Heavy breathing
        break;
      case 6:
        this.playWhisper('look-at-me'); // "Please… look at me."
        this.playEffect('wall-rumble'); // Wall shake
        break;
      case 7:
        this.playEffect('metal-scrape'); // Metal scrape/knock
        break;
      case 8:
        // Final checkpoint - no audio, just tension
        break;
    }
  }

  /**
   * Play whisper audio behind the player
   */
  private playWhisper(whisperType: string): void {
    // TODO: Phase 4 - Implement positional whisper audio
    console.log(`AudioSystem: Playing whisper: ${whisperType}`);
    
    try {
      const whisperAudio = new Audio({
        uri: `audio/whispers/${whisperType}.mp3`,
        loop: false,
        volume: GAME_CONFIG.WHISPER_VOLUME,
      });

      whisperAudio.play(this.world);
      
      // Store reference for cleanup
      this.activeAudios.set(`whisper-${whisperType}`, whisperAudio);
    } catch (error) {
      console.error(`AudioSystem: Failed to play whisper ${whisperType}:`, error);
    }
  }

  /**
   * Play sound effect
   */
  private playEffect(effectType: string): void {
    // TODO: Phase 4 - Implement positioned sound effects
    console.log(`AudioSystem: Playing effect: ${effectType}`);
    
    try {
      const effectAudio = new Audio({
        uri: `audio/effects/${effectType}.mp3`,
        loop: false,
        volume: GAME_CONFIG.EFFECTS_VOLUME,
      });

      effectAudio.play(this.world);
      
      // Store reference for cleanup
      this.activeAudios.set(`effect-${effectType}`, effectAudio);
    } catch (error) {
      console.error(`AudioSystem: Failed to play effect ${effectType}:`, error);
    }
  }

  /**
   * Start following footsteps audio (matches player pace)
   */
  private startFootsteps(): void {
    // TODO: Phase 4 - Implement rhythmic footsteps that follow player
    console.log('AudioSystem: Starting following footsteps');
    
    try {
      const footstepsAudio = new Audio({
        uri: 'audio/effects/footsteps.mp3',
        loop: true,
        volume: GAME_CONFIG.EFFECTS_VOLUME * 0.8, // Slightly quieter
      });

      footstepsAudio.play(this.world);
      
      // Store reference for stopping later
      this.activeAudios.set('footsteps', footstepsAudio);
    } catch (error) {
      console.error('AudioSystem: Failed to start footsteps:', error);
    }
  }

  /**
   * Play bad ending audio (player turned around)
   */
  public playBadEndingAudio(): void {
    console.log('AudioSystem: Playing bad ending audio');
    
    // Stop all current audio
    this.stopAllAudio();
    
    // TODO: Phase 5 - Play bad ending whisper
    try {
      const badEndingAudio = new Audio({
        uri: 'audio/whispers/i-told-you-not-to.mp3',
        loop: false,
        volume: GAME_CONFIG.WHISPER_VOLUME,
      });

      badEndingAudio.play(this.world);
    } catch (error) {
      console.error('AudioSystem: Failed to play bad ending audio:', error);
    }
  }

  /**
   * Play good ending audio (player reached exit)
   */
  public playGoodEndingAudio(): void {
    console.log('AudioSystem: Playing good ending audio');
    
    // Gradually fade out horror sounds
    this.fadeOutAmbient();
    
    // TODO: Phase 5 - Play peaceful/relief audio
    try {
      const goodEndingAudio = new Audio({
        uri: 'audio/ambient/calm-ambient.mp3',
        loop: false,
        volume: GAME_CONFIG.AMBIENT_VOLUME,
      });

      goodEndingAudio.play(this.world);
    } catch (error) {
      console.error('AudioSystem: Failed to play good ending audio:', error);
    }
  }

  /**
   * Fade out ambient audio gradually
   */
  private fadeOutAmbient(): void {
    // TODO: Phase 5 - Implement gradual audio fade
    if (this.ambientAudio) {
      // Create new silent audio to replace current ambient
      const silentAudio = new Audio({
        uri: 'audio/music/hytopia-main.mp3',
        loop: false,
        volume: 0,
      });
      
      // Replace ambient audio reference
      this.ambientAudio = silentAudio;
    }
  }

  /**
   * Stop all active audio by replacing with silent versions
   */
  public stopAllAudio(): void {
    console.log('AudioSystem: Stopping all audio');
    
    // Clear ambient audio reference
    this.ambientAudio = null;

    // Clear all active audio references
    this.activeAudios.clear();
    
    // Note: In Hytopia, audio continues until naturally finished or replaced
    // We manage this by not playing new audio and clearing references
  }

  /**
   * Reset audio system for game restart
   */
  public reset(): void {
    console.log('AudioSystem: Resetting audio system');
    
    this.stopAllAudio();
    this.isGameStarted = false;
    
    // Restart ambient audio after a brief delay
    setTimeout(() => {
      this.startAmbientAudio();
    }, 1000);
  }

  /**
   * Cleanup audio system resources
   */
  public cleanup(): void {
    console.log('AudioSystem: Cleaning up audio system');
    this.stopAllAudio();
  }
}
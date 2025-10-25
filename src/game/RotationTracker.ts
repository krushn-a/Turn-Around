import { GAME_CONFIG } from '../config/gameConfig';

/**
 * Player rotation detection system for "Turn Around" horror game.
 * Tracks player facing direction and detects when they violate the
 * "don't turn around" rule by rotating beyond the threshold.
 */
export class RotationTracker {
  private initialDirection: number = 0;
  private currentDirection: number = 0;
  private isInitialized: boolean = false;
  private violationDetected: boolean = false;

  /**
   * Initialize rotation tracking with player's starting direction
   */
  public initialize(startingRotation: number): void {
    this.initialDirection = this.normalizeAngle(startingRotation);
    this.currentDirection = this.initialDirection;
    this.isInitialized = true;
    this.violationDetected = false;
    
    console.log(`RotationTracker: Initialized with starting direction: ${this.initialDirection}°`);
  }

  /**
   * Update current player rotation and check for violations
   */
  public updateRotation(newRotation: number): boolean {
    if (!this.isInitialized) {
      console.warn('RotationTracker: Attempted to update rotation before initialization');
      return false;
    }

    this.currentDirection = this.normalizeAngle(newRotation);
    
    // Check if player has violated the rotation rule
    const hasViolation = this.checkForViolation();
    
    if (hasViolation && !this.violationDetected) {
      this.violationDetected = true;
      console.log(`RotationTracker: VIOLATION DETECTED! Player rotated ${this.getRotationDifference()}° from initial direction`);
    }

    return hasViolation;
  }

  /**
   * Check if current rotation violates the "don't turn around" rule
   */
  private checkForViolation(): boolean {
    const rotationDiff = this.getRotationDifference();
    return rotationDiff > GAME_CONFIG.ROTATION_THRESHOLD;
  }

  /**
   * Calculate the difference between current and initial rotation
   */
  private getRotationDifference(): number {
    const diff = Math.abs(this.currentDirection - this.initialDirection);
    
    // Handle angle wrapping (e.g., difference between 350° and 10° should be 20°, not 340°)
    return Math.min(diff, 360 - diff);
  }

  /**
   * Normalize angle to 0-360 degree range
   */
  private normalizeAngle(angle: number): number {
    // Convert to positive 0-360 range
    let normalized = angle % 360;
    if (normalized < 0) {
      normalized += 360;
    }
    return normalized;
  }

  /**
   * Get current rotation difference in degrees
   */
  public getCurrentRotationDifference(): number {
    if (!this.isInitialized) return 0;
    return this.getRotationDifference();
  }

  /**
   * Check if player is currently facing forward (within acceptable range)
   */
  public isFacingForward(): boolean {
    if (!this.isInitialized) return true;
    
    const diff = this.getRotationDifference();
    return diff <= GAME_CONFIG.ROTATION_THRESHOLD;
  }

  /**
   * Get the current facing direction in degrees
   */
  public getCurrentDirection(): number {
    return this.currentDirection;
  }

  /**
   * Get the initial facing direction in degrees
   */
  public getInitialDirection(): number {
    return this.initialDirection;
  }

  /**
   * Check if rotation tracking has been initialized
   */
  public isReady(): boolean {
    return this.isInitialized;
  }

  /**
   * Check if a violation has been detected
   */
  public hasViolation(): boolean {
    return this.violationDetected;
  }

  /**
   * Get rotation status for debugging
   */
  public getDebugInfo(): {
    initialized: boolean;
    initialDirection: number;
    currentDirection: number;
    rotationDifference: number;
    threshold: number;
    isFacingForward: boolean;
    hasViolation: boolean;
  } {
    return {
      initialized: this.isInitialized,
      initialDirection: this.initialDirection,
      currentDirection: this.currentDirection,
      rotationDifference: this.getCurrentRotationDifference(),
      threshold: GAME_CONFIG.ROTATION_THRESHOLD,
      isFacingForward: this.isFacingForward(),
      hasViolation: this.hasViolation(),
    };
  }

  /**
   * Reset rotation tracker for game restart
   */
  public reset(): void {
    this.initialDirection = 0;
    this.currentDirection = 0;
    this.isInitialized = false;
    this.violationDetected = false;
    
    console.log('RotationTracker: Reset for new game');
  }

  /**
   * Calculate if a given rotation would violate the rule (for preview/testing)
   */
  public wouldViolateRule(testRotation: number): boolean {
    if (!this.isInitialized) return false;
    
    const normalizedTest = this.normalizeAngle(testRotation);
    const diff = Math.abs(normalizedTest - this.initialDirection);
    const normalizedDiff = Math.min(diff, 360 - diff);
    
    return normalizedDiff > GAME_CONFIG.ROTATION_THRESHOLD;
  }

  /**
   * Get the maximum allowed rotation in each direction
   */
  public getAllowedRotationRange(): { min: number; max: number } {
    if (!this.isInitialized) {
      return { min: 0, max: 360 };
    }

    const threshold = GAME_CONFIG.ROTATION_THRESHOLD;
    const min = this.normalizeAngle(this.initialDirection - threshold);
    const max = this.normalizeAngle(this.initialDirection + threshold);

    return { min, max };
  }
}
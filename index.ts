/**
 * HYTOPIA SDK Boilerplate - Modified for "Turn Around" Horror Game
 * 
 * A psychological horror experience where the player must walk through
 * a dark tunnel without turning around. Simple concept, terrifying execution.
 * 
 * Game rules: Don't turn around. Walk to the exit. That's it.
 */

import {
  startServer,
} from 'hytopia';

import worldMap from './assets/map.json';
import { GameManager } from './src/game/GameManager';

// Start the server with minimal setup - GameManager handles everything
startServer(world => {
  console.log('Starting "Turn Around" horror game server...');
  
  // Load the tunnel world map
  world.loadMap(worldMap);

  // Initialize the game manager - it handles all systems including audio
  const gameManager = new GameManager(world);

  console.log('Game server initialized. Waiting for players...');
});
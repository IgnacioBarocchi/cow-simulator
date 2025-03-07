import { MathUtils } from "three";
import { SimulationFrame } from "./SimulationFrame";
import { SimulatorBase } from "./SimulatorBase";
import { spring } from "./spring";

export class SpringSimulator extends SimulatorBase {
  public position: number;
  public velocity: number;
  public target: number;
  public cache: SimulationFrame[];

  constructor(
    fps: number,
    mass: number,
    damping: number,
    startPosition = 0,
    startVelocity = 0
  ) {
    // Construct base
    super(fps, mass, damping);

    // Simulated values
    this.position = startPosition;
    this.velocity = startVelocity;

    // Simulation parameters
    this.target = 0;

    // Initialize cache by pushing two frames
    this.cache = []; // At least two frames
    for (let i = 0; i < 2; i++) {
      this.cache.push(new SimulationFrame(startPosition, startVelocity));
    }
  }

  /**
   * Advances the simulation by given time step
   * @param {number} timeStep
   */
  public simulate(timeStep: number): void {
    // Generate new frames
    this.generateFrames(timeStep);

    // Return values interpolated between cached frames
    this.position = MathUtils.lerp(
      this.cache[0].position,
      this.cache[1].position,
      this.offset / this.frameTime
    );
    this.velocity = MathUtils.lerp(
      this.cache[0].velocity,
      this.cache[1].velocity,
      this.offset / this.frameTime
    );
  }

  /**
   * Gets another simulation frame
   */
  public getFrame(isLastFrame: boolean): SimulationFrame {
    return spring(
      this.lastFrame().position,
      this.target,
      this.lastFrame().velocity,
      this.mass,
      this.damping
    );
  }
}

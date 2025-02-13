import { AnimationAction, LoopOnce } from "three";

export const blendAnimationTransition = (action: AnimationAction | null) => {
  if (!action) return;
  action.reset()?.fadeIn(0.2)?.play();
};

export const playOneShotAnimation = (action: AnimationAction | null) => {
  if (!action) return;
  action?.reset()?.play();
};

export const easeOutAnimation = (action: AnimationAction | null) => {
  if (!action) return;
  action?.fadeOut(0.2);
};

export const stopAnimation = (action: AnimationAction | null) => {
  if (!action) return;
  action.fadeOut(0.2);
  action?.stop();
};

export const stopAll = (actions: AnimationAction[] | null) => {
  if (!actions) return;

  for (const action of actions) {
    action.fadeOut(0.2).stop();
  }
};

export const playFinalAnimation = (action: AnimationAction | null) => {
  if (!action) return;
  action.setLoop(LoopOnce, 1);
  action.clampWhenFinished = true;
  action.enabled = true;
  action.reset().play();
};

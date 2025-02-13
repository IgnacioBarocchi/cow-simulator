import { useEffect } from "react";
import getAnimationClipMilliseconds from "../lib/getAnimationClipDuration";
import { loopableAnimationClips } from "../features/character/@types/Cow3DModelTypes";
import animationsByMachineStateMap from "../features/character/helpers/animationByMachineStateMap";
import usePlayerMachine from "./usePlayerMachine";

export default function useCharacterAnimations() {
  const { state } = usePlayerMachine();
  const { actions } = state.context;

  useEffect(() => {
    const availableAnimations = animationsByMachineStateMap?.get(state?.value);
    const currentAnimation = availableAnimations
      ? availableAnimations[
          Math.floor(Math.random() * availableAnimations.length)
        ]
      : undefined;

    // Early return if conditions are not met
    if (!actions || !currentAnimation || !state?.value) {
      return;
    }

    const isLoopable = loopableAnimationClips.includes(
      currentAnimation as string
    );

    if (isLoopable) {
      playLoopableAnimation(actions, currentAnimation);
    } else {
      playNonLoopableAnimation(actions, currentAnimation);
    }
    // {
    //   playLoopableAnimation, playNonLoopableAnimation;
    // }
    // [isLoopable ? playLoopableAnimation.name : playNonLoopableAnimation.name](
    //   actions,
    //   currentAnimation
    // );
    return () => {
      fadeOutAnimation(actions, currentAnimation);
    };
  }, [actions, state?.value]);
}

function playLoopableAnimation(actions, animation) {
  actions[animation]?.reset().fadeIn(0.2).play();
}

function playNonLoopableAnimation(actions, animation) {
  const duration = getAnimationClipMilliseconds(actions, animation);
  actions[animation]?.reset().play();

  setTimeout(() => {
    actions[animation]?.stop();
    console.log("STOP!!!!");
  }, duration);
}

function fadeOutAnimation(actions, animation) {
  actions[animation]?.fadeOut(0.2);
}

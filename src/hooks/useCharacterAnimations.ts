import { playerContextAtom, playerStateValueAtom } from "../store/store";

import animationsByMachineStateMap from "../features/web-gl-app/character/helpers/animationByMachineStateMap";
import getAnimationClipMilliseconds from "../lib/getAnimationClipDuration";
import { loopableAnimationClips } from "../features/web-gl-app/character/@types/Cow3DModelTypes";
import { useAtomValue } from "jotai";
import { useEffect } from "react";

export default function useCharacterAnimations() {
  const { actions } = useAtomValue(playerContextAtom);
  const stateValue = useAtomValue(playerStateValueAtom)

  useEffect(() => {
    const availableAnimations = animationsByMachineStateMap?.get(stateValue);
    const currentAnimation = availableAnimations
      ? availableAnimations[
      Math.floor(Math.random() * availableAnimations.length)
      ]
      : undefined;

    // Early return if conditions are not met
    if (!actions || !currentAnimation || !stateValue) {
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
  }, [actions, stateValue]);
}

function playLoopableAnimation(actions, animation) {
  actions[animation]?.reset().fadeIn(0.2).play();
}

function playNonLoopableAnimation(actions, animation) {
  const duration = getAnimationClipMilliseconds(actions, animation);
  actions[animation]?.reset().play();

  setTimeout(() => {
    actions[animation]?.stop();
  }, duration);
}

function fadeOutAnimation(actions, animation) {
  actions[animation]?.fadeOut(0.2);
}

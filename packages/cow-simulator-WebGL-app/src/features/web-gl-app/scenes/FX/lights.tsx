import { FC, useEffect, useRef, useState } from 'react';

import { SpotLight } from '@react-three/drei';
import { SpotLightProps } from '@react-three/fiber';
import { cowLoadedAtom } from '../../../../store/store';
import { publicExperimentalFeatures } from '../../../../constants/features';
import { useAtom } from 'jotai';
import { useControls } from 'leva';

const SceneSpotLight: FC<{ lightProps: Omit<SpotLightProps, 'intensity'> }> = ({
  lightProps,
}) => {
  const light = useRef();

  const customProps = useControls('SpotLight', {
    intensity: { value: lightProps.intensity, min: 0, max: 40, step: 0.1 },
    color: '#fef8dd',
    angle: { value: lightProps.angle, min: 0, max: Math.PI / 2 },
    distance: { value: lightProps.distance, min: 0, max: 100, step: 0.01 },
    decay: { value: lightProps.decay, min: 0, max: 100, step: 0.01 },
    penumbra: { value: lightProps.penumbra, min: 0, max: 100, step: 0.01 },
    // focus: { value: lightProps.focus , min: 0, max: 100, step: 0.01 },
    // attenuation: { value: lightProps.attenuation , min: 0, max: 100, step: 0.01 },
    anglePower: { value: lightProps.anglePower, min: 0, max: 100, step: 0.01 },
    radiusTop: { value: lightProps.radiusTop, min: 0, max: 100, step: 0.01 },
    radiusBottom: {
      value: lightProps.radiusBottom,
      min: 0,
      max: 100,
      step: 0.01,
    },
    opacity: { value: lightProps.opacity, min: 0, max: 1, step: 0.01 },
  });

  const [cowIsLoaded] = useAtom(cowLoadedAtom);
  const [intensity, setIntensity] = useState(
    publicExperimentalFeatures.debug ? customProps.intensity : 0
  );

  useEffect(() => {
    if (cowIsLoaded && !publicExperimentalFeatures.debug) {
      const interval = setInterval(() => {
        setIntensity((prev) => {
          if (prev < 40) {
            return Math.min(prev + 1, 40);
          }
          clearInterval(interval);
          return prev;
        });
      }, 50);

      return () => clearInterval(interval);
    } else {
      setIntensity(1);
    }
  }, [cowIsLoaded]);

  return (
    <>
      <SpotLight
        {...lightProps}
        debug={publicExperimentalFeatures.debug}
        intensity={
          publicExperimentalFeatures.debug ? customProps.intensity : intensity
        }
        ref={light}
      />
      <fogExp2 attach="fog" color="black" density={0.015} />
    </>
  );
};

export default SceneSpotLight;

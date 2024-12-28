import { useAnimation, useMotionValue, useTransform } from 'motion/react';

export const useAnimationCard = () => {
  const controls = useAnimation();
  const x = useMotionValue(0);
  const rotateRaw = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(x, [-400, 0, 400], [0.9, 1, 0.3]);
  const rotate = useTransform(() => `${rotateRaw.get()}deg`);
  const color = useTransform(
    x,
    [-50, 0, 50],
    [
      'linear-gradient(70deg, #D4145A, #FBB03B);',
      'linear-gradient(90deg, #FFFFFF, #FFFFFF)',
      'linear-gradient(120deg, #38EF7D, #11998E)'
    ]
  );
  const trash = useTransform(x, [0, -100], [0, 1]);
  const like = useTransform(x, [0, 100], [0, 1]);

  return {
    x,
    controls,
    opacity,
    rotate,
    color,
    trash,
    like
  };
};

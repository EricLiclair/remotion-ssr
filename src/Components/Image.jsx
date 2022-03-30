import { Img, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { padding } from '../utils.mjs';
export const Image = ({
  src,
  duration,
  top = 0.5,
  left = 0.5,
  imgHeight,
  imgWidth,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const pleft =
    left * width + imgWidth / 2 > width - padding
      ? width - padding - imgWidth / 2
      : left;
  const ptop =
    top * height + imgHeight / 2 > width - padding
      ? width - padding - imgHeight / 2
      : left;
  const opacity = interpolate(frame, [0, duration], [0, 1], {
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        width,
        opacity,
      }}
    >
      <Img
        style={{
          position: 'fixed',
          top: top,
          left: left,
          transform: 'translate(-50%, -50%)',
        }}
        src={src}
        width="40%"
      />
    </div>
  );
};

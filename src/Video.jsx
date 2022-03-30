import { Composition, getInputProps } from 'remotion';
import jsondata from '../data.json';
import { HelloWorld } from './HelloWorld';
import { createDataMap, watermark_duration } from './utils.mjs';
import { fps as defaultFps } from './utils.mjs';
export const RemotionVideo = () => {
  const { fps, width, height, data, background } = getInputProps();
  console.log('data from VIDEO.jsx', data);
  const propData = data ? createDataMap(data) : createDataMap(jsondata.data);
  const durationInFrames = propData[propData.length - 1]["sequence_end"]
  return (
    <>
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={durationInFrames + watermark_duration}
        fps={fps || defaultFps}
        width={width || 1920}
        height={height || 1080}
        defaultProps={{
          fps: fps || defaultFps, width, height, background, data, durationInFrames
        }}
      />
    </>
  );
};

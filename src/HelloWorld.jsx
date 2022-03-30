import Box from '@mui/material/Box';
import { Sequence, Video } from 'remotion';
import jsonData from '../data.json';
import defaultaudio from './assets/aud.mp3';
import signature from './assets/signature.mp4';
import webmsignature from './assets/sign.webm';
import webmaudio from './assets/aud.webm';
import NewAudio from './Components/Audio';
import { Image } from './Components/Image';
import { Text } from './Components/Text';
import { Title } from './Components/Title';
import { createDataMap, watermark_duration } from './utils.mjs';


export const HelloWorld = ({ fps, width, height, data, background, durationInFrames, audio }) => {
  console.log(data, "from helloworld.jsx")
  const propData = data ? createDataMap(data) : createDataMap(jsonData.data);
  const audio_start = 0;
  const audio_end = durationInFrames;
  const audio_duration = durationInFrames;

  return (
    <div style={{ flex: 1, backgroundColor: background || "#FFFFFF" }}>
      <Sequence from={audio_start} durationInFrames={audio_duration}>
        <NewAudio src={audio || webmaudio} duration={audio_duration} />
      </Sequence>
      {
        propData.map((sequence, seq_id) => {
          return (
            <Box key={seq_id}>
              <Sequence
                from={sequence.sequence_start}
                durationInFrames={sequence.sequence_duration}
              >
                <Image
                  top={'50%'}
                  left={'70%'}
                  src={sequence.img.src}
                  // imgHeight={1920}
                  // imgWidth={1920}
                  duration={1 * fps}
                />
              </Sequence>
              <Sequence
                from={sequence.title.title_start}
                durationInFrames={sequence.title.title_duration}
              >
                <Title title={sequence.title.title} duration={1 * fps} />
              </Sequence>
              {sequence.texts.map((text, idx) => {
                return <Sequence key={idx} from={text.text_start} durationInFrames={text.text_duration}>
                  <Text text={text.text} duration={1 * fps} idx={idx} />
                </Sequence>
              })}
            </Box>
          );
        })
      }
      <Sequence from={durationInFrames} durationInFrames={watermark_duration}>
        <Box sx={{ width: "100%", position: 'fixed', top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
          <Video src={webmsignature} width="100%" />
        </Box>
      </Sequence>
    </div >
  );
};

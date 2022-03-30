export const fps = 25;
export const titleDelay = 1 * fps;
export const textDelay = 1 * fps;
export const textDuration = 2 * fps;
export const numberOfTexts = 3; // assumed length of texts per sequence
export const sequence_duration = 7 * fps;
export const sequence_duration_in_seconds = sequence_duration / fps;
export const watermark_duration = 4 * fps;

export const createDataMap = (data) => {
  const dataMap = [];
  data.map((sequence, seq_id) => {
    // sequence
    const sequence_start = seq_id * sequence_duration;
    // sequence_duration
    const sequence_end = (seq_id + 1) * sequence_duration;

    // background image
    const img_start = sequence_start;
    const img_duration = sequence_duration;
    const img_end = (seq_id + 1) * sequence_duration;
    const src = sequence.img;
    const img = { img_start, img_duration, img_end, src }

    // title
    const title_start = img_start + titleDelay;
    const title_duration = sequence_duration - titleDelay;
    const title_end = sequence_end;
    const title = { title_start, title_duration, title_end, title: sequence.title }

    //texts
    let texts = []
    sequence.texts.map((text, text_id) => {
      const text_start = title_start + (textDelay * (text_id + 1));
      const text_duration = sequence_duration - (titleDelay + textDelay * (text_id + 1))
      const text_end = sequence_end;
      texts.push({ text_start, text_duration, text_end, text: text })
    });

    dataMap.push({
      sequence_start,
      sequence_duration,
      sequence_end,
      img,
      title,
      texts
    })
  })
  return dataMap;
}



export const padding = 16;
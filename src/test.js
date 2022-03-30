const fps = 30;
const titleDelay = 1 * fps;
const textDelay = 1 * fps;
const textDuration = 2 * fps;
const numberOfTexts = 3; // assumed length of texts per sequence
const sequence_duration = 7 * fps;
const sequence_duration_in_seconds = sequence_duration / fps;


const createDataMap = (data) => {
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
    const title = { title_start, title_duration, title_end, title: sequence.data.title }

    //texts
    let texts = []
    sequence.data.texts.map((text, text_id) => {
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

const data = {
  "data": [
    {
      "img": "https://images.unsplash.com/photo-1640622660914-4b56c79bb492?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDEzODl8MXwxfGFsbHwxfHx8fHx8Mnx8MTY0NDg0NDk4MQ&ixlib=rb-1.2.1&q=80&w=1080",
      "data": {
        "title": "Product Description",
        "texts": ["point of care", "portable", "easy to use"]
      }
    },
    {
      "img": "https://images.unsplash.com/photo-1644784335820-48475e385360?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDEzODl8MHwxfGFsbHwyfHx8fHx8Mnx8MTY0NDg0NDk4MQ&ixlib=rb-1.2.1&q=80&w=1080",
      "data": {
        "title": "Product Description",
        "texts": ["point of care", "portable", "easy to use"]
      }
    },
    {
      "img": "https://images.unsplash.com/photo-1644321097048-f0e489227ac4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDEzODl8MHwxfGFsbHwzfHx8fHx8Mnx8MTY0NDg0NDk4MQ&ixlib=rb-1.2.1&q=80&w=1080",
      "data": {
        "title": "Product Description",
        "texts": ["point of care", "portable", "easy to use"]
      }
    },
    {
      "img": "https://images.unsplash.com/photo-1644792863360-40fa85ea52e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDEzODl8MHwxfGFsbHw0fHx8fHx8Mnx8MTY0NDg0NDk4MQ&ixlib=rb-1.2.1&q=80&w=1080",
      "data": {
        "title": "Product Description",
        "texts": ["point of care", "portable", "easy to use"]
      }
    },
    {
      "img": "https://images.unsplash.com/photo-1644798632872-2307cf82234b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDEzODl8MHwxfGFsbHw1fHx8fHx8Mnx8MTY0NDg0NDk4MQ&ixlib=rb-1.2.1&q=80&w=1080",
      "data": {
        "title": "Product Description",
        "texts": ["point of care", "portable", "easy to use"]
      }
    },
    {
      "img": "https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDEzODl8MXwxfGFsbHw2fHx8fHx8Mnx8MTY0NDg0NDk4MQ&ixlib=rb-1.2.1&q=80&w=1080",
      "data": {
        "title": "Product Description",
        "texts": ["point of care", "portable", "easy to use"]
      }
    },
    {
      "img": "https://images.unsplash.com/photo-1644783851964-763c7119e15d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDEzODl8MHwxfGFsbHw3fHx8fHx8Mnx8MTY0NDg0NDk4MQ&ixlib=rb-1.2.1&q=80&w=1080",
      "data": {
        "title": "Product Description",
        "texts": ["point of care", "portable", "easy to use"]
      }
    },
    {
      "img": "https://images.unsplash.com/photo-1644813018674-177ffaf5a24c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDEzODl8MHwxfGFsbHw4fHx8fHx8Mnx8MTY0NDg0NDk4MQ&ixlib=rb-1.2.1&q=80&w=1080",
      "data": {
        "title": "Product Description",
        "texts": ["point of care", "portable", "easy to use"]
      }
    },
    {
      "img": "https://images.unsplash.com/photo-1644657711115-ee46e8dd7c7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDEzODl8MHwxfGFsbHw5fHx8fHx8Mnx8MTY0NDg0NDk4MQ&ixlib=rb-1.2.1&q=80&w=1080",
      "data": {
        "title": "Product Description",
        "texts": ["point of care", "portable", "easy to use"]
      }
    },
    {
      "img": "https://images.unsplash.com/photo-1644787701139-c5b362bdad86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDEzODl8MHwxfGFsbHw5fHx8fHx8Mnx8MTY0NDg0NDk4MQ&ixlib=rb-1.2.1&q=80&w=1080",
      "data": {
        "title": "Product Description",
        "texts": ["point of care", "portable", "easy to use"]
      }
    }
  ]
}


console.log(JSON.stringify(createDataMap(data.data)))


export const padding = 16;
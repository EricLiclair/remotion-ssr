/**
 * This is an example of a server that returns dynamic video.
 * Run `npm run server` to try it out!
 * If you don't want to render videos on a server, you can safely
 * delete this file.
 */
import { bundle } from '@remotion/bundler';
import {
  getCompositions,
  renderFrames,
  stitchFramesToVideo
} from '@remotion/renderer';
import cookieParser from "cookie-parser";
import cors from "cors";
import express from 'express';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fps } from './src/utils.mjs';
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const port = process.env.PORT || 8000;
const compositionId = 'HelloWorld';

const cache = new Map();

app.post('/', async (req, res) => {
  // function to send file through the api
  const sendFile = (file) => {
    fs.createReadStream(file)
      .pipe(res)
      .on('close', () => {
        res.end();
      });
  };

  try {
    // checks if video exists in cache
    if (cache.get(JSON.stringify(req.body))) {
      sendFile(cache.get(JSON.stringify(req.body)));
      return;
    }

    const bundled = await bundle(path.join(process.cwd(), './src/index.jsx'));
    const comps = await getCompositions(bundled, { inputProps: req.body });
    const video = comps.find((c) => c.id === compositionId);
    if (!video) {
      throw new Error(`No video called ${compositionId}`);
    }

    // set response type
    res.set('content-type', 'video/mp4');

    // a temp dir
    const tmpDir = await fs.promises.mkdtemp(
      path.join(os.tmpdir(), 'remotion-')
    );

    // rendering frames
    const { assetsInfo } = await renderFrames({
      config: video,
      webpackBundle: bundled,
      onStart: () => console.log('Rendering frames...'),
      onFrameUpdate: (f) => {
        if (f % 10 === 0) {
          console.log(`Rendered frame ${f}`);
        }
      },
      parallelism: null,
      outputDir: tmpDir,
      inputProps: req.body,
      compositionId,
      imageFormat: 'jpeg',
    });

    const finalOutput = path.join(tmpDir, 'out.mp4');

    // stitching frames into a video
    await stitchFramesToVideo({
      dir: tmpDir,
      force: true,
      fps: fps,
      height: req.body.height || video.height,
      width: req.body.width || video.width,
      outputLocation: finalOutput,
      imageFormat: 'jpeg',
      assetsInfo,
      onProgress: (f) => {
        console.log(`Stitched frames ${f}`);
      },
    });
    cache.set(JSON.stringify(req.body), finalOutput);

    sendFile(finalOutput);
    console.log('Video rendered and sent!');
  } catch (err) {
    console.error(err);
    res.status(400)
    res.json({
      error: err,
    });
  }
});

app.listen(port);

console.log(
  [
    `The server has started on http://localhost:${port}!`,
    'You can render a video by making an api call',
    '',
    'If you are running Hello World, try this:',
    '',
    `http://localhost:${port}/`,
    '',
  ].join('\n')
);

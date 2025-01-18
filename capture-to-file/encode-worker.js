importScripts('./webm-writer2.js')

let webmWriter = null;
let fileWritableStream = null;
let frameReader = null;

async function startRecording(fileHandle, frameStream, trackSettings) {
  const { width: widthSettings, height: heightSettings, frameRate: frameRateSettings } = trackSettings
  let frameCounter = 0;

  fileWritableStream = await fileHandle.createWritable();

  webmWriter = new WebMWriter({
      fileWriter: fileWritableStream,
      codec: 'AV1',
      width: widthSettings,
      height: heightSettings
    });

  frameReader = frameStream.getReader();

  const init = {
    output: (chunk) => {
      webmWriter.addFrame(chunk);
    },
    error: (e) => {
      console.log(e.message);
      stopRecording();
    }
  };

  const config = {
    codec: "av01.0.09M.08",
    width: widthSettings,
    height: heightSettings,
    bitrate: 4 * 1024 * 1024,
  };

  let encoder = new VideoEncoder(init);
  let support = await VideoEncoder.isConfigSupported(config);
  console.assert(support.supported);
  encoder.configure(config);

  frameReader.read().then(async function processFrame({done, value}) {
    let frame = value;

    if(done) {
      await encoder.flush();
      encoder.close();
      return;
    }

    if (encoder.encodeQueueSize <= Math.floor(frameRateSettings * 1.5)) {
      if (++frameCounter % 20 == 0) {
        console.log(frameCounter + ' frames processed');
      }

      const insert_keyframe = (frameCounter % 150) == 0;
      encoder.encode(frame, { keyFrame: insert_keyframe });
    } else {
      console.log('dropping frame, encoder falling behind');
    }

    frame.close();
    frameReader.read().then(processFrame);
  });
}

async function stopRecording() {
  await frameReader.cancel();
  await webmWriter.complete();
  fileWritableStream.close();
  frameReader = null;
  webmWriter = null;
  fileWritableStream = null;
}

self.addEventListener('message', function(e) {
  switch (e.data.type) {
    case "start":
      startRecording(e.data.fileHandle, e.data.frameStream, e.data.trackSettings);
      break;
    case "stop":
      stopRecording();
      break;
  }
});

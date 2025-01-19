importScripts('./webm-writer2.js')

let webmWriter = null;
let fileWritableStream = null;
let frameReader = null;

async function startRecording(fileHandle, frameStream, trackSettings, codecName) {
	const { width: widthSettings, height: heightSettings, frameRate: frameRateSettings } = trackSettings
	let frameCounter = 0;

	fileWritableStream = await fileHandle.createWritable();

	webmWriter = new WebMWriter({
		fileWriter: fileWritableStream,
		codec: codecName,
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
		codec: codecName == "AV1" ? "av01.0.09M.08" : "vp8",
		width: widthSettings,
		height: heightSettings,
		bitrate: 4 * 1024 * 1024,
		// hardwareAcceleration: "prefer-hardware",
		// bitrateMode: "constant"
	};

	let encoder = new VideoEncoder(init);
	let support = await VideoEncoder.isConfigSupported(config);
	console.assert(support.supported);
	encoder.configure(config);

	while(true) {
		const { done, value } = await frameReader.read()
		let frame = value;

		if(done) {
			await encoder.flush();
			encoder.close();
			break;
		}

		if (encoder.encodeQueueSize <= Math.floor(frameRateSettings * 2)) {
			if (++frameCounter % 20 == 0) {
				console.log(frameCounter + ' frames processed');
			}

			// const insert_keyframe = (frameCounter % 120) == 0;
			const insert_keyframe = false;
			encoder.encode(frame, { keyFrame: insert_keyframe });
		} else {
			console.log('dropping frame, encoder falling behind');
		}

		frame.close();
	}
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
			startRecording(e.data.fileHandle, e.data.frameStream, e.data.trackSettings, e.data.codecName);
			break;
		case "stop":
			stopRecording();
			break;
	}
});

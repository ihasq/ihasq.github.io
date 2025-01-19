import { $, h as html, on } from "https://esm.sh/libh"

function Main() {

	let encodeWorker;
	let stream;
	let videoTrack;
	let handle;

	const buttonText = $("Record");
	const isButtonDisabled = $(false);

	const codecName = $("AV1");

	codecName.watch(name => console.log(name))

	async function startRecording() {
		console.assert(buttonText.$ == 'Record');
		isButtonDisabled.$ = true;

		handle = await window.showSaveFilePicker({
			startIn: 'videos',
			suggestedName: 'myVideo.webm',
			types: [{
				description: 'Video File',
				accept: {'video/webm' :['.webm']}
			}],
		});

		videoTrack = stream.getTracks()[0];
		let trackSettings = videoTrack.getSettings();
		let trackProcessor = new MediaStreamTrackProcessor(videoTrack);
		let frameStream = trackProcessor.readable;

		// Encoder I/O and file writing happens in a Worker to keep the UI
		// responsive.
		encodeWorker = new Worker('./encode-worker.js');

		// Tell the worker to start encoding the frames and writing the file.
		// NOTE: transferring frameStream and reading it in the worker is more
		// efficient than reading frameStream here and transferring VideoFrames
		// individually. This allows us to entirely avoid processing frames on the
		// main (UI) thread.
		encodeWorker.postMessage({
			type: 'start',
			fileHandle: handle,
			frameStream: frameStream,
			trackSettings,
			codecName: codecName.$
		}, [frameStream]);

		buttonText.$ = 'Stop';
		isButtonDisabled.$ = false;
	}

	function stopRecording() {
		console.assert(buttonText.$ == 'Stop');
		buttonText.$ = 'Record';
		encodeWorker.postMessage({ type: 'stop' });
		return ;
	}

	async function onButtonClicked({ target: button }) {
		switch(button.textContent) {
			case 'Record':
				startRecording();
				break;
			case 'Stop':
				stopRecording();
				break;
		}
	};

	return html`

		<body>
			<!-- <video id ="src" autoplay muted width=1280 height=720></video> -->
			<div>
				<b>Codecs: </b>
				<select ${{ value: codecName }}>
					<option ${{ value: "AV1", checked: true }}>AV1</option>
					<option ${{ value: "VP9" }}>VP9</option>
					<option ${{ value: "VP8" }}>VP8</option>
				</select>
			</div>
			<div><b>Bitrate: </b><label><input ${{ type: "number", value: "5" }}>Mbps</label></div>
			<button ${{ [on.click]: onButtonClicked, disabled: isButtonDisabled }}>${buttonText}</button>
		</body>

	`.then(async () => {
		await new Promise(r => document.body.onload = r);
		stream = await window.navigator.mediaDevices.getDisplayMedia({
			video: {
				width: 1920,
				height: 1200,
				frameRate: 60,
				cursor: 'never',
				sampleRate: 128 * 1024 * 1024,
				displaySurface: 'monitor',
			},
			audio: {
				suppressLocalAudioPlayback: true,
				autoGainControl: false,
				echoCancellation: false,
				noiseSuppression: false,
				sampleRate: 256 * 1024,
				systemAudio: 'include',
			},
			surfaceSwitching: 'exclude',
		});
		// startRecording()
	})
}

document.documentElement.append(...Main());
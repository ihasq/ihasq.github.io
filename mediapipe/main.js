import { DEBUG } from "./DEBUG_FLAG.js";

const baseOSC = new OffscreenCanvas(1920, 1080);
	
const encoderWorker = new Worker("./encoder.worker.js");
	
const stream = await navigator.mediaDevices.getDisplayMedia({
	video: {
		height: 1080,
		width: 1080,
		frameRate: 60
	},
	audio: false
});

const videoTrack = stream.getVideoTracks()[0];

const trackProcessor = new MediaStreamTrackProcessor({ track: videoTrack });

const vFBuffer = {};
let vFCount = 0;

let frames = 0;

let vFBx0000,
	vFBx0001,
	vFBx0002,
	vFBx0003,
	vFBx0004,
	vFBx0005,
	vFBx0006,
	vFBx0007,
	vFBx0008,
	vFBx0009,
	vFBx000A,
	vFBx000B,
	vFBx000C,
	vFBx000D,
	vFBx000E,
	vFBx000F
;

setInterval(() => {
	console.log(frames);
	frames = 0;
}, 1000);

const transformer = new WritableStream({
	write(baseVF) {
		// VideoFrame (以下VF) のバッファリングは、随時のpostMessageで行われるポインタの書き換えで発生するオーバーヘッドを軽減する目的がある
		// MediaStreamTrackProcessor (以下MSTP) がVFのクローズを検知しないと次のVFを送ってくれない問題は、VFの新規コピーを経てクローズすることで回避できる

		switch(vFCount) {
			case 0x0000: { vFBx0000 = new VideoFrame(baseVF); break; }
			case 0x0001: { vFBx0001 = new VideoFrame(baseVF); break; }
			case 0x0002: { vFBx0002 = new VideoFrame(baseVF); break; }
			case 0x0003: { vFBx0003 = new VideoFrame(baseVF); break; }
			case 0x0004: { vFBx0004 = new VideoFrame(baseVF); break; }
		}

		baseVF.close(); // MSTPが出力済みVFのクローズを検知すると、次のVFを出力してくれる
		vFCount++;
		frames++;

		if(vFCount == 5) {
			// バッファリング済みVFの数が4に到達した時点でエンコーダーワーカーに移譲
			encoderWorker.postMessage([
				vFBx0000,vFBx0001,vFBx0002,vFBx0003,vFBx0004
			], [
				vFBx0000,vFBx0001,vFBx0002,vFBx0003,vFBx0004
			]);

			if(DEBUG) {
				console.log("sent")
			}

			vFCount = 0;
		}
	},
});

trackProcessor.readable.pipeTo(transformer);

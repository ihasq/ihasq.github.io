let keyframeCount = 0;
let log = "";

const encoder = new VideoEncoder({
	output(eVF) {
		log += `${eVF.byteLength / 1024}KB\n`
	},
	error() {

	}
});

const createAV1Parameter = ({
	profile,
	level,
	tier,
	componentBitDepth,
	isMonochrome,

}) => {

}

encoder.configure({
	codec: "vp09.00.10.08",
	height: 720,
	width: 1280
});

self.addEventListener("message", ({ data }) => {
	data.forEach(x => {
		encoder.encode(x, { keyFrame: !((++keyframeCount) % 60) });
		x.close();
	});
}, { passive: true });



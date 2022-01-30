import Ffmpeg from 'fluent-ffmpeg';
import { promisify } from 'util';

export default async function getVideoTrackProps(videoFile) {
	const ffprobe = promisify(Ffmpeg.ffprobe);
	const probeData = await ffprobe(videoFile);
	const videoStream = probeData.streams.find(
		(stream) => stream.codec_type === 'video'
	);
	if (!videoStream) {
		throw 'missing video stream';
	}
	return videoStream;
}

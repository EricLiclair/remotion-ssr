import { Audio, interpolate, useCurrentFrame } from "remotion"
import { fps } from "../utils.mjs"
export default function NewAudio({ src, duration }) {
  const frame = useCurrentFrame()
  // const volume = interpolate(frame, [0, duration - (2 * fps), duration - (1 * fps), duration], [100, 100, 100, 0])
  return (
    <Audio src={src} volume={(f) =>
      interpolate(f, [0, duration - (4 * fps), duration - (3 * fps), duration], [1, 1, 0.5, 0], { extrapolateLeft: "clamp" })
    } />
  )
}

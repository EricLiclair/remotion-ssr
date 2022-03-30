import { Box, Typography } from "@mui/material";
import { interpolate, useCurrentFrame } from "remotion";


export const Title = ({ title, top = 200, left = 200, duration }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, duration], [0, 1], {
    extrapolateRight: 'clamp',
  });
  return <Box sx={{
    color: "#000",
    position: 'fixed',
    top: top,
    left,
    opacity
    // transform: 'translate(-50%, -50%)'
  }}>
    <Typography fontSize={60} component="h1" gutterBottom>
      {title}
    </Typography>
  </Box>
}
import { Box, Typography } from '@mui/material';
import CheckCircle from '@mui/icons-material/CheckCircle';
import { interpolate, useCurrentFrame } from 'remotion';


export const Text = ({ text, idx, duration }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, duration], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return <Box
    sx={{
      color: '#000',
      position: 'fixed',
      top: `${200 + 100 * (idx + 1)}px`,
      left: 200,
      opacity,
    }}
  >
    <Typography fontSize={40} component="p" gutterBottom>
      <CheckCircle fontSize={'large'} sx={{ color: '#6EF00B' }} /> {text}
    </Typography>
  </Box>
}
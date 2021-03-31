import { Box } from '@material-ui/core';

export default function SplashPage() {
  return (
    <Box
      width="100%"
      mt="2.5%"
      height="100%"
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.secondary',
      }}
    >
      <h1>Hello World</h1>
    </Box>
  );
}

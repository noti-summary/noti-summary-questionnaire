import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import { useRouter } from "next/router";

export default function Navbar() {

  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => router.push('/')}
          >
            <SmartphoneIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Notification Summary
          </Typography>
          <Button color="inherit" onClick={() => router.push('/about')}>About</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
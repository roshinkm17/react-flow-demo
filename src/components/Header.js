import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Menu } from '@material-ui/icons';

export default function CustomHeader() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="default" elevation={0}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Flow Builder
                    </Typography>
                    <Button color="inherit" variant="outlined">Save Changes</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
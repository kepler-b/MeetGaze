import { Box, Button, Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';

type SidebarProps = {
  users: string[]
  onActivatingPerson: (person: string) => void
}

const Sidebar = ({ users, onActivatingPerson }: SidebarProps) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 300, // Change the width here
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 300, boxSizing: 'border-box' }, // Ensure the paper width matches
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <Typography variant="h6" sx={{ padding: '16px' }}>
          User List
        </Typography>
        <List>
          {users.map((user, index) => (
            <ListItem key={index}>
              <Button fullWidth variant='outlined' onClick={() => onActivatingPerson(user)}>
                <ListItemText primary={user} />
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
import { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { FixedSizeList } from 'react-window';
import NotiCard from './NotiCard';

export default function NotiList(props) {

  const Rows = () => {
    const handleToggle = (value) => () => {
      const currentIndex = props.checked.indexOf(value);
      const newChecked = [...props.checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      
      props.setChecked(newChecked);
    };

    const renderItems = props.notis.map((value) => 
      <ListItem key={value.notificationId}>
        <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={props.checked.indexOf(value) !== -1}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': `checkbox-list-label-${value}` }}
            />
          </ListItemIcon>
          <NotiCard {...value} key={value.notificationId}/>
        </ListItemButton>
      </ListItem>
    )

    return renderItems;
  }

  return (
    <Box
      sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
    >
      <FixedSizeList
        height={400}
        width={360}
        itemSize={40}
        itemCount={1}
        overscanCount={3}
      >
        {Rows}
      </FixedSizeList>
    </Box>
  );
}

  
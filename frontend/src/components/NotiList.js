import { useState } from 'react';
import MuiToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import NotiCard from './NotiCard';

export default function NotiList(props) {
  
  const time = new Date(props.snapTime);
  
  const ToggleButton = styled(MuiToggleButton)({
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "white",
      backgroundColor: '#aaa'
    }
  });
  
  const [selectedNotis, setSelectedNotis] = useState(() => []);

  const handleChange = (event, newSelectedNotis) => {
    setSelectedNotis(newSelectedNotis);
    console.log(newSelectedNotis);
  };

  const Notis = props.notis.map((value) => 
    
    <ToggleButton
      value={value}
      key={value.notificationId}
    >
      <NotiCard {...value} 
        key={value.notificationId}
        iconString={props.icons[value.appName]}
      />
    </ToggleButton>
    
  ).reverse();

  return (
  
    <div>
    <Typography variant="h6" className="my-2">
                您在{(time.getMonth() + 1).toString()}月
                {time.getDate().toString()}日 {time.getHours().toString().padStart(2, '0')}
                :{time.getMinutes().toString().padStart(2, '0')} 時之通知列
    </Typography>
    <Box
      sx={{ bgcolor: 'background.paper' }}
      className="h-[60vh] w-80"
    >
      <ToggleButtonGroup
        orientation="vertical"
        color="primary"
        className="h-full w-full scrollbar"
        value={selectedNotis}
        onChange={handleChange}
      >
        {Notis}
      </ToggleButtonGroup>
    </Box>
    </div>
  );
}

  

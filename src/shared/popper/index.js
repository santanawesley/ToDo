import React from 'react';
import {
  Box,
  Button,
  Divider,
  Paper,
  Popper,
  Typography,
} from '@material-ui/core';
import './index.css';

const CustomPopper = ({ anchorEl, setAnchorEl, handleChange, id, title }) => {
  return (
    <Popper
      id={id.toString()}
      open={anchorEl}
      anchorEl={anchorEl}
      placement='left'
      style={{ zIndex: 9 }}
    >
      <Paper className='paper'>
        <Box className='arrow'/>
        <Box p={3} display='flex' flexDirection='column' mt={3}>
          <Box mb={2}>
            <Typography className='title-modal'>
              Confirmar solicitação
            </Typography>
            <Divider />
          </Box>

          <Typography>{title}</Typography>
          <Box display='flex' justifyContent='space-evenly' mt={2}>
            <Button
              variant='contained'
              className='button-negation'
              onClick={() => setAnchorEl(null)}
            >
              Não
            </Button>
            <Box ml={1}>
              <Button
                variant='contained'
                className='button-accept'
                onClick={() => handleChange(id)}
              >
                Sim
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Popper>
  );
};

export default CustomPopper;

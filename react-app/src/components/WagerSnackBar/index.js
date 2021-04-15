import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Paper,
  Snackbar,
  SnackbarContent,
  IconButton,
  LinearProgress,
} from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';
import { closeWagerMatchingProgress } from '../../store/modal';

export default function PositionedSnackbar() {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state) => state.modal.wager_matching_progress_Show
  );
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{
          marginRight: '160px',
          marginBottom: '8px',
        }}
        open={isOpen}
        autoHideDuration={6000}
        onClose={() => dispatch(closeWagerMatchingProgress())}
        message="Attempting to match wager"
        // action={
        //   <>
        //     <LinearProgress />
        //     <IconButton
        //       size="small"
        //       aria-label="close"
        //       color="inherit"
        //       onClick={() => dispatch(closeWagerMatchingProgress())}
        //     >
        //       <CloseIcon fontSize="small" />
        //     </IconButton>
        //   </>
        // }
      >
        <SnackbarContent>Hello world</SnackbarContent>
      </Snackbar>
    </div>
  );
}

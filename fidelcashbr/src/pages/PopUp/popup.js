import React from 'react';
import SnackBar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert'; //deve instalar - npm install @material-ui/lab

const vertical = 'top';
const horizontal = 'center';
export default ({ open, handleClose, children, severity }) => (
    <SnackBar
        anchorOrigin={ {vertical, horizontal} }
        open={open}
        onClose={handleClose}
        autoHideDuration={5000}
        key={vertical + horizontal}
    >
        <Alert onClose={handleClose} variant='filled' severity={severity}>
            {children}
        </Alert>
    </SnackBar>
)
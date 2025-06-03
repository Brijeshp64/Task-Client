import { CircularProgress } from '@mui/material';
import * as React from 'react';

type LoaderProps = {
  open: boolean;
  message: string;
};

const Loader: React.FC<LoaderProps> = ({ open, message }) => {
  return (
    <div>
      {open && (
        <>
          <p>{message}</p>
          <CircularProgress size={40} />
        </>
      )}
    </div>
  );
};

export default Loader;

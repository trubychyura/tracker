import { FC, FormEvent, useState, ChangeEvent } from 'react';

import { IconButton, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import PlayIcon from '@material-ui/icons/PlayCircleFilled';

const useStyles = makeStyles((theme) => ({
  input: {
    borderRadius: '45px',
    fontSize: '20px',
    height: '55px',
    marginBottom: '30px',
    [theme.breakpoints.down('xs')]: {
      borderRadius: '35px',
      fontSize: '17px',
      height: '45px',
      marginBottom: '25px',
    },
  },
  icon: {
    height: '55px',
    width: '55px',
    color: green[500],
    [theme.breakpoints.down('xs')]: {
      height: '45px',
      width: '45px',
    },
  },
  button: {
    position: 'relative',
    left: '15px',
  },
}));

interface FormProps {
  addTracker: (value: string) => void;
}

const Form: FC<FormProps> = ({ addTracker }) => {
  const [value, setValue] = useState('');
  const classes = useStyles();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTracker(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete='off'>
      <TextField
        id='outlined-basic'
        fullWidth={true}
        variant='outlined'
        placeholder='Enter tracker name'
        value={value}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <IconButton size='small' type='submit' className={classes.button}>
              <PlayIcon fontSize='large' className={classes.icon} />
            </IconButton>
          ),
          className: classes.input,
        }}
      />
    </form>
  );
};

export default Form;

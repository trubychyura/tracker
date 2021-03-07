import { FC, useEffect, useState } from 'react';
import { ITracker, TrackerActionType } from '../types';
import { convertTime } from '../helper';

import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import PauseIcon from '@material-ui/icons/PauseCircleOutline';
import PlayIcon from '@material-ui/icons/PlayCircleOutline';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutline';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  listItem: {
    display: 'flex',
    padding: '5px 10px',
    [theme.breakpoints.down('xs')]: {
      padding: '5px',
      fontSize: '15px',
    },
  },
  listItemContainer: {
    flexGrow: 0,
    flexShrink: 0,
    justifyContent: 'center',
    minWidth: 0,
    fontSize: '18px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '12px',
    },
  },

  listItemText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    padding: '0 10px 0 0',
  },
}));

interface TrackerProps {
  remove: (id: number) => TrackerActionType;
  toggle: (id: number) => TrackerActionType;
  saveTime: (
    time: number,
    id: number,
    closedTime: number | null,
  ) => TrackerActionType;
  settings: ITracker;
}

const Tracker: FC<TrackerProps> = ({ settings, remove, toggle, saveTime }) => {
  const { name, id, isTicking, time } = settings;

  const [localTime, setTime] = useState(time);
  const classes = useStyles({ isTicking });

  const handleToggle = () => {
    toggle(id);
  };

  const handleRemove = () => {
    remove(id);
  };

  const handleUnload = (e: BeforeUnloadEvent): void => {
    e.preventDefault();
    const closedTime: number | null = isTicking ? Date.now() : null;
    saveTime(localTime, id, closedTime);
    e.returnValue = '';
  };

  useEffect(() => {
    if (!isTicking) return;

    let timer: ReturnType<typeof setInterval>;
    timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isTicking]);

  useEffect(() => {
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  return (
    <ListItem
      className={classes.listItem}
      divider
      style={{
        color: isTicking ? green[500] : '',
        backgroundColor: isTicking ? 'rgba(213, 219, 156, 0.2)' : '',
      }}
    >
      <ListItemText
        primary={name}
        classes={{ primary: classes.listItemText }}
      />
      <ListItemText
        primary={convertTime(localTime)}
        className={classes.listItemContainer}
      />
      <ListItemIcon className={classes.listItemContainer}>
        <IconButton size='small' onClick={handleToggle}>
          {isTicking ? (
            <PauseIcon fontSize='large' />
          ) : (
            <PlayIcon fontSize='large' />
          )}
        </IconButton>
      </ListItemIcon>
      <ListItemIcon className={classes.listItemContainer}>
        <IconButton size='small' onClick={handleRemove}>
          <RemoveIcon color='secondary' fontSize='large' />
        </IconButton>
      </ListItemIcon>
    </ListItem>
  );
};

export default Tracker;

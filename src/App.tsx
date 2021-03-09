import { FC } from 'react';
import { connect } from 'react-redux';
import {
  addTracker,
  deleteTracker,
  saveTime,
  toggleTracker,
} from './redux/actionCreator';
import { ITracker, TrackerActionType } from './types';

import { Container, Divider, List, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Form from './components/Form';
import Tracker from './components/Tracker';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '560px',
    padding: '0 5px',
  },
  title: {
    margin: '70px 0',
    [theme.breakpoints.down('xs')]: {
      margin: '40px 0',
    },
  },
  warning: {
    fontSize: '17px',
    textAlign: 'center',
    padding: '20px',
  },
}));

interface RootState {
  trackers: ITracker[];
}

interface AppProps {
  trackers: ITracker[];
  addTracker: (name: string) => TrackerActionType;
  deleteTracker: (id: number) => TrackerActionType;
  toggleTracker: (id: number) => TrackerActionType;
  saveTime: (
    time: number,
    id: number,
    closedTime: number | null,
  ) => TrackerActionType;
}

const App: FC<AppProps> = ({
  trackers,
  addTracker,
  deleteTracker,
  saveTime,
  toggleTracker,
}) => {
  const classes = useStyles();

  return (
    <Container maxWidth='lg' className={classes.container}>
      <Typography variant='h1' align='center' className={classes.title}>
        tracker
      </Typography>
      <Form addTracker={addTracker} />
      <List>
        <Divider />
        {trackers.length ? (
          [...trackers]
            .reverse()
            .map((tracker) => (
              <Tracker
                key={tracker.id}
                settings={tracker}
                remove={deleteTracker}
                toggle={toggleTracker}
                saveTime={saveTime}
              />
            ))
        ) : (
          <p className={classes.warning}>No trackers yet!</p>
        )}
      </List>
    </Container>
  );
};

export default connect((state: RootState) => ({ trackers: state.trackers }), {
  addTracker,
  deleteTracker,
  saveTime,
  toggleTracker,
})(App);

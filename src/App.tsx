import React, { FC } from 'react';

import { connect } from 'react-redux';
import Form from './components/Form';
import Tracker from './components/Tracker';
import { ITracker } from './types';
import {
  addTracker,
  stopTracker,
  resumeTracker,
  deleteTracker,
} from './redux/actionCreator';
import { TrackerActionType } from './types';

interface RootState {
  trackers: ITracker[];
}

interface AppProps {
  trackers: ITracker[];
  addTracker: (name: string) => TrackerActionType;
  stopTracker: (id: number, time: number) => TrackerActionType;
  resumeTracker: (id: number) => TrackerActionType;
  deleteTracker: (id: number) => TrackerActionType;
}

const App: FC<AppProps> = ({
  trackers,
  addTracker,
  stopTracker,
  resumeTracker,
  deleteTracker,
}) => {
  return (
    <div className='App'>
      <h1>Tracker</h1>
      <Form addTracker={addTracker} />
      <hr />
      {trackers.map((tracker: any) => {
        return (
          <Tracker
            key={tracker.id}
            settings={tracker}
            stop={stopTracker}
            resume={resumeTracker}
            remove={deleteTracker}
          />
        );
      })}
    </div>
  );
};

export default connect((state: RootState) => ({ trackers: state.trackers }), {
  addTracker,
  stopTracker,
  resumeTracker,
  deleteTracker,
})(App);

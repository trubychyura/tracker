import { connect } from 'react-redux';
import Form from './components/Form';
import Tracker from './components/Tracker';

function App() {
  return (
    <div className='App'>
      <h1>Tracker</h1>
      <Form />
      <hr />
      <Tracker />
      <Tracker />
    </div>
  );
}

export default connect(() => ({}), {})(App);

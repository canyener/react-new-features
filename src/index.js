import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const App = ({ count }) => {
  const [currentCount, setCount] = useState(count)

  return (
    <div>
      <p>The current count is {currentCount}</p>
      <button onClick={() => setCount(currentCount - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
      <button onClick={() => setCount(currentCount + 1)}>+1</button>
    </div>
  )
}

App.defaultProps = {
  count: 0
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

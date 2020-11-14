import React from 'react';
import Main from './pages/Main';
import FilmPage from './pages/FilmPage';

import { Route, Link } from 'react-router-dom';

function App() {
  return (
    <>
      <div className="header">
        <div className="container">
          <div className="header__content">
            <Link to="/">
              <h1>
                Max
                <br />
                Cinema
              </h1>
              <hr />
            </Link>
          </div>
        </div>
      </div>
      <Route exact path="/" component={Main} />
      <Route exact path="/:filmName" component={FilmPage} />
    </>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '../pages/home';
import About from '../pages/about';
import Search from '../pages/search';

import '../styles/app.scss';

const App: React.FC<{}> = () => {

    return (
        <Router>
            <Switch>
                <Route path="/" exact component={ Home } />
                <Route path="/about" exact component={ About } />
                <Route path="/search" exact component={ Search } />
            </Switch>
        </Router>
    )
};

export default App;
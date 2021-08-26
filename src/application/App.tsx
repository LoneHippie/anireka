import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import About from '../pages/about';
// import Home from '../pages/home';
// import Search from '../pages/search';
// import Entry from '../pages/entry';

import '../styles/app.scss';

const App: React.FC<{}> = () => {

    const Home = React.lazy(() => import('../pages/home'));
    const Search = React.lazy(() => import('../pages/search'));
    const Entry = React.lazy(() => import('../pages/entry'));

    return (
        <Suspense fallback={<span>loading</span>}>
            <Router>
                <Switch>
                    <Route path="/" exact render={() => <Home />} />
                    <Route path="/about" exact component={ About } />
                    <Route path="/search" exact render={() => <Search />} />
                    <Route path="/search/:id" component={ Entry } />
                </Switch>
            </Router>
        </Suspense>
    )
};

export default App;
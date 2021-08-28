import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import About from '../pages/about';
import PageLoading from '../components/PageLoading';

import '../styles/app.scss';

const App: React.FC<{}> = () => {

    const Home = React.lazy(() => import('../pages/home'));
    const Search = React.lazy(() => import('../pages/search'));
    const Entry = React.lazy(() => import('../pages/entry'));

    return (
        <Suspense fallback={<PageLoading />}>
            <Router>
                <Switch>
                    <Route path="/" exact render={() => <Home />} />
                    <Route path="/search" exact render={() => <Search />} />
                    <Route path="/search/:id" component={ Entry } />
                    <Route path="/about" exact component={ About } />
                </Switch>
            </Router>
        </Suspense>
    )
};

export default App;
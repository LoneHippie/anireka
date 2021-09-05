import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PageLoading from '../components/PageLoading';

import '../styles/app.scss';

const App: React.FC<{}> = () => {

    const Home = React.lazy(() => import('../pages/home'));
    const Search = React.lazy(() => import('../pages/search'));
    const Entry = React.lazy(() => import('../pages/entry'));
    const Survey = React.lazy(() => import('../pages/survey'));

    return (
        <Suspense fallback={<PageLoading />}>
            <Router>
                <Switch>
                    <Route path="/" exact render={() => <Home />} />
                    <Route path="/search" exact render={() => <Search />} />
                    <Route path="/survey" exact render={() => <Survey />} />
                    <Route path="/entry/:id" component={ Entry } />
                </Switch>
            </Router>
        </Suspense>
    )
};

export default App;
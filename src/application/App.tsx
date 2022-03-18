import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ReactGa from 'react-ga';
import AnalyticsTracking from './process.config';

import { PageLoading } from '../components';

import '../styles/app.scss';

const App: React.FC<{}> = () => {

    const Home = React.lazy(() => import('../pages/home'));
    const Search = React.lazy(() => import('../pages/search'));
    const Entry = React.lazy(() => import('../pages/entry'));
    const Survey = React.lazy(() => import('../pages/survey'));

    useEffect(() => {
        ReactGa.initialize(AnalyticsTracking);
        ReactGa.pageview(window.location.pathname + window.location.search);
    });

    return (
        <Suspense fallback={<PageLoading />}>
            <Router>
                <Routes>
                    <Route path="/" element={ <Home /> } />
                    <Route path="/search" element={ <Search />} />
                    <Route path="/survey" element={ <Survey />} />
                    <Route path="/entry/:id" element={ <Entry/> } />
                </Routes>
            </Router>
        </Suspense>
    )
};

export default App;
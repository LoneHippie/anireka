import React from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router';
import useSurvey from './useSurvey';

import { Navbar, SurveyQuestion } from '../../components';

import styles from './survey.module.scss';

const Survey: React.FC<{}> = () => {

    const {
        surveyQuestions,
        currentQuestion,
        setCurrentQuestion
    } = useSurvey();

    const history = useHistory();    

    const questionHandlers = {
        handleLink: (link: number): void => {
            if (currentQuestion.isEndpoint) {
                history.push(`/entry/${link}`);
            } else {
                setCurrentQuestion(surveyQuestions.get(link)!);
            }
        }
    };

    return (
        <main className={styles.survey}>

            <Helmet>
                <html lang="en" />
                <meta name="description" content="Try our brief multi-question survey to find your next anime, whether you\'re new or looking for hidden gems." />
                <title>Anireka | Recommendation Survey</title>
            </Helmet>

            <Navbar />

            <SurveyQuestion 
                currentQuestion={currentQuestion}
                handleLink={questionHandlers.handleLink}
            />
            
        </main>
    )
};

export default Survey;
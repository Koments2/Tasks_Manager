import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './ErrorPage.module.css';

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className={classes.errorPage}>
            <div className={classes.errorContent}>
                <h1 className={classes.errorTitle}>404</h1>
                <p className={classes.errorMessage}>
                    На жаль, сторінку не знайдено.
                </p>
                <button className={classes.errorButton} onClick={handleGoBack}>
                    Повернутися назад
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;

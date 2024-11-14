import React from 'react';
import classes from './MainPage.module.css';

const WelcomePage = () => {
    return (
        <div className={classes.welcome__container}>
            <h1 className={classes.welcome__title}>Ласкаво просимо до Task Manager!</h1>
            <p className={classes.welcome__description}>
                Це додаток, який допомагає вам керувати задачами, відстежувати їхній статус і багато іншого.
            </p>
        </div>
    );
};

export default WelcomePage;

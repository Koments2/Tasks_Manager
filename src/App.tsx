import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { Outlet, Link } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <header className="App__header">
                <nav className="App__nav">
                    <Link to="/tasks" className="App__link">
                        Список задач
                    </Link>
                    <Link to="/unknown-page" className="App__link">
                        Невідома сторінка
                    </Link>
                </nav>
            </header>
            <main className="App__main">
                <Outlet />
            </main>
            <ToastContainer />
        </div>
    );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import {PersistGate} from 'redux-persist/integration/react'
import {Provider} from "react-redux";
import {persistor, store} from "./store";
import App from './App';
import "holderjs"
import './index.scss'

const app = (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <div>
                <App/>
            </div>
        </PersistGate>
    </Provider>
)


ReactDOM.render(
    app,
    document.getElementById('root')
);


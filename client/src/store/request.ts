import axios from 'axios';
import {handleRequests} from '@redux-requests/core';
import {createDriver} from '@redux-requests/axios';
import {PORT} from "../config/types";

export const {requestsReducer, requestsMiddleware} = handleRequests({
    driver: createDriver(
        axios.create({
            baseURL: `http://localhost:${PORT}`,
        }),
    ),
});


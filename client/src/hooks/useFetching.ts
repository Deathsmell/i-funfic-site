import { useDispatch } from 'react-redux';
import {useEffect} from "react";

export const useFetching = (someFetchActionCreator: any) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(someFetchActionCreator());
    }, [])
}
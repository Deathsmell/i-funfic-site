import { useDispatch } from 'react-redux';
import {useEffect} from "react";

export const useFetching = (someFetchActionCreator: any) => {
    const dispatch = useDispatch();
    console.log("USE FETCH")
    useEffect(() => {
        console.log("USE DISPATCH")
        dispatch(someFetchActionCreator());
    }, [])
}
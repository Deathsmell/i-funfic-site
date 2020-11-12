import {useDispatch} from 'react-redux';
import {useEffect} from "react";

export function useDispatchEffect<T = any>(someFetchActionCreator:T, ...props:any):void {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(someFetchActionCreator);
    }, [props])
}
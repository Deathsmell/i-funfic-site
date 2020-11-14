import {useEffect, useState} from 'react';

function getWindowDimensions() {
    const {innerWidth: width, innerHeight: height} = window;
    return {
        width,
        height,
    };
}

export default function useWindowDimensions() {

    const breakPoint = {
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200
    }

    const xs = (width: number) => width < breakPoint.sm


    const sm = (width: number) => width > breakPoint.sm && width < breakPoint.md


    const md = (width: number) => width > breakPoint.md && width < breakPoint.lg


    const lg = (width: number) => width > breakPoint.lg && width < breakPoint.xl


    const xl = (width: number) => width > breakPoint.lg

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {windowDimensions, xs, sm, md, lg, xl, breakPoint};
}
import {useEffect, useState} from "react";


const useDarkTheme = () => {
    const LOCAL_KEY = "themeColor";
    const DARK = "dark";
    const LIGHT = "light"

    const [theme, setTheme] = useState<typeof DARK | typeof LIGHT>();

    const changeTheme = () => {
        if (theme === DARK) {
            setNormalTheme()
        } else {
            setDarkTheme()
        }
    }

    const setDarkTheme = () => {
        const elementById = document.getElementById("body");
        if (elementById){
            localStorage.setItem(LOCAL_KEY,DARK)
            setTheme(DARK)
            elementById.className = "bootstrap-dark"
        } else {
            console.error("Invalid html body class!")
        }
    }

    const setNormalTheme = () => {
        const elementById = document.getElementById("body");
        if (elementById){
            localStorage.setItem(LOCAL_KEY,LIGHT)
            setTheme(LIGHT)
            elementById.className = "bootstrap"
        } else {
            console.error("Invalid html body class!")
        }
    }

    useEffect(() => {
        const color = localStorage.getItem(LOCAL_KEY);
        if (color === DARK) {
            setDarkTheme()
            setTheme(DARK)
        } else {
            setNormalTheme()
            setTheme(LIGHT)
        }
    })

    return {theme,setDarkTheme, setNormalTheme,changeTheme}
}

export default useDarkTheme
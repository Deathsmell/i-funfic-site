import React, {useEffect} from 'react';
import {ConnectedRouter} from "connected-react-router";
import {history} from "./store/router/history";
import NavBar from './components/NavBar';
import Routes from "./routes";
import {checkAuth} from "./store/credential/credential.actions";
import {useDispatch, useSelector} from "react-redux";
import {connecting} from "./store/websocket/websocket.actions";
import {selectorAuthorise} from "./store/credential/credential.selectors";
import {selectorWebsocket} from "./store/websocket/websocket.selector";
import {IntlProvider} from "react-intl";
import {locales} from "./store/locale/locale.interfaces";
import {selectorLocale} from "./store/locale/locale.selector";
import {getGenres} from "./store/genres/genres.actions";
import ThesaurusSelector from "./components/ThesaurusSelector";


const App: React.FC = () => {

    const dispatch = useDispatch();
    const authorise = useSelector(selectorAuthorise);
    const ws = useSelector(selectorWebsocket)
    const locale = useSelector(selectorLocale);

    useEffect(() => {
        dispatch(checkAuth())
        dispatch(getGenres())
        if (authorise && !ws) {
            dispatch(connecting())
        }
    }, [authorise, ws])

    return (
        <>
                <IntlProvider locale={locale} defaultLocale={"en"} messages={locales[locale]}>
                    <ConnectedRouter history={history}>
                        <NavBar/>
                        <ThesaurusSelector>
                            <Routes/>
                        </ThesaurusSelector>
                    </ConnectedRouter>
                </IntlProvider>
        </>
    );
}

export default App;

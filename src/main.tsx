import React from 'react';
import {render} from 'react-dom';
import App from "./App";
import {Provider} from 'react-redux';
import store from './redux/store';
import {TYPE} from "./redux/action";
import createLoadingAction from "./redux/action/createLoadingAction";
/**
 * styles
 */
import 'styles/base.global.scss';
import 'tz-library/style/base.scss';
import 'tz-library/style/mobile.media.scss';
import xhttp from "./net/xhttp";
import BoxGeometry from "./common/BoxGeometry";

/**
 * start
 */
render(<Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('container'));


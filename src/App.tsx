import React, {Component} from 'react';
import routers from './routers';
import Loading from "./components/Loading";
import Fade from "tz-library/components/Fade";

type Props = {};

class App extends Component<Props> {
    /**
     * lifecycle
     */
    mounted = false;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return <React.Fragment>
           <Loading/>
            {routers}
        </React.Fragment>;
    }

    /**
     *properties
     */

    /**
     *method
     */

}


export default App;
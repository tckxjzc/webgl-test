import React, {Component} from 'react';
import styles from './index.scss';
import {connect} from 'react-redux';
import Transition from "react-transition-group/Transition";
import fade from 'tz-library/animate/fade.scss';
import duration from 'tz-library/animate/duration';
type Props = {
    loading
}




class Loading extends Component<Props> {
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
        //显示条件
        let {effect, shade,prev} = this.props.loading;
        let show=effect+shade>0;
        //view
        return <Transition
            in={show}
            unmountOnExit
            timeout={500}>
            {
                (state) => {
                    let classNames=[
                        styles.container,
                        styles.top,
                        fade[state]||'',
                        shade > 0 || prev>0? styles.shade : '',
                        fade[state]||'',
                        duration.getClassName(500)
                    ];
                    return <div className={classNames.join(' ')}>
                        <div className={styles.outer}>
                            <div className={styles.inner}>
                            </div>
                        </div>
                        <div className={styles.loading}>
                            Loading...
                        </div>
                    </div>

                }
            }
        </Transition>
    }

    /**
     *properties
     */

    /**
     *method
     */

}

export default connect((state: RootState) => {
    return {loading: state.loading};
})(Loading);
import React from 'react';
import history from './history';
import Bundle from 'tz-library/components/Bundle';
import {
    Router,
    Route,
    Switch,
} from 'react-router-dom';


export default <Router history={history}>
    <Route render={({location})=>{
        return <Switch location={location}>
            <Route path={'/f'}  component={()=><Bundle el={()=>import('pages/TestF')}/>} />
            <Route path={'/e'}  component={()=><Bundle el={()=>import('pages/TestE')}/>} />
            <Route path={'/d'}  component={()=><Bundle el={()=>import('pages/TestD')}/>} />
            <Route path={'/c'}  component={()=><Bundle el={()=>import('pages/TestC')}/>} />
            <Route path={'/'}  component={()=><Bundle el={()=>import('pages/Home')}/>} />
        </Switch>
    }} />
</Router>

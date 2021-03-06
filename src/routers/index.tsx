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
            <Route path={'/texture/a'}  component={()=><Bundle el={()=>import('exercise/textureA')}/>} />
            <Route path={'/l'}  component={()=><Bundle el={()=>import('pages/TestL')}/>} />
            <Route path={'/k'}  component={()=><Bundle el={()=>import('pages/TestK')}/>} />
            <Route path={'/j'}  component={()=><Bundle el={()=>import('pages/TestJ')}/>} />
            <Route path={'/i'}  component={()=><Bundle el={()=>import('pages/TestI')}/>} />
            <Route path={'/g'}  component={()=><Bundle el={()=>import('pages/TestG')}/>} />
            <Route path={'/f'}  component={()=><Bundle el={()=>import('pages/TestF')}/>} />
            <Route path={'/e'}  component={()=><Bundle el={()=>import('pages/TestE')}/>} />
            <Route path={'/d'}  component={()=><Bundle el={()=>import('pages/TestD')}/>} />
            <Route path={'/c'}  component={()=><Bundle el={()=>import('pages/TestC')}/>} />
            <Route path={'/'}  component={()=><Bundle el={()=>import('pages/Home')}/>} />
        </Switch>
    }} />
</Router>

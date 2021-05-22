import Login from './views/Login'
import { Route, HashRouter } from 'react-router-dom'
import React from 'react'


class App extends React.Component {
  render(){
    return (
     <HashRouter>
       <Route path="" component={Login} />
     </HashRouter>
    );
  }
  
}

export default App;

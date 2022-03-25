import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css' 

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Menu from './components/Menu';
import Home from './components/Home'
import Estado from './components/estado/Estado';
import Cidade from './components/cidade/Cidade';

function App() {
  return (
    <Router>
        <Menu/>
        <Switch>
            <Route exact path="/" render={Home} />
            <Route exact path="/estados" render={ () => 
              <Estado/>
            } />
            <Route exact path="/cidades" render={ () => 
              <Cidade/>
            } />            
        </Switch>
    </Router>
  );
}

export default App;

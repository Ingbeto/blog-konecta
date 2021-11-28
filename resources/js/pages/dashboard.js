import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import NavBar from '../parts/navbar';
import Articulo from './articulo';
import Articulos from './articulos';
import Usuarios from './usuarios';
import Categorias from "./categorias";
import Blogs from "./blogs";
import { useSelector } from 'react-redux';

function Dashboard() {

  const history = useHistory();

  const user = useSelector(state => state.user);

  useEffect(() => {
     if(user == null)
        history.push('/login');
  }, [user]);


  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="flex-grow w-4/5 mx-auto mt-2">
        <Switch>
          <Route exact path="/">
            <Articulos />
          </Route>
          <Route path="/usuarios">
            <Usuarios />
          </Route>
          <Route path="/categorias">
              <Categorias />
          </Route>
          <Route path="/blogs">
              <Blogs />
          </Route>
          <Route path="/articulo/:slug">
            <Articulo />
          </Route>
        </Switch>
      </div>
    </div>
  );

}

export default Dashboard;

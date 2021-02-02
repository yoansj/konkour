import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// https://stackoverflow.com/questions/47747754/how-to-rewrite-the-protected-private-route-using-typescript-and-react-router-4-a

const ConnectedRoute = ({component, isAuthenticated, ...rest}: any) => {
  const routeComponent = (props: any) => (
    window.localStorage.getItem(process.env.REACT_APP_AUTH ? process.env.REACT_APP_AUTH : "XXX") !== null
          ? React.createElement(component, props)
          : <Redirect to={{pathname: '/login'}}/>
  );
  return <Route {...rest} render={routeComponent}/>;
};


export default ConnectedRoute;
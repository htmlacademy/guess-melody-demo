import * as React from "react";
import {useCallback} from 'react';
import {Route, Redirect, RouteProps} from "react-router-dom";
import {connect} from "react-redux";

import {AuthorizationStatus} from "reducer/user/user";
import {getAuthorizationStatus} from "reducer/user/selectors";

import {AppRoute} from "../../const";


type Props = RouteProps & {
  authorizationStatus: string;
  children: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({authorizationStatus, children, exact, path}): JSX.Element => {
  const renderRoute = useCallback(() => {
    return (
      authorizationStatus === AuthorizationStatus.AUTH
        ? children
        : <Redirect to={AppRoute.LOGIN} />
    );
  }, [authorizationStatus]);

  return (
    <Route
      path={path}
      exact={exact}
      render={renderRoute}
    />
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});


export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);

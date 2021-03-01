import {Route, Redirect} from 'react-router-dom';
import {RouteProps} from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import {History} from 'history';
import {State} from '../../types/state';
import {AppRoute, AuthorizationStatus} from '../../const';

type RenderFuncProps = {
  history: History<unknown>;
}

type PrivateRouteProps = RouteProps & {
  render: (props: RenderFuncProps) => JSX.Element;
  authorizationStatus: AuthorizationStatus;
}

const mapStateToProps = ({USER}: State) => ({
  authorizationStatus: USER.authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & PrivateRouteProps;

function PrivateRoute(props: ConnectedComponentProps): JSX.Element {
  const {exact, path, render, authorizationStatus} = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => (
        authorizationStatus === AuthorizationStatus.Auth
          ? render(routeProps)
          : <Redirect to={AppRoute.Login} />
      )}
    />
  );
}

export {PrivateRoute};
export default connector(PrivateRoute);

import WelcomeScreen from '../../pages/welcome-screen/welcome-screen';

type AppScreenProps = {
  errorsCount: number;
}

function App({errorsCount}: AppScreenProps): JSX.Element {
  return (
    <WelcomeScreen errorsCount={errorsCount} />
  );
}

export default App;

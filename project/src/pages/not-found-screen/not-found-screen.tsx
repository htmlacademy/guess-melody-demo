import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import Logo from '../../components/logo/logo';

function NotFoundScreen(): JSX.Element {
  return (
    <section className="game">
      <Helmet>
        <title>Угадай мелодию. Страница не найдена</title>
      </Helmet>
      <header className="game__header">
        <Logo />

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370"
            style={{filter: 'url(#blur)', transform: 'rotate(-90deg) scaleY(-1)', transformOrigin: 'center'}}
          />
        </svg>
      </header>

      <section className="game__screen">
        <h1>404. Page not found</h1>
        <Link to="/">Вернуться на главную</Link>
      </section>
    </section>
  );
}

export default NotFoundScreen;

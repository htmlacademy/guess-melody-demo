import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {login} from "../../store/api-actions";

class AuthScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.loginRef = createRef();
    this.passwordRef = createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    const {onSubmit} = this.props;

    evt.preventDefault();

    onSubmit({
      login: this.loginRef.current.value,
      password: this.passwordRef.current.value,
    });
  }

  render() {
    const {onReplayButtonClick} = this.props;

    return (
      <section className="login">
        <div className="login__logo">
          <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
        </div>
        <h2 className="login__title">Вы настоящий меломан!</h2>
        <p className="login__text">Хотите узнать свой результат? Представьтесь!</p>
        <form
          className="login__form"
          action=""
          onSubmit={this.handleSubmit}
        >
          <p className="login__field">
            <label className="login__label" htmlFor="name">Логин</label>
            <input
              ref={this.loginRef}
              className="login__input"
              type="text"
              name="name"
              id="name"
            />
          </p>
          <p className="login__field">
            <label className="login__label" htmlFor="password">Пароль</label>
            <input
              ref={this.passwordRef}
              className="login__input"
              type="text"
              name="password"
              id="password"
            />
            <span className="login__error">Неверный пароль</span>
          </p>
          <button className="login__button button" type="submit">Войти</button>
        </form>
        <button
          onClick={onReplayButtonClick}
          className="replay"
          type="button"
        >
          Сыграть ещё раз
        </button>
      </section>
    );
  }
}

AuthScreen.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onReplayButtonClick: PropTypes.func.isRequired,
};


const mapDispatchToProps = (dispatch) => ({
  onSubmit(authData) {
    dispatch(login(authData));
  }
});

export {AuthScreen};
export default connect(null, mapDispatchToProps)(AuthScreen);

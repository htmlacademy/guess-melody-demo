import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayer: props.activePlayer,
      };
      console.error({state: this.state});
    }

    render() {
      console.error('render:hock', {props: this.props, state: this.state});
      const {activePlayer} = this.state;

      return <Component
        {...this.props}
        activePlayer={activePlayer}
        onPlayButtonClick={(i) => console.error('call::onPlayButtonClick') || this.setState({
          activePlayer: activePlayer === i ? -1 : i
        })}
      />;
    }
  }

  WithActivePlayer.propTypes = {
    activePlayer: PropTypes.number.isRequired,
  };

  return WithActivePlayer;
};

export default withActivePlayer;

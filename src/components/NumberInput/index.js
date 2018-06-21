import React from 'react';
import PropTypes from 'prop-types';
import NumbericInput from 'react-numeric-input';

import '../../styles/NumberInput.scss';

class NumberInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      number: 0
    };

    this.onNumberChange = this.onNumberChange.bind(this);
  }

  onNumberChange(e) {
    this.setState({ number: e }, () => {
      this.props.onChange(e);
    });
  }

  render() {
    const { className } = this.props;

    return (
      <NumbericInput
        mobile
        className="numberInput"
        min={0}
        max={50}
        value={this.state.number}
        onChange={e => this.onNumberChange(e)}
      />
    );
  }
}

NumberInput.propTypes = {
  onChange: PropTypes.func
};

NumberInput.defaultProps = {
  onChange: () => {}
};

export default NumberInput;

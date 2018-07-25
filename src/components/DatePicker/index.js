import React from 'react';
import PropTypes from 'prop-types';
import styles from './DatePicker.module.scss';
import Datetime from 'react-datepicker';
import moment from 'moment';

import { Button, Text } from 'components';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCalendarAlt from '@fortawesome/fontawesome-pro-light/faCalendarAlt';

import '../../styles/DatePicker.scss';

const today = moment().utc();
const tomorrow = moment()
  .add(1, 'days')
  .utc();

class DatePicker extends React.Component {
  state = {
    date: tomorrow
  };

  onDateChange = e => {
    if (moment(e).isValid()) {
      this.setState({ date: e.utc() }, () => {
        this.props.onChange(e.utc());
      });
    }
  };

  render() {
    const {
      className,
      minDate,
      showTimeSelect,
      label,
      disabled,
      value
    } = this.props;
    const { date: stateDate } = this.state;

    const dateValue = value || stateDate;

    let format = 'MM/DD/YYYY';
    if (showTimeSelect) {
      format = 'MM/DD/YYYY HH:mm';
    }

    return (
      <div>
        {label ? (
          <div>
            <Text inputLabel>{label}</Text>
          </div>
        ) : null}
        <Datetime
          disabled={disabled}
          onChange={this.onDateChange}
          selected={this.state.date}
          minDate={minDate}
          showTimeSelect={showTimeSelect}
          value={dateValue.format(format)}
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
        />
      </div>
    );
  }
}

DatePicker.propTypes = {
  onChange: PropTypes.func,
  minDate: PropTypes.object,
  showTimeSelect: PropTypes.bool,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.object
};

DatePicker.defaultProps = {
  onChange: () => {},
  minDate: tomorrow
};

export default DatePicker;

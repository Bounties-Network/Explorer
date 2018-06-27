import React from 'react';
import PropTypes from 'prop-types';
import styles from './DatePicker.module.scss';
import Datetime from 'react-datepicker';
import moment from 'moment';

import { Button, Text } from 'components';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCalendarAlt from '@fortawesome/fontawesome-pro-light/faCalendarAlt';

import '../../styles/DatePicker.scss';

const today = moment();
const tomorrow = moment(today).add(1, 'days');

class DatePicker extends React.Component {
  state = {
    date: tomorrow
  };

  onDateChange = e => {
    if (moment(e).isValid()) {
      this.setState({ date: e }, () => {
        this.props.onChange(e);
      });
    }
  };

  render() {
    const { className, minDate, showTimeSelect, label, disabled } = this.props;

    let format = 'MM/DD/YYYY';
    if (showTimeSelect) {
      format = 'MM/DD/YYYY HH:mm';
    }

    return (
      <div>
        {label ? (
          <div>
            <Text style="FormLabel">{label}</Text>
          </div>
        ) : null}
        <Datetime
          disabled={disabled}
          onChange={this.onDateChange}
          selected={this.state.date}
          minDate={minDate}
          showTimeSelect={showTimeSelect}
          value={this.state.date.format(format)}
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
        />
      </div>
    );
  }
}

DatePicker.propTypes = {
  onChange: PropTypes.func
};

DatePicker.defaultProps = {
  onChange: () => {},
  minDate: moment()
};

export default DatePicker;

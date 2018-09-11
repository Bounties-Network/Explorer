import React from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datepicker';
import moment from 'moment';

import { Text, TextInput } from 'components';
import { isMobile } from 'utils/helpers';

import '../../styles/DatePicker.scss';

const tomorrow = moment()
  .add(1, 'days')
  .utc();

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
    const {
      minDate,
      showTimeSelect,
      label,
      disabled,
      value,
      onChange,
      onBlur,
      onFocus,
      error,
      placeholder
    } = this.props;
    const { date: stateDate } = this.state;

    const dateValue = value || stateDate;

    let format = 'MM/DD/YYYY';
    if (showTimeSelect) {
      format = 'MM/DD/YYYY HH:mm';
    }

    if (isMobile()) {
      return (
        <TextInput
          label={label}
          disabled={disabled}
          onChange={onChange}
          type="datetime-local"
          placeholder={placeholder}
          onBlur={onBlur}
          onFocus={onFocus}
          error={error}
          value={moment(value).format('YYYY-MM-DD[T]HH:mm')}
          min={moment(minDate).format('YYYY-MM-DD[T]HH:mm')}
        />
      );
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
          selected={dateValue}
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
  value: PropTypes.object,
  placeholder: PropTypes.string
};

DatePicker.defaultProps = {
  onChange: () => {},
  minDate: tomorrow,
  placeholder: 'enter date...'
};

export default DatePicker;

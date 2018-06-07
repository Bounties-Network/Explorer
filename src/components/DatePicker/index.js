import React from 'react';
import PropTypes from 'prop-types';
import styles from './DatePicker.module.scss';
import Datetime from 'react-datetime';
import moment from 'moment';

import { Button } from 'components';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCalendarAlt from '@fortawesome/fontawesome-pro-light/faCalendarAlt';

import './DatePicker.css';

const today = moment();
const tomorrow = moment(today).add(1, 'days');

// const renderButton = ( props, openCalendar, closeCalendar ) => {
//   return (
//     <div>
//       <input {...props} />
//       <Button size='icon' style='secondary' onClick={openCalendar}><FontAwesomeIcon icon={faCalendarAlt} /></Button>
//     </div>
//   );
// };

class DatePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: tomorrow
    };

    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(e) {
    this.setState({ date: e }, () => {
      this.props.onChange(e);
    });
  }

  render() {
    const { className } = this.props;

    return (
      <Datetime onChange={e => this.onDateChange(e)} value={this.state.date} />
    );
  }
}

DatePicker.propTypes = {
  onChange: PropTypes.func
};

DatePicker.defaultProps = {
  onChange: () => {}
};

export default DatePicker;

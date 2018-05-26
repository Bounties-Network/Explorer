import React from 'react';
import PropTypes from 'prop-types';
import styles from './RefineByFilter.module.scss';

import { Text, Button } from 'components';

class RefineByFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: {
        paymentStatus: 'any',
        stage: {
          draft: false,
          active: false,
          expired: false,
          killed: false
        }
      }
    };
  }

  onInputChange(prop, value) {
    console.log('event', prop, value);
    let tempFilter = Object.assign({}, this.state.filter);
    if (prop === 'paymentStatus') {
      tempFilter[prop] = value;
      this.setState({ filter: tempFilter });
    }
    if (prop === 'stage') {
      tempFilter[prop][value] = !this.state.filter.stage[value];
      this.setState({ filter: tempFilter });
    }

    setTimeout(() => console.log(this.state.filter.stage), 0);
    this.props.onChange(tempFilter);
  }

  render() {
    return (
      <div className={`${styles.filter}`}>
        <div className={`${styles.titleBar}`}>
          <Text style="H4">Refine By:</Text>
          <Button style="clearFilter" size="small">
            Clear Filters
          </Button>
        </div>
        <div className={`${styles.stages}`}>
          <Text style="Body">Stage</Text> <br />
          <input
            type="checkbox"
            onChange={() => this.onInputChange('stage', 'drafts')}
          />{' '}
          <Text>Drafts</Text> <br />
          <input
            type="checkbox"
            onChange={() => this.onInputChange('stage', 'active')}
          />{' '}
          <Text>Active</Text> <br />
          <input
            type="checkbox"
            onChange={() => this.onInputChange('stage', 'expired')}
          />{' '}
          <Text>Expired</Text> <br />
          <input
            type="checkbox"
            onChange={() => this.onInputChange('stage', 'killed')}
          />{' '}
          <Text>Killed</Text> <br />
        </div>
        <div className={`${styles.paymentStatus}`}>
          <Text style="Body">Payment Status</Text> <br />
          <input
            type="radio"
            checked={this.state.filter.paymentStatus === 'any'}
            onChange={() => this.onInputChange('paymentStatus', 'any')}
          />{' '}
          <Text>Any</Text> <br />
          <input
            type="radio"
            checked={this.state.filter.paymentStatus === 'paid'}
            onChange={() => this.onInputChange('paymentStatus', 'paid')}
          />{' '}
          <Text>Paid</Text> <br />
          <input
            type="radio"
            checked={this.state.filter.paymentStatus === 'unpaid'}
            onChange={() => this.onInputChange('paymentStatus', 'unpaid')}
          />{' '}
          <Text>Unpaid</Text> <br />
        </div>
      </div>
    );
  }
}

RefineByFilter.propTypes = {
  onChange: PropTypes.func
};

RefineByFilter.defaultProps = {
  onChange: filter => {
    console.log(filter);
  }
};

export default RefineByFilter;

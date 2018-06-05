import React from 'react';
import PropTypes from 'prop-types';
import { FetchComponent, LoadComponent } from 'hocs';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions, sagas, selectors } from 'public-modules';
import styles from './ExplorerPage.module.scss';

import { RefineByFilter, Search, Text, SortBy, BountyCard } from 'components';

const {
  bountiesStateSelector,
  rootBountiesSelector,
  categoriesSelector,
  rootCategoriesSelector
} = selectors;

const renderBounties = data => {
  return data.map((elem, idx) => {
    return (
      <div className={`${styles.bounty}`} key={'bounty' + idx}>
        <BountyCard bountyData={elem} />
      </div>
    );
  });
};

class ExplorerPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchOptions: {}
    };

    this.updateSearchOptions = this.updateSearchOptions.bind(this);
  }

  componentWillMount() {
    const { loadCategories } = this.props;
    loadCategories();
  }

  updateSearchOptions(prop, options) {
    let tempSearchOptions = Object.assign({}, this.state.searchOptions);
    tempSearchOptions[prop] = options;

    this.setState({ searchOptions: tempSearchOptions }, () => {
      console.log(this.state.searchOptions);
    });
  }

  render() {
    const { loading, error, bounties, count, categories } = this.props;

    if (error) {
      return <div>error...</div>;
    }

    return (
      <div className={`${styles.explorerPage}`}>
        <div className={`${styles.filterColumn}`}>
          <div className={`${styles.searchBar}`}>
            <Search onChange={e => this.updateSearchOptions('search', e)} />
          </div>
          <div className={`${styles.refineBy}`}>
            <RefineByFilter
              dropdown
              stages
              difficulty
              dropdownOptions={categories}
              onChange={e => this.updateSearchOptions('filter', e)}
            />
          </div>
        </div>
        <div className={`${styles.bountiesColumn}`}>
          <div className={`${styles.sortByBar}`}>
            <div className={`${styles.count}`}>
              <Text style="H2" color="purple">
                {count}
              </Text>
              <Text style="H3" color="grey">
                Bounties
              </Text>
            </div>
            <div className={`${styles.sortBy}`}>
              <SortBy onClick={e => this.updateSearchOptions('sort', e)} />
            </div>
          </div>
          <div className={`${styles.bountiesList}`}>
            {renderBounties(bounties)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, router) => {
  let bountiesState = rootBountiesSelector(state);
  let categoriesState = rootCategoriesSelector(state);

  return {
    categories: categoriesState.categories,
    bounties: bountiesState.bounties,
    count: bountiesState.count,
    ...bountiesStateSelector(state),
    ...categoriesSelector(state)
  };
};

ExplorerPage.propTypes = {
  bounties: PropTypes.array,
  load: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool
};

const check = compose(
  FetchComponent(sagas.fetch),
  connect(mapStateToProps, { load: actions.loadBounties, ...actions }),
  LoadComponent('')
)(ExplorerPage);

export default check;

import React from 'react';
import PropTypes from 'prop-types';
import { FetchComponent, LoadComponent } from 'hocs';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions, sagas, selectors } from 'public-modules';
import styles from './ExplorerPage.module.scss';

import {
  RefineByFilter,
  Search,
  Text,
  SortBy,
  BountyCard,
  Button
} from 'components';

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
    const { loadCategories, loadBounty } = this.props;
    loadCategories();
    loadBounty(1);
  }

  updateSearchOptions(prop, options) {
    const { loadBounties } = this.props;

    let tempSearchOptions = Object.assign({}, this.state.searchOptions);
    tempSearchOptions[prop] = options;

    this.setState({ searchOptions: tempSearchOptions }, () => {
      console.log(this.state.searchOptions);
      loadBounties(this.state.searchOptions);
    });
  }

  loadMoreBounties() {
    // const currentCount = bounties.length;
  }

  render() {
    const { loading, error, bounties, count, categories } = this.props;
    console.log('bounties', bounties);
    if (error) {
      return <div>error...</div>;
    }

    return (
      <div className={`${styles.explorerPage}`}>
        <div className="row">
          <div className="col-xs-3">
            <div className={`${styles.filterColumn}`}>
              <div className="row center-xs middle-xs">
                <div className="col-xs-6">
                  <div className={`${styles.searchBar}`}>
                    <Search
                      onChange={e => this.updateSearchOptions('search', e)}
                    />
                  </div>
                </div>
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
          </div>
          <div className="col-xs-9">
            <div className={`${styles.bountiesColumn}`}>
              <div className={`${styles.sortByBar}`}>
                <div className="row middle-xs">
                  <div className="col-xs-3">
                    <div className={`${styles.count}`}>
                      <Text style="H2" color="purple">
                        {count}
                      </Text>
                      <Text style="H3" color="grey">
                        Bounties
                      </Text>
                    </div>
                  </div>
                  <div className="col-xs-offset-3 col-xs-6">
                    <div className={`${styles.sortBy}`}>
                      <SortBy
                        onClick={e => this.updateSearchOptions('sort', e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles.bountiesList}`}>
                {renderBounties(bounties)}
              </div>
              {/* <div className={`${styles.loadMoreButton}`}>
                <Button size='large' style='secondary'>Load More</Button> 
              </div> */}
            </div>
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

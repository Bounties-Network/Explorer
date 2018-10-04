import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions as appActions } from 'layout/App/reducer';

function FilterNavComponentHOC(WrappedComponent) {
  return compose(
    connect(
      null,
      {
        initFilterNav: appActions.initializeFilterNav,
        showFilterNav: appActions.showFilterNav,
        hideFilterNav: appActions.hideFilterNav,
        resetFilterNav: appActions.resetFilterNav
      }
    )
  )(WrappedComponent);
}

export default FilterNavComponentHOC;

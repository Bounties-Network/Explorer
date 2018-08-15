import { createSelector } from 'reselect';
import { rootDraftsSelector } from 'public-modules/Drafts/selectors';
import { rootBountiesSelector } from 'public-modules/Bounties/selectors';

export const rootBountiesPanelSelector = state => state.bountiesPanel;

export const bountiesPanelSelector = createSelector(
  rootBountiesPanelSelector,
  bountiesPanel => bountiesPanel
);

export const currentTabSelector = createSelector(
  bountiesPanelSelector,
  bountiesPanel => bountiesPanel.currentTab
);

export const tabDataSelector = createSelector(
  [rootBountiesSelector, rootDraftsSelector, currentTabSelector],
  (bountyState, draftsState, currentTab) => {
    const data = {
      active: {
        list: bountyState.bounties,
        count: bountyState.count,
        offset: bountyState.offset,
        loading: bountyState.loading,
        loadingMore: bountyState.loadingMore,
        error: bountyState.error
      },
      drafts: {
        list: draftsState.drafts,
        count: draftsState.count,
        offset: draftsState.offset,
        loading: draftsState.loading,
        loadingMore: draftsState.loadingMore,
        error: draftsState.error
      }
    };

    return data[currentTab];
  }
);

import { createSelector } from 'reselect';

export const rootBountiesPanelSelector = state => state.bountiesPanel;

export const bountiesPanelSelector = createSelector(
  rootBountiesPanelSelector,
  bountiesPanel => bountiesPanel
);

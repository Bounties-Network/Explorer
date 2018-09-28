import { FilterNav as FilterNavHOC } from 'hocs';
import { FilterNav } from 'explorer-components';

const LinkedFilterNav = FilterNavHOC(FilterNav);

export const BountyFilterNav = LinkedFilterNav({ type: 'bounty' });

import React from 'react';
import styles from './FilterNav.module.scss';
import { Search, Text, Button, Checkbox, SearchSelect } from 'components';

const FilterNav = props => {
  return (
    <div className={styles.filterNav}>
      <div className={styles.searchWrapper}>
        <Search />
      </div>
      <div className={styles.refineWrapper}>
        <Text inline typeScale="h4" weight="fontWeight-medium">
          Refine By
        </Text>
        <Button type="link" className={styles.clearButton}>
          Clear Filters
        </Button>
      </div>
      <div className={styles.stageFilter}>
        <Text weight="fontWeight-medium" className={styles.groupText}>
          Stage
        </Text>
        <Checkbox label="All" />
        <Checkbox label="Drafts" />
        <Checkbox label="Active" />
        <Checkbox label="Completed" />
        <Checkbox label="Expired" />
        <Checkbox label="Dead" />
      </div>
      <div className={styles.difficultyFilter}>
        <Text weight="fontWeight-medium" className={styles.groupText}>
          Difficulty
        </Text>
        <Checkbox label="Beginner" />
        <Checkbox label="Intermediate" />
        <Checkbox label="Advanced" />
      </div>
      <div className={styles.categoryFilter}>
        <Text weight="fontWeight-medium" className={styles.groupText}>
          Category
        </Text>
        <SearchSelect />
      </div>
    </div>
  );
};

export default FilterNav;

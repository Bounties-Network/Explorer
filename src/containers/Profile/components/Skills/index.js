import React from 'react';
import styles from './Skills.module.scss';
import { Pill, Text } from 'components';
import { map } from 'lodash';

// TODO: handle too many skills to display

const Skills = props => {
  const { skills } = props;

  const renderSkills = () => {
    return map(skill => {
      return (
        <Pill type="rectangle" className={styles.skill}>
          {skill}
        </Pill>
      );
    }, skills);
  };

  return (
    <React.Fragment>
      <div className={styles.skills}>
        <Text typeScale="h3" color="black">
          Skills
        </Text>
        <div className={styles.skillsContainer}>{renderSkills()}</div>
      </div>
    </React.Fragment>
  );
};

export default Skills;

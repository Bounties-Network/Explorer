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
    <div className={styles.skills}>
      <Text typeScale="h4" color="black" weight="fontWeight-medium">
        Skills
      </Text>

      {skills ? (
        <div className={styles.skillsContainer}>{renderSkills()}</div>
      ) : (
        'N/A'
      )}
    </div>
  );
};

export default Skills;

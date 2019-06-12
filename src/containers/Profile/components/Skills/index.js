import React from 'react';
import styles from './Skills.module.scss';
import { Pill, Text } from 'components';
import { map } from 'lodash';
import intl from 'react-intl-universal';

// TODO: handle too many skills to display

const Skills = props => {
  const { skills } = props;

  const renderSkills = () => {
    return map(skill => {
      return (
        <Pill key={skill} type="rectangle" className={styles.skill}>
          {skill}
        </Pill>
      );
    }, skills);
  };

  return (
    <div className={styles.skills}>
      <Text typeScale="h4" color="black" weight="fontWeight-medium">
        {intl.get('sections.profile.skills.title')}
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

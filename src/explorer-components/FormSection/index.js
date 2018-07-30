import React from 'react';
import PropTypes from 'prop-types';
import styles from './FormSection.module.scss';
import { Text } from 'components';

const Description = props => (
  <Text typeScale="H4" weight="fontWeight-bold" className={styles.description}>
    {props.children}
  </Text>
);

const SubText = props => (
  <Text className={styles.subText} color="defaultGrey">
    {props.children}
  </Text>
);

const InputGroup = props => (
  <div className={styles.inputGroup}>{props.children}</div>
);

class Section extends React.Component {
  render() {
    const { children, title } = this.props;

    return [
      <div className={`${styles.section} row`}>
        <div className="col-xs-3">
          <Text color="defaultGrey" typeScale="Body" weight="fontWeight-medium">
            {title}
          </Text>
        </div>
        <div className="col-xs-9">{children}</div>
      </div>,
      <div className={`row ${styles.borderBlock}`}>
        <div className="col-xs-12">
          <div className={styles.border} />
        </div>
      </div>
    ];
  }
}

const FormSection = props => (
  <div className={styles.formSection}>{props.children}</div>
);

FormSection.propTypes = {
  children: function(props, propName, componentName) {
    const children = props[propName];
    const isArray = Array.isArray(children);
    let collection = children;

    if (!isArray) {
      collection = [children];
    }

    for (let i = 0; i < collection.length; i++) {
      if (collection[i].type.name !== Section.name) {
        return new Error('Children must be a Section component');
      }
    }
  }
};

FormSection.Section = Section;
FormSection.Description = Description;
FormSection.SubText = SubText;
FormSection.InputGroup = InputGroup;

export default FormSection;

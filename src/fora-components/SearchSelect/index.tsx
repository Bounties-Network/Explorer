/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import Select, { Props as RSProps, StylesConfig } from 'react-select'
import theme from 'theme/theme'


const selectStyles: StylesConfig = {
  indicatorsContainer: (provided) => ({
    ...provided,
    'svg': { color: theme.colors.brandPrimary[300] }
  }),
  indicatorSeparator: () => ({}),
  option: (provided) => ({
    ...provided,
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.regular,
    lineHeight: theme.lineHeights.standard,
    fontFamily: theme.fonts.body,
    borderRadius: theme.radius,
    backgroundColor: theme.colors.white,
    padding: `${theme.space[3]} ${theme.space[4]}`,
    color: theme.colors.brandGray[500],
    '&:hover': {
      color: theme.colors.brandPrimary[300],
      background: theme.colors.brandGray[100],
    }
  }),
  control: (provided, state) => ({
    ...provided,
    boxSizing: "border-box",
    borderRadius: theme.radius,
    padding: `${theme.space[2]} ${theme.space[3]}`,
    border: state.isHovered || state.isFocused || state.isActive ? theme.borders.input.active : theme.borders.base,
    boxShadow: theme.shadows[0],
    '&:hover': {
      border: theme.borders.input.active
    }
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.regular,
    lineHeight: theme.lineHeights.standard,
    fontFamily: theme.fonts.body,
    color: theme.colors.brandGray[400],
  }), 
  singleValue: (provided, state) => ({
    ...provided,
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.regular,
    lineHeight: theme.lineHeights.standard,
    fontFamily: theme.fonts.body,
  })
}

const SearchSelect: React.FunctionComponent<RSProps> = props => {
  return (
    <Select
      styles={selectStyles}
      value={props.value}
      onChange={props.handleChange}
      options={props.options}
    >
    </Select>
  );
};

export default SearchSelect;

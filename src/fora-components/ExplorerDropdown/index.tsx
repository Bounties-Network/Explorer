/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import Select, { Props as RSProps, StylesConfig } from "react-select";
import { Text, Flex } from "@theme-ui/components";
import theme from "theme/theme";
import { faHome, faBox, faTimes } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Community } from "../TopCommunities";
import Pill from "fora-components/Pill";

const optionStyles = {
  cursor: "pointer",
  fontSize: theme.fontSizes.sm,
  fontWeight: theme.fontWeights.regular,
  lineHeight: theme.lineHeights.standard,
  fontFamily: theme.fonts.body,
  borderRadius: theme.radius,
  backgroundColor: theme.colors.white,
  padding: `${theme.space[3]} ${theme.space[4]}`,
  color: theme.colors.brandGray[500],
  "&:hover": {
    color: theme.colors.brandPrimary[300],
    background: theme.colors.brandGray[100]
  }
};

const YourCommunitiesOption = props => (
  <Flex
    {...props}
    {...props.innerProps}
    sx={{
      ...optionStyles,
      alignItems: "center",
      "> svg": { mr: 2 },
      color: props.isSelected ? theme.colors.brandPrimary[300] : theme.colors.brandGray[500]
    }}
  >
    <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
    <Text>Your Communities</Text>
  </Flex>
);

const AllBountiesOption = props => (
  <Flex
    {...props}
    {...props.innerProps}
    sx={{
      ...optionStyles,
      alignItems: "center",
      "> svg": { mr: 2 },
      color: props.isSelected ? theme.colors.brandPrimary[300] : theme.colors.brandGray[500]
    }}
  >
    <FontAwesomeIcon icon={faBox}></FontAwesomeIcon>
    <Text>All Bounties</Text>
  </Flex>
);

const CommunityOption = props => (
  <Flex
    {...props}
    {...props.innerProps}
    sx={{
      ...optionStyles,
      "> a": {
        color: props.isSelected ? theme.colors.brandPrimary[300] : theme.colors.brandGray[500],
        "*": {
          color: props.isSelected ? theme.colors.brandPrimary[300] : theme.colors.brandGray[500]
        },
        "&:hover": {
          color: theme.colors.brandPrimary[300],
          "*": { color: theme.colors.brandPrimary[300] }
        }
      }
    }}
  >
    <Community {...props.data.community} isOption={true}></Community>
  </Flex>
);

const Option = props => {
  switch (props.value) {
    case "yourCommunities": {
      return <YourCommunitiesOption {...props}></YourCommunitiesOption>;
    }
    case "allBounties": {
      return <AllBountiesOption {...props}></AllBountiesOption>;
    }
    default: {
      return <CommunityOption {...props}></CommunityOption>;
    }
  }
};

const MultiValue = props => (
  <div
    {...props.innerProps}
    ref={props.innerRef}
    onClick={props.removeProps.onClick}
    sx={{ cursor: "pointer", mr: 1 }}
  >
    <Pill styles={{ height: "unset" }} variant="pill.tag.explorer">
      <Text color={"brandPrimary.300"} fontFamily="body" variant="body">
        {props.data.community ? `f • ${props.data.label}` : props.data.label}
      </Text>
    </Pill>
  </div>
);

const selectStyles = (optionsLength): StylesConfig => ({
  indicatorsContainer: provided => ({
    ...provided,
    svg: { color: theme.colors.brandPrimary[300] }
  }),
  indicatorSeparator: () => ({}),
  menuList: provided => ({
    ...provided,
    minHeight: 85 * optionsLength
  }),
  clearIndicator: provided => ({
    ...provided,
    cursor: "pointer"
  }),
  control: (provided, state) => ({
    ...provided,
    boxSizing: "border-box",
    borderRadius: theme.radius,
    padding: `${theme.space[2]} ${theme.space[3]}`,
    border: state.isHovered || state.isFocused || state.isActive ? theme.borders.input.active : theme.borders.base,
    boxShadow: theme.shadows[0],
    "&:hover": {
      border: theme.borders.input.active
    }
  }),
  placeholder: provided => ({
    ...provided,
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.regular,
    lineHeight: theme.lineHeights.standard,
    fontFamily: theme.fonts.body,
    color: theme.colors.brandGray[400]
  }),
  singleValue: provided => ({
    ...provided,
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.regular,
    lineHeight: theme.lineHeights.standard,
    fontFamily: theme.fonts.body
  })
});

const GroupHeading = props => (
  <div sx={{ py: 2, px: 4 }}>
    <Text color="brandGray.400" variant="label" sx={{ fontFamily: "body" }}>
      {props.children}
    </Text>
  </div>
);

const ExplorerDropdown: React.FunctionComponent<RSProps> = props => {
  const optionsLength =
    Array.isArray(props.options) && props.options.reduce((current, next) => current + next?.options.length || 0, 0);

  return (
    <Select
      styles={selectStyles(optionsLength)}
      value={props.value}
      onChange={props.handleChange}
      options={props.options}
      components={{ GroupHeading, Option, MultiValue }}
      isMulti={true}
      hideSelectedOptions={false}
      closeMenuOnSelect={false}
    ></Select>
  );
};

export default ExplorerDropdown;

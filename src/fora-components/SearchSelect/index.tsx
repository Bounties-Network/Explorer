/** @jsx jsx */
import { jsx } from "theme-ui";
import React, { forwardRef } from "react";
import Tippy from "@tippy.js/react";
import { Text, Flex } from "rebass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/pro-regular-svg-icons";
import { Global } from "@emotion/core";
import css from "@styled-system/css";

const defaultHeight = "48px";
const defaultWidth = "250px";

interface IProps {
  content?: any;
  options: any[];
  placeholder: string;
  handleSelect: any;
}

function useClickedOutside(ref, setVisible) {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      setVisible(false);
    }
  }

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}

const SelectTrigger: React.FC<{
  visible: boolean;
  setVisible: any;
  placeholder: string;
}> = forwardRef((props, ref) => (
  <Flex
    ref={ref}
    sx={{
      px: 3,
      bg: "white",
      border: 0,
      borderRadius: 2,
      boxShadow: 3,
      height: defaultHeight,
      width: defaultWidth,
      cursor: "pointer"
    }}
    justifyContent="space-between"
    alignItems="center"
    onClick={() => {
      if (props.visible) {
        props.setVisible(false);
        return;
      }
      props.setVisible(true);
    }}
  >
    <Text fontFamily="secondary" color="gray400" variant="body">
      {props.placeholder}
    </Text>
    <FontAwesomeIcon sx={{ color: "seaGlass300" }} icon={faChevronDown} />
  </Flex>
));

interface IOptionProps {
  handleSelect: any;
  option: string;
  visible: boolean;
  setVisible: any;
}
const Option: React.FC<IOptionProps> = props => (
  <Flex
    onClick={() => {
      props.handleSelect(props.option);
      props.setVisible(false);
    }}
    alignItems={"center"}
    sx={{
      "&:hover": { bg: "gray100", "> *": { color: "seaGlass300" } },
      borderRadius: 1,
      py: 4,
      px: 2,
      height: defaultHeight,
      cursor: "pointer"
    }}
  >
    <Text
      sx={{ "&:hover": { color: "seaGlass300" } }}
      variant="body"
      fontFamily="secondary"
      color="gray500"
    >
      {props.option}
    </Text>
  </Flex>
);

interface IOptionsProps {
  options: any[];
  visible: boolean;
  setVisible: any;
  handleSelect: any;
}
const Options: React.FC<IOptionsProps> = props => (
  <Flex
    flexDirection="column"
    sx={{
      borderRadius: 2,
      boxShadow: 3,
      bg: "white",
      width: defaultWidth,
      minHeight: defaultHeight,
      maxHeight: `calc((48px * 4) + (4px * 4))`,
      overflow: 'auto',
      overflowX: 'hidden',
      px: 2,
      py: 2
    }}
  >
    <Global
      styles={css({
        ".tippy-tooltip": {
          background: "none !important",
          color: "rgb(0, 0, 0)"
        },
        ".tippy-arrow": { display: "none" },
        ".tippy-popper": {
          background: "none"
        },
        ".tippy-content": {
          background: "none"
        }
      })}
    />
    {Array.isArray(props.options) &&
      props.options.map(option => <Option option={option} {...props}></Option>)}
  </Flex>
);

const SearchSelect: React.FunctionComponent<IProps> = props => {
  const [visible, setVisible] = React.useState(false);
  const wrapperRef = React.useRef(null);
  useClickedOutside(wrapperRef, setVisible);

  return (
    <Tippy
      visible={visible}
      distance={4}
      content={
        props.content || (
          <Options
            handleSelect={props.handleSelect}
            visible={visible}
            setVisible={setVisible}
            options={props.options}
          />
        )
      }
      interactive={true}
      trigger="click"
      arrow={false}
      placement="bottom"
    >
      <SelectTrigger
        visible={visible}
        setVisible={setVisible}
        placeholder={props.placeholder}
      />
    </Tippy>
  );
};

export default SearchSelect;

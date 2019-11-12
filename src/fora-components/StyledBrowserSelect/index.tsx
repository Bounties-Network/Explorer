/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Global, css } from "@emotion/core";

const globalSelectStyles = css`
.select-css {
  display: flex;
  height: 48px;
  width: 250px;
  align-items: center;
  cursor: pointer;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 16px;
  padding-right: 16px;
	box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.14);
  border-radius: 8px;
	-moz-appearance: none;
	-webkit-appearance: none;
	appearance: none;
	background-color: #fff;
  background: #FFFFFF;
  border: 1px solid #EAEBEB;
  background-image: url("data:image/svg+xml,%3Csvg width='7' height='16' viewBox='0 0 7 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.5 0L6.53109 6H0.468911L3.5 0Z' fill='%23393B3E'/%3E%3Cpath d='M3.5 16L0.468912 10L6.53109 10L3.5 16Z' fill='%23393B3E'/%3E%3C/svg%3E%0A");
	background-repeat: no-repeat, repeat;
	background-position: right .7em top 50%, 0 0;
}

.select-css > option[default] {
  display: none;
}
.select-css[data-has-selected=""] {
  color: #8D9496;
}
`

interface IProps {
  content?: any;
  options: any[];
  value: any;
  placeholder: string;
  handleSelect: any;
}

const StyledBrowserSelect: React.FunctionComponent<IProps> = props => (
  <React.Fragment>
    <Global styles={globalSelectStyles}></Global>
    <select data-has-selected={props.value} className='select-css' onChange={({ target:  { value } }) => props.handleSelect(value)} value={props.value}>
      <option value="" selected hidden disabled>{props.placeholder}</option>
      {props.options.map(option => <option selected={option === props.value} value={option}>{option}</option>) }
    </select>
  </React.Fragment>
);

export default StyledBrowserSelect;

/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { storiesOf } from "@storybook/react";
import SearchSelect from ".";
import Pill from "fora-components/Pill";
import { Text } from "rebass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/pro-regular-svg-icons";
import css from "@styled-system/css";

const options = [
  { value: "react", label: "React" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "javascript", label: "JavaScript" },
  { value: "rust", label: "Rust" },
  { value: "clojure", label: "Clojure" }
];

storiesOf("SearchSelect", module)
  .add("Mi Fora", () => {
    const [state, setState] = React.useState<{
      value: string;
      label: string;
    } | null>(null);
    return (
      <div sx={{ width: "300px", pt: 3, pl: 5 }}>
        <SearchSelect
          value={state}
          handleChange={option => setState(option)}
          options={options}
          placeholder="Placeholder.."
        />
      </div>
    );
  })
  .add("Scrollable Tag example", () => {
    const [state, setState] = React.useState<
      { value: string; label: string }[]
    >([]);
    return (
      <div sx={{ width: "300px", pt: 3, pl: 5 }}>
        <SearchSelect
          value={null}
          handleChange={option => setState(state.concat(option))}
          options={options.filter(x => !state.includes(x))}
          placeholder="Placeholder.."
        />
        <div
          sx={{ display: "flex", "> :not(:last-of-type)": { mr: 2 }, mt: 3 }}
        >
          {state.map(option => (
            <div>
              <Pill css={css({ height: "unset" })} variant="tag.explorer">
                {option.label}
                <FontAwesomeIcon
                  sx={{ color: "brandPrimary.300", cursor: "pointer", ml: 2 }}
                  icon={faTimes}
                  onClick={() =>
                    setState(state.filter(x => x.value !== option.value))
                  }
                ></FontAwesomeIcon>
              </Pill>
            </div>
          ))}
        </div>
      </div>
    );
  });

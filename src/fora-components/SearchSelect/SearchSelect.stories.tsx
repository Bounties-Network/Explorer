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
    const [state, setState] = React.useState<{ value: string; label: string } | null>(null);
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
    const [state, setState] = React.useState<string[]>([]);
    return (
      <div sx={{ width: "300px", pt: 3, pl: 5 }}>
        <SearchSelect
          handleChange={(option: string) => setState(state.concat(option))}
          options={options}
          placeholder="Placeholder.."
        />
        <div sx={{ display: "flex", "> :not(:last-of-type)": { mr: 2 }, mt: 3 }}>
          {state.map(option => (
            <div sx={{ cursor: "pointer" }} onClick={() => setState(state.filter(x => x !== option))}>
              <Pill css={css({ height: "unset" })} variant="pill.tag.explorer">
                <div
                  sx={{
                    minHeight: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    "> :first-of-type": { mr: 2 }
                  }}
                >
                  <Text color={"gray.400"} variant="body">
                    {option}
                  </Text>
                  <FontAwesomeIcon sx={{ color: "seaGlass.300" }} icon={faTimes}></FontAwesomeIcon>
                </div>
              </Pill>
            </div>
          ))}
        </div>
      </div>
    );
  });

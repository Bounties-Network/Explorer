/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Flex, Text, Link, Button } from "rebass";
import { Tabs, TabList, TabPanels, TabPanel, Tab } from "fora-components/Tabs";
import Pill from "fora-components/Pill";
import moment from "moment";
import { faPencil, faTrash } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Divider from "fora-components/Divider";

type YourBountiesProps = {
  drafts: IBountyProps[];
  active: IBountyProps[];
  totalActiveCount: number;
  totalDraftsCount: number;
  activeNotificationCount: number;
  draftsNotificationCount: number;
};

export interface IBountyProps {
  href: string;
  title: string;
  timestamp: any;
  submissionsCount: number;
  community?: { name: string; href: string };
  status?: string; // "active" | "draft";
  ethUSDAmount: number;
  ethAmount: number;
}
const Bounty: React.FC<IBountyProps> = props => (
  <Flex flexDirection="column">
    <Flex sx={{ pt: 3, px: 3 }} alignItems="center">
      <Flex flexDirection="column">
        <Link href={props.href}>
          <Text
            sx={{
              maxWidth: "450px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
            variant="bodyStrong"
            color="black"
          >
            {props.title}
          </Text>
        </Link>
        <Flex
          alignItems={"center"}
          sx={{ textAlign: "center", "> div": { mr: 2 } }}
        >
          <Text variant="body" color="gray.400">
            {moment(props.timestamp).fromNow(true)}
          </Text>
          <Text variant="body" color="gray.400">
            •
          </Text>
          <Text
            variant="body"
            color="gray.400"
          >{`${props.submissionsCount} Submissions`}</Text>
          <Text variant="body" color="gray.400">
            •
          </Text>
          {props.community && (
            <Link href={props.community?.href}>
              <Text
                variant="body"
                color="gray.400"
              >{`f - ${props.community?.name}`}</Text>
            </Link>
          )}
        </Flex>
      </Flex>
      <Flex justifyContent="center" sx={{ ml: "auto" }}>
        <Flex
          alignItems={"center"}
          sx={{ "> :not(:last-of-type)": { mr: 2 }, mr: 3 }}
        >
          {props.status === "draft" && (
            <Button
              color="seaGlass.300"
              variant="secondary"
              sx={{ textTransform: "capitalize", height: "40px" }}
            >
              {"Activate"}
            </Button>
          )}
          <Button variant="secondaryIconOnly">
            <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
          </Button>
          <Button variant="secondaryIconOnly">
            <FontAwesomeIcon
              sx={{ color: "rose.200" }}
              icon={faTrash}
            ></FontAwesomeIcon>
          </Button>
        </Flex>
        <Flex flexDirection="column">
          <Text
            variant="numeralMonospaceLarge"
            color="black"
          >{`$${props.ethUSDAmount}`}</Text>
          <Text
            variant="body"
            color="gray.400"
          >{`${props.ethAmount} ETH`}</Text>
        </Flex>
      </Flex>
    </Flex>
    <Divider mb={"0px !important"}></Divider>
  </Flex>
);

const YourBountiesTab = React.forwardRef<
  any,
  { isSelected?: any; label: string; notificationCount: number }
>((props, ref) => {
  return (
    <Tab ref={ref} isSelected={props.isSelected} {...props}>
      <Flex sx={{ "> :first-of-type": { mr: 2 } }}>
        <Text
          variant="body"
          color={props.isSelected ? "seaGlass.400" : "gray.400"}
        >
          {props.label}
        </Text>
        <Pill
          styles={{
            bg: props.isSelected ? "seaGlass.400" : "gray.200",
            color: props.isSelected ? "white" : "gray.500"
          }}
          variant="tabNotificationCount"
        >
          {props.notificationCount}
        </Pill>
      </Flex>
    </Tab>
  );
});

interface ILoadMoreProps {
  status: string;
}
const LoadMore: React.FC<ILoadMoreProps> = props => (
  <Flex
    sx={{ bg: "gray.100", height: "60px", width: "100%" }}
    justifyContent="center"
    alignItems="center"
  >
    <Text variant="link">Load More</Text>
  </Flex>
);

const YourBounties: React.FunctionComponent<YourBountiesProps> = props => (
  <Tabs
    size={"lg"}
    sx={{
      bg: "white",
      boxSizing: "border-box",
      borderRadius: 2,
      border: "base"
    }}
  >
    <TabList>
      <YourBountiesTab
        label="Active"
        notificationCount={props.activeNotificationCount}
      ></YourBountiesTab>
      <YourBountiesTab
        label="Drafts"
        notificationCount={props.draftsNotificationCount}
      ></YourBountiesTab>
    </TabList>

    <TabPanels>
      <TabPanel sx={{ pt: 0 }}>
        {props.active.map(Bounty)}
        {props.active.length < props.totalActiveCount && (
          <LoadMore status="active"></LoadMore>
        )}
      </TabPanel>
      <TabPanel sx={{ pt: 0 }}>
        {props.drafts.map(Bounty)}
        {props.drafts.length < props.totalDraftsCount && (
          <LoadMore status="draft"></LoadMore>
        )}
      </TabPanel>
    </TabPanels>
  </Tabs>
);

export default YourBounties;

/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Flex, Text, Link } from "rebass";
import { Tabs, TabList, TabPanels, TabPanel, Tab } from "fora-components/Tabs";
import Pill from "fora-components/Pill";
import moment from "moment";
import Divider from "fora-components/Divider";
import Avatar, { AvatarProps } from "fora-components/Avatar";

type YourSubmissionsProps = {
  received: ISubmissionProps[];
  submitted: ISubmissionProps[];
  totalReceivedCount: number;
  totalSubmittedCount: number;
  receivedNotificationCount: number;
  submittedNotificationCount: number;
};

export interface ISubmissionProps {
  href: string;
  title: string;
  timestamp: any;
  submissionsCount: number;
  submission: {
    avatar: AvatarProps;
    timestamp: any;
    status: string
  };
  community?: { name: string; href: string };
  status?: string; // "active" | "draft";
  ethUSDAmount: number;
  ethAmount: number;
}
const Submission: React.FC<ISubmissionProps> = props => (
<Flex flexDirection="column">
  <Flex sx={{ pt: 3, px: 3 }} alignItems="center">
    <Flex flexDirection="column">
      <Link href={props.href}>
        <Text sx={{ maxWidth: "450px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} variant="bodyStrong" color="black">
          {props.title}
        </Text>
      </Link>
      <Flex alignItems={'center'} sx={{ textAlign: 'center', '> div': { mr: 2 } }}>
        <Text variant="body" color="gray400">
          {moment(props.timestamp).fromNow(true)}
        </Text>
        <Text variant='body' color='gray400'>•</Text>
        <Text variant="body" color="gray400">{`${props.submissionsCount} Submissions`}</Text>
        <Text  variant='body' color='gray400'>•</Text>
        {props.community && (
          <Link href={props.community?.href}>
            <Text variant="body" color="gray400">{`f - ${props.community?.name}`}</Text>
          </Link>
        )}
      </Flex>
    </Flex>
    <Flex alignItems="center" sx={{ ml: "auto", '> :not(:last-of-type)': { mr: 3 } }}>
      <Avatar {...props.submission.avatar}></Avatar>
      <Text variant="body" color='gray400'>{moment(props.submission.timestamp).fromNow()}</Text>
      <Pill variant={`pill.status.${props.submission.status}`}>{props.submission.status === 'pendingAcceptance' ? 'Pending Acceptance' : props.submission.status}</Pill>
      <Flex flexDirection="column">
        <Text variant="numeralMonospaceLarge" color="black">{`$${props.ethUSDAmount}`}</Text>
        <Text variant="body" color="gray400">{`${props.ethAmount} ETH`}</Text>
      </Flex>

    </Flex>
  </Flex>
  <Divider mb={'0px !important'}></Divider>
</Flex>
);

const YourSubmissionsTab = React.forwardRef<any, { isSelected?: any; label: string; notificationCount: number }>(
  (props, ref) => {
    return (
      <Tab ref={ref} isSelected={props.isSelected} {...props}>
        <Flex sx={{ "> :first-of-type": { mr: 2 } }}>
          <Text variant="body" color={props.isSelected ? "seaGlass400" : "gray400"}>
            {props.label}
          </Text>
          <Pill
            styles={{ bg: props.isSelected ? "seaGlass400" : "gray200", color: props.isSelected ? "white" : "gray500" }}
            variant="tabNotificationCount"
          >
            {props.notificationCount}
          </Pill>
        </Flex>
      </Tab>
    );
  }
);

interface ILoadMoreProps { status: string }
const LoadMore: React.FC<ILoadMoreProps> = (props) => (
  <Flex sx={{ bg: 'gray100', height: '60px', width: '100%' }} justifyContent='center' alignItems='center'>
    <Text variant='link'>
      Load More
    </Text>
  </Flex>
)

const YourSubmissions: React.FunctionComponent<YourSubmissionsProps> = props => (
  <Tabs size={'lg'} sx={{ bg: "white", boxSizing: "border-box", borderRadius: 2, border: "base" }}>
    <TabList>
      <YourSubmissionsTab label="Received" notificationCount={props.receivedNotificationCount}></YourSubmissionsTab>
      <YourSubmissionsTab label="Submitted" notificationCount={props.submittedNotificationCount}></YourSubmissionsTab>
    </TabList>

    <TabPanels>
      <TabPanel sx={{ pt: 0 }}>{props.received.map(Submission)}
      {props.received.length < props.totalReceivedCount && (
          <LoadMore status='received'></LoadMore>
      )}
      </TabPanel>
      <TabPanel sx={{ pt: 0 }}>{props.submitted.map(Submission)}
      {props.submitted.length < props.totalSubmittedCount && (
          <LoadMore status='submitted'></LoadMore>
      )}
      </TabPanel>
    </TabPanels>
  </Tabs>
);

export default YourSubmissions;

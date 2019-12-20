/** @jsx jsx */
import { jsx } from "theme-ui";
import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import LoadingIcon from "assets/loading";
import PreviewCard from "fora-components/Card/BountyPreviewCard";
import { STAGE_VALUES } from "public-modules/Bounty/constants";
import { userProfileSubmissions, userProfileSubmissionsVariables } from "./__generated__/userProfileSubmissions";
import Submission from "fora-components/Submission/View";
import Divider from "fora-components/Divider";
import showdown from "showdown";
import { newTabExtension } from "utils/helpers";

showdown.setOption("simpleLineBreaks", true);
showdown.extension("targetBlank", newTabExtension);

const converter = new showdown.Converter({ extensions: ["targetBlank"] });

const userProfileSubmissionsQuery = gql`
  query userProfileSubmissions($address: String!) {
    std_bounties_fulfillment(
      where: {
        user_user: { public_address: { _eq: $address } }
        std_bounties_bounty: {
          bounty_stage: { _neq: 0 }, 
          private_fulfillments: { _neq: true } 
        }
      }
      order_by: { std_bounties_bounty: { bounty_stage: asc } }
    ) {
      id
      url
      description
      modified
      accepted

      user_user {
        name
        small_profile_image_url
        public_address
      }

      std_bounties_fulfillment_comments {
        std_bounties_comment {
          id
          text
          modified
          user_user {
            name
            public_address
            small_profile_image_url
          }
        }
      }

      std_bounties_bounty {
        id
        title
        deadline
        std_bounties_fulfillments_aggregate {
          aggregate {
            count
          }
        }
        bounty_stage
        usd_price
        calculated_fulfillment_amount
      }
    }
  }
`;

interface IProps {
  address: string;
}

const Submissions: React.FunctionComponent<IProps> = props => {
  const { address } = props;
  const { data, error } = useQuery<userProfileSubmissions, userProfileSubmissionsVariables>(
    userProfileSubmissionsQuery,
    {
      variables: { address }
    }
  );
  if (error) {
    console.error(error);
    return <div>{JSON.stringify(error, null)}</div>;
  }
  if (data) {
    const submissions = data?.std_bounties_fulfillment;
    if (Array.isArray(submissions) && submissions.length) {
      return (
        <div sx={{ "> :not(:last-of-type)": { mb: 5 } }}>
          {submissions.map((submission, index) => (
            <Fragment>
              <div
                sx={{
                  "> div:first-of-type": { mb: 3, backgroundColor: "brandGray.100" },
                  "> div:nth-of-type(2)": { ml: 4 }
                }}
              >
                <PreviewCard
                  key={submission.std_bounties_bounty.id}
                  title={submission.std_bounties_bounty.title}
                  href={`/bounty/${submission.std_bounties_bounty.id}`}
                  expirationTimestamp={submission.std_bounties_bounty.deadline}
                  submissionCount={
                    submission.std_bounties_bounty.std_bounties_fulfillments_aggregate.aggregate?.count || 0
                  }
                  status={String(STAGE_VALUES[submission.std_bounties_bounty.bounty_stage]).replace("stages.", "")}
                  ethInUSD={Number(Number(submission.std_bounties_bounty.usd_price).toFixed(2))}
                  ethAmount={Number(Number(submission.std_bounties_bounty.calculated_fulfillment_amount).toFixed(2))}
                ></PreviewCard>
                <Submission
                  key={submission.id}
                  avatar={{
                    name: submission.user_user?.name,
                    address: String(submission.user_user?.public_address),
                    img: String(submission.user_user?.small_profile_image_url),
                    src: `/profile/${address}`,
                    onDark: false,
                    size: "medium"
                  }}
                  handleSubmit={callback => {
                    callback && setTimeout(callback, 2000);
                  }}
                  content={converter.makeHtml(submission.description)}
                  timestamp={submission.modified}
                  attachments={[]} //TODO:
                  commentSubmitHandler={console.log}
                  replySubmitHandler={console.log}
                  comments={submission.std_bounties_fulfillment_comments.map(comment => ({
                    content: comment.std_bounties_comment.text,
                    timestamp: comment.std_bounties_comment.modified,
                    commenter: {
                      name: comment.std_bounties_comment.user_user.name,
                      address: comment.std_bounties_comment.user_user.public_address,
                      src: comment.std_bounties_comment.user_user.small_profile_image_url,
                      onDark: false
                    }
                  }))}
                ></Submission>
              </div>
              {index !== submissions.length ? <Divider></Divider> : null}
            </Fragment>
          ))}
        </div>
      );
    }
    return <div>This user has no submissions</div>;
  }
  return <LoadingIcon></LoadingIcon>;
};

export default Submissions;

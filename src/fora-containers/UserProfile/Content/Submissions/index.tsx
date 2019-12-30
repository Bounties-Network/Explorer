/** @jsx jsx */
import { jsx } from "theme-ui";
import React, { Fragment } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import LoadingIcon from "assets/loading";
import PreviewCard from "fora-components/Card/BountyPreviewCard";
import { STAGE_VALUES } from "public-modules/Bounty/constants";
import { userProfileSubmissions, userProfileSubmissionsVariables } from "./__generated__/userProfileSubmissions";
import Submission from "fora-components/Submission/View";
import Divider from "fora-components/Divider";
import showdown from "showdown";
import { newTabExtension } from "utils/helpers";
import { createFulfillmentComment, createFulfillmentCommentVariables } from "./__generated__/createFulfillmentComment";
import moment from "moment";
import { getUserId, getUserIdVariables } from "./__generated__/getUserId";

showdown.setOption("simpleLineBreaks", true);
showdown.extension("targetBlank", newTabExtension);

const converter = new showdown.Converter({ extensions: ["targetBlank"] });

const userProfileSubmissionsQuery = gql`
  query userProfileSubmissions($address: String!) {
    user_user(where: { public_address: { _eq: $address } }) {
      id
      small_profile_image_url
    }

    std_bounties_fulfillment(
      where: {
        user_user: { public_address: { _eq: $address } }
        std_bounties_bounty: { bounty_stage: { _neq: 0 }, private_fulfillments: { _neq: true } }
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

const createFulfillmentCommentMutation = gql`
  mutation createFulfillmentComment($userId: Int, $comment: String, $timestamp: timestamptz, $submissionId: Int) {
    insert_std_bounties_fulfillment_comments(
      objects: {
        std_bounties_comment: { data: { text: $comment, user_id: $userId, created: $timestamp, modified: $timestamp } }
        fulfillment_id: $submissionId
      }
    ) {
      returning {
        comment_id
        id
        fulfillment_id
        std_bounties_comment {
          text
        }
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
  const [createFulfillmentComment] = useMutation<createFulfillmentComment, createFulfillmentCommentVariables>(
    createFulfillmentCommentMutation
  );

  if (error) {
    console.error(error);
    return <div>{JSON.stringify(error, null)}</div>;
  }
  if (data) {
    const submissions = data?.std_bounties_fulfillment;
    const user = data && Array.isArray( data.user_user ) && data.user_user.length ? data.user_user[0] : { id: -1, small_profile_image_url: undefined }

    if (Array.isArray(submissions) && submissions.length) {
      return (
        <div sx={{ "> :not(:last-of-type)": { mb: 5 } }}>
          {submissions.map((submission, index) => {

            return (
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
                    address={props.address}
                    userImg={user['small_profile_image_url']}
                    avatar={{
                      name: submission.user_user?.name,
                      address: String(submission.user_user?.public_address),
                      img: String(submission.user_user?.small_profile_image_url),
                      src: `/profile/${address}`,
                      onDark: false,
                      size: "medium"
                    }}
                    handleSubmit={console.log}
                    content={converter.makeHtml(submission.description)}
                    timestamp={submission.modified}
                    attachments={[]} //TODO:
                    commentSubmitHandler={async (comment: string, callback: any) => {
                      try {
                        const userId = user?.id
                        if (userId === -1) {
                          throw new Error('No user id found or user is not logged in')
                        }

                        await createFulfillmentComment({
                          refetchQueries: [{ query: userProfileSubmissionsQuery, variables: { address } }],
                          variables: {
                            userId,
                            comment,
                            timestamp: moment.utc(),
                            submissionId: submission.id
                          }
                        });
                        callback && callback();
                      } catch (err) {
                        console.error(err);
                      }
                    }}
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
            );
          })}
        </div>
      );
    }
    return <div>This user has no submissions</div>;
  }
  return <LoadingIcon></LoadingIcon>;
};

export default Submissions;

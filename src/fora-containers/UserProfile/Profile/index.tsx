/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Flex, Text, Link } from "@theme-ui/components";
import gql from "graphql-tag";
import LoadingIcon from "assets/loading";
import AvatarImage from "fora-components/AvatarImage";
import Pill from "fora-components/Pill";
import { shortenAddress } from "utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faComments, faGlobe, faClipboard } from "@fortawesome/pro-regular-svg-icons";
import { faTwitter, faGithub, faDribbble, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useQuery } from "@apollo/react-hooks";
import { userProfileVariables, userProfile } from "./__generated__/userProfile";

const userProfileQuery = gql`
  query userProfile($address: String!) {
    user_user(limit: 1, where: { public_address: { _eq: $address } }) {
      id
      name
      public_address
      large_profile_image_url
      twitter
      github
      dribble
      linkedin
      website
      organization
      user_user_skills {
        user_skill {
          name
        }
      }
      user_user_languages {
        user_language {
          name
        }
      }
    }
  }
`;

const SkillPill = ({ category }) => (
  <Pill shape="square" variant="tag.explorer">
    <Text color={"brandGray.400"} variant="body">
      {category}
    </Text>
  </Pill>
);

const ElsewhereLink = ({ icon, href, linkText }) => (
  <Flex sx={{ alignItems: "center", "> svg:first-of-type": { mr: 1 } }}>
    <FontAwesomeIcon sx={{ color: "brandGray.400" }} icon={icon}></FontAwesomeIcon>
    <Link href={href} variant="text.link">
      {linkText}
    </Link>
  </Flex>
);

const profileChildSpacing = {
  1: 5,
  2: 3,
  3: 4,
  4: 4,
  5: 1,
  6: 4,
  7: 4
};
const nthChild = (x: string) => `> *:nth-child(${x})`;
const profileChildSpacingStyles = Object.keys(profileChildSpacing).reduce((current, next) => {
  if (profileChildSpacing[next]) {
    const lol = {
      [nthChild(next)]: { mb: profileChildSpacing[next] }
    };
    return Object.assign(current, lol);
  }
  return current;
}, {});

const profileContainerStyle = {
  flexDirection: "column",
  mt: -75,
  ...profileChildSpacingStyles
};

interface IProps {
  address: string;
}
const Profile: React.FunctionComponent<IProps> = props => {
  const { address } = props;
  if (!address) {
    return <div>Need an address</div>;
  }
  const { data, error } = useQuery<userProfile, userProfileVariables>(userProfileQuery, { variables: { address } });

  if (error) {
    return <div>{JSON.stringify(error, null)}</div>;
  }
  if (data) {
    if (data?.user_user.length) {
      const user = data.user_user[0];
      return (
        <Flex sx={profileContainerStyle}>
          <AvatarImage
            size="large"
            src={user.large_profile_image_url}
            address={address}
            linkToProfile={false}
          />
          <Text variant="headingSerif" sx={{ fontSize: "h2" }}>
            {user.name}
          </Text>
          <Pill onClick={() => {}} width="160px" size="large" variant="address">
            <Flex sx={{ alignItems: "center", "> div:first-of-type": { mr: 3 } }}>
              <Text variant="body" color="brandPrimary.400">
                {shortenAddress(address)}
              </Text>
              <FontAwesomeIcon sx={{ color: "brandPrimary.400" }} icon={faClipboard}></FontAwesomeIcon>
            </Flex>
          </Pill>
          <Text variant="body">
            {/* user?.description */}
            Imagination is everything. Co-Founder & CMO of Bounties Network and fora at ConsenSys. Queen bee of the
            hive. You test me I sting you.
          </Text>

          {user.organization && (
            <Flex sx={{ "> svg:first-of-type": { mr: 2 }, alignItems: "center" }}>
              <FontAwesomeIcon sx={{ color: "brandGray.400" }} icon={faBriefcase}></FontAwesomeIcon>
              <Text variant="body" color="brandGray.400">
                {user.organization}
              </Text>
            </Flex>
          )}
          {user.user_user_languages.length && (
            <Flex sx={{ "> svg:first-of-type": { mr: 2 }, alignItems: "center" }}>
              <FontAwesomeIcon sx={{ color: "brandGray.400" }} icon={faComments}></FontAwesomeIcon>
              <Text variant="body" color="brandGray.400">
                {user.user_user_languages.map(({ user_language }) => user_language.name).join(", ")}
              </Text>
            </Flex>
          )}
          {user.user_user_skills.length && (
            <Flex sx={{ flexDirection: "column", "> div:first-of-type": { mb: 2 } }}>
              <Text variant="bodyStrong" sx={{ fontSize: "h5" }}>
                Skills
              </Text>
              <Flex sx={{ flexWrap: "wrap", minWidth: "250px", "> *:not(:last-of-type)": { mr: 1, mb: 1 } }}>
                {user.user_user_skills.map(skill => (
                  <SkillPill category={skill?.user_skill?.name}></SkillPill>
                ))}
              </Flex>
            </Flex>
          )}

          {(user.website || user.twitter || user.github || user.dribble || user.linkedin) && (
            <Flex sx={{ flexDirection: "column", "> div:first-of-type": { mb: 2 } }}>
              <Text variant="bodyStrong" sx={{ fontSize: "h5" }}>
                Elsewhere
              </Text>
              <Flex sx={{ flexDirection: "column", "> *:not(:last-of-type)": { mb: 2 } }}>
                {user.website && (
                  <ElsewhereLink icon={faGlobe} href={user.website} linkText={user.website}></ElsewhereLink>
                )}
                {user.twitter && (
                  <ElsewhereLink
                    icon={faTwitter}
                    href={`https://twitter.com/${user.twitter}`}
                    linkText={`@${user.twitter}`}
                  ></ElsewhereLink>
                )}
                {user.github && (
                  <ElsewhereLink
                    icon={faGithub}
                    href={`https://github.com/${user.github}`}
                    linkText={`@${user.github}`}
                  ></ElsewhereLink>
                )}
                {user.dribble && (
                  <ElsewhereLink
                    icon={faDribbble}
                    href={`https://dribbble.com/${user.dribble}`}
                    linkText={`@${user.dribble}`}
                  ></ElsewhereLink>
                )}
                {user.linkedin && (
                  <ElsewhereLink
                    icon={faLinkedin}
                    href={`https://www.linkedin.com/in/${user.linkedin}`}
                    linkText={`@${user.linkedin}`}
                  ></ElsewhereLink>
                )}
              </Flex>
            </Flex>
          )}
        </Flex>
      );
    }
  }
  return <LoadingIcon></LoadingIcon>;
};

export default Profile;

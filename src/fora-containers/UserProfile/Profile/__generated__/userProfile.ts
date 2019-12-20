/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userProfile
// ====================================================

export interface userProfile_user_user_user_user_skills_user_skill {
  __typename: "user_skill";
  name: string;
}

export interface userProfile_user_user_user_user_skills {
  __typename: "user_user_skills";
  /**
   * An object relationship
   */
  user_skill: userProfile_user_user_user_user_skills_user_skill;
}

export interface userProfile_user_user_user_user_languages_user_language {
  __typename: "user_language";
  name: string;
}

export interface userProfile_user_user_user_user_languages {
  __typename: "user_user_languages";
  /**
   * An object relationship
   */
  user_language: userProfile_user_user_user_user_languages_user_language;
}

export interface userProfile_user_user {
  __typename: "user_user";
  id: number;
  name: string;
  public_address: string;
  large_profile_image_url: string;
  twitter: string;
  github: string;
  dribble: string;
  linkedin: string;
  website: string;
  organization: string;
  /**
   * An array relationship
   */
  user_user_skills: userProfile_user_user_user_user_skills[];
  /**
   * An array relationship
   */
  user_user_languages: userProfile_user_user_user_user_languages[];
}

export interface userProfile {
  /**
   * fetch data from the table: "user_user"
   */
  user_user: userProfile_user_user[];
}

export interface userProfileVariables {
  address: string;
}

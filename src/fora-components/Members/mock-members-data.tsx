import moment from "moment";

const joinedTimestamp = moment()
  .subtract(2, "days")
  .toISOString();

export interface IMember {
  name: string;
  screenName: string;
  address: string;
  joinedTimestamp: number | string;
}

export const mockMembersData = [
  {
    name: "firstName LastName",
    screenName: "screenName",
    address: "0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67",
    joinedTimestamp
  },
  {
    name: "firstName LastName",
    screenName: "screenName",
    address: "0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67",
    joinedTimestamp
  },
  {
    name: "firstName LastName",
    screenName: "screenName",
    address: "0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67",
    joinedTimestamp
  },
  {
    name: "firstName LastName",
    screenName: "screenName",
    address: "0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67",
    joinedTimestamp
  },
  {
    name: "firstName LastName",
    screenName: "screenName",
    address: "0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67",
    joinedTimestamp
  },
  {
    name: "firstName LastName",
    screenName: "screenName",
    address: "0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67",
    joinedTimestamp
  },
  {
    name: "firstName LastName",
    screenName: "screenName",
    address: "0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67",
    joinedTimestamp
  },
  {
    name: "firstName LastName",
    screenName: "screenName",
    address: "0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67",
    joinedTimestamp
  },
  {
    name: "firstName LastName",
    screenName: "screenName",
    address: "0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67",
    joinedTimestamp
  },
  {
    name: "firstName LastName",
    screenName: "screenName",
    address: "0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67",
    joinedTimestamp
  }
];

export default mockMembersData;

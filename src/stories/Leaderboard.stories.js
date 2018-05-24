import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Leaderboard } from 'components';

let fakeLeaderboardData = [
  {
    address: '0x7056e70a5ca249ba88e9550eb22caec4c985bb8e',
    name: 'Simona Pop',
    email: 'cryptomental.com@gmail.com',
    githubusername: 'cryptomental',
    total: '2000870000000000000000',
    total_usd: 2724.0805,
    bounties_fulfilled: 7,
    fulfillments_accepted: 7
  },
  {
    address: '0x7b70fb24c64f8e72403d2262c6c29a343b44e810',
    name: '',
    email: 'tatattai@gmail.com',
    githubusername: 'bakaoh',
    total: '50677500000000000000000',
    total_usd: 2073.06865,
    bounties_fulfilled: 17,
    fulfillments_accepted: 17
  },
  {
    address: '0x807eabfd9e07dc2c70fce2c7563c05489cfde2fe',
    name: 'Kenneth Ashley',
    email: 'ken.u.diggitt@gmail.com',
    githubusername: 'KennethAshley',
    total: '1080000000000000000',
    total_usd: 948.3504,
    bounties_fulfilled: 9,
    fulfillments_accepted: 9
  },
  {
    address: '0x997d35b300ba1775fdb175df045252e57d6ea5b0',
    name: '',
    email: 'aditya.anandmc@gmail.com',
    githubusername: 'thelostone-mc',
    total: '1440000000000000020',
    total_usd: 917.623,
    bounties_fulfilled: 6,
    fulfillments_accepted: 6
  },
  {
    address: '0x7c017c47b0f88d2d28b997aa9721709d185c24af',
    name: '',
    email: 'hello@matthewlilley.com',
    githubusername: 'matthewlilley',
    total: '1000000000000000000',
    total_usd: 724.7,
    bounties_fulfilled: 1,
    fulfillments_accepted: 1
  },
  {
    address: '0xed628e601012cc6fd57dc0cede2a527cdc86a221',
    name: '',
    email: 'os.aioria@gmail.com',
    githubusername: 'zoek1',
    total: '870000000000000000',
    total_usd: 558.8105,
    bounties_fulfilled: 7,
    fulfillments_accepted: 7
  },
  {
    address: '0x0926b6653f2f000ad4e30eedb74ccfede1151c5b',
    name: 'Steven Pearce',
    email: 'stevenjnpearce@gmail.com',
    githubusername: 'StevenJNPearce',
    total: '700000000000000000',
    total_usd: 492.345,
    bounties_fulfilled: 1,
    fulfillments_accepted: 1
  },
  {
    address: '0x39865d370a5ddc4c29e32ac3a8d6902cf2632852',
    name: 'Alex',
    email: 'alex@wallsticker.ro',
    githubusername: '',
    total: '700000000000000000',
    total_usd: 465.33,
    bounties_fulfilled: 4,
    fulfillments_accepted: 4
  },
  {
    address: '0x70b29a838d44232ad8f0327dd4b988aec60be553',
    name: 'Dimitrios Kouzis-Loukas',
    email: 'lookfwd@gmail.com',
    githubusername: 'lookfwd',
    total: '700000000000000000',
    total_usd: 450.891,
    bounties_fulfilled: 1,
    fulfillments_accepted: 1
  },
  {
    address: '0xdd65d3c3dbd3d0a6f0e239885eba93b60df772ba',
    name: '',
    email: 'vgrana@uabc.edu.mx',
    githubusername: 'Grana69',
    total: '600000000000000000',
    total_usd: 435.793,
    bounties_fulfilled: 2,
    fulfillments_accepted: 2
  }
];

storiesOf('Leaderboard', module).add('Leaderboard', () => (
  <div>
    <Leaderboard leaderboardData={fakeLeaderboardData} />
  </div>
));

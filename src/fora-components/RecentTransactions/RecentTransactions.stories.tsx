/** @jsx jsx */
import { jsx } from "theme-ui";
import { storiesOf, addDecorator } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import RecentTransactions from ".";
import moment from "moment";

addDecorator(centered);

const mockTransactionsData = [
  {
    transactionHash: 'abcdefesfoifsd5748',
    from: '6dhf73ndfoifsd5748', to: '6dhf73ndfoifsd5748', timestamp: moment().subtract('15', 'minutes'), status: 'processing', ethUSDAmount: '435', ethAmount: '0.5'
  },
  {
    transactionHash: 'bcddfoigfoifsd5748',
    from: '6dhf73ndfoifsd5748', to: '6dhf73ndfoifsd5748', timestamp: moment().subtract('15', 'hours'), status: 'confirmed', ethUSDAmount: '435', ethAmount: '0.5'
  },
  {
    transactionHash: 'cddsgfgdffoifsd5748',
    from: '6dhf73ndfoifsd5748', to: '6dhf73ndfoifsd5748', timestamp: moment().subtract('15', 'days'), status: 'failed', ethUSDAmount: '435', ethAmount: '0.5'
  },
  {
    transactionHash: 'dsjffsodffoifsd5748',
    from: '6dhf73ndfoifsd5748', to: '6dhf73ndfoifsd5748', timestamp: moment().subtract('15', 'seconds'), status: 'processing', ethUSDAmount: '435', ethAmount: '0.5'
  }
]

storiesOf("RecentTransactions", module).add("Mi Fora", () => {
  return (
    <div sx={{ minWidth: "70vw" }}>
      <RecentTransactions
        totalTransactionCount={20}
        transactions={mockTransactionsData}
      />
    </div>
  );
});

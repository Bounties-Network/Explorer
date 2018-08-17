import React from "react";
import styles from "./IssueRatingFormModal.module.scss";
import { Text } from "components";
import { FulfillmentStagePill } from "explorer-components";

const BountyDetails = props => {
  const { bounty } = props;

  return (
    <div className={styles.bountyInfoContainer}>
      <div className={`row ${styles.centerColumn}`}>
        <div className="col-xs-10">
          <div className={styles.bountyInfo}>
            <FulfillmentStagePill className={styles.pill} accepted={true} />
            <div className={`${styles.rowText} ${styles.detailsGroup}`}>
              <Text inline typeScale="h5" weight="fontWeight-medium">
                {bounty.title}
              </Text>
              <Text
                inline
                color="purple"
                typeScale="h5"
                weight="fontWeight-medium"
                className={styles.usd}
              >
                ${bounty.usd_price.toFixed(0)}
              </Text>
            </div>
            <div className={styles.rowText}>
              <Text
                inline
                typeScale="Small"
                color="defaultGrey"
                className={styles.details}
              >
                {"Created bleh"}
              </Text>
              <Text
                inline
                color="defaultGrey"
                typeScale="Small"
                className={styles.usd}
              >
                {"500 ETH"}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BountyDetails;

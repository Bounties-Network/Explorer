import React from 'react';
import PropTypes from 'prop-types';
import { FetchComponent, LoadComponent } from 'hocs';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './ViewBounty.module.scss';
import { actions, sagas, selectors } from 'public-modules';
import moment from 'moment';
import Remarkable from 'remarkable';

import { EthContainer, Text, Chip, ProfileBar, Button, Tabs } from 'components';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPencil from '@fortawesome/fontawesome-pro-light/faPencil';
import faCalendar from '@fortawesome/fontawesome-pro-light/faCalendar';
import faUser from '@fortawesome/fontawesome-pro-light/faUser';
import faDollarSign from '@fortawesome/fontawesome-pro-light/faDollarSign';

const { authStateSelector, rootAuthSelector, rootBountySelector } = selectors;

let md = new Remarkable();

const tabsData = [
  { title: 'Submissions', notificationAmount: 1, active: true },
  { title: 'Comments', notificationAmount: 4 }
];

class ViewBounty extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.renderChips = this.renderChips.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
    this.renderMarkdownHTML = this.renderMarkdownHTML.bind(this);
    this.renderStatusChip = this.renderStatusChip.bind(this);
  }

  // componentWillMount() {
  //   let { loadBounty } = this.props;
  //   let bountyID = this.props.match.params.bounty;
  //   loadBounty(bountyID);
  // }

  renderStatusChip(status) {
    // 0:draft, 1:active, 2: completed, 3: expired, 4: dead
    if (status === 0) {
      return <Chip color="green">Draft</Chip>;
    }
    if (status === 1) {
      return <Chip color="green">Active</Chip>;
    }
    if (status === 2) {
      return <Chip color="green">Completed</Chip>;
    }
    if (status === 3) {
      return <Chip color="green">Expired</Chip>;
    }
    if (status === 4) {
      return <Chip color="green">Dead</Chip>;
    }
  }

  renderChips(categories) {
    return categories.map((elem, idx) => (
      <div className={`${styles.chip}`} key={'chip' + idx}>
        <Chip>{elem.name}</Chip>
      </div>
    ));
  }

  renderButtons(situation) {
    if (situation === 'draft') {
      return (
        <div className={`${styles.buttonSet}`}>
          <Button style="activate" className={`${styles.mainButton}`}>
            Activate Bounty
          </Button>
          <Button style="secondary" className={`${styles.otherButton}`}>
            <FontAwesomeIcon
              className={`${styles.buttonIcon}`}
              icon={faPencil}
            />Edit Bounty Details
          </Button>
          <Button style="secondary" className={`${styles.otherButton}`}>
            <FontAwesomeIcon
              className={`${styles.buttonIcon}`}
              icon={faCalendar}
            />Change Deadline
          </Button>
          <Button style="secondary" className={`${styles.otherButton}`}>
            <FontAwesomeIcon className={`${styles.buttonIcon}`} icon={faUser} />Transfer
            Ownership
          </Button>
          <Button style="secondary" className={`${styles.otherButton}`}>
            <FontAwesomeIcon
              className={`${styles.buttonIcon}`}
              icon={faDollarSign}
            />Change Prize
          </Button>
        </div>
      );
    } else if (situation === 'issuer') {
      return (
        <div className={`${styles.buttonSet}`}>
          <Button style="destructive" className={`${styles.mainButton}`}>
            Kill Bounty
          </Button>
          <Button style="secondary" className={`${styles.otherButton}`}>
            <FontAwesomeIcon
              className={`${styles.buttonIcon}`}
              icon={faCalendar}
            />Change Deadline
          </Button>
          <Button style="secondary" className={`${styles.otherButton}`}>
            <FontAwesomeIcon className={`${styles.buttonIcon}`} icon={faUser} />Transfer
            Ownership
          </Button>
          <Button style="secondary" className={`${styles.otherButton}`}>
            <FontAwesomeIcon
              className={`${styles.buttonIcon}`}
              icon={faDollarSign}
            />Change Prize
          </Button>
        </div>
      );
    } else if (situation === 'fulfiller') {
      return (
        <div className={`${styles.buttonSet}`}>
          <Button style="activate" className={`${styles.otherButton}`}>
            Fulfill Bounty
          </Button>
          <Button style="secondary" className={`${styles.otherButton}`}>
            <FontAwesomeIcon
              className={`${styles.buttonIcon}`}
              icon={faDollarSign}
            />Contribute To Bounty
          </Button>
        </div>
      );
    }
  }

  renderMarkdownHTML(markdown) {
    return <div dangerouslySetInnerHTML={{ __html: markdown }} />;
  }

  render() {
    const { loading, error, bounty, situation = 'fulfiller' } = this.props;
    const {
      tokenSymbol,
      usd_price,
      calculated_balance,
      title,
      categories = [],
      issuer,
      description,
      issuer_email,
      deadline,
      experienceLevel,
      associatedFile = '',
      webReferenceURL,
      bountyStage
    } = bounty;
    console.log(bounty);

    return (
      <div className={`${styles.viewBountyPage}`}>
        <div className={`${styles.topBanner}`} />
        <div className={`${styles.body} `}>
          <div className={`${styles.header} row`}>
            <EthContainer
              className={`${styles.headerEth} col-md-1`}
              currency={tokenSymbol}
              usd={Number(usd_price).toFixed(2)}
              eth={Number(calculated_balance).toFixed(2)}
            />
            <div className={`${styles.headerText} col-md-10`}>
              <Text style="H2" color="white">
                {title}
              </Text>
              <div className={`${styles.chipBar}`}>
                {this.renderChips(categories)}
              </div>
              <ProfileBar public_address={issuer} />
            </div>
            <div className={`col-md-1`}>
              {this.renderStatusChip(bountyStage)}
            </div>
          </div>
          <div className={`${styles.bountyBody} row`}>
            <div className={`${styles.bountyButtonsColumn} col-md-3`}>
              {this.renderButtons('fulfiller')}
              <div className={`${styles.bountyButtonsColumnInfo}`}>
                <div className={`${styles.infoCell}`}>
                  <Text style="FormLabel">Total Balance</Text>
                  <Text
                    style="BodySmall"
                    className={`${styles.infoCellText}`}
                  >{`${Number(calculated_balance).toFixed(
                    2
                  )} ${tokenSymbol}`}</Text>
                </div>
                <div className={`${styles.infoCell}`}>
                  <Text style="FormLabel">Issuer Contact</Text>
                  <Text style="BodySmall" className={`${styles.infoCellText}`}>
                    {issuer_email}
                  </Text>
                </div>
                <div className={`${styles.infoCell}`}>
                  <Text style="FormLabel">Deadline</Text>
                  <Text style="BodySmall" className={`${styles.infoCellText}`}>
                    {moment(deadline)
                      .endOf('day')
                      .fromNow(true)}
                  </Text>
                </div>
                {experienceLevel && (
                  <div className={`${styles.infoCell}`}>
                    <Text style="FormLabel">Difficulty</Text>
                    <Text
                      style="BodySmall"
                      className={`${styles.infoCellText}`}
                    >
                      {experienceLevel}
                    </Text>
                  </div>
                )}
                {associatedFile && (
                  <div className={`${styles.infoCell}`}>
                    <Text style="FormLabel">Associated File</Text>
                    <Text
                      style="BodySmall"
                      className={`${styles.infoCellText}`}
                    >
                      {associatedFile}
                    </Text>
                  </div>
                )}
                <div className={`${styles.infoCell}`}>
                  <Text style="FormLabel">Link</Text>
                  <Text style="BodySmall" className={`${styles.infoCellText}`}>
                    {webReferenceURL}
                  </Text>
                </div>
              </div>
            </div>
            <div className={`${styles.bountyText} col-md-9`}>
              {this.renderMarkdownHTML(md.render(description))}
            </div>
          </div>
          {situation !== 'draft' ? (
            <div className={`${styles.submissions} row`}>
              <div className={`${styles.tabRow} col-sm-12`}>
                <Tabs tabs={tabsData} onClick={e => console.log(e)} />
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, router) => {
  let status = rootAuthSelector(state);
  let bounty = rootBountySelector(state);
  let bountyId = router.match.params.bounty;

  return {
    bountyId: bountyId,
    bounty: bounty.currentBounty,
    status: status.status,
    loginStatus: status.loginStatus,
    ...authStateSelector(state)
  };
};

ViewBounty.propTypes = {
  load: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool
};

const check = compose(
  FetchComponent(sagas.fetch),
  connect(mapStateToProps, { load: actions.loadBounty, ...actions }),
  LoadComponent('bountyId')
)(ViewBounty);

export default check;

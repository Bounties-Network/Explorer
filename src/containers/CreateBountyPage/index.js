import React from 'react';
import PropTypes from 'prop-types';
import { FetchComponent, LoadComponent } from 'hocs';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions, sagas, selectors } from 'public-modules';
import styles from './CreateBountyPage.module.scss';

import {
  Text,
  TextInput,
  Textbox,
  DropdownSearch,
  NumberInput,
  DatePicker,
  RadioGroup,
  Button
} from 'components';

const { categoriesSelector, rootCategoriesSelector } = selectors;

class CreateBountyPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { loading, error, categories } = this.props;
    if (error) {
      return <div>error...</div>;
    }

    return (
      <div className={`${styles.createNewBounty}`}>
        <div className={`${styles.createNewBountyHeader}`}>
          <Text style="H1" color="white">
            New Bounty
          </Text>
        </div>
        <div className={`${styles.createNewBountyBody}`}>
          <div className={`${styles.formSection} row`}>
            <div className={`col-sm-4 ${styles.detailHeader}`}>
              <Text style="H4" color="grey">
                ABOUT
              </Text>
            </div>
            <div className={`col-lg-8 ${styles.detailBody}`}>
              <div className={`${styles.subsectionHeader}`}>
                <Text className={`${styles.subsectionHeaderText}`} style="H4">
                  Enter your details about this bounty.
                </Text>
                <Text style="BodySmall" color="grey">
                  Enter a text and description for your bounty. A markdown
                  preview will automatically be generated as you type.
                </Text>
              </div>
              <div className={`${styles.bountyTitle}`}>
                <Text style="FormLabel" color="grey">
                  Title
                </Text>
                <TextInput className={`${styles.textInput}`} />
              </div>
              <div className={`${styles.bountyTitle}`}>
                <Text style="FormLabel" color="grey">
                  Description
                </Text>
                <Textbox className={`${styles.textBox}`} />
              </div>
            </div>
          </div>
          <div className={`${styles.formSection} row`}>
            <div className={`col-sm-4 ${styles.detailHeader}`}>
              <Text style="H4" color="grey">
                CONTACT
              </Text>
            </div>
            <div className={`col-lg-8 ${styles.detailBody}`}>
              <div className={`${styles.subsectionHeader}`}>
                <Text className={`${styles.subsectionHeaderText}`} style="H4">
                  Who will be the primary contact for bounty questions and
                  submissions?
                </Text>
              </div>
              <div className={`${styles.contactArea}`}>
                <div className={`${styles.contactInputArea}`}>
                  <Text style="FormLabel" color="grey">
                    Contact Name
                  </Text>
                  <TextInput />
                </div>
                <div className={`${styles.contactInputArea}`}>
                  <Text style="FormLabel" color="grey">
                    Contact Email
                  </Text>
                  <TextInput />
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.formSection} row`}>
            <div className={`col-sm-4 ${styles.detailHeader}`}>
              <Text style="H4" color="grey">
                DETAILS
              </Text>
            </div>
            <div className={`col-lg-8 ${styles.detailBody}`}>
              <div className={`${styles.subsectionHeader}`}>
                <Text className={`${styles.subsectionHeaderText}`} style="H4">
                  How should this bounty be classified?
                </Text>
                <Text style="BodySmall" color="grey">
                  Enter the categories and difficulty level for the bounty.
                  Since difficulty can be fairly subjective, it is helpful to
                  provide more details around required experience within your
                  bounty description.
                </Text>
              </div>
              <div className={`${styles.contactArea}`}>
                <div className={`${styles.contactInputArea}`}>
                  <Text style="FormLabel" color="grey">
                    Bounty Category
                  </Text>
                  <DropdownSearch
                    className={`${styles.content}`}
                    options={categories}
                    placeholder="e.g. HTML"
                  />
                </div>
                <div className={`${styles.contactInputArea}`}>
                  <Text style="FormLabel" color="grey">
                    Difficulty
                  </Text>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.formSection} row`}>
            <div className={`col-sm-4 ${styles.detailHeader}`}>
              <Text style="H4" color="grey">
                REVISIONS
              </Text>
            </div>
            <div className={`col-lg-8 ${styles.detailBody}`}>
              <div className={`${styles.subsectionHeader}`}>
                <Text className={`${styles.subsectionHeaderText}`} style="H4">
                  Will you require revisions?
                </Text>
                <Text style="BodySmall" color="grey">
                  Enter the maximum number of revisions you may require for this
                  task, in order to help set expectations for the contributors.
                </Text>
              </div>
              <div className={`${styles.contactArea}`}>
                <NumberInput />
              </div>
            </div>
          </div>
          <div className={`${styles.formSection} row`}>
            <div className={`col-sm-4 ${styles.detailHeader}`}>
              <Text style="H4" color="grey">
                ATTACHMENTS
              </Text>
            </div>
            <div className={`col-lg-8 ${styles.detailBody}`}>
              <div className={`${styles.subsectionHeader}`}>
                <Text className={`${styles.subsectionHeaderText}`} style="H4">
                  Does the bounty require any external assets for completion?
                </Text>
                <Text style="BodySmall" color="grey">
                  Attach any files or links that may be helpful as references or
                  necessary for a contributor to complete the bounty.
                </Text>
              </div>
              <div className={`${styles.contactArea}`}>
                <div className={`${styles.contactInputArea}`}>
                  <Text style="FormLabel" color="grey">
                    Web Link
                  </Text>
                  <TextInput />
                </div>
                <div className={`${styles.contactInputArea}`}>
                  <Text style="FormLabel" color="grey">
                    Associated Files
                  </Text>
                  <TextInput />
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.formSection} row`}>
            <div className={`col-sm-4 ${styles.detailHeader}`}>
              <Text style="H4" color="grey">
                DEADLINE
              </Text>
            </div>
            <div className={`col-lg-8 ${styles.detailBody}`}>
              <div className={`${styles.subsectionHeader}`}>
                <Text className={`${styles.subsectionHeaderText}`} style="H4">
                  When will this bounty be due?
                </Text>
                <Text style="BodySmall" color="grey">
                  Enter the date and time for this bounty's deadline.
                </Text>
              </div>
              <div className={`${styles.contactArea}`}>
                <div className={`${styles.contactInputArea}`}>
                  <DatePicker />
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.formSection} row`}>
            <div className={`col-sm-4 ${styles.detailHeader}`}>
              <Text style="H4" color="grey">
                PAYOUT
              </Text>
            </div>
            <div className={`col-lg-8 ${styles.detailBody}`}>
              <div className={`${styles.subsectionHeader}`}>
                <Text className={`${styles.subsectionHeaderText}`} style="H4">
                  Select payout method and amount.
                </Text>
                <Text style="BodySmall" color="grey">
                  Select the token and enter the amount you will award for
                  completion of this bounty.
                </Text>
              </div>
              <div className={`${styles.contactArea}`}>
                <div className={`${styles.contactInputArea}`}>
                  <Text style="FormLabel" color="grey">
                    Payout Method
                  </Text>
                  <RadioGroup
                    options={['ETH', 'ERC20 Token']}
                    className={`${styles.content}`}
                  />
                </div>
                <div className={`${styles.contactInputArea}`}>
                  <Text style="FormLabel" color="grey">
                    Payout Amount (ETH or whole tokens)
                  </Text>
                  <TextInput className={`${styles.content}`} />
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.formSection} row`}>
            <div className={`col-sm-4 ${styles.detailHeader}`}>
              <Text style="H4" color="grey">
                SAVE OR SUBMIT
              </Text>
            </div>
            <div className={`col-lg-8 ${styles.detailBody}`}>
              <div className={`${styles.subsectionHeader}`}>
                <Text className={`${styles.subsectionHeaderText}`} style="H4">
                  When would you like to submit and activate the bounty?
                </Text>
                <Text style="BodySmall" color="grey">
                  If you wish to activate the bounty later, you can save it as a
                  draft. The requirements for a bounty can only be edited while
                  it is in the draft stage.
                </Text>
              </div>
              <div className={`${styles.contactArea}`}>
                <div className={`${styles.contactInputArea}`}>
                  <Text style="FormLabel" color="grey">
                    Payout Method
                  </Text>
                  <RadioGroup
                    options={['Now', 'Later']}
                    className={`${styles.content}`}
                  />
                </div>
                <div className={`${styles.contactInputArea}`}>
                  <Text style="FormLabel" color="grey">
                    Payout Amount (ETH or whole tokens)
                  </Text>
                  <TextInput className={`${styles.content}`} />
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.buttonBar}`}>
            <div className={`${styles.buttons}`}>
              <Button size="large" style="secondary">
                Cancel
              </Button>
              <Button size="large" style="primary">
                Create Bounty
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, router) => {
  let categoriesState = rootCategoriesSelector(state);

  return {
    categories: categoriesState.categories,
    ...categoriesSelector(state)
  };
};

CreateBountyPage.propTypes = {
  load: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool
};

const check = compose(
  FetchComponent(sagas.fetch),
  connect(
    mapStateToProps,
    { load: actions.loadCategories, ...actions }
  ),
  LoadComponent('')
)(CreateBountyPage);

export default check;

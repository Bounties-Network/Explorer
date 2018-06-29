import React from 'react';
import PropTypes from 'prop-types';
import { FetchComponent, LoadComponent } from 'hocs';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions, sagas, selectors } from 'public-modules';
import styles from './AccountSettings.module.scss';

import {
  Text,
  TextInput,
  DropdownSearch,
  Button,
  Circle,
  DescriptionToggle,
  FileUpload
} from 'components';

const { categoriesSelector, rootCategoriesSelector } = selectors;

class AccountSettings extends React.Component {
  constructor(props) {
    super(props);

    this.uploadFile = this.uploadFile.bind(this);
  }

  uploadFile(file) {
    const { uploadFile } = this.props;

    let reader = new window.FileReader();
    reader.onloadend = () => uploadFile(file.name, reader);
    reader.readAsArrayBuffer(file);
  }

  render() {
    const { loading, error, categories } = this.props;
    if (error) {
      return <div>error...</div>;
    }

    return (
      <div className={`${styles.accountSettings}`}>
        <div className="container-fluid">
          <div className="row center-xs middle-xs">
            <div className="col-xs">
              <div className={`${styles.accountSettingsHeader}`}>
                <Text style="H1" color="white">
                  Account Settings
                </Text>
              </div>
            </div>
          </div>
          <div className="row center-xs">
            <div className="col-xs-8">
              <div className={`${styles.accountSettingsBody}`}>
                <div className={`${styles.formSection} row`}>
                  <div className={`col-xs-4 ${styles.detailHeader}`}>
                    <Text style="H4" color="grey">
                      PROFILE PHOTO
                    </Text>
                  </div>
                  <div className={`col-xs-8 ${styles.detailBody}`}>
                    <div className={`${styles.profileHeaderBar}`}>
                      <Circle
                        size="small"
                        type="image"
                        input="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                      />
                      <FileUpload onChange={e => this.uploadFile(e)} />
                      <Button style="deleteLink">Delete</Button>
                    </div>
                  </div>
                </div>
                <div className={`${styles.formSection} row`}>
                  <div className={`col-xs-4 ${styles.detailHeader}`}>
                    <Text style="H4" color="grey">
                      ABOUT
                    </Text>
                  </div>
                  <div className={`col-xs-8 ${styles.detailBody}`}>
                    <div className={`${styles.subsectionHeader}`}>
                      <div className={`${styles.subsectionHeaderText}`}>
                        <Text style="H4">
                          What would you like people to know about you?
                        </Text>
                      </div>
                      <div>
                        <Text style="BodySmall" color="grey">
                          Enter some of your personal details so that the
                          community can get to know you.
                        </Text>
                      </div>
                    </div>
                    <div className={`${styles.contactArea}`}>
                      <div className={`${styles.contactInputArea}`}>
                        <Text style="FormLabel" color="grey">
                          Name
                        </Text>
                        <TextInput />

                        <Text
                          className={`${styles.secondRow}`}
                          style="FormLabel"
                          color="grey"
                        >
                          Languages Spoken
                        </Text>
                        <TextInput />
                      </div>
                      <div className={`${styles.contactInputArea}`}>
                        <Text style="FormLabel" color="grey">
                          Organization
                        </Text>
                        <TextInput />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${styles.formSection} row`}>
                  <div className={`col-xs-4 ${styles.detailHeader}`}>
                    <Text style="H4" color="grey">
                      Skills
                    </Text>
                  </div>
                  <div className={`col-xs-8 ${styles.detailBody}`}>
                    <div className={`${styles.subsectionHeader}`}>
                      <div className={`${styles.subsectionHeaderText}`}>
                        <Text style="H4">
                          What are some of your professional or technical
                          skills?
                        </Text>
                      </div>
                      <div>
                        <Text style="BodySmall" color="grey">
                          Enter or select the skills for which you are
                          proficient. This will help others on the network be
                          confident in your ability to fulfill certain types of
                          bounties.
                        </Text>
                      </div>
                    </div>
                    <div className={`${styles.contactArea}`}>
                      <div className={`${styles.dropdown}`}>
                        <DropdownSearch options={categories} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${styles.formSection} row`}>
                  <div className={`col-xs-4 ${styles.detailHeader}`}>
                    <Text style="H4" color="grey">
                      Social
                    </Text>
                  </div>
                  <div className={`col-xs-8 ${styles.detailBody}`}>
                    <div className={`${styles.subsectionHeader}`}>
                      <div className={`${styles.subsectionHeaderText}`}>
                        <Text style="H4">
                          Do you have other social profiles you would like
                          displayed?
                        </Text>
                      </div>
                    </div>
                    <div className={`${styles.contactArea}`}>
                      <div className={`${styles.contactInputArea}`}>
                        <Text style="FormLabel" color="grey">
                          Personal Website
                        </Text>
                        <TextInput />

                        <Text
                          className={`${styles.secondRow}`}
                          style="FormLabel"
                          color="grey"
                        >
                          Github
                        </Text>
                        <TextInput />
                      </div>
                      <div className={`${styles.contactInputArea}`}>
                        <Text style="FormLabel" color="grey">
                          Twitter
                        </Text>
                        <TextInput />

                        <Text
                          className={`${styles.secondRow}`}
                          style="FormLabel"
                          color="grey"
                        >
                          LinkedIn
                        </Text>
                        <TextInput />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${styles.formSection} row`}>
                  <div className={`col-xs-4 ${styles.detailHeader}`}>
                    <Text style="H4" color="grey">
                      EMAIL NOTIFICATIONS
                    </Text>
                  </div>
                  <div className={`col-xs-8 ${styles.detailBody}`}>
                    <div className={`${styles.subsectionHeader}`}>
                      <div className={`${styles.subsectionHeaderText}`}>
                        <Text style="H4">
                          Which notifications would you like to receive via
                          email?
                        </Text>
                      </div>
                      <div>
                        <Text style="BodySmall" color="grey">
                          Opt in or out of the notifications you wish to receive
                          via email. We recommend sticking with the default
                          settings so that you can be informed of important
                          activity relevant to you on the network.
                        </Text>
                      </div>
                    </div>
                    <div className={`${styles.contactArea}`}>
                      <div className={`${styles.descriptionToggleArea}`}>
                        <DescriptionToggle
                          default={true}
                          className={`${styles.descriptionToggle}`}
                        >
                          This is a description of an email notification.
                        </DescriptionToggle>
                        <DescriptionToggle
                          className={`${styles.descriptionToggle}`}
                        >
                          This is a description of an email notification.
                        </DescriptionToggle>
                        <DescriptionToggle
                          default={true}
                          className={`${styles.descriptionToggle}`}
                        >
                          This is a description of an email notification.
                        </DescriptionToggle>
                        <DescriptionToggle
                          className={`${styles.descriptionToggle}`}
                        >
                          This is a description of an email notification.
                        </DescriptionToggle>
                        <DescriptionToggle
                          className={`${styles.descriptionToggle}`}
                        >
                          This is a description of an email notification.
                        </DescriptionToggle>
                        <DescriptionToggle
                          default={true}
                          className={`${styles.descriptionToggle}`}
                        >
                          This is a description of an email notification.
                        </DescriptionToggle>
                        <DescriptionToggle
                          default={true}
                          className={`${styles.descriptionToggle}`}
                        >
                          This is a description of an email notification.
                        </DescriptionToggle>
                        <DescriptionToggle
                          className={`${styles.descriptionToggle}`}
                        >
                          This is a description of an email notification.
                        </DescriptionToggle>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${styles.buttonBar}`}>
                  <Button size="large" style="primary">
                    Update Profile
                  </Button>
                </div>
              </div>
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

AccountSettings.propTypes = {
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
)(AccountSettings);

export default check;

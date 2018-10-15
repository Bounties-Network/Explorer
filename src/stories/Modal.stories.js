import React from 'react';

import { storiesOf } from '@storybook/react';

import { Modal, Button, Text } from 'components';

class ModalDemo extends React.Component {
  state = {
    modal: null
  };

  openModal = name => {
    this.setState({ modal: name });
  };

  hideModal = () => {
    this.setState({ modal: null });
  };

  render() {
    return (
      <div class="sb-page-wrapper">
        <Text
          className={'sb-component-group-heading'}
          typeScale="h1"
          color="purple"
          weight="fontWeight-bold"
        >
          Modal
        </Text>

        <Text
          className={'sb-component-group-description'}
          typeScale="Body"
          lineHeight="lineHeight-default"
        >
          Modal components allow you to display a dialog box on top of your
          content
        </Text>

        <Text
          className={'sb-component-group-subheading'}
          typeScale="h3"
          weight="fontWeight-bold"
        >
          Regular Modal
        </Text>

        <Text
          className={'sb-component-group-description'}
          typeScale="Body"
          lineHeight="lineHeight-default"
        >
          A regular Modal is composed by a <code>Modal</code> component, with 3
          main subcomponents inside: <br />
          <br />
          A <code>Modal.Header</code> element which determines the title using{' '}
          <code>Modal.Heading</code> and a <code>Modal.Description</code>{' '}
          element that determines the description.
          <br />
          <br />
          A <code>Modal.Body</code> element with the HTML for the modal body.
          <br />
          <br />
          A <code>Modal.Footer</code> element with the HTML for the modal
          footer.
        </Text>

        <div class="sb-component-group sb-button-group">
          <Button
            onClick={() => {
              this.openModal('original');
            }}
          >
            Regular modal
          </Button>
          <Modal
            onClose={this.hideModal}
            visible={this.state.modal === 'original'}
          >
            <Modal.Header>
              <Modal.Heading>I am a modal heading</Modal.Heading>
              <Modal.Description>I am a modal description</Modal.Description>
            </Modal.Header>
            <Modal.Body>
              <Text typeScale="Body">I am some text within a modal body.</Text>
            </Modal.Body>
            <Modal.Footer>
              <span style={{ marginRight: '1em' }}>
                <Button onClick={this.hideModal}>Cancel</Button>
              </span>
              <Button type="primary">Submit</Button>
            </Modal.Footer>
          </Modal>
        </div>

        <Text
          className={'sb-component-group-subheading'}
          typeScale="h3"
          weight="fontWeight-bold"
        >
          Modal properties
        </Text>

        <Text
          className={'sb-component-group-description'}
          typeScale="Body"
          lineHeight="lineHeight-default"
        >
          The <code>Modal</code> element accepts the following props: <br />
          <br />
          The <code>visible</code> prop determines whether the modal is open or
          not. This can be handled using your component state. <br />
          <br />
          The <code>dismissable</code> prop determines if the modal can be
          closed by clicking outside of it. The default value is{' '}
          <code>false</code>.
        </Text>

        <div class="sb-component-group sb-button-group">
          <Button
            onClick={() => {
              this.openModal('dismissable');
            }}
          >
            Dismissable modal
          </Button>
          <Modal
            onClose={this.hideModal}
            visible={this.state.modal === 'dismissable'}
            dismissable
          >
            <Modal.Header>
              <Modal.Heading>I am a dismissable modal</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <Text typeScale="Body">You can click outside to close me.</Text>
            </Modal.Body>
            <Modal.Footer>
              <span style={{ marginRight: '1em' }}>
                <Button onClick={this.hideModal}>Cancel</Button>
              </span>
            </Modal.Footer>
          </Modal>
        </div>

        <Text
          className={'sb-component-group-description'}
          typeScale="Body"
          lineHeight="lineHeight-default"
        >
          The <code>loading</code> prop determines if this is a loading modal.
          The prop <code>loadingIcon</code> must be passed to the{' '}
          <code>Modal.Header</code> element.
        </Text>

        <div class="sb-component-group sb-button-group">
          <Button
            onClick={() => {
              this.openModal('loading');
            }}
          >
            Loading modal
          </Button>
          <Modal
            onClose={this.hideModal}
            visible={this.state.modal === 'loading'}
            loading
          >
            <Modal.Header loadingIcon>
              <Modal.Heading>I am a modal loading modal</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <Modal.Message>
                <Text typeScale="Body">
                  I am the <code>Modal.Message</code>
                </Text>
              </Modal.Message>
            </Modal.Body>
            <Modal.Footer>
              <span style={{ marginRight: '1em' }}>
                <Button onClick={this.hideModal}>Cancel</Button>
              </span>
            </Modal.Footer>
          </Modal>
        </div>

        <Text
          className={'sb-component-group-description'}
          typeScale="Body"
          lineHeight="lineHeight-default"
        >
          The <code>size</code> prop determines the size of the modal. It can be{' '}
          <code>small</code>, <code>medium</code> or <code>large</code>. The
          default value is <code>medium</code>.
        </Text>

        <div class="sb-component-group sb-button-group">
          <Button
            onClick={() => {
              this.openModal('small');
            }}
          >
            Small modal
          </Button>
          <Modal
            onClose={this.hideModal}
            visible={this.state.modal === 'small'}
            size="small"
          >
            <Modal.Header>
              <Modal.Heading>I am a small modal</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <Text typeScale="Body">
                I can be used to display simple messages.
              </Text>
            </Modal.Body>
            <Modal.Footer>
              <span style={{ marginRight: '1em' }}>
                <Button onClick={this.hideModal}>Cancel</Button>
              </span>
              <Button type="primary">Submit</Button>
            </Modal.Footer>
          </Modal>

          <Button
            onClick={() => {
              this.openModal('medium');
            }}
          >
            Medium modal
          </Button>
          <Modal
            onClose={this.hideModal}
            visible={this.state.modal === 'medium'}
            size="medium"
          >
            <Modal.Header>
              <Modal.Heading>I am a medium modal</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <Text typeScale="Body">I am the default modal size.</Text>
            </Modal.Body>
            <Modal.Footer>
              <span style={{ marginRight: '1em' }}>
                <Button onClick={this.hideModal}>Cancel</Button>
              </span>
              <Button type="primary">Submit</Button>
            </Modal.Footer>
          </Modal>

          <Button
            onClick={() => {
              this.openModal('large');
            }}
          >
            Large modal
          </Button>
          <Modal
            onClose={this.hideModal}
            visible={this.state.modal === 'large'}
            size="large"
          >
            <Modal.Header>
              <Modal.Heading>I am a large modal</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <Text typeScale="Body">I can fit lots of information.</Text>
            </Modal.Body>
            <Modal.Footer>
              <span style={{ marginRight: '1em' }}>
                <Button onClick={this.hideModal}>Cancel</Button>
              </span>
              <Button type="primary">Submit</Button>
            </Modal.Footer>
          </Modal>
        </div>

        <Text
          className={'sb-component-group-subheading'}
          typeScale="h3"
          weight="fontWeight-bold"
        >
          Modal.Header properties
        </Text>

        <Text
          className={'sb-component-group-description'}
          typeScale="Body"
          lineHeight="lineHeight-default"
        >
          The <code>Modal.Header</code> element accepts the following props:{' '}
          <br />
          <br />
          The <code>closable</code> prop will determine if a close icon will
          appear on the header.<br />
          <br />
        </Text>

        <div class="sb-component-group sb-button-group">
          <Button
            onClick={() => {
              this.openModal('closable');
            }}
          >
            Closable modal
          </Button>
          <Modal
            onClose={this.hideModal}
            visible={this.state.modal === 'closable'}
          >
            <Modal.Header closable>
              <Modal.Heading>I am a closable modal</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <Text typeScale="Body">
                You can use the close icon to close me.
              </Text>
            </Modal.Body>
            <Modal.Footer>
              <span style={{ marginRight: '1em' }}>
                <Button onClick={this.hideModal}>Cancel</Button>
              </span>
            </Modal.Footer>
          </Modal>
        </div>

        <Text
          className={'sb-component-group-description'}
          typeScale="Body"
          lineHeight="lineHeight-default"
        >
          The <code>icon</code> prop will display a font awesome icon. <br />
          It must be an array (e.g <code>['fal', 'wallet']</code>).
          <br />
          <br />
        </Text>

        <div class="sb-component-group sb-button-group">
          <Button
            onClick={() => {
              this.openModal('icon');
            }}
          >
            Modal with icon
          </Button>
          <Modal onClose={this.hideModal} visible={this.state.modal === 'icon'}>
            <Modal.Header closable icon={['fal', 'wallet']}>
              <Modal.Heading>I am a modal with an icon</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <Modal.Message>
                <Text typeScale="Body">I am the message.</Text>
              </Modal.Message>
            </Modal.Body>
            <Modal.Footer>
              <span style={{ marginRight: '1em' }}>
                <Button onClick={this.hideModal}>Cancel</Button>
              </span>
            </Modal.Footer>
          </Modal>
        </div>

        <Text
          className={'sb-component-group-subheading'}
          typeScale="h3"
          weight="fontWeight-bold"
        >
          Modal.Message
        </Text>

        <Text
          className={'sb-component-group-description'}
          typeScale="Body"
          lineHeight="lineHeight-default"
        >
          The <code>Modal.Message</code> subcomponent can be placed inside of{' '}
          <code>Modal.Body</code> in order to display a centered message.
        </Text>

        <div class="sb-component-group sb-button-group">
          <Button
            onClick={() => {
              this.openModal('message');
            }}
          >
            Modal with message
          </Button>
          <Modal
            onClose={this.hideModal}
            visible={this.state.modal === 'message'}
          >
            <Modal.Header closable>
              <Modal.Heading>I am the title</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <Modal.Message>
                <Text typeScale="Body">I am the message.</Text>
              </Modal.Message>
            </Modal.Body>
            <Modal.Footer>
              <span style={{ marginRight: '1em' }}>
                <Button onClick={this.hideModal}>Cancel</Button>
              </span>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

storiesOf('Modal', module).add('Modal', () => <ModalDemo />);

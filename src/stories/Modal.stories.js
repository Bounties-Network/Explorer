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
      <div style={{ marginLeft: '10px' }}>
        <div style={{ marginTop: '10px' }} />
        <Button
          onClick={() => {
            this.openModal('original');
          }}
        >
          Regular Modal
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
        <div style={{ marginTop: '10px' }} />
        <Button
          onClick={() => {
            this.openModal('closable');
          }}
        >
          Closable
        </Button>
        <Modal
          onClose={this.hideModal}
          visible={this.state.modal === 'closable'}
        >
          <Modal.Header closable>
            <Modal.Heading>I am a modal heading</Modal.Heading>
            <Modal.Description>I am a modal description</Modal.Description>
          </Modal.Header>
          <Modal.Body>
            <div>I am a modal body</div>
            <div>More content</div>
          </Modal.Body>
          <Modal.Footer>
            <span style={{ marginRight: '1em' }}>
              <Button onClick={this.hideModal}>Cancel</Button>
            </span>
            <Button type="primary">Submit</Button>
          </Modal.Footer>
        </Modal>
        <div style={{ marginTop: '10px' }} />
        <Button
          onClick={() => {
            this.openModal('dismissable');
          }}
        >
          Dismissable
        </Button>
        <Modal
          onClose={this.hideModal}
          visible={this.state.modal === 'dismissable'}
          dismissable
        >
          <Modal.Header closable>
            <Modal.Heading>I am a modal heading</Modal.Heading>
            <Modal.Description>I am a modal description</Modal.Description>
          </Modal.Header>
          <Modal.Body>
            <div>I am a modal body</div>
            <div>More content</div>
          </Modal.Body>
          <Modal.Footer>
            <span style={{ marginRight: '1em' }}>
              <Button onClick={this.hideModal}>Cancel</Button>
            </span>
            <Button type="primary">Submit</Button>
          </Modal.Footer>
        </Modal>
        <div style={{ marginTop: '10px' }} />
        <Button
          onClick={() => {
            this.openModal('icon');
          }}
        >
          With Icon
        </Button>
        <Modal
          onClose={this.hideModal}
          visible={this.state.modal === 'icon'}
          dismissable
        >
          <Modal.Header closable icon={['fal', 'wallet']}>
            <Modal.Message>I am a modal message</Modal.Message>
          </Modal.Header>
          <Modal.Body>
            <Modal.Description>I am a modal description</Modal.Description>
          </Modal.Body>
          <Modal.Footer>
            <span style={{ marginRight: '1em' }}>
              <Button onClick={this.hideModal}>Cancel</Button>
            </span>
            <Button type="primary">Submit</Button>
          </Modal.Footer>
        </Modal>
        <div style={{ marginTop: '10px' }} />
        <Button
          onClick={() => {
            this.openModal('small');
          }}
        >
          Small
        </Button>
        <Modal
          onClose={this.hideModal}
          visible={this.state.modal === 'small'}
          dismissable
          size="small"
        >
          <Modal.Header closable icon={['fal', 'wallet']}>
            <Modal.Heading>I am a modal heading</Modal.Heading>
          </Modal.Header>
          <Modal.Body>
            <div>I am a modal body</div>
            <div>More content</div>
          </Modal.Body>
          <Modal.Footer>
            <span style={{ marginRight: '1em' }}>
              <Button onClick={this.hideModal}>Cancel</Button>
            </span>
            <Button type="primary">Submit</Button>
          </Modal.Footer>
        </Modal>
        <div style={{ marginTop: '10px' }} />
        <Button
          onClick={() => {
            this.openModal('large');
          }}
        >
          large
        </Button>
        <Modal
          onClose={this.hideModal}
          visible={this.state.modal === 'large'}
          dismissable
          size="large"
        >
          <Modal.Header closable icon={['fal', 'wallet']}>
            <Modal.Heading>I am a modal heading</Modal.Heading>
          </Modal.Header>
          <Modal.Body>
            <div>I am a modal body</div>
            <div>More content</div>
          </Modal.Body>
          <Modal.Footer>
            <span style={{ marginRight: '1em' }}>
              <Button onClick={this.hideModal}>Cancel</Button>
            </span>
            <Button type="primary">Submit</Button>
          </Modal.Footer>
        </Modal>
        <div style={{ marginTop: '10px' }} />
        <Button
          onClick={() => {
            this.openModal('loading');
          }}
        >
          Loading
        </Button>
        <Modal
          onClose={this.hideModal}
          visible={this.state.modal === 'loading'}
          dismissable
        >
          <Modal.Header closable loadingIcon />
          <Modal.Body>
            <Modal.Message>I am a modal message</Modal.Message>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

storiesOf('Modal', module).add('Modal', () => <ModalDemo />);

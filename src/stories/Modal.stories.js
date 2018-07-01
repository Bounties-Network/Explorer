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
          <Modal.Header>I am a modal heading</Modal.Header>
          <Modal.Body>
            <div>I am a modal body</div>
            <div>More content</div>
          </Modal.Body>
          <Modal.Footer>
            <span style={{ marginRight: '1em' }}>
              <Button type="secondary" onClick={this.hideModal}>
                Cancel
              </Button>
            </span>
            <Button>Submit</Button>
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
          <Modal.Header closable>I am a modal heading</Modal.Header>
          <Modal.Body>
            <div>I am a modal body</div>
            <div>More content</div>
          </Modal.Body>
          <Modal.Footer>
            <span style={{ marginRight: '1em' }}>
              <Button type="secondary" onClick={this.hideModal}>
                Cancel
              </Button>
            </span>
            <Button>Submit</Button>
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
          <Modal.Header closable>I am a modal heading</Modal.Header>
          <Modal.Body>
            <div>I am a modal body</div>
            <div>More content</div>
          </Modal.Body>
          <Modal.Footer>
            <span style={{ marginRight: '1em' }}>
              <Button type="secondary" onClick={this.hideModal}>
                Cancel
              </Button>
            </span>
            <Button>Submit</Button>
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
            I am a modal heading
          </Modal.Header>
          <Modal.Body>
            <div>I am a modal body</div>
            <div>More content</div>
          </Modal.Body>
          <Modal.Footer>
            <span style={{ marginRight: '1em' }}>
              <Button type="secondary" onClick={this.hideModal}>
                Cancel
              </Button>
            </span>
            <Button>Submit</Button>
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
            I am a modal heading
          </Modal.Header>
          <Modal.Body>
            <div>I am a modal body</div>
            <div>More content</div>
          </Modal.Body>
          <Modal.Footer>
            <span style={{ marginRight: '1em' }}>
              <Button type="secondary" onClick={this.hideModal}>
                Cancel
              </Button>
            </span>
            <Button>Submit</Button>
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
            I am a modal heading
          </Modal.Header>
          <Modal.Body>
            <div>I am a modal body</div>
            <div>More content</div>
          </Modal.Body>
          <Modal.Footer>
            <span style={{ marginRight: '1em' }}>
              <Button type="secondary" onClick={this.hideModal}>
                Cancel
              </Button>
            </span>
            <Button>Submit</Button>
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
          <Modal.Header closable loadingIcon>
            I am a modal heading
          </Modal.Header>
          <Modal.Body>
            <div>I am a modal body</div>
            <div>More content</div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

storiesOf('Modal', module).add('Modal', () => <ModalDemo />);

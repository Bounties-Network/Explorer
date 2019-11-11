import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import CommentThread from './index';
import { Commenter } from '../SingleComment';
import moment from 'moment';

addDecorator(centered);


const mockCommenter: Commenter = {
  name: 'firstName lastName',
  screenName: 'screenName',
  address: '0xbfecfede',
  src: undefined,
  onDark: false
}

const comment = {
  content:'This is a bounty comment. I’m just a person commenting on a bounty. Very exciting I know. What a time to be alive.',
  timestamp: moment().subtract('5', 'hours'),
  commenter: mockCommenter
}

const comments = [comment, comment, comment]

storiesOf('CommentThread', module)
  .add('Threaded', () =>
    <CommentThread
      replySubmitHandler={() => alert('submitted woo')}
      comments={comments}
    />
  )
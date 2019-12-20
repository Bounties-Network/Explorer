/** @jsx jsx */
import { jsx } from "theme-ui";
import { storiesOf, addDecorator } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import Submission from "./View";
import moment from "moment";
import { mockComments } from '../Comment/CommentThread/CommentThread.stories'

addDecorator(centered);

const content = 'This is a submission description. I’m just a gal submitting to a bounty. Very exciting I know. What a time to be alive. Submission descriptions can tend to be a bit longer, so for the sake of this example, I’ll wrap the description to 3 lines. Whoah.'
const timestamp = moment().subtract('1', 'hours')
const attachments = [
  { fileExtensionType: 'pdf', ipfsHash: 'abc', fileName: 'fileName345345434MrLee' },
  { url: 'https://www.google.co.uk' },
  { ipfsHash: 'QmRB6uPrCFPouSJsdYuCVCURUvfWXiXFjb6WtJQXFLZrUr', fileExtensionType: '.png', fileName: 'code.png' }
]

storiesOf("Submission", module)
  .add("Mi Fora", () => {
    return (
      <div sx={{ maxWidth: "70vw" }}>
        <Submission
          avatar={{
            name: 'firstName lastName',
            address: '0xbfecfede',
            img: 'https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo',
            src: 'https://www.google.co.uk',
            onDark: false,
            size: 'medium',
          }}
          handleSubmit={callback => {
            callback && setTimeout(callback, 2000);
          }}
          content={content}
          timestamp={timestamp}
          attachments={attachments}
          commentSubmitHandler={console.log}
          replySubmitHandler={console.log}
          comments={mockComments}
        />
      </div>
    );
})
.add("Image", () => {
  return (
    <div sx={{ maxWidth: "70vw" }}>
      <Submission
        avatar={{
          name: 'firstName lastName',
          address: '0xbfecfede',
          img: 'https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo',
          src: 'https://www.google.co.uk',
          onDark: false,
          size: 'medium',
        }}
        handleSubmit={callback => {
          callback && setTimeout(callback, 2000);
        }}
        content={content}
        timestamp={timestamp}
        attachments={[]}
        imageSrc={'https://pmcvariety.files.wordpress.com/2019/04/ourplanet_fdtg_30_screengrab.jpg?w=1000&h=563'}
        commentSubmitHandler={console.log}
        replySubmitHandler={console.log}
        comments={mockComments}
      />
    </div>
  );
})
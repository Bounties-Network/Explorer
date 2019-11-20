/** @jsx jsx */
import { jsx } from "theme-ui";
import { storiesOf, addDecorator } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import Main from ".";
import moment from "moment";

addDecorator(centered);

const content = 'This is a submission description. I’m just a gal submitting to a bounty. Very exciting I know. What a time to be alive. Submission descriptions can tend to be a bit longer, so for the sake of this example, I’ll wrap the description to 3 lines. Whoah.'
const timestamp = moment().subtract('1', 'hours')
const attachments = [
  { fileExtensionType: 'pdf', ipfsHash: 'abc', fileName: 'fileName345345434MrLee' },
  { url: 'https://www.google.co.uk' },
  { ipfsHash: 'QmRB6uPrCFPouSJsdYuCVCURUvfWXiXFjb6WtJQXFLZrUr', fileExtensionType: '.png', fileName: 'code.png' }
]

storiesOf("Main", module)
  .add("Mi Fora", () => {
  return (
    <div sx={{ maxWidth: "70vw" }}>
      <Main
        content={content}
        timestamp={timestamp}
        attachments={[]}
        replySubmitHandler={console.log}
      />
    </div>
  );
})
.add("Attachments", () => {
  return (
    <div sx={{ maxWidth: "70vw" }}>
      <Main
        content={content}
        timestamp={timestamp}
        attachments={attachments}
        replySubmitHandler={console.log}
      />
    </div>
  );
})
.add("Image", () => {
  return (
    <div sx={{ maxWidth: "70vw" }}>
      <Main
        content={content}
        timestamp={timestamp}
        attachments={[]}
        imageSrc={'https://pmcvariety.files.wordpress.com/2019/04/ourplanet_fdtg_30_screengrab.jpg?w=1000&h=563'}
        replySubmitHandler={console.log}
      />
    </div>
  );
});




/** @jsx jsx */
import { jsx } from "theme-ui";
import { storiesOf, addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import { ToastContainer, ToastNotification, ToastNotificationContent } from '.';
import { toast } from "react-toastify";

addDecorator(centered);

storiesOf('ToastNotification', module)
.add('Generic title with detail and info type', () => {
return (   <div>
  <ToastContainer />
  <div sx={{ cursor: 'pointer' }} onClick={() => toast.info(
    <ToastNotificationContent
    type='info'
    action={{  name: 'Action', href: 'http://www.w3.org/2000/svg'  }}
    title={'Generic Message'} 
    detail={'Generic Subtext'}
    />,
    {
      position: 'bottom-right',
      autoClose: 50000000000000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
    }
    )
  }>Click me</div>
  </div> )
  }
)
.add('Bounty received info', () => {
return (   <div>
  <ToastContainer />
  <div sx={{ cursor: 'pointer' }} onClick={() => toast.info(
    <ToastNotificationContent
    type='info'
    action={{  name: 'View Bounty', href: 'http://www.w3.org/2000/svg'  }}
    title={'Your bounty received a submission'} 
    />,
    {
      position: 'bottom-right',
      autoClose: 50000000000000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
    }
    )
  }>Click me</div>
  </div> )
  }
)
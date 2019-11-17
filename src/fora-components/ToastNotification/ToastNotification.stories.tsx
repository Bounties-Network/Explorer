/** @jsx jsx */
import { jsx } from "theme-ui";
import { storiesOf, addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import { ToastContainer, ToastNotificationContent } from '.';
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
  }>Refresh then Click me</div>
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
  }>Refresh then Click me</div>
  </div> )
  }
)
.add('Submission accepted', () => {
return (   <div>
  <ToastContainer />
  <div sx={{ cursor: 'pointer' }} onClick={() => toast.info(
    <ToastNotificationContent
    type='success'
    action={{  name: 'View Bounty', href: 'http://www.w3.org/2000/svg'  }}
    title={'Your submissionw as accepted!'} 
    detail={'You were paid 0.005 ETH'} 
    />,
    {
      position: 'bottom-right',
      autoClose: 50000000000000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
    }
    )
  }>Refresh then Click me</div>
  </div> )
  }
)
.add('Processing your transaction', () => {
return (   <div>
  <ToastContainer />
  <div sx={{ cursor: 'pointer' }} onClick={() => toast.info(
    <ToastNotificationContent
      type='loading'
      action={{  name: 'Return to dashboard', href: 'http://www.w3.org/2000/svg'  }}
      title={'Processing your transaction'} 
    />,
    {
      position: 'bottom-right',
      autoClose: 50000000000000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
    }
    )
  }>Refresh then Click me</div>
  </div> )
  }
)
.add('Transaction successful', () => {
return (   <div>
  <ToastContainer />
  <div sx={{ cursor: 'pointer' }} onClick={() => toast.info(
    <ToastNotificationContent
      type='success'
      action={{  name: 'View on etherscan', href: 'http://www.w3.org/2000/svg'  }}
      title={'Transaction successful'} 
      detail={'Transaction subtext'} 
    />,
    {
      position: 'bottom-right',
      autoClose: 50000000000000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
    }
    )
  }>Refresh then Click me</div>
  </div> )
  }
)
.add('Insufficient funds to complete transaction', () => {
return (   <div>
  <ToastContainer />
  <div sx={{ cursor: 'pointer' }} onClick={() => toast.info(
    <ToastNotificationContent
      type='error'
      title={'Insufficient funds to complete transaction'} 
      detail={'Top up your wallet balance and try again'} 
    />,
    {
      position: 'bottom-right',
      autoClose: 50000000000000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
    }
    )
  }>Refresh then Click me</div>
  </div> )
  }
)
.add('Transaction failed', () => {
return (   <div>
  <ToastContainer />
  <div sx={{ cursor: 'pointer' }} onClick={() => toast.info(
    <ToastNotificationContent
      type='error'
      title={'Insufficient funds to complete transaction'} 
    />,
    {
      position: 'bottom-right',
      autoClose: 50000000000000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
    }
    )
  }>Refresh then Click me</div>
  </div> )
  }
)
/** @jsx jsx */
import { jsx } from "theme-ui";
import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import { ToastContainer, ToastNotification, ToastNotificationContent } from '.';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle, faTimes } from "@fortawesome/pro-regular-svg-icons";
import { toast } from "react-toastify";
import css from "@styled-system/css";

addDecorator(centered);

interface IContentProps {  }
const Content: React.FC<IContentProps> = () => (<div>This is some helper text that you find inside of a ToastNotification. It might attempt to explain something to a user in unique instances where something may be unclear, or needs to be defined beyond how it is displayed in the UI.</div>)

storiesOf('ToastNotification', module)
.add('Mi Fora', () => (
  <div>
  <ToastContainer />
  <div sx={{ cursor: 'pointer' }} onClick={() => toast.info(
    <ToastNotificationContent
    type='info'
    action={{  name: 'Action', href: 'http://www.w3.org/2000/svg'  }}
    title={'Generic Message'} 
    detail={'Generic Subtext'}
    />,
    {
      position: "top-right",
      autoClose: 50000000000000,
      hideProgressBar: false,
      closeButton: <FontAwesomeIcon icon={faTimes} />,
      pauseOnHover: true,
      draggable: true,
    }
    )
  }>Click me</div>
  </div>
  )
)
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
import { useResponsiveValue } from '@theme-ui/match-media'

addDecorator(centered);

storiesOf('ToastNotification', module)
.add('Mi Fora', () => {
  const position = useResponsiveValue(['bottom-center', 'bottom-right', 'bottom-right'])
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
      position,
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
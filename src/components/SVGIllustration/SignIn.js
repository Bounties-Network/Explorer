import React from 'react';

const SVG = () => (
  <svg
    width="52"
    height="86"
    viewBox="0 0 52 86"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#3q4g_i)">
      <path
        d="M43 3C46.3137 3 49 5.68629 49 9V57.1799C49 60.4936 46.3137 63.1799 43 63.1799L1.99998 63.1799L1.99998 3L43 3Z"
        fill="white"
      />
    </g>
    <g filter="url(#lkjgh_d)">
      <path
        d="M31.4025 74.0177C35.3078 75.4028 39.4082 72.5065 39.4082 68.3629V23.8266C39.4082 20.5898 37.4578 17.672 34.4669 16.4344L2.00001 3L2.00001 63.5894L31.4025 74.0177Z"
        fill="white"
      />
    </g>
    <path
      d="M31.7347 42.8061C31.7347 44.6602 30.2316 46.1633 28.3776 46.1633C26.5235 46.1633 25.0204 44.6602 25.0204 42.8061C25.0204 40.952 26.5235 39.449 28.3776 39.449C30.2316 39.449 31.7347 40.952 31.7347 42.8061Z"
      fill="#AFC6FF"
    />
    <defs>
      <filter
        id="3q4g_i"
        x="1.99998"
        y="3"
        width="47"
        height="60.1799"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="17" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.352941 0 0 0 0 0.156863 0 0 0 0 0.776471 0 0 0 0.6 0"
        />
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
      </filter>
      <filter
        id="lkjgh_d"
        x="7.62939e-06"
        y="1.43051e-06"
        width="51.4082"
        height="85.3679"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx="5" dy="4" />
        <feGaussianBlur stdDeviation="3.5" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.352941 0 0 0 0 0.156863 0 0 0 0 0.776471 0 0 0 0.2 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default SVG;

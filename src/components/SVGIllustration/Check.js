import React from 'react';

const SVG = () => (
  <svg
    width="96"
    height="96"
    viewBox="0 0 96 96"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#3cg5_dd)">
      <path
        d="M70 34C70 21.9355 60.0645 12 48 12C35.8468 12 26 21.9355 26 34C26 46.1532 35.8468 56 48 56C60.0645 56 70 46.1532 70 34ZM45.4274 45.7097C44.8952 46.2419 43.9194 46.2419 43.3871 45.7097L34.1613 36.4839C33.629 35.9516 33.629 34.9758 34.1613 34.4435L36.2016 32.4919C36.7339 31.871 37.621 31.871 38.1532 32.4919L44.4516 38.7016L57.7581 25.3952C58.2903 24.7742 59.1774 24.7742 59.7097 25.3952L61.75 27.3468C62.2823 27.879 62.2823 28.8548 61.75 29.3871L45.4274 45.7097Z"
        fill="white"
      />
    </g>
    <defs>
      <filter
        id="3cg5_dd"
        x="0"
        y="0"
        width="96"
        height="96"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="14" />
        <feGaussianBlur stdDeviation="13" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.148634 0 0 0 0 0.82875 0 0 0 0 0.0379167 0 0 0 0.3 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="3" />
        <feGaussianBlur stdDeviation="3" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.04125 0 0 0 0 0.50875 0 0 0 0 0.11605 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow"
          result="effect2_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default SVG;

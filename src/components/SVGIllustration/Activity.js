import React from 'react';

const SVG = () => (
  <svg
    width="130"
    height="103"
    viewBox="0 0 130 103"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#324f_dd)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M72.0092 20.0005C72.9631 20.0217 73.7691 20.7138 73.9344 21.6534L80.5145 59.0465L84.8175 40.6917C85.0254 39.8049 85.8061 39.1706 86.7166 39.1487C87.6271 39.1268 88.4375 39.7229 88.6877 40.5986L91.7556 51.3333H102C103.105 51.3333 104 52.2288 104 53.3333C104 54.4379 103.105 55.3333 102 55.3333H90.2471C89.3541 55.3333 88.5694 54.7415 88.324 53.8829L86.9558 49.0954L82.1825 69.4565C81.9657 70.3812 81.1286 71.0259 80.1792 70.9992C79.2299 70.9726 78.4302 70.282 78.2656 69.3466L71.7366 32.2437L66.9524 53.7673C66.749 54.6823 65.9374 55.3333 65 55.3333H28C26.8954 55.3333 26 54.4379 26 53.3333C26 52.2288 26.8954 51.3333 28 51.3333H63.3957L70.0124 21.566C70.2194 20.6347 71.0554 19.9793 72.0092 20.0005Z"
        fill="white"
      />
    </g>
    <defs>
      <filter
        id="324f_dd"
        x="0"
        y="0"
        width="130"
        height="103"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="6" />
        <feGaussianBlur stdDeviation="13" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.109804 0 0 0 0 0.25098 0 0 0 0 0.462745 0 0 0 0.15 0"
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
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="3" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.109804 0 0 0 0 0.25098 0 0 0 0 0.462745 0 0 0 0.15 0"
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

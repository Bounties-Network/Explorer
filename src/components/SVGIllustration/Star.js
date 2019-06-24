import React from 'react';

const SVG = () => (
  <svg
    width="107"
    height="105"
    viewBox="0 0 107 105"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#vukt_dd)">
      <path
        d="M50.3047 21.7902L43.7032 35.2981L28.7735 37.4309C26.1328 37.8371 25.1172 41.0871 27.0469 43.0168L37.711 53.4777L35.1719 68.2043C34.7657 70.8449 37.6094 72.8762 39.9453 71.6574L53.25 64.6496L66.4532 71.6574C68.7891 72.8762 71.6328 70.8449 71.2266 68.2043L68.6875 53.4777L79.3516 43.0168C81.2813 41.0871 80.2657 37.8371 77.625 37.4309L62.7969 35.2981L56.0938 21.7902C54.9766 19.4543 51.5235 19.3527 50.3047 21.7902Z"
        fill="url(#s5k7c_linear)"
      />
    </g>
    <defs>
      <filter
        id="vukt_dd"
        x="0.0462646"
        y="0"
        width="106.306"
        height="104.02"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
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
          values="0 0 0 0 0.109804 0 0 0 0 0.25098 0 0 0 0 0.462745 0 0 0 0.14 0"
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
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="2" />
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
      <linearGradient
        id="s5k7c_linear"
        x1="46.5"
        y1="40.9621"
        x2="42.8464"
        y2="67.4583"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#F7F7F7" />
      </linearGradient>
    </defs>
  </svg>
);

export default SVG;

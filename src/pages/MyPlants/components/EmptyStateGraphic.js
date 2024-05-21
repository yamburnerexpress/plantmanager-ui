import React from "react";

function EmptyStateGraphic(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // width="407.581"
      // height="595.743"
      version="1.1"
      viewBox="0 0 107.839 157.624"
      className={props.className}
    >
      <defs>
        <linearGradient>
          <stop offset="0" stopColor="#000" stopOpacity="1"></stop>
        </linearGradient>
      </defs>
      <g
        fillRule="evenodd"
        stroke="none"
        strokeWidth="1.1"
        transform="translate(-91.642 -132.261)"
      >
        <path
          fill="#fc0"
          d="M97.082 19.758c-37.948 0-90.24 36.585-90.24 74.632 0 38.048 30.763 68.892 68.712 68.892 22.617 0 20.223-11.387 14.62-28.603-3.436.998-7.412 1.75-11.392 1.617-10.764-.358-22.605-5.382-22.605-5.382L49.718 90.01c-3.218-3.755-6.277-7.136-6.458-11.124-.048-6.086 3.934-14.71 36.24-14.71 3.735 0 7.084.137 10.093.384 13.463-25.441 35.506-44.802 7.49-44.802zM89.593 64.56c-.333.63-.663 1.26-.984 1.897a32.472 10.585 0 0122.825 10.097 32.472 10.585 0 01-29.83 10.517c-.3 2.07-.489 4.152-.489 6.243 0 15.371 5.26 29.695 9.058 41.365 5.858-1.702 10.138-4.124 10.138-4.124l6.817-39.827c5.495-5.764 7.17-9.798 7.535-13.635.32-3.367-3.523-10.77-25.07-12.533zM81.605 87.07c1.034-7.1 3.684-14.044 7.004-20.614a32.472 10.585 0 00-9.647-.488 32.472 10.585 0 00-32.473 10.585A32.472 10.585 0 0078.962 87.14a32.472 10.585 0 002.643-.068z"
          display="none"
        ></path>
        <path
          fill="#15353e"
          // fill="#05889F"
          d="M161.64 132.261c-.792-.006-1.329.289-1.288 1.12.137 2.75 6.02 1.156 6.85.918a1.787 1.787 0 01.033-.114c-.481-.252-3.718-1.91-5.594-1.924zm5.595 1.924l.131.068-.165.046a1.787 1.787 0 00-.054.414 1.787 1.787 0 001.787 1.787 1.787 1.787 0 001.787-1.787 1.787 1.787 0 00-1.787-1.787 1.787 1.787 0 00-1.7 1.26zm3.517.79s4.121 6.996 5.534 4.397c1.414-2.6-5.534-4.396-5.534-4.396zm-4.787 5.17l-.094.077-.236.21-.23.213-.225.214-.221.22-.213.22-.205.223-.201.226-.195.228-.188.23-.181.233-.176.235-.16.224.976.698.152-.213.16-.215.166-.213.172-.21.178-.21.186-.207.19-.205.195-.203.203-.202.207-.198.214-.198.22-.193.083-.072zm-4.17 6.168l-.026.093-.066.258-.056.26-.051.26-.043.26-.035.26-.027.26-.02.263-.01.259-.004.262.004.26.013.26.012.15c.393-.111.787-.229 1.18-.334l-.006-.115-.004-.225.004-.222.01-.225.016-.225.023-.226.031-.225.037-.226.043-.227.051-.227.057-.224.024-.078zm.871 2.771l.006.107.018.223.025.22.03.221.015.08-1.182.21-.018-.098-.036-.26-.03-.258-.008-.112c-33.91 9.522-69.843 40.035-69.843 71.576 0 38.048 30.764 68.892 68.712 68.892 22.617 0 20.223-11.387 14.62-28.603-3.436.998-7.412 1.75-11.392 1.617-10.764-.359-22.605-5.382-22.605-5.382l-6.459-40.904c-3.218-3.755-6.277-7.136-6.458-11.124-.048-6.086 3.935-14.71 36.24-14.71 3.736 0 7.084.137 10.093.383 13.463-25.44 35.506-44.801 7.49-44.801-6.125 0-12.625.965-19.217 2.723zm11.727 42.078c-.333.63-.662 1.26-.984 1.898a32.472 10.585 0 0122.826 10.097 32.472 10.585 0 01-29.83 10.517c-.301 2.07-.489 4.152-.489 6.243 0 15.371 5.26 29.694 9.058 41.365 5.857-1.702 10.137-4.124 10.137-4.124l6.817-39.828c5.496-5.763 7.17-9.797 7.536-13.634.32-3.367-3.524-10.77-25.07-12.534zm-7.988 22.512c1.035-7.1 3.684-14.044 7.004-20.614a32.472 10.585 0 00-9.287-.478c.207.63.418 1.256.614 1.894l-1.146.352c-.228-.741-.477-1.485-.722-2.227a32.472 10.585 0 00-31.578 10.556 32.472 10.585 0 0032.472 10.585 32.472 10.585 0 002.643-.068zm-3.537-21.073a32.472 10.585 0 01.894-.029 32.472 10.585 0 01.36.01c-.168-.513-.332-1.032-.499-1.541l-1.14.373c.13.398.254.79.385 1.186zm1.189-39.636c.231.315.503.604.804.857l.002.002.006.006.17.135.174.13.178.12.184.117.187.11.191.103.198.1.008.004c.168.082.335.159.502.227l-.453 1.11c-.2-.08-.394-.17-.582-.26l-.004-.003-.225-.113-.225-.123-.223-.129-.218-.138-.215-.147-.211-.156-.201-.162-.004-.004a6.182 6.182 0 01-1.01-1.075zm5.984 3.066c.402.144.805.304 1.2.488l.003.002.24.115.244.123.24.132.238.14.24.148.233.159.229.164.004.004c.155.117.306.237.453.365l.002.002.004.002-.797.898a6.798 6.798 0 00-.383-.308l-.197-.143-.201-.135-.205-.128-.21-.121-.21-.115-.216-.11-.216-.105a13.308 13.308 0 00-1.102-.448l.406-1.129zm5.554 4.957c.51 1.16.821 2.38 1.03 3.594l-1.184.203c-.197-1.149-.486-2.272-.943-3.312zm-.091 7.192l1.188.176a10.19 10.19 0 01-1.27 3.586l-1.04-.602a9.004 9.004 0 001.032-2.658c.036-.17.065-.337.09-.502zm-3.256 5.834l.832.863-.22.213-.282.262-.002.002a30.1 30.1 0 01-2.314 1.88l-.717-.965a29.02 29.02 0 002.219-1.8l.271-.25zm-5.619 4.355l.705.973c-.662.48-1.305.968-1.906 1.494l-.004.004-.227.203-.217.203-.207.203-.12.125-.864-.834.13-.135.23-.226.237-.221.244-.219.002-.002a27.924 27.924 0 011.997-1.568zm-4.832 5.647l1.135.385-.053.156-.058.193-.051.19-.045.189-.04.187-.03.186-.026.185-.02.186-.013.186-.008.187-.002.188.004.19.01.19.015.202c.02.216.046.43.083.64l-1.182.203a9.418 9.418 0 01-.098-.744v-.004l-.018-.223-.01-.224-.004-.225.002-.224.008-.225.018-.223.024-.224.03-.225.038-.225.047-.224.053-.227.062-.226.068-.227zm3.94 13.945c.305 1.17.582 2.349.833 3.531l-1.173.248a76.169 76.169 0 00-.823-3.475z"
        ></path>
      </g>
    </svg>
  );
}

export default EmptyStateGraphic;
// eslint-disable-next-line react/prop-types
const CheckIcon = ({ color = '#dd0000' }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="10" stroke={color} strokeWidth="2" />
    <path
      d="M6 11.5L9.32941 15L16 8"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CheckIcon;

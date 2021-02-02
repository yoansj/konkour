import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

export default function LogoSvg(props: SvgIconProps) {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      width="256"
      height="256"
      viewBox="0 0 100 100"
      fontSize="large"
      {...props}
    >
      <rect width="100" height="100" rx="20" fill="#7d6ee7"></rect>
      <path
        d="M39.42 82.40L39.42 82.40L25.48 82.40Q23.77 82.40 23 81.64Q22.24 80.87 22.24 79.16L22.24 79.16L22.24 20.84Q22.24 19.13 23 18.37Q23.77 17.60 25.48 17.60L25.48 17.60L39.42 17.60Q41.14 17.60 41.90 18.37Q42.67 19.13 42.67 20.84L42.67 20.84L42.67 41.54L46.27 41.54L55.53 20.57Q56.17 18.95 57.25 18.28Q58.33 17.60 60.03 17.60L60.03 17.60L73.89 17.60Q75.42 17.60 75.97 18.37Q76.50 19.13 75.88 20.57L75.88 20.57L66.69 41.54Q71.73 41.81 74.75 45.10Q77.77 48.38 77.77 53.78L77.77 53.78L77.77 79.16Q77.77 80.87 77 81.64Q76.23 82.40 74.53 82.40L74.53 82.40L60.67 82.40Q58.95 82.40 58.19 81.64Q57.42 80.87 57.42 79.16L57.42 79.16L57.42 61.61Q57.42 60.17 56.70 59.36Q55.98 58.55 54.55 58.55L54.55 58.55L42.67 58.55L42.67 79.16Q42.67 80.87 41.90 81.64Q41.14 82.40 39.42 82.40Z"
        fill="#fff"
      ></path>
    </SvgIcon>
  );
}

/**
 * https://formito.com/tools/favicon
 * Letter K
 * Font Bungee
 * Color White
 * Size 90
 * Variant 400
 * Shape Rounded Square
 * Color 7D6EE7
 */
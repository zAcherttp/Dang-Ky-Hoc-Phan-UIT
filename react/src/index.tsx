import CssBaseline from '@mui/material/CssBaseline';
import { lightBlue } from '@mui/material/colors';
import { StyledEngineProvider, Theme, ThemeProvider, adaptV4Theme, createTheme } from '@mui/material/styles';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { LicenseManager } from 'ag-grid-enterprise';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getPerformance } from 'firebase/performance';
import { SnackbarProvider } from 'notistack';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga4';
import { buildTracker } from './tracker';
import { checkAdBlocker } from './tracking.utils';
import { useDrawerStore, useUtilsStore } from './zus';

import App from './views/App';

import 'ag-grid-enterprise/styles/ag-grid.css';
import 'ag-grid-enterprise/styles/ag-theme-alpine.css';
declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

export const isProd = process.env.NODE_ENV === 'production';

const firebaseConfig = {
  apiKey: "AIzaSyA_pP9_AnMEYHC01SlL_JU7AYHQJwlrVt0",
  authDomain: "tool-dkhp-uit-fork-for-ptit.firebaseapp.com",
  projectId: "tool-dkhp-uit-fork-for-ptit",
  storageBucket: "tool-dkhp-uit-fork-for-ptit.appspot.com",
  messagingSenderId: "1082883525247",
  appId: "1:1082883525247:web:765faef75e088d4e590d4a",
  measurementId: "G-5RG5GGE204"
};

const app = initializeApp(firebaseConfig, { automaticDataCollectionEnabled: true });
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
getPerformance(app);

export const tracker = buildTracker();
checkAdBlocker().then((hasAdBlocker) => {
  tracker.updateProperty('hasAdBlocker', hasAdBlocker);
  tracker.updateProperty('leftDrawerInitiallyOpen', useDrawerStore.getState().isDrawerOpen);
  useUtilsStore.setState({ hasAdBlocker });
});

LicenseManager.setLicenseKey('I_<3_SCHOOL_NDEwMjMzMzIwMDAwMA==afc05c982fa05a2578eb9cab60c42d78');
ReactGA.initialize('G-HK94GQMRY2');

const theme = createTheme(
  adaptV4Theme({
    typography: {
      fontFamily: `"Montserrat", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
  'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
  'Noto Color Emoji'`,
    },
    palette: {
      primary: { main: lightBlue[800] },
      secondary: { main: lightBlue[500] },
    },
  }),
);

ReactDOM.render(
  <SnackbarProvider>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Analytics />
        <SpeedInsights />
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </SnackbarProvider>,
  document.getElementById('root'),
);

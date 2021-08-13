import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { f7ready, App } from 'framework7-react';
import { RecoilRoot } from 'recoil';
import { getDevice } from '@js/framework7-custom';
import { IS_PRODUCTION } from '@config';
import { toast } from '@js/utils';
import routes from '@routes';
import Views from '@components/Views';
import Auth from '@aws-amplify/auth';
import capacitorApp from '../js/capacitor-app';
import awsconfig from '../aws-exports';

Auth.configure(awsconfig);

const F7App = () => {
  const device = getDevice();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: IS_PRODUCTION,
        refetchOnReconnect: IS_PRODUCTION,
      },
    },
  });

  const f7params = {
    name: 'Bus React',
    theme: 'ios',
    id: 'com.insomenia.bus',
    routes,
    input: {
      scrollIntoViewOnFocus: device.capacitor,
      scrollIntoViewCentered: device.capacitor,
    },
    statusbar: {
      iosOverlaysWebView: true,
      androidOverlaysWebView: false,
    },
    view: {
      iosDynamicNavbar: device.ios,
    },
  };

  useEffect(() => {
    f7ready((f7) => {
      if (f7.device.capacitor) {
        capacitorApp.init(f7);
      }
      toast.set(f7);
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <App {...f7params}>
          <Views />
        </App>
        {IS_PRODUCTION ? null : <ReactQueryDevtools position="bottom-right" />}
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default F7App;

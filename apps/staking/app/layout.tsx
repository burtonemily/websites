import { NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID } from '@/lib/env';
import { getLocalizationData } from '@/lib/locale-server';
import { siteMetadata as metadata, wagmiMetadata } from '@/lib/metadata';
import { Toaster } from '@session/ui/components/ui/sonner';
import { AtypDisplay, AtypText, MonumentExtended } from '@session/ui/fonts';

import LocalizationProvider from '@/providers/localization-provider';
import '@session/ui/styles';
import { TooltipProvider } from '@session/ui/ui/tooltip';
import { createWagmiConfig } from '@session/wallet/lib/wagmi';
import { Web3ModalProvider } from '@session/wallet/providers/web3-modal-provider';
import { headers } from 'next/headers';
import { cookieToInitialState } from 'wagmi';
import ChainBanner from '../components/ChainBanner';
import Header from '../components/Header';
import SentStakingClientProvider from '../providers/sent-staking-provider';

const wagmiConfig = createWagmiConfig({
  projectId: NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  metadata: wagmiMetadata,
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { locale, direction, messages } = await getLocalizationData();
  const initialWagmiState = cookieToInitialState(wagmiConfig, headers().get('cookie'));

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${AtypDisplay.variable} ${AtypText.variable} ${MonumentExtended.variable}`}
    >
      <LocalizationProvider messages={messages} locale={locale}>
        <Web3ModalProvider
          initialState={initialWagmiState}
          wagmiMetadata={wagmiMetadata}
          projectId={NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID}
        >
          <SentStakingClientProvider>
            <TooltipProvider delayDuration={300}>
              <body className="bg-session-black text-session-text font-atyp-text overflow-x-hidden">
                <ChainBanner />
                <Header />
                <main>{children}</main>
                <Toaster />
              </body>
            </TooltipProvider>
          </SentStakingClientProvider>
        </Web3ModalProvider>
      </LocalizationProvider>
    </html>
  );
}

export { metadata };
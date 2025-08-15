"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Environment, ParaProvider, ParaModal } from "@getpara/react-sdk";
import "@getpara/react-sdk/styles.css";
import { useState } from "react";
import { mantle } from "wagmi/chains";
import { env } from "process";

const apiKey = process.env.NEXT_PUBLIC_PARA_API_KEY

if (!apiKey) {
  console.error("NEXT_PUBLIC_PARA_API_KEY is not set. Please set it in your .env.local file.");
  throw new Error("NEXT_PUBLIC_PARA_API_KEY is not set. Please set it in your .env.local file.");
}

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ParaProvider
        paraClientConfig={{
          apiKey: apiKey!,
          env: Environment.PRODUCTION,
        }}
        paraModalConfig={{
          disableEmailLogin: true,
          disablePhoneLogin: true,
          oAuthMethods: [],
        }}
        externalWalletConfig={{
          wallets: ["METAMASK", "RABBY", "RAINBOW"],
          evmConnector: {
            config: {
              chains: [mantle],
            },
          }
        }}
        config={{
          appName: "BlockFlirt",
        }}
      >
        {children}
        <ParaModal />
      </ParaProvider>
    </QueryClientProvider>
  );
}
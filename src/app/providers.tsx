"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Environment, ParaProvider, ParaModal } from "@getpara/react-sdk";
import "@getpara/react-sdk/styles.css";
import { useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_PARA_API_KEY

if (!apiKey) {
  console.error("NEXT_PUBLIC_PARA_API_KEY is not set. Please set it in your .env.local file.");
  throw new Error("NEXT_PUBLIC_PARA_API_KEY is not set. Please set it in your .env.local file.");
}

console.log("Using API Key:", apiKey);

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
          env: "beta" as Environment,
        }}
        paraModalConfig={{
          disableEmailLogin: true,
          disablePhoneLogin: true,
          oAuthMethods: ["TWITTER"],
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
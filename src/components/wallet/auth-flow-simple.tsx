"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Loader2, AtSign } from "lucide-react";
import { useAccount, useWallet, useModal } from "@getpara/react-sdk";
import Link from 'next/link';

export function AuthFlowSimple() {
  const [isConnecting, setIsConnecting] = useState(false);
  const { isLoading: accountLoading } = useAccount();
  const { data: wallet, isLoading: walletLoading, isError, isPaused, isSuccess } = useWallet();
  const { openModal } = useModal();
  // Consider connected if we have a wallet address (userId may not always be present immediately)
  const isConnected = Boolean(wallet?.address);

  // Reset connecting state when connection is successful or when loading completes
  useEffect(() => {
    if (isConnected || !walletLoading) {
      setIsConnecting(false);
    }
  }, [isConnected, walletLoading]);

  const handleTwitterConnect = () => {
    setIsConnecting(true);
    openModal();
  };

  // Show loading state while checking authentication
  if (accountLoading || walletLoading) {
    return (
      <div className="space-y-6">
        <Card className="bg-card border rounded-3xl" style={{borderColor: 'var(--border)'}}>
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-10 h-10 text-muted animate-spin" />
            </div>
            <h3 className="text-primary text-xl font-bold mb-3">Checking connection...</h3>
            <p className="text-secondary">
              Please wait while we verify your session
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isConnected && wallet) {
    return (
      <div className="space-y-6">
        <Card className="bg-card border rounded-3xl" style={{borderColor: 'var(--border)'}}>
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10" style={{color: 'var(--accent)'}} />
            </div>
            <h3 className="text-primary text-xl font-bold mb-3">Successfully Connected!</h3>
            <p className="text-secondary mb-6">
              Your wallet is connected. Now you can start matching!
            </p>
            <Link href="/match">
              <Button className="w-full btn-primary py-3 rounded-xl font-semibold">
                <CheckCircle className="w-5 h-5 mr-2" />
                Start Matching
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Connected Account Status */}
        <Card className="bg-card border rounded-xl" style={{borderColor: 'var(--border)'}}>
          <CardContent className="p-6">
            <h4 className="text-primary font-semibold mb-4">Connected Account</h4>
            <div className="flex items-center justify-between bg-secondary rounded-xl p-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{backgroundColor: 'var(--accent)'}}>
                  <AtSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-primary font-medium">Wallet</p>
                  {wallet?.userId && (
                    <p className="text-secondary text-sm">User ID: {wallet.userId.slice(0, 8)}...</p>
                  )}
                  {wallet?.address && (
                    <p className="text-secondary text-sm">Address: {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}</p>
                  )}
                </div>
              </div>
              <Badge className="bg-secondary text-primary border-0">
                Connected
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card border rounded-3xl" style={{borderColor: 'var(--border)'}}>
        <CardContent className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{backgroundColor: 'var(--accent)'}}>
              <AtSign className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-primary text-xl font-bold mb-3">Connect your Wallet</h3>
            <p className="text-secondary">
              Connect your Wallet to analyze your onchain activity and find better matches
            </p>
          </div>

          {/* Connect Button */}
          <div className="bg-secondary rounded-xl p-6 text-center">
            <Button 
              onClick={handleTwitterConnect}
              disabled={isConnecting}
              className="w-full btn-primary py-3 rounded-xl font-semibold disabled:opacity-50"
            >
              {isConnecting ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <AtSign className="w-5 h-5 mr-2" />
              )}
              {isConnecting ? 'Connecting...' : 'Connect Powered by Para'}
            </Button>
            

          </div>
        </CardContent>
      </Card>
    </div>
  );
}
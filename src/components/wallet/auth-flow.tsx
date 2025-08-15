"use client";

import { useState, useEffect } from 'react';
import { useAccount, useModal } from "@getpara/react-sdk";
import { useTwitterAuth } from "@/hooks/useTwitterAuth";
import { useExternalWallet } from "@/hooks/useExternalWallet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Twitter, Wallet, CheckCircle, ExternalLink, Loader2 } from "lucide-react";

export function AuthFlow() {
  const { openConnectModal, openWalletModal } = useModal();
  const account = useAccount();
  const { connectTwitter, isConnecting: twitterConnecting, isConnected: twitterConnected } = useTwitterAuth();
  const { connectExternalWallet, isConnecting: walletConnecting, isConnected: walletConnected } = useExternalWallet();
  const [step, setStep] = useState<'connect' | 'twitter' | 'external-wallet' | 'complete'>('connect');

  // Auto-advance steps based on connection status
  useEffect(() => {
    if (account.isConnected && step === 'connect') {
      setStep('twitter');
    } else if (twitterConnected && step === 'twitter') {
      setStep('external-wallet');
    } else if (walletConnected && step === 'external-wallet') {
      setStep('complete');
    }
  }, [account.isConnected, twitterConnected, walletConnected, step]);

  const handleTwitterAuth = async () => {
    await connectTwitter();
  };

  const handleExternalWallet = async () => {
    await connectExternalWallet();
  };

  const getStepStatus = (targetStep: string) => {
    const steps = ['connect', 'twitter', 'external-wallet', 'complete'];
    const currentIndex = steps.indexOf(step);
    const targetIndex = steps.indexOf(targetStep);
    
    if (targetIndex < currentIndex) return 'completed';
    if (targetIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="bg-gray-800 border-blockflirt-purple/30">
        <CardHeader>
          <CardTitle className="text-white text-center">Complete Your BlockFlirt Setup</CardTitle>
          <CardDescription className="text-gray-300 text-center">
            Connect your accounts to start finding Web3 matches
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Steps */}
          <div className="flex justify-between items-center">
            {[
              { key: 'connect', label: 'Connect', icon: Wallet },
              { key: 'twitter', label: 'Twitter', icon: Twitter },
              { key: 'external-wallet', label: 'External Wallet', icon: ExternalLink },
              { key: 'complete', label: 'Complete', icon: CheckCircle }
            ].map(({ key, label, icon: Icon }, index) => {
              const status = getStepStatus(key);
              return (
                <div key={key} className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    status === 'completed' ? 'bg-green-500' :
                    status === 'current' ? 'bg-blockflirt-fuchsia' :
                    'bg-gray-600'
                  }`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-sm ${
                    status === 'current' ? 'text-blockflirt-fuchsia font-semibold' : 'text-gray-400'
                  }`}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Current Step Content */}
          <div className="bg-gray-700 rounded-lg p-6">
            {step === 'connect' && (
              <div className="text-center">
                <h3 className="text-white text-lg font-semibold mb-3">Connect Your Para Wallet</h3>
                <p className="text-gray-300 mb-6">
                  First, connect your Para wallet to get started with BlockFlirt
                </p>
                <Button 
                  onClick={openConnectModal}
                  className="bg-gradient-to-r from-blockflirt-fuchsia to-blockflirt-purple"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Para Wallet
                </Button>
              </div>
            )}

            {step === 'twitter' && (
              <div className="text-center">
                <h3 className="text-white text-lg font-semibold mb-3">Connect Twitter</h3>
                <p className="text-gray-300 mb-6">
                  Connect your Twitter account to analyze your social profile for better matches
                </p>
                <Button 
                  onClick={handleTwitterAuth}
                  disabled={twitterConnecting}
                  className="bg-[#1DA1F2] hover:bg-[#1a91da]"
                >
                  {twitterConnecting ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Twitter className="w-4 h-4 mr-2" />
                  )}
                  {twitterConnecting ? 'Connecting...' : 'Connect Twitter Account'}
                </Button>
              </div>
            )}

            {step === 'external-wallet' && (
              <div className="text-center">
                <h3 className="text-white text-lg font-semibold mb-3">Connect External Wallet</h3>
                <p className="text-gray-300 mb-6">
                  Connect your MetaMask or other wallet to analyze your onchain activity
                </p>
                <Button 
                  onClick={handleExternalWallet}
                  disabled={walletConnecting}
                  className="bg-gradient-to-r from-orange-500 to-yellow-500"
                >
                  {walletConnecting ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <ExternalLink className="w-4 h-4 mr-2" />
                  )}
                  {walletConnecting ? 'Connecting...' : 'Connect External Wallet'}
                </Button>
              </div>
            )}

            {step === 'complete' && (
              <div className="text-center">
                <h3 className="text-white text-lg font-semibold mb-3">Setup Complete! 🎉</h3>
                <p className="text-gray-300 mb-6">
                  Your accounts are connected. Now let's create your Love Persona!
                </p>
                <Button 
                  className="bg-gradient-to-r from-blockflirt-fuchsia to-blockflirt-purple"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Continue to Profile Setup
                </Button>
              </div>
            )}
          </div>

          {/* Account Status */}
          {account.isConnected && (
            <div className="space-y-3">
              <h4 className="text-white font-semibold">Connected Accounts:</h4>
              
              {account.embedded.wallets?.length > 0 && (
                <div className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <Wallet className="w-5 h-5 text-blockflirt-fuchsia" />
                    <div>
                      <p className="text-white font-medium">Para Wallet</p>
                      <p className="text-gray-400 text-sm">
                        {account.embedded.wallets[0].address.slice(0, 8)}...{account.embedded.wallets[0].address.slice(-6)}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-green-500 text-green-500">
                    Connected
                  </Badge>
                </div>
              )}

              {account.external.wallets?.length > 0 && (
                <div className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <ExternalLink className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-white font-medium">External Wallet</p>
                      <p className="text-gray-400 text-sm">
                        {account.external.wallets[0].address.slice(0, 8)}...{account.external.wallets[0].address.slice(-6)}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-green-500 text-green-500">
                    Connected
                  </Badge>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
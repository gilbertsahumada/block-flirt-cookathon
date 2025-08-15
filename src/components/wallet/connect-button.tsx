"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AtSign, User, ExternalLink } from "lucide-react";
import { useAccount, useWallet, useModal, useLogout } from "@getpara/react-sdk";

export function ConnectButton() {
  const { data: account, isLoading: accountLoading } = useAccount();
  const { data: wallet, isLoading: walletLoading } = useWallet();
  const { openModal } = useModal();
  const { logout } = useLogout();

  const handleConnect = () => {
    openModal();
  };

  const handleDisconnect = () => {
    logout();
  };

  if (wallet?.address && wallet?.userId) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-secondary">
          <AtSign className="w-4 h-4" />
          <span className="text-sm font-medium">
            {wallet?.address?.slice(0, 6)}...{wallet?.address?.slice(-4)}
          </span>
        </div>
        <Button 
          onClick={handleDisconnect}
          size="sm"
          className="btn-secondary"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button 
      onClick={handleConnect}
      size="sm"
      className="btn-primary px-6 py-2 text-sm font-semibold rounded-xl"
    >
      <AtSign className="w-4 h-4 mr-2" />
      Connect with X
    </Button>
  );
}
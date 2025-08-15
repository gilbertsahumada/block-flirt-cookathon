"use client";

import Link from "next/link";
import { Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConnectButton } from "@/components/wallet/connect-button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--accent)' }}>
            <Heart className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-primary">BlockFlirt</span>
        </Link>

        {/* Right: Profile + Connect */}
        <div className="flex items-center gap-3">
          <Link href="/profile">
            <Button size="sm" className="btn-secondary rounded-xl">
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
          </Link>
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}
"use client";
import { useState } from "react";
import UserBoatPanel from "./components/UserBoatPanel";
import { Header } from "./components/Header";
import { RenderGameArea } from "./components/RenderGameArea";
import { MainContainer } from "./components/MainContainer";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { ShipArea } from "./components/ShipArea";
import { RankingSection } from "./components/RankingSection";
import { EcosystemDashboard } from "./components/EcosystemDashboard";
import { ReferralModal } from "./components/ReferralModal";
import { useThirdweb } from "./libs/hooks/useThirdweb";
import { usePlayer } from "./libs/providers/player-provider";
import Button from "./components/Button";

export default function Home() {
  const { isConnected } = useThirdweb();
  const { playerAccount } = usePlayer();
  const hasAccount = playerAccount !== null;
  const [showReferralModal, setShowReferralModal] = useState(false);

  // Only show ecosystem dashboard if connected and has account
  const showDashboard = isConnected && hasAccount;

  return (
    <MainContainer>
      <Header />
      <RenderGameArea>
        <ShipArea />
      </RenderGameArea>
      <UserBoatPanel />
      <RankingSection />
      <WelcomeScreen />

      {/* New Mantle Ecosystem Features Dashboard - Minimized Version */}
      {showDashboard && (
        <div className="fixed bottom-[380px] right-[20px] z-10 max-w-[280px]">
          <EcosystemDashboard />
        </div>
      )}

      {/* Invite Your Friends Button - Only show when user has account */}
      {showDashboard && (
        <div className="fixed bottom-[20px] right-[10px] z-10">
          <Button
            variant="primary"
            onClick={() => setShowReferralModal(true)}
            className="!px-6 !py-3 text-sm font-bold shadow-lg hover:scale-105 transition-transform"
          >
            🎁 Invite
          </Button>
        </div>
      )}

      {/* Referral Modal */}
      <ReferralModal
        isOpen={showReferralModal}
        onClose={() => setShowReferralModal(false)}
      />
    </MainContainer>
  );
}

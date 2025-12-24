"use client";
import UserBoatPanel from "./components/UserBoatPanel";
import { Header } from "./components/Header";
import { RenderGameArea } from "./components/RenderGameArea";
import { MainContainer } from "./components/MainContainer";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { ShipArea } from "./components/ShipArea";
import { RankingSection } from "./components/RankingSection";
import { EcosystemDashboard } from "./components/EcosystemDashboard";
import { useThirdweb } from "./libs/hooks/useThirdweb";
import { usePlayer } from "./libs/providers/player-provider";

export default function Home() {
  const { isConnected } = useThirdweb();
  const { playerAccount } = usePlayer();
  const hasAccount = playerAccount !== null;

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

      {/* New Mantle Ecosystem Features Dashboard */}
      {showDashboard && (
        <div className="fixed top-[20px] right-[20px] z-20 max-w-md">
          <EcosystemDashboard />
        </div>
      )}
    </MainContainer>
  );
}

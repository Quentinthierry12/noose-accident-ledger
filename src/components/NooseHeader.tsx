import { Shield, AlertTriangle, Trophy, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import nooseLogo from "@/assets/noose-logo.png";

export const NooseHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="w-full bg-gradient-to-r from-noose-blue to-noose-accent text-white shadow-lg border-b-4 border-noose-light-blue">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src={nooseLogo} 
              alt="NOOSE Logo" 
              className="w-16 h-16 rounded-full border-2 border-white shadow-lg"
            />
            <div>
              <h1 className="text-3xl font-bold tracking-wider">NOOSE</h1>
              <p className="text-sm opacity-90">National Office of Security Enforcement</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-2">
              <Button 
                variant={location.pathname === "/" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => navigate("/")}
                className="gap-2 text-white hover:bg-white/20"
              >
                <Home className="w-4 h-4" />
                Accueil
              </Button>
              <Button 
                variant={location.pathname === "/leaderboard" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => navigate("/leaderboard")}
                className="gap-2 text-white hover:bg-white/20"
              >
                <Trophy className="w-4 h-4" />
                Palmarès
              </Button>
            </nav>
            
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur">
              <AlertTriangle className="w-5 h-5 text-alert-red animate-pulse" />
              <span className="text-sm font-medium">MUR DES ACCIDENTS</span>
              <Shield className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
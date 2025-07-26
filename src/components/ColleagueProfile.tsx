import { useState, useEffect } from "react";
import { User, AlertCircle, DollarSign, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface ColleagueProfile {
  id: string;
  name: string;
  surname: string;
  nickname: string | null;
  photo_url: string | null;
  total_accidents: number;
  total_cost: number;
}

export const ColleagueProfile = () => {
  const [profile, setProfile] = useState<ColleagueProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const randomQuotes = [
    "Ce collègue est un danger public.",
    "Chaque jour sans incident est une victoire.",
    "Sponsor officiel de la casse automobile.",
    "Le budget annuel vient d'exploser.",
    "Catastrophe ambulante certifiée NOOSE.",
    "Formation anti-accident requise d'urgence.",
    "Assurance responsabilité civile recommandée.",
  ];

  const randomQuote = randomQuotes[Math.floor(Math.random() * randomQuotes.length)];

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("noose_colleague_profile")
        .select("*")
        .limit(1)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error("Erreur lors du chargement du profil:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="border-noose-blue/20 shadow-lg">
        <CardContent className="p-6 text-center">
          <div className="animate-pulse">Chargement du profil...</div>
        </CardContent>
      </Card>
    );
  }

  if (!profile) {
    return (
      <Card className="border-alert-red/20 shadow-lg">
        <CardContent className="p-6 text-center text-alert-red">
          Profil non trouvé
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-noose-blue/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-noose-blue/10 to-noose-accent/10">
        <CardTitle className="flex items-center gap-2 text-noose-blue">
          <User className="w-6 h-6" />
          Profil de l&apos;Agent
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Photo et infos de base */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-noose-blue to-noose-accent flex items-center justify-center mb-4 shadow-lg">
              {profile.photo_url ? (
                <img 
                  src={profile.photo_url} 
                  alt={`${profile.name} ${profile.surname}`}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-white" />
              )}
            </div>
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold text-noose-blue">
                {profile.name} {profile.surname}
              </h2>
              {profile.nickname && (
                <p className="text-lg text-muted-foreground italic">
                  &quot;{profile.nickname}&quot;
                </p>
              )}
            </div>
          </div>

          {/* Statistiques */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-alert-red/10 p-4 rounded-lg border border-alert-red/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-alert-red" />
                <span className="text-sm font-medium text-alert-red">Total Accidents</span>
              </div>
              <div className="text-3xl font-bold text-alert-red">
                {profile.total_accidents}
              </div>
            </div>

            <div className="bg-money-green/10 p-4 rounded-lg border border-money-green/20">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-money-green" />
                <span className="text-sm font-medium text-money-green">Coût Total</span>
              </div>
              <div className="text-2xl font-bold text-money-green">
                ${profile.total_cost.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Citation humoristique */}
        <div className="mt-6 p-4 bg-noose-light-blue/10 rounded-lg border border-noose-blue/20">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-noose-blue" />
            <span className="text-sm font-medium text-noose-blue">Citation du jour</span>
          </div>
          <p className="text-lg italic text-noose-blue font-medium">
            &quot;{randomQuote}&quot;
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
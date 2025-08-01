import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, DollarSign, Target, User, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { NooseHeader } from "@/components/NooseHeader";

interface AgentStats {
  id: string;
  name: string;
  agent_number: number;
  total_accidents: number;
  total_cost: number;
  combined_score: number;
  accidents_by_type: {
    bateau: number;
    voiture: number;
    avion: number;
    moto: number;
    autre: number;
  };
}

const Leaderboard = () => {
  const [agentStats, setAgentStats] = useState<AgentStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgentStats();
  }, []);

  const fetchAgentStats = async () => {
    try {
      const { data: agents, error } = await supabase
        .from('noose_agents')
        .select('id, name, agent_number, total_accidents, total_cost')
        .order('total_accidents', { ascending: false });

      if (error) throw error;

      // Récupérer les accidents par type pour chaque agent
      const agentsWithTypeStats = await Promise.all(
        (agents || []).map(async (agent) => {
          const { data: accidents } = await supabase
            .from('noose_accidents')
            .select('accident_type')
            .eq('agent_id', agent.id);

          const accidents_by_type = {
            bateau: accidents?.filter(a => a.accident_type === 'bateau').length || 0,
            voiture: accidents?.filter(a => a.accident_type === 'voiture').length || 0,
            avion: accidents?.filter(a => a.accident_type === 'avion').length || 0,
            moto: accidents?.filter(a => a.accident_type === 'moto').length || 0,
            autre: accidents?.filter(a => a.accident_type === 'autre').length || 0,
          };

          return {
            ...agent,
            combined_score: agent.total_accidents * Number(agent.total_cost),
            accidents_by_type,
          };
        })
      );

      setAgentStats(agentsWithTypeStats);
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTopAgentsByAccidents = () => {
    return [...agentStats].sort((a, b) => b.total_accidents - a.total_accidents).slice(0, 10);
  };

  const getTopAgentsByCost = () => {
    return [...agentStats].sort((a, b) => Number(b.total_cost) - Number(a.total_cost)).slice(0, 10);
  };

  const getTopAgentsByCombinedScore = () => {
    return [...agentStats].sort((a, b) => b.combined_score - a.combined_score).slice(0, 10);
  };

  const getTopAgentsByType = (type: keyof AgentStats['accidents_by_type']) => {
    return [...agentStats]
      .filter(agent => agent.accidents_by_type[type] > 0)
      .sort((a, b) => b.accidents_by_type[type] - a.accidents_by_type[type])
      .slice(0, 5);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
    if (rank === 2) return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
    if (rank === 3) return "bg-gradient-to-r from-amber-600 to-amber-800 text-white";
    return "bg-muted text-muted-foreground";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-noose-light-blue/20">
        <NooseHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-lg">Chargement des statistiques...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-noose-light-blue/20">
      <NooseHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-noose-blue mb-2">🏆 Palmarès NOOSE</h1>
          <p className="text-lg text-muted-foreground">Classement des performances... humoristiques</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Most Accidents */}
          <Card className="border-alert-red/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-alert-red/10 to-alert-red/5">
              <CardTitle className="flex items-center gap-2 text-alert-red">
                <Trophy className="w-6 h-6" />
                Plus d'Accidents
              </CardTitle>
              <CardDescription>
                Agents avec le plus grand nombre d'incidents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              {getTopAgentsByAccidents().map((agent, index) => (
                <div key={agent.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Badge className={getRankBadgeColor(index + 1)}>
                      #{index + 1}
                    </Badge>
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-sm text-muted-foreground">Agent #{agent.agent_number}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-alert-red">{agent.total_accidents}</p>
                    <p className="text-xs text-muted-foreground">accidents</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Highest Cost */}
          <Card className="border-money-green/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-money-green/10 to-money-green/5">
              <CardTitle className="flex items-center gap-2 text-money-green">
                <DollarSign className="w-6 h-6" />
                Coût Total le Plus Élevé
              </CardTitle>
              <CardDescription>
                Agents générant le plus de dégâts financiers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              {getTopAgentsByCost().map((agent, index) => (
                <div key={agent.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Badge className={getRankBadgeColor(index + 1)}>
                      #{index + 1}
                    </Badge>
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-sm text-muted-foreground">Agent #{agent.agent_number}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-money-green">
                      {formatCurrency(Number(agent.total_cost))}
                    </p>
                    <p className="text-xs text-muted-foreground">coût total</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Combined Record */}
          <Card className="border-noose-accent/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-noose-accent/10 to-noose-accent/5">
              <CardTitle className="flex items-center gap-2 text-noose-accent">
                <Target className="w-6 h-6" />
                Record Combiné
              </CardTitle>
              <CardDescription>
                Score = Accidents × Coût Total
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              {getTopAgentsByCombinedScore().map((agent, index) => (
                <div key={agent.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Badge className={getRankBadgeColor(index + 1)}>
                      #{index + 1}
                    </Badge>
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-sm text-muted-foreground">Agent #{agent.agent_number}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-noose-accent">
                      {agent.combined_score.toLocaleString('fr-FR')}
                    </p>
                    <p className="text-xs text-muted-foreground">score combiné</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Palmarès par Type d'Accident */}
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-noose-blue mb-6 text-center">🏆 Palmarès par Type d'Accident</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Accidents Bateau */}
            <Card className="border-blue-500/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-500/5">
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  🚤 Accidents Bateau
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-4">
                {getTopAgentsByType('bateau').map((agent, index) => (
                  <div key={agent.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Badge className={getRankBadgeColor(index + 1)}>#{index + 1}</Badge>
                      <div>
                        <p className="font-medium text-sm">{agent.name}</p>
                        <p className="text-xs text-muted-foreground">Agent #{agent.agent_number}</p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-blue-600">{agent.accidents_by_type.bateau}</p>
                  </div>
                ))}
                {getTopAgentsByType('bateau').length === 0 && (
                  <p className="text-center text-muted-foreground text-sm py-4">Aucun accident bateau</p>
                )}
              </CardContent>
            </Card>

            {/* Accidents Voiture */}
            <Card className="border-red-500/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-500/10 to-red-500/5">
                <CardTitle className="flex items-center gap-2 text-red-600">
                  🚗 Accidents Voiture
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-4">
                {getTopAgentsByType('voiture').map((agent, index) => (
                  <div key={agent.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Badge className={getRankBadgeColor(index + 1)}>#{index + 1}</Badge>
                      <div>
                        <p className="font-medium text-sm">{agent.name}</p>
                        <p className="text-xs text-muted-foreground">Agent #{agent.agent_number}</p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-red-600">{agent.accidents_by_type.voiture}</p>
                  </div>
                ))}
                {getTopAgentsByType('voiture').length === 0 && (
                  <p className="text-center text-muted-foreground text-sm py-4">Aucun accident voiture</p>
                )}
              </CardContent>
            </Card>

            {/* Accidents Avion */}
            <Card className="border-green-500/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-500/10 to-green-500/5">
                <CardTitle className="flex items-center gap-2 text-green-600">
                  ✈️ Accidents Avion
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-4">
                {getTopAgentsByType('avion').map((agent, index) => (
                  <div key={agent.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Badge className={getRankBadgeColor(index + 1)}>#{index + 1}</Badge>
                      <div>
                        <p className="font-medium text-sm">{agent.name}</p>
                        <p className="text-xs text-muted-foreground">Agent #{agent.agent_number}</p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-green-600">{agent.accidents_by_type.avion}</p>
                  </div>
                ))}
                {getTopAgentsByType('avion').length === 0 && (
                  <p className="text-center text-muted-foreground text-sm py-4">Aucun accident avion</p>
                )}
              </CardContent>
            </Card>

            {/* Accidents Moto */}
            <Card className="border-orange-500/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-500/10 to-orange-500/5">
                <CardTitle className="flex items-center gap-2 text-orange-600">
                  🏍️ Accidents Moto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-4">
                {getTopAgentsByType('moto').map((agent, index) => (
                  <div key={agent.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Badge className={getRankBadgeColor(index + 1)}>#{index + 1}</Badge>
                      <div>
                        <p className="font-medium text-sm">{agent.name}</p>
                        <p className="text-xs text-muted-foreground">Agent #{agent.agent_number}</p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-orange-600">{agent.accidents_by_type.moto}</p>
                  </div>
                ))}
                {getTopAgentsByType('moto').length === 0 && (
                  <p className="text-center text-muted-foreground text-sm py-4">Aucun accident moto</p>
                )}
              </CardContent>
            </Card>

            {/* Autres Accidents */}
            <Card className="border-purple-500/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-500/10 to-purple-500/5">
                <CardTitle className="flex items-center gap-2 text-purple-600">
                  🔧 Autres Accidents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-4">
                {getTopAgentsByType('autre').map((agent, index) => (
                  <div key={agent.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Badge className={getRankBadgeColor(index + 1)}>#{index + 1}</Badge>
                      <div>
                        <p className="font-medium text-sm">{agent.name}</p>
                        <p className="text-xs text-muted-foreground">Agent #{agent.agent_number}</p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-purple-600">{agent.accidents_by_type.autre}</p>
                  </div>
                ))}
                {getTopAgentsByType('autre').length === 0 && (
                  <p className="text-center text-muted-foreground text-sm py-4">Aucun autre accident</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Statistics Summary */}
        <Card className="mt-8 border-noose-blue/20 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-noose-blue/10 to-noose-blue/5">
            <CardTitle className="flex items-center gap-2 text-noose-blue">
              <TrendingUp className="w-6 h-6" />
              Statistiques Générales
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-noose-blue">{agentStats.length}</p>
                <p className="text-sm text-muted-foreground">Agents Total</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-alert-red">
                  {agentStats.reduce((sum, agent) => sum + agent.total_accidents, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Accidents Total</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-money-green">
                  {formatCurrency(agentStats.reduce((sum, agent) => sum + Number(agent.total_cost), 0))}
                </p>
                <p className="text-sm text-muted-foreground">Coût Total</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-noose-accent">
                  {Math.round(agentStats.reduce((sum, agent) => sum + agent.total_accidents, 0) / agentStats.length || 0)}
                </p>
                <p className="text-sm text-muted-foreground">Accidents Moyens</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Leaderboard;
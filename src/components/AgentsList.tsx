import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, User, AlertTriangle, DollarSign, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Agent {
  id: string;
  name: string;
  agent_number: number;
  total_accidents: number;
  total_cost: number;
  created_at: string;
}

interface AgentsListProps {
  onAgentSelect?: (agentId: string) => void;
  refreshTrigger?: number;
}

export const AgentsList = ({ onAgentSelect, refreshTrigger }: AgentsListProps) => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [newAgentName, setNewAgentName] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchAgents();
  }, [refreshTrigger]);

  const fetchAgents = async () => {
    try {
      const { data, error } = await supabase
        .from('noose_agents')
        .select('*')
        .order('agent_number', { ascending: true });

      if (error) throw error;
      setAgents(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des agents:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les agents",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAgent = async () => {
    if (!newAgentName.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom de l'agent est requis",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);
    try {
      const { error } = await supabase
        .from('noose_agents')
        .insert([{ name: newAgentName.trim() }]);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Agent créé avec succès",
      });

      setNewAgentName("");
      setIsCreating(false);
      fetchAgents();
    } catch (error) {
      console.error('Erreur lors de la création de l\'agent:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer l'agent",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.agent_number.toString().includes(searchTerm)
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Chargement des agents...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-noose-blue/20">
      <CardHeader className="bg-gradient-to-r from-noose-blue/10 to-noose-blue/5">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-noose-blue">
              <User className="w-6 h-6" />
              Agents NOOSE
            </CardTitle>
            <CardDescription>
              Gestion des agents et de leurs statistiques
            </CardDescription>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Nouvel Agent
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Créer un Nouvel Agent</DialogTitle>
                <DialogDescription>
                  Ajouter un nouvel agent à la base de données NOOSE
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label htmlFor="agentName" className="text-sm font-medium">
                    Nom de l'Agent
                  </label>
                  <Input
                    id="agentName"
                    placeholder="Ex: Agent Smith"
                    value={newAgentName}
                    onChange={(e) => setNewAgentName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCreateAgent()}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleCreateAgent} disabled={isCreating} className="flex-1">
                    {isCreating ? "Création..." : "Créer l'Agent"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="flex items-center gap-2 mt-4">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un agent..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {filteredAgents.length === 0 ? (
          <div className="text-center py-8">
            <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {searchTerm ? "Aucun agent trouvé" : "Aucun agent enregistré"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAgents.map((agent) => (
              <Card 
                key={agent.id} 
                className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-noose-blue"
                onClick={() => onAgentSelect?.(agent.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{agent.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        Agent #{agent.agent_number}
                      </Badge>
                    </div>
                    <User className="w-8 h-8 text-noose-blue" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4 text-alert-red" />
                        <span>Accidents:</span>
                      </div>
                      <span className="font-semibold text-alert-red">
                        {agent.total_accidents}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-money-green" />
                        <span>Coût:</span>
                      </div>
                      <span className="font-semibold text-money-green">
                        {formatCurrency(Number(agent.total_cost))}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
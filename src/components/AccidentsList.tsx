import { useState, useEffect } from "react";
import { Calendar, FileText, DollarSign, User, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface Accident {
  id: string;
  date: string;
  description: string;
  cost: number;
  added_by: string;
  created_at: string;
}

interface AccidentsListProps {
  refreshTrigger: number;
}

export const AccidentsList = ({ refreshTrigger }: AccidentsListProps) => {
  const [accidents, setAccidents] = useState<Accident[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccidents();
  }, [refreshTrigger]);

  const fetchAccidents = async () => {
    try {
      const { data, error } = await supabase
        .from("noose_accidents")
        .select("*")
        .order("date", { ascending: false });

      if (error) throw error;
      setAccidents(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des accidents:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit", 
      year: "numeric"
    });
  };

  const getCostColor = (cost: number) => {
    if (cost === 0) return "text-muted-foreground";
    if (cost < 100) return "text-money-green";
    if (cost < 1000) return "text-noose-accent";
    return "text-alert-red";
  };

  if (loading) {
    return (
      <Card className="border-noose-blue/20 shadow-lg">
        <CardContent className="p-6 text-center">
          <div className="animate-pulse">Chargement du journal des accidents...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-noose-blue/20 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-noose-blue/10 to-noose-accent/10">
        <CardTitle className="flex items-center gap-2 text-noose-blue">
          <AlertTriangle className="w-6 h-6" />
          Journal des Incidents ({accidents.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {accidents.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Aucun accident enregistré pour le moment.</p>
            <p className="text-sm">C&apos;est un miracle !</p>
          </div>
        ) : (
          <div className="space-y-4">
            {accidents.map((accident, index) => (
              <div 
                key={accident.id}
                className="border border-noose-blue/10 rounded-lg p-4 hover:bg-noose-light-blue/5 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        #{accidents.length - index}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {formatDate(accident.date)}
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2 mb-2">
                      <FileText className="w-4 h-4 text-noose-blue mt-1 flex-shrink-0" />
                      <p className="text-foreground">{accident.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      Signalé par: {accident.added_by}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <DollarSign className="w-4 h-4" />
                      <span className={`text-lg font-bold ${getCostColor(accident.cost)}`}>
                        {accident.cost === 0 ? "Gratuit" : `$${accident.cost.toLocaleString()}`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
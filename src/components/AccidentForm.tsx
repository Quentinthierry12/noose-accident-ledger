import { useState } from "react";
import { Plus, Calendar, FileText, DollarSign, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AccidentFormProps {
  onAccidentAdded: () => void;
}

export const AccidentForm = ({ onAccidentAdded }: AccidentFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: "",
    cost: "",
    added_by: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.description || !formData.added_by) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("noose_accidents")
        .insert({
          date: formData.date,
          description: formData.description,
          cost: parseFloat(formData.cost) || 0,
          added_by: formData.added_by,
        });

      if (error) throw error;

      toast({
        title: "Accident ajouté !",
        description: "L'incident a été enregistré avec succès.",
      });

      // Réinitialiser le formulaire
      setFormData({
        date: new Date().toISOString().split('T')[0],
        description: "",
        cost: "",
        added_by: "",
      });

      setIsOpen(false);
      onAccidentAdded();
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter l'accident.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="text-center">
        <Button 
          onClick={() => setIsOpen(true)}
          variant="alert"
          size="lg"
          className="text-lg px-8 py-3"
        >
          <Plus className="w-5 h-5 mr-2" />
          Signaler un Nouvel Accident
        </Button>
      </div>
    );
  }

  return (
    <Card className="border-alert-red/20 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-alert-red/10 to-alert-red/5">
        <CardTitle className="flex items-center gap-2 text-alert-red">
          <Plus className="w-6 h-6" />
          Nouveau Rapport d&apos;Incident
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date de l&apos;incident *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="border-noose-blue/20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cost" className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Coût estimé ($)
              </Label>
              <Input
                id="cost"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                className="border-noose-blue/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Description de l&apos;incident *
            </Label>
            <Textarea
              id="description"
              placeholder="Ex: A renversé une voiture, A tiré sur une poubelle, A cassé la machine à café..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="border-noose-blue/20 min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="added_by" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Signalé par *
            </Label>
            <Input
              id="added_by"
              placeholder="Votre nom ou badge"
              value={formData.added_by}
              onChange={(e) => setFormData({ ...formData, added_by: e.target.value })}
              className="border-noose-blue/20"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              variant="alert" 
              disabled={loading}
              className="flex-1"
            >
              {loading ? "Enregistrement..." : "Enregistrer l'Incident"}
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="px-8"
            >
              Annuler
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
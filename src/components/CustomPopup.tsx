import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PopupData {
  id: string;
  title: string;
  image_url: string | null;
  redirect_url: string;
  is_active: boolean;
  display_order: number;
}

export const CustomPopup = () => {
  const [popups, setPopups] = useState<PopupData[]>([]);
  const [currentPopupIndex, setCurrentPopupIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    fetchPopups();
  }, []);

  useEffect(() => {
    if (popups.length > 0 && !hasShown) {
      // Show popup after a short delay
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasShown(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [popups, hasShown]);

  const fetchPopups = async () => {
    try {
      const { data, error } = await supabase
        .from('noose_custom_popups')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setPopups(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des popups:', error);
    }
  };

  const handleRedirect = () => {
    if (popups[currentPopupIndex]) {
      window.open(popups[currentPopupIndex].redirect_url, '_blank');
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleNext = () => {
    if (currentPopupIndex < popups.length - 1) {
      setCurrentPopupIndex(currentPopupIndex + 1);
    } else {
      setIsOpen(false);
    }
  };

  if (popups.length === 0) {
    return null;
  }

  const currentPopup = popups[currentPopupIndex];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-noose-blue">{currentPopup.title}</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          {currentPopup.image_url && (
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={currentPopup.image_url}
                alt={currentPopup.title}
                className="w-full h-48 object-cover"
              />
            </div>
          )}
          
          <div className="flex gap-2">
            <Button 
              onClick={handleRedirect}
              className="flex-1 gap-2"
              variant="default"
            >
              <ExternalLink className="w-4 h-4" />
              Ouvrir le lien
            </Button>
            
            {popups.length > 1 && currentPopupIndex < popups.length - 1 && (
              <Button 
                onClick={handleNext}
                variant="outline"
              >
                Suivant
              </Button>
            )}
          </div>
          
          {popups.length > 1 && (
            <div className="text-center text-sm text-muted-foreground">
              {currentPopupIndex + 1} sur {popups.length}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
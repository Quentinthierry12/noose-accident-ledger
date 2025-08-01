-- Ajouter le champ accident_type à la table noose_accidents
ALTER TABLE public.noose_accidents 
ADD COLUMN accident_type TEXT NOT NULL DEFAULT 'autre';

-- Créer un check constraint pour valider les types d'accidents
ALTER TABLE public.noose_accidents 
ADD CONSTRAINT valid_accident_type 
CHECK (accident_type IN ('bateau', 'voiture', 'avion', 'moto', 'autre'));
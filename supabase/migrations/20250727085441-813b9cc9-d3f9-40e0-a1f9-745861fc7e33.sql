-- Create daily quotes table
CREATE TABLE public.noose_daily_quotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quote TEXT NOT NULL,
  author TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for daily quotes
ALTER TABLE public.noose_daily_quotes ENABLE ROW LEVEL SECURITY;

-- Create policies for daily quotes
CREATE POLICY "Anyone can view daily quotes" 
ON public.noose_daily_quotes 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create daily quotes" 
ON public.noose_daily_quotes 
FOR INSERT 
WITH CHECK (true);

-- Create custom popups table
CREATE TABLE public.noose_custom_popups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  image_url TEXT,
  redirect_url TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for custom popups
ALTER TABLE public.noose_custom_popups ENABLE ROW LEVEL SECURITY;

-- Create policies for custom popups
CREATE POLICY "Anyone can view custom popups" 
ON public.noose_custom_popups 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create custom popups" 
ON public.noose_custom_popups 
FOR INSERT 
WITH CHECK (true);

-- Add triggers for automatic timestamp updates
CREATE TRIGGER update_daily_quotes_updated_at
BEFORE UPDATE ON public.noose_daily_quotes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_custom_popups_updated_at
BEFORE UPDATE ON public.noose_custom_popups
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample daily quotes
INSERT INTO public.noose_daily_quotes (quote, author) VALUES 
('La sécurité, c''est comme un parachute... quand on en a pas, on s''en rend compte qu''une seule fois !', 'Agent Murphy'),
('Un accident évité vaut mieux que deux accidents déclarés.', 'Proverbe NOOSE'),
('Il n''y a que ceux qui ne font rien qui ne font pas d''erreurs... mais eux, ils font l''erreur de ne rien faire !', 'Agent Wilson'),
('La prudence est la mère de la sûreté... et grand-mère des accidents évités.', 'Dicton du bureau'),
('Un bon agent apprend de ses erreurs, un excellent agent apprend des erreurs des autres.', 'Manuel NOOSE');

-- Insert a sample custom popup
INSERT INTO public.noose_custom_popups (title, image_url, redirect_url, display_order) VALUES 
('Formation Sécurité 2024', 'https://primary.jwwb.nl/public/j/m/k/temp-glvyqhmfrosmufruwlfd/piaa-standard.png', 'https://example.com/formation-securite', 1);
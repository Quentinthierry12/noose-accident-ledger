-- Create table for tracking colleague's accidents
CREATE TABLE public.noose_accidents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  description TEXT NOT NULL,
  cost DECIMAL(10,2) NOT NULL DEFAULT 0,
  added_by TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for colleague profile
CREATE TABLE public.noose_colleague_profile (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  surname TEXT NOT NULL,
  nickname TEXT,
  photo_url TEXT,
  total_accidents INTEGER NOT NULL DEFAULT 0,
  total_cost DECIMAL(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.noose_accidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.noose_colleague_profile ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (everyone can read and write)
CREATE POLICY "Anyone can view accidents" 
ON public.noose_accidents 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can add accidents" 
ON public.noose_accidents 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view colleague profile" 
ON public.noose_colleague_profile 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can update colleague profile" 
ON public.noose_colleague_profile 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can create colleague profile" 
ON public.noose_colleague_profile 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_noose_accidents_updated_at
BEFORE UPDATE ON public.noose_accidents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_noose_colleague_profile_updated_at
BEFORE UPDATE ON public.noose_colleague_profile
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to update totals when accidents are added
CREATE OR REPLACE FUNCTION public.update_colleague_totals()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.noose_colleague_profile 
  SET 
    total_accidents = (SELECT COUNT(*) FROM public.noose_accidents),
    total_cost = (SELECT COALESCE(SUM(cost), 0) FROM public.noose_accidents),
    updated_at = now()
  WHERE id = (SELECT id FROM public.noose_colleague_profile LIMIT 1);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update totals automatically
CREATE TRIGGER update_totals_on_accident_insert
AFTER INSERT ON public.noose_accidents
FOR EACH ROW
EXECUTE FUNCTION public.update_colleague_totals();

-- Insert default colleague profile
INSERT INTO public.noose_colleague_profile (name, surname, nickname)
VALUES ('Agent', 'Maladroit', 'Le Catastrophe Ambulante');
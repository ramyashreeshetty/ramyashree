-- Create flowers table for shared garden
CREATE TABLE public.flowers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  x NUMERIC NOT NULL,
  y NUMERIC NOT NULL,
  color TEXT NOT NULL,
  type TEXT NOT NULL,
  scale NUMERIC NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.flowers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read flowers (public portfolio)
CREATE POLICY "Anyone can view flowers"
ON public.flowers
FOR SELECT
USING (true);

-- Allow anyone to insert flowers (visitors can plant)
CREATE POLICY "Anyone can plant flowers"
ON public.flowers
FOR INSERT
WITH CHECK (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.flowers;
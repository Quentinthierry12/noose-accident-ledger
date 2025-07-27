import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface DailyQuote {
  id: string;
  quote: string;
  author: string | null;
}

export const DailyQuote = () => {
  const [quote, setQuote] = useState<DailyQuote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDailyQuote();
  }, []);

  const fetchDailyQuote = async () => {
    try {
      const { data: quotes, error } = await supabase
        .from('noose_daily_quotes')
        .select('*')
        .eq('is_active', true);

      if (error) throw error;

      if (quotes && quotes.length > 0) {
        // Get a random quote based on the current date (ensures same quote per day)
        const today = new Date().toDateString();
        const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const randomIndex = seed % quotes.length;
        setQuote(quotes[randomIndex]);
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la citation:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !quote) {
    return null;
  }

  return (
    <Card className="border-noose-accent/20 bg-gradient-to-r from-noose-accent/5 to-noose-blue/5 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Quote className="w-8 h-8 text-noose-accent flex-shrink-0 mt-1" />
          <div className="space-y-2">
            <blockquote className="text-lg italic text-foreground leading-relaxed">
              "{quote.quote}"
            </blockquote>
            {quote.author && (
              <cite className="text-sm text-muted-foreground font-medium block">
                — {quote.author}
              </cite>
            )}
            <div className="text-xs text-noose-accent font-semibold">
              Citation du jour NOOSE
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
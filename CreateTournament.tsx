import { Layout } from "@/components/Layout";
import { useContent } from "@/lib/ContentContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useLocation } from "wouter";
import { Trophy, Calendar, MapPin, Globe, ArrowLeft, Save, Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CreateTournament() {
  const { addTournament, isEditing } = useContent();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    dates: "",
    category: "Open",
    status: "Upcoming" as const,
    link: "",
    country: "Malaysia",
    continent: "Asia"
  });

  if (!isEditing) {
    return (
      <Layout>
        <div className="container py-32 text-center">
          <div className="glass-card p-12 max-w-lg mx-auto border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.1)]">
            <Trophy className="mx-auto h-16 w-16 text-red-500/50 mb-6" />
            <h1 className="text-3xl font-display font-black text-white uppercase mb-4">Access Denied</h1>
            <p className="text-muted-foreground uppercase text-[10px] font-bold tracking-[0.2em] mb-8">
              You must be in Admin Edit Mode to create new tournament entries.
            </p>
            <Button 
              onClick={() => setLocation("/")}
              className="bg-white/5 hover:bg-white/10 text-white border-white/10 rounded-none px-8 py-6 h-auto uppercase text-[10px] font-black tracking-[0.2em]"
            >
              Return to Base
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.location || !formData.dates) {
      toast({
        variant: "destructive",
        title: "Missing Intel",
        description: "Tournament Name, Location, and Dates are required fields.",
      });
      return;
    }

    setIsSubmitting(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    addTournament(formData);
    
    toast({
      title: "Registry Updated",
      description: `${formData.name} has been successfully committed to the database.`,
    });
    
    setIsSubmitting(false);
    setLocation("/tournaments");
  };

  return (
    <Layout>
      <div className="bg-secondary/10 py-20 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,#10B981,transparent_70%)]" />
        <div className="container relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4">
            <Button 
              variant="ghost" 
              onClick={() => setLocation("/tournaments")}
              className="text-primary hover:bg-primary/10 rounded-none -ml-4 gap-2 uppercase text-[10px] font-black tracking-widest"
            >
              <ArrowLeft size={14} /> Back to Registry
            </Button>
            <h1 className="text-5xl md:text-6xl font-display font-black text-white tracking-tight uppercase">
              New <span className="text-primary">Registry</span>
            </h1>
            <p className="text-muted-foreground uppercase text-[10px] font-bold tracking-[0.4em] opacity-60">
              Initialize a professional tournament entry.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 border border-primary/20 px-6 py-3 flex items-center gap-3">
              <Sparkles size={16} className="text-primary animate-pulse" />
              <span className="text-[10px] font-black text-primary uppercase tracking-widest">Premium Entry Mode</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-16 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="glass-card p-10 border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-focus-within:bg-primary transition-colors" />
            
            <div className="grid gap-10 md:grid-cols-2">
              <div className="space-y-3 col-span-full">
                <label className="text-[10px] font-black text-primary/60 tracking-[0.3em] uppercase">Tournament Full Name</label>
                <Input 
                  placeholder="e.g. MALAYSIAN MASTERS 2026" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="bg-black/40 border-white/10 rounded-none h-14 focus:border-primary focus:ring-1 focus:ring-primary text-white font-bold uppercase tracking-widest px-6"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-primary/60 tracking-[0.3em] uppercase">Primary Venue</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40" />
                  <Input 
                    placeholder="Location / City" 
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    className="bg-black/40 border-white/10 rounded-none h-14 pl-12 focus:border-primary focus:ring-1 focus:ring-primary text-white font-bold uppercase tracking-widest"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-primary/60 tracking-[0.3em] uppercase">Event Schedule</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40" />
                  <Input 
                    placeholder="Feb 20-25, 2026" 
                    value={formData.dates}
                    onChange={e => setFormData({...formData, dates: e.target.value})}
                    className="bg-black/40 border-white/10 rounded-none h-14 pl-12 focus:border-primary focus:ring-1 focus:ring-primary text-white font-bold uppercase tracking-widest"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-primary/60 tracking-[0.3em] uppercase">Classification</label>
                <Input 
                  placeholder="e.g. Open, U12, U18" 
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="bg-black/40 border-white/10 rounded-none h-14 focus:border-primary focus:ring-1 focus:ring-primary text-white font-bold uppercase tracking-widest px-6"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-primary/60 tracking-[0.3em] uppercase">Registration URL</label>
                <Input 
                  placeholder="https://chess-results.com/..." 
                  value={formData.link}
                  onChange={e => setFormData({...formData, link: e.target.value})}
                  className="bg-black/40 border-white/10 rounded-none h-14 focus:border-primary focus:ring-1 focus:ring-primary text-white font-bold uppercase tracking-widest px-6"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-primary/60 tracking-[0.3em] uppercase">Region / Country</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40" />
                  <Input 
                    placeholder="Malaysia" 
                    value={formData.country}
                    onChange={e => setFormData({...formData, country: e.target.value})}
                    className="bg-black/40 border-white/10 rounded-none h-14 pl-12 focus:border-primary focus:ring-1 focus:ring-primary text-white font-bold uppercase tracking-widest"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-primary/60 tracking-[0.3em] uppercase">Initial Status</label>
                <Select 
                  value={formData.status} 
                  onValueChange={(v: any) => setFormData({...formData, status: v})}
                >
                  <SelectTrigger className="bg-black/40 border-white/10 rounded-none h-14 focus:ring-1 focus:ring-primary text-white font-bold uppercase tracking-widest px-6">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-secondary border-white/10 rounded-none text-white">
                    <SelectItem value="Upcoming" className="uppercase text-[10px] font-bold tracking-widest">Upcoming</SelectItem>
                    <SelectItem value="Ongoing" className="uppercase text-[10px] font-bold tracking-widest">Ongoing</SelectItem>
                    <SelectItem value="Completed" className="uppercase text-[10px] font-bold tracking-widest">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-black py-10 rounded-none uppercase tracking-[0.4em] text-xs h-auto shadow-[0_20px_40px_-10px_rgba(16,185,129,0.3)] transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-4">
                  <Loader2 className="h-6 w-6 animate-spin" /> Committing...
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Save size={20} /> Commit to Registry
                </div>
              )}
            </Button>
            
            <Button 
              type="button"
              variant="outline"
              onClick={() => setLocation("/tournaments")}
              className="px-12 py-10 h-auto border-white/10 hover:bg-white/5 text-white font-black uppercase tracking-[0.3em] text-xs rounded-none"
            >
              Abort
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

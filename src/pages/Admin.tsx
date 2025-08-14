import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format, parseISO } from "date-fns";
import { Eye, Download, Search, Filter } from "lucide-react";
import { FunnelDashboard } from "@/components/FunnelDashboard";

interface Lead {
  id: string;
  name: string;
  email: string;
  manifestation_profile: string;
  readiness_score: number;
  primary_desire: string;
  manifestation_frequency: string;
  main_block: string;
  created_at: string;
  utm_source?: string;
  utm_campaign?: string;
  utm_medium?: string;
  utm_term?: string;
  utm_content?: string;
  device_type?: string;
  user_ip?: unknown;
  user_agent?: string;
  referrer?: string;
  facebook_pixel_id?: string;
  bemob_click_id?: string;
  conversion_event_fired?: boolean;
  quiz_started_at?: string;
  quiz_completed_at?: string;
}

interface LeadStats {
  totalLeads: number;
  todayLeads: number;
  avgReadinessScore: number;
  topProfile: string;
}

export default function Admin() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<LeadStats>({
    totalLeads: 0,
    todayLeads: 0,
    avgReadinessScore: 0,
    topProfile: ""
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [profileFilter, setProfileFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    filterLeads();
  }, [leads, searchTerm, profileFilter, dateFilter]);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('quiz_manifestation')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setLeads(data || []);
      calculateStats(data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar dados dos leads",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (leadsData: Lead[]) => {
    const today = new Date().toISOString().split('T')[0];
    const todayLeads = leadsData.filter(lead => 
      lead.created_at.startsWith(today)
    ).length;

    const avgScore = leadsData.length > 0 
      ? leadsData.reduce((sum, lead) => sum + lead.readiness_score, 0) / leadsData.length
      : 0;

    const profileCounts = leadsData.reduce((acc, lead) => {
      acc[lead.manifestation_profile] = (acc[lead.manifestation_profile] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topProfile = Object.entries(profileCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || "";

    setStats({
      totalLeads: leadsData.length,
      todayLeads,
      avgReadinessScore: Math.round(avgScore),
      topProfile
    });
  };

  const filterLeads = () => {
    let filtered = leads;

    // Filtro de busca
    if (searchTerm) {
      filtered = filtered.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro de perfil
    if (profileFilter !== "all") {
      filtered = filtered.filter(lead => 
        lead.manifestation_profile === profileFilter
      );
    }

    // Filtro de data
    if (dateFilter !== "all") {
      const today = new Date();
      let filterDate = new Date();
      
      switch (dateFilter) {
        case "today":
          filterDate = today;
          break;
        case "week":
          filterDate.setDate(today.getDate() - 7);
          break;
        case "month":
          filterDate.setMonth(today.getMonth() - 1);
          break;
      }

      filtered = filtered.filter(lead => 
        new Date(lead.created_at) >= filterDate
      );
    }

    setFilteredLeads(filtered);
  };

  const exportToCSV = () => {
    const headers = [
      'Nome', 'Email', 'Perfil', 'Score', 'Desejo Primário', 
      'Frequência', 'Bloqueio Principal', 'Data', 'UTM Source', 
      'UTM Campaign', 'Dispositivo', 'IP'
    ];
    
    const csvData = filteredLeads.map(lead => [
      lead.name,
      lead.email,
      lead.manifestation_profile,
      lead.readiness_score,
      lead.primary_desire,
      lead.manifestation_frequency,
      lead.main_block,
      format(parseISO(lead.created_at), 'dd/MM/yyyy HH:mm'),
      lead.utm_source || '',
      lead.utm_campaign || '',
      lead.device_type || '',
      lead.user_ip || ''
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `leads_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();

    toast({
      title: "Sucesso",
      description: "Dados exportados com sucesso!"
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-success text-success-foreground";
    if (score >= 60) return "bg-warning text-warning-foreground";
    return "bg-destructive text-destructive-foreground";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard CRM</h1>
          <p className="text-muted-foreground">Gerencie seus leads e analise conversões</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="funnel">Funil Completo</TabsTrigger>
            <TabsTrigger value="leads">Leads Detalhados</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{stats.totalLeads}</div>
              <div className="text-sm text-muted-foreground">Total de Leads</div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{stats.todayLeads}</div>
              <div className="text-sm text-muted-foreground">Leads Hoje</div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">{stats.avgReadinessScore}</div>
              <div className="text-sm text-muted-foreground">Score Médio</div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-center">
              <div className="text-lg font-bold text-accent truncate">{stats.topProfile || "N/A"}</div>
              <div className="text-sm text-muted-foreground">Perfil Mais Comum</div>
            </div>
          </Card>
        </div>

          </TabsContent>

          <TabsContent value="funnel" className="space-y-4">
            <FunnelDashboard />
          </TabsContent>

          <TabsContent value="leads" className="space-y-4">
            {/* Filters and Actions */}
            <Card className="p-6 mb-6">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Buscar por nome ou email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={profileFilter} onValueChange={setProfileFilter}>
                    <SelectTrigger className="w-48">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filtrar por perfil" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Perfis</SelectItem>
                      <SelectItem value="The Spiritual Seeker">Spiritual Seeker</SelectItem>
                      <SelectItem value="The Abundance Blocker">Abundance Blocker</SelectItem>
                      <SelectItem value="The Manifesting Warrior">Manifesting Warrior</SelectItem>
                      <SelectItem value="The Cosmic Connector">Cosmic Connector</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todo período</SelectItem>
                      <SelectItem value="today">Hoje</SelectItem>
                      <SelectItem value="week">Última semana</SelectItem>
                      <SelectItem value="month">Último mês</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={exportToCSV} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Exportar CSV
                </Button>
              </div>
            </Card>

            {/* Leads Table */}
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium">Lead</th>
                      <th className="text-left p-4 font-medium">Perfil</th>
                      <th className="text-left p-4 font-medium">Score</th>
                      <th className="text-left p-4 font-medium">Detalhes</th>
                      <th className="text-left p-4 font-medium">Tracking</th>
                      <th className="text-left p-4 font-medium">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="border-t hover:bg-muted/25 transition-colors">
                        <td className="p-4">
                          <div>
                            <div className="font-medium">{lead.name}</div>
                            <div className="text-sm text-muted-foreground">{lead.email}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className="text-xs">
                            {lead.manifestation_profile}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge className={`${getScoreColor(lead.readiness_score)} text-xs`}>
                            {lead.readiness_score}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="text-sm space-y-1">
                            <div><span className="font-medium">Desejo:</span> {lead.primary_desire}</div>
                            <div><span className="font-medium">Frequência:</span> {lead.manifestation_frequency}</div>
                            <div><span className="font-medium">Bloqueio:</span> {lead.main_block}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm space-y-1">
                            {lead.utm_source && <div><span className="font-medium">Source:</span> {lead.utm_source}</div>}
                            {lead.utm_campaign && <div><span className="font-medium">Campaign:</span> {lead.utm_campaign}</div>}
                            {lead.device_type && <div><span className="font-medium">Device:</span> {lead.device_type}</div>}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm text-muted-foreground">
                            {format(parseISO(lead.created_at), 'dd/MM/yyyy')}
                            <br />
                            {format(parseISO(lead.created_at), 'HH:mm')}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredLeads.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-muted-foreground mb-4">Nenhum lead encontrado</div>
                  <Button onClick={() => {
                    setSearchTerm("");
                    setProfileFilter("all");
                    setDateFilter("all");
                  }}>
                    Limpar Filtros
                  </Button>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useFormData, ConversationalForm, Lead, formatDate } from '@/hooks/useFormData';
import { ArrowLeft, Download, Users, Eye, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LeadManagement() {
  const { id } = useParams();
  const { getForm, getLeads, exportLeadsCSV } = useFormData();
  const { toast } = useToast();
  const [form, setForm] = useState<ConversationalForm | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  const loadData = async () => {
    if (!id) return;

    try {
      const [formData, leadsData] = await Promise.all([
        getForm(id),
        getLeads(id)
      ]);

      if (formData) {
        setForm(formData);
        setLeads(leadsData);
      }
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os dados.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = async () => {
    if (!id) return;

    try {
      const csvContent = await exportLeadsCSV(id);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `leads_${form?.title || 'formulário'}_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      toast({
        title: 'Exportação concluída',
        description: 'Arquivo CSV baixado com sucesso.',
      });
    } catch (error) {
      toast({
        title: 'Erro na exportação',
        description: 'Não foi possível exportar os leads.',
        variant: 'destructive'
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-screen bg-gradient-secondary flex items-center justify-center">
        <Card className="p-8 max-w-md mx-4 text-center shadow-large border-0">
          <h2 className="text-xl font-semibold mb-2">Formulário não encontrado</h2>
          <Link to="/dashboard">
            <Button>Voltar ao Dashboard</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const conversionRate = form.viewCount > 0 
    ? ((form.conversionCount / form.viewCount) * 100).toFixed(1)
    : '0.0';

  return (
    <div className="min-h-screen bg-gradient-secondary">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">{form.title}</h1>
              <p className="text-muted-foreground">Gestão de leads capturados</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={handleExportCSV}
              disabled={leads.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar CSV
            </Button>
            {form.published && (
              <Button
                variant="outline"
                onClick={() => window.open(`/f/${form.slug}`, '_blank')}
              >
                <Eye className="w-4 h-4 mr-2" />
                Ver Formulário
              </Button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-soft border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Visualizações</p>
                  <p className="text-2xl font-bold">{form.viewCount}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Conversões</p>
                  <p className="text-2xl font-bold">{form.conversionCount}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Taxa de Conversão</p>
                  <p className="text-2xl font-bold">{conversionRate}%</p>
                </div>
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge variant={form.published ? "default" : "secondary"} className="mt-1">
                    {form.published ? "Publicado" : "Rascunho"}
                  </Badge>
                </div>
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">
                    {form.published ? '🟢' : '🟡'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leads Table */}
        <Card className="shadow-soft border-0">
          <CardHeader>
            <CardTitle>Leads Capturados ({leads.length})</CardTitle>
            <CardDescription>
              Lista de todos os leads que completaram o formulário
            </CardDescription>
          </CardHeader>
          <CardContent>
            {leads.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Nenhum lead capturado ainda</h3>
                <p className="text-muted-foreground mb-4">
                  Os leads aparecerão aqui quando visitantes completarem o formulário
                </p>
                {form.published && (
                  <Button
                    variant="outline"
                    onClick={() => window.open(`/f/${form.slug}`, '_blank')}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Testar Formulário
                  </Button>
                )}
              </div>
            ) : (
              <div className="rounded-lg overflow-hidden border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      {form.customQuestion && (
                        <TableHead>Resposta Personalizada</TableHead>
                      )}
                      <TableHead>Data de Captura</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell>{lead.email}</TableCell>
                        {form.customQuestion && (
                          <TableCell>{lead.customAnswer || '-'}</TableCell>
                        )}
                        <TableCell className="text-muted-foreground">
                          {formatDate(lead.createdAt)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
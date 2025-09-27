import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useFormData, ConversationalForm } from '@/hooks/useFormData';
import { Plus, Eye, Users, Edit, Trash2, ExternalLink, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Dashboard() {
  const { forms, getForms, deleteForm, loading } = useFormData();
  const [formsList, setFormsList] = useState<ConversationalForm[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async () => {
    const data = await getForms();
    setFormsList(data);
  };

  const handleDelete = async (formId: string) => {
    if (!confirm('Tem certeza que deseja excluir este formulário?')) return;
    
    await deleteForm(formId);
    setFormsList(prev => prev.filter(f => f.id !== formId));
    toast({
      title: 'Formulário excluído',
      description: 'O formulário foi removido com sucesso.',
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copiado!',
      description: 'Link copiado para a área de transferência.',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-secondary">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Meus Formulários</h1>
            <p className="text-muted-foreground">
              Crie formulários conversacionais para capturar leads de forma eficiente
            </p>
          </div>
          <Link to="/forms/new">
            <Button className="bg-gradient-primary hover:opacity-90 shadow-medium">
              <Plus className="w-4 h-4 mr-2" />
              Criar Formulário
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-soft border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total de Formulários</p>
                  <p className="text-2xl font-bold">{formsList.length}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">📝</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total de Visualizações</p>
                  <p className="text-2xl font-bold">
                    {formsList.reduce((acc, form) => acc + form.viewCount, 0)}
                  </p>
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
                  <p className="text-sm font-medium text-muted-foreground">Total de Conversões</p>
                  <p className="text-2xl font-bold">
                    {formsList.reduce((acc, form) => acc + form.conversionCount, 0)}
                  </p>
                </div>
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Forms List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground mt-4">Carregando formulários...</p>
            </div>
          ) : formsList.length === 0 ? (
            <Card className="shadow-soft border-0">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Nenhum formulário criado</h3>
                <p className="text-muted-foreground mb-6">
                  Comece criando seu primeiro formulário conversacional
                </p>
                <Link to="/forms/new">
                  <Button className="bg-gradient-primary hover:opacity-90">
                    Criar Primeiro Formulário
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            formsList.map((form) => (
              <Card key={form.id} className="shadow-soft border-0 hover:shadow-medium transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <CardTitle className="text-lg">{form.title}</CardTitle>
                        <Badge variant={form.published ? "default" : "secondary"}>
                          {form.published ? "Publicado" : "Rascunho"}
                        </Badge>
                      </div>
                      <CardDescription>{form.leadMagnet.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Visualizações</p>
                        <p className="font-semibold">{form.viewCount}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Conversões</p>
                        <p className="font-semibold">{form.conversionCount}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Taxa</p>
                        <p className="font-semibold">
                          {form.viewCount > 0 
                            ? `${Math.round((form.conversionCount / form.viewCount) * 100)}%`
                            : '0%'
                          }
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {form.published && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(`${window.location.origin}/f/${form.slug}`)}
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            Copiar Link
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(`/f/${form.slug}`, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      <Link to={`/forms/${form.id}/leads`}>
                        <Button variant="outline" size="sm">
                          <Users className="w-4 h-4 mr-2" />
                          Leads
                        </Button>
                      </Link>
                      <Link to={`/forms/${form.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(form.id)}
                        className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useFormData, ConversationalForm, generateSlug } from '@/hooks/useFormData';
import { ChatWidget } from '@/components/chat/chat-widget';
import { ArrowLeft, Save, Eye, Upload, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function FormEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getForm, createForm, updateForm, loading } = useFormData();
  const { toast } = useToast();
  const [showPreview, setShowPreview] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    welcomeMessage: 'Oi! 👋 Eu tenho um material incrível para você!',
    nameLabel: 'Primeiro, qual é o seu nome?',
    emailLabel: 'Ótimo, {name}! Qual seu melhor email?',
    customQuestion: '',
    thankYouMessage: 'Perfeito! Seu material está pronto 🎉',
    leadMagnet: {
      title: '',
      description: '',
      type: 'link' as 'file' | 'link',
      url: '',
      coverImage: ''
    }
  });

  const [existingForm, setExistingForm] = useState<ConversationalForm | null>(null);

  useEffect(() => {
    if (id) {
      loadForm();
    }
  }, [id]);

  const loadForm = async () => {
    if (!id) return;
    const form = await getForm(id);
    if (form) {
      setExistingForm(form);
      setFormData({
        title: form.title,
        welcomeMessage: form.welcomeMessage,
        nameLabel: form.nameLabel,
        emailLabel: form.emailLabel,
        customQuestion: form.customQuestion || '',
        thankYouMessage: form.thankYouMessage,
        leadMagnet: {
          title: form.leadMagnet.title,
          description: form.leadMagnet.description,
          type: form.leadMagnet.type,
          url: form.leadMagnet.url,
          coverImage: form.leadMagnet.coverImage || ''
        }
      });
    }
  };

  const handleSave = async (publish = false) => {
    // Validations
    if (!formData.title.trim()) {
      toast({
        title: 'Erro',
        description: 'O título do formulário é obrigatório.',
        variant: 'destructive'
      });
      return;
    }

    if (!formData.leadMagnet.title.trim() || !formData.leadMagnet.url.trim()) {
      toast({
        title: 'Erro',
        description: 'Título e URL do lead magnet são obrigatórios.',
        variant: 'destructive'
      });
      return;
    }

    try {
      const slug = generateSlug(formData.title);
      
      if (existingForm) {
        // Update existing form
        await updateForm(existingForm.id, {
          ...formData,
          slug,
          published: publish,
          leadMagnet: {
            ...formData.leadMagnet,
            id: existingForm.leadMagnet.id
          }
        });
        toast({
          title: publish ? 'Formulário publicado!' : 'Formulário salvo!',
          description: publish 
            ? 'Seu formulário está agora disponível publicamente.'
            : 'Suas alterações foram salvas.',
        });
      } else {
        // Create new form
        const newForm = await createForm({
          ...formData,
          slug,
          published: publish,
          leadMagnet: {
            ...formData.leadMagnet,
            id: `lm_${Date.now()}`
          }
        });
        
        toast({
          title: publish ? 'Formulário criado e publicado!' : 'Formulário criado!',
          description: publish 
            ? 'Seu formulário está agora disponível publicamente.'
            : 'Formulário salvo como rascunho.',
        });

        navigate(`/forms/${newForm.id}/edit`);
      }
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao salvar o formulário. Tente novamente.',
        variant: 'destructive'
      });
    }
  };

  const previewForm: ConversationalForm = {
    id: 'preview',
    title: formData.title || 'Preview',
    slug: 'preview',
    welcomeMessage: formData.welcomeMessage,
    nameLabel: formData.nameLabel,
    emailLabel: formData.emailLabel,
    customQuestion: formData.customQuestion || undefined,
    thankYouMessage: formData.thankYouMessage,
    leadMagnet: {
      ...formData.leadMagnet,
      id: 'preview-lm'
    },
    published: false,
    viewCount: 0,
    conversionCount: 0,
    createdAt: new Date().toISOString()
  };

  if (showPreview) {
    return (
      <div className="min-h-screen bg-gradient-secondary">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="outline"
              onClick={() => setShowPreview(false)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Editor
            </Button>
            <Badge variant="secondary">Preview</Badge>
          </div>

          <div className="max-w-md mx-auto">
            <Card className="shadow-large border-0 overflow-hidden">
              <div className="h-[600px]">
                <ChatWidget 
                  form={previewForm} 
                  onComplete={(data) => console.log('Lead capturado (preview):', data)}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-secondary">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold">
                {existingForm ? 'Editar Formulário' : 'Criar Formulário'}
              </h1>
              <p className="text-muted-foreground">
                Configure seu formulário conversacional
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowPreview(true)}
              disabled={!formData.title.trim()}
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSave(false)}
              disabled={loading}
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
            <Button
              className="bg-gradient-primary hover:opacity-90"
              onClick={() => handleSave(true)}
              disabled={loading}
            >
              Publicar
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Step 1: Lead Magnet Setup */}
          <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-gradient-primary text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <span>Configure seu Lead Magnet</span>
              </CardTitle>
              <CardDescription>
                Defina o material que será entregue aos visitantes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="magnet-title">Título do Material *</Label>
                  <Input
                    id="magnet-title"
                    value={formData.leadMagnet.title}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      leadMagnet: { ...prev.leadMagnet, title: e.target.value }
                    }))}
                    placeholder="Ex: Guia Completo de Marketing Digital"
                  />
                </div>
                <div>
                  <Label htmlFor="magnet-url">URL do Material *</Label>
                  <Input
                    id="magnet-url"
                    value={formData.leadMagnet.url}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      leadMagnet: { ...prev.leadMagnet, url: e.target.value }
                    }))}
                    placeholder="https://exemplo.com/material.pdf"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="magnet-description">Descrição</Label>
                <Textarea
                  id="magnet-description"
                  value={formData.leadMagnet.description}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    leadMagnet: { ...prev.leadMagnet, description: e.target.value }
                  }))}
                  placeholder="Descreva brevemente o material..."
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="cover-image">Imagem de Capa (opcional)</Label>
                <Input
                  id="cover-image"
                  value={formData.leadMagnet.coverImage}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    leadMagnet: { ...prev.leadMagnet, coverImage: e.target.value }
                  }))}
                  placeholder="URL da imagem de capa"
                />
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Form Messages */}
          <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-gradient-primary text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <span>Personalize as Mensagens</span>
              </CardTitle>
              <CardDescription>
                Configure o título e as mensagens do chat
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="form-title">Título do Formulário *</Label>
                <Input
                  id="form-title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ex: Marketing Digital Essencial"
                />
              </div>

              <Separator />

              <div>
                <Label htmlFor="welcome-message">Mensagem de Boas-vindas</Label>
                <Textarea
                  id="welcome-message"
                  value={formData.welcomeMessage}
                  onChange={(e) => setFormData(prev => ({ ...prev, welcomeMessage: e.target.value }))}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="name-label">Pergunta do Nome</Label>
                <Input
                  id="name-label"
                  value={formData.nameLabel}
                  onChange={(e) => setFormData(prev => ({ ...prev, nameLabel: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="email-label">Pergunta do Email</Label>
                <Input
                  id="email-label"
                  value={formData.emailLabel}
                  onChange={(e) => setFormData(prev => ({ ...prev, emailLabel: e.target.value }))}
                  placeholder="Use {name} para personalizar"
                />
              </div>

              <div>
                <Label htmlFor="custom-question">Pergunta Personalizada (opcional)</Label>
                <Input
                  id="custom-question"
                  value={formData.customQuestion}
                  onChange={(e) => setFormData(prev => ({ ...prev, customQuestion: e.target.value }))}
                  placeholder="Ex: Em que área você trabalha?"
                />
              </div>

              <div>
                <Label htmlFor="thank-you-message">Mensagem de Agradecimento</Label>
                <Textarea
                  id="thank-you-message"
                  value={formData.thankYouMessage}
                  onChange={(e) => setFormData(prev => ({ ...prev, thankYouMessage: e.target.value }))}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
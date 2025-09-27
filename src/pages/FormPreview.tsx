import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { ChatWidget } from '@/components/chat/chat-widget';
import { useFormData, ConversationalForm } from '@/hooks/useFormData';
import { AlertCircle } from 'lucide-react';

export default function FormPreview() {
  const { slug } = useParams();
  const { getFormBySlug } = useFormData();
  const [form, setForm] = useState<ConversationalForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadForm();
  }, [slug]);

  const loadForm = async () => {
    if (!slug) {
      setError('Slug do formulário não encontrado');
      setLoading(false);
      return;
    }

    try {
      const formData = await getFormBySlug(slug);
      if (!formData) {
        setError('Formulário não encontrado');
      } else if (!formData.published) {
        setError('Formulário não está disponível publicamente');
      } else {
        setForm(formData);
      }
    } catch (err) {
      setError('Erro ao carregar formulário');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando formulário...</p>
        </div>
      </div>
    );
  }

  if (error || !form) {
    return (
      <div className="min-h-screen bg-gradient-secondary flex items-center justify-center">
        <Card className="p-8 max-w-md mx-4 text-center shadow-large border-0">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Ops! Algo deu errado</h2>
          <p className="text-muted-foreground mb-4">
            {error || 'Formulário não encontrado'}
          </p>
          <p className="text-sm text-muted-foreground">
            Verifique se o link está correto ou entre em contato com o responsável.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-secondary">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card className="shadow-large border-0 overflow-hidden">
            <div className="h-[600px]">
              <ChatWidget 
                form={form} 
                onComplete={(leadData) => {
                  console.log('Lead capturado:', leadData);
                  // Here you could add additional tracking or analytics
                }}
              />
            </div>
          </Card>
          
          {/* Optional: Branding footer */}
          <div className="text-center mt-4">
            <p className="text-xs text-muted-foreground">
              Formulário criado com ❤️ usando ConversaForms
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState, useEffect, useRef } from 'react';
import { ChatBubble } from '@/components/ui/chat-bubble';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ConversationalForm, useFormData } from '@/hooks/useFormData';
import { CheckCircle, Download, ExternalLink } from 'lucide-react';

interface ChatWidgetProps {
  form: ConversationalForm;
  onComplete?: (leadData: any) => void;
}

type ChatStep = 'welcome' | 'name' | 'email' | 'custom' | 'complete';

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
}

export const ChatWidget = ({ form, onComplete }: ChatWidgetProps) => {
  const { createLead, incrementFormView } = useFormData();
  const [currentStep, setCurrentStep] = useState<ChatStep>('welcome');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [leadData, setLeadData] = useState({
    name: '',
    email: '',
    customAnswer: ''
  });
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Track form view
    incrementFormView(form.id);
    
    // Start conversation
    setTimeout(() => {
      addBotMessage(form.welcomeMessage);
      setTimeout(() => {
        addBotMessage(form.nameLabel);
        setCurrentStep('name');
      }, 1000);
    }, 500);
  }, []);

  const addBotMessage = (content: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: `bot_${Date.now()}`,
        type: 'bot',
        content,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 800);
  };

  const addUserMessage = (content: string) => {
    setMessages(prev => [...prev, {
      id: `user_${Date.now()}`,
      type: 'user',
      content,
      timestamp: new Date()
    }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isSubmitting) return;

    const value = inputValue.trim();
    addUserMessage(value);
    setInputValue('');

    if (currentStep === 'name') {
      setLeadData(prev => ({ ...prev, name: value }));
      setTimeout(() => {
        const emailMessage = form.emailLabel.replace('{name}', value);
        addBotMessage(emailMessage);
        setCurrentStep('email');
      }, 500);
    } else if (currentStep === 'email') {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setTimeout(() => {
          addBotMessage('Ops! Por favor, digite um email válido 📧');
        }, 500);
        return;
      }

      setLeadData(prev => ({ ...prev, email: value }));
      
      if (form.customQuestion) {
        setTimeout(() => {
          addBotMessage(form.customQuestion!);
          setCurrentStep('custom');
        }, 500);
      } else {
        await completeLead(value, '');
      }
    } else if (currentStep === 'custom') {
      await completeLead(leadData.email, value);
    }
  };

  const completeLead = async (email: string, customAnswer: string) => {
    setIsSubmitting(true);
    
    const finalLeadData = {
      formId: form.id,
      name: leadData.name,
      email: email,
      customAnswer: customAnswer || undefined
    };

    try {
      await createLead(finalLeadData);
      
      setTimeout(() => {
        addBotMessage(form.thankYouMessage);
        setCurrentStep('complete');
        onComplete?.(finalLeadData);
      }, 500);
    } catch (error) {
      setTimeout(() => {
        addBotMessage('Ops! Algo deu errado. Tente novamente em alguns segundos.');
      }, 500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-chat-background">
      {/* Header */}
      <div className="bg-gradient-primary text-white p-4 rounded-t-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-lg">🤖</span>
          </div>
          <div>
            <h3 className="font-semibold">{form.leadMagnet.title}</h3>
            <p className="text-sm text-white/80">Assistente Virtual</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
          <ChatBubble key={message.id} type={message.type}>
            {message.content}
          </ChatBubble>
        ))}
        {isTyping && (
          <ChatBubble type="bot" isTyping />
        )}
        
        {currentStep === 'complete' && (
          <div className="mt-6 p-4 bg-card rounded-2xl shadow-medium border">
            <div className="flex items-center space-x-2 mb-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="font-semibold text-green-700">Seu material está pronto!</span>
            </div>
            
            <div className="flex items-start space-x-3">
              {form.leadMagnet.coverImage && (
                <img 
                  src={form.leadMagnet.coverImage} 
                  alt={form.leadMagnet.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm mb-1">{form.leadMagnet.title}</h4>
                <p className="text-xs text-muted-foreground mb-3">{form.leadMagnet.description}</p>
                
                <Button 
                  size="sm" 
                  className="bg-gradient-primary hover:opacity-90 transition-opacity"
                  onClick={() => window.open(form.leadMagnet.url, '_blank')}
                >
                  {form.leadMagnet.type === 'file' ? (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Baixar Material
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Acessar Material
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {currentStep !== 'complete' && (
        <div className="p-4 border-t bg-card">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                currentStep === 'name' ? 'Digite seu nome...' :
                currentStep === 'email' ? 'Digite seu email...' :
                'Digite sua resposta...'
              }
              disabled={isSubmitting || isTyping}
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={!inputValue.trim() || isSubmitting || isTyping}
              className="bg-gradient-primary hover:opacity-90"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};
import { useState, useEffect } from 'react';

// Types for our application
export interface LeadMagnet {
  id: string;
  title: string;
  description: string;
  type: 'file' | 'link';
  url: string;
  coverImage?: string;
}

export interface ConversationalForm {
  id: string;
  title: string;
  slug: string;
  welcomeMessage: string;
  nameLabel: string;
  emailLabel: string;
  customQuestion?: string;
  thankYouMessage: string;
  leadMagnet: LeadMagnet;
  published: boolean;
  viewCount: number;
  conversionCount: number;
  createdAt: string;
}

export interface Lead {
  id: string;
  formId: string;
  name: string;
  email: string;
  customAnswer?: string;
  createdAt: string;
}

// Mock data
const MOCK_FORMS: ConversationalForm[] = [
  {
    id: '1',
    title: 'Marketing Digital Essencial',
    slug: 'marketing-digital-essencial',
    welcomeMessage: 'Oi! 👋 Eu tenho um material incrível sobre Marketing Digital para você!',
    nameLabel: 'Primeiro, qual é o seu nome?',
    emailLabel: 'Ótimo, {name}! Qual seu melhor email?',
    customQuestion: 'Em que área você trabalha?',
    thankYouMessage: 'Perfeito! Seu material está pronto 🎉',
    leadMagnet: {
      id: 'lm1',
      title: 'Guia Completo de Marketing Digital 2024',
      description: 'Um guia prático com as melhores estratégias de marketing digital',
      type: 'link',
      url: 'https://example.com/guia-marketing.pdf',
      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
    },
    published: true,
    viewCount: 234,
    conversionCount: 48,
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Template de Landing Page',
    slug: 'template-landing-page',
    welcomeMessage: 'Olá! 🚀 Tenho um template incrível de landing page para você!',
    nameLabel: 'Como posso te chamar?',
    emailLabel: 'Perfeito, {name}! Onde posso enviar o template?',
    thankYouMessage: 'Maravilha! Seu template está a caminho 📧',
    leadMagnet: {
      id: 'lm2',
      title: 'Template Figma - Landing Page Conversiva',
      description: 'Template profissional no Figma com 5 variações',
      type: 'link',
      url: 'https://figma.com/template-landing',
      coverImage: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop'
    },
    published: false,
    viewCount: 12,
    conversionCount: 3,
    createdAt: '2024-01-10T14:20:00Z'
  }
];

const MOCK_LEADS: Lead[] = [
  {
    id: '1',
    formId: '1',
    name: 'Ana Silva',
    email: 'ana.silva@email.com',
    customAnswer: 'Marketing',
    createdAt: '2024-01-20T09:15:00Z'
  },
  {
    id: '2',
    formId: '1',
    name: 'João Santos',
    email: 'joao@empresa.com',
    customAnswer: 'Vendas',
    createdAt: '2024-01-19T16:30:00Z'
  },
  {
    id: '3',
    formId: '1',
    name: 'Maria Costa',
    email: 'maria.costa@gmail.com',
    customAnswer: 'Design',
    createdAt: '2024-01-18T11:45:00Z'
  }
];

// Centralized mock API hook
export const useFormData = () => {
  const [forms, setForms] = useState<ConversationalForm[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  // Initialize mock data
  useEffect(() => {
    setForms(MOCK_FORMS);
    setLeads(MOCK_LEADS);
  }, []);

  // Mock API functions
  const mockAPI = {
    // Forms
    getForms: async (): Promise<ConversationalForm[]> => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      setLoading(false);
      return forms;
    },

    getForm: async (id: string): Promise<ConversationalForm | null> => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      setLoading(false);
      return forms.find(f => f.id === id) || null;
    },

    getFormBySlug: async (slug: string): Promise<ConversationalForm | null> => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      setLoading(false);
      return forms.find(f => f.slug === slug) || null;
    },

    createForm: async (formData: Omit<ConversationalForm, 'id' | 'createdAt' | 'viewCount' | 'conversionCount'>): Promise<ConversationalForm> => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newForm: ConversationalForm = {
        ...formData,
        id: `form_${Date.now()}`,
        createdAt: new Date().toISOString(),
        viewCount: 0,
        conversionCount: 0,
      };
      
      setForms(prev => [...prev, newForm]);
      setLoading(false);
      return newForm;
    },

    updateForm: async (id: string, updates: Partial<ConversationalForm>): Promise<ConversationalForm | null> => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setForms(prev => prev.map(form => 
        form.id === id ? { ...form, ...updates } : form
      ));
      
      setLoading(false);
      const updatedForm = forms.find(f => f.id === id);
      return updatedForm || null;
    },

    deleteForm: async (id: string): Promise<boolean> => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 400));
      
      setForms(prev => prev.filter(f => f.id !== id));
      setLeads(prev => prev.filter(l => l.formId !== id));
      
      setLoading(false);
      return true;
    },

    // Leads
    getLeads: async (formId?: string): Promise<Lead[]> => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 400));
      setLoading(false);
      return formId ? leads.filter(l => l.formId === formId) : leads;
    },

    createLead: async (leadData: Omit<Lead, 'id' | 'createdAt'>): Promise<Lead> => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const newLead: Lead = {
        ...leadData,
        id: `lead_${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      
      setLeads(prev => [...prev, newLead]);
      
      // Update form conversion count
      setForms(prev => prev.map(form => 
        form.id === leadData.formId 
          ? { ...form, conversionCount: form.conversionCount + 1 }
          : form
      ));
      
      setLoading(false);
      return newLead;
    },

    // Analytics
    incrementFormView: async (formId: string): Promise<void> => {
      setForms(prev => prev.map(form => 
        form.id === formId 
          ? { ...form, viewCount: form.viewCount + 1 }
          : form
      ));
    },

    // Export
    exportLeadsCSV: async (formId: string): Promise<string> => {
      const formLeads = leads.filter(l => l.formId === formId);
      const csvHeader = 'Nome,Email,Resposta Customizada,Data\n';
      const csvContent = formLeads.map(lead => 
        `"${lead.name}","${lead.email}","${lead.customAnswer || ''}","${new Intl.DateTimeFormat('pt-BR').format(new Date(lead.createdAt))}"`
      ).join('\n');
      
      return csvHeader + csvContent;
    }
  };

  return {
    forms,
    leads,
    loading,
    ...mockAPI
  };
};

// Utility functions
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
};

export const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(dateString));
};
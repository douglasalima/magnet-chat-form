Product Requirements Document (PRD)
MVP - Form Builder para Lead Magnet com Interface Chat
1. Visão Geral do Produto
1.1 Resumo Executivo
Desenvolvimento de uma aplicação web focada em criar formulários de captura de leads com interface conversacional (estilo chat). O produto permite criar forms interativos que coletam informações de forma progressiva e engajante, aumentando as taxas de conversão para download de lead magnets (e-books, whitepapers, templates).
1.2 Problema
Formulários tradicionais têm baixa taxa de conversão (2-3%) porque mostram todos os campos de uma vez, causando fricção e abandono. Empresas precisam de uma forma mais engajante de coletar informações antes de entregar conteúdos gratuitos.
1.3 Solução
Um construtor visual simples que cria formulários com interface de chat, coletando informações uma por vez de forma conversacional, resultando em maior engajamento e conversão (10-15% esperado).

3. Casos de Uso
3.1 Casos de Uso Específicos
Criar form para download de e-book
Coletar informações progressivas (nome → email → empresa → cargo)
Entregar lead magnet automaticamente após preenchimento
Visualizar leads capturados
Exportar lista de contatos
4. Funcionalidades do MVP
4.1 Editor Simplificado (P0 - Crítico)
Tipos de Perguntas Disponíveis:
Nome (texto curto com validação)
Email (validação de formato)
Telefone (máscara e validação)
Empresa (texto curto)
Cargo (texto curto ou seleção)
Tamanho da Empresa (múltipla escolha)
Interesse/Necessidade (múltipla escolha)
Fluxo do Editor:
Adicionar pergunta (máximo 7 perguntas)
Definir texto da pergunta
Configurar validação
Ordenar perguntas (drag-and-drop simples)
Configurar mensagem final e CTA
4.2 Configuração do Lead Magnet (P0 - Crítico)
Informações Básicas:
Nome do formulário
Título do lead magnet
Descrição curta (até 150 caracteres)
Upload do arquivo (PDF até 10MB) ou URL
Configurações de Entrega:
Mensagem de agradecimento customizada
Botão de download direto
4.3 Personalização Visual (P0 - Crítico)
Opções Limitadas:
3 temas prontos (Claro, Escuro, Colorido)
Cor principal (accent color)
Logo da empresa
Imagem de fundo (opcional)
4.4 Publicação (P0 - Crítico)
Formatos:
Widget embed (canto inferior direito)
Pop-up com trigger (tempo ou scroll)
Página standalone (link direto)
Código de Instalação:
Script único para copiar/colar
Compatível com WordPress, Webflow, HTML
4.5 Dashboard de Leads (P1 - Importante)
Visualização Simples:
Lista de leads capturados
Filtro por data
Busca por email
Status (completo/incompleto)
Ações:
Ver respostas individuais
Exportar CSV
Deletar lead (GDPR)
4.6 Analytics Básico (P1 - Importante)
Métricas Essenciais:
Total de visualizações
Total de leads capturados
Taxa de conversão
Gráfico de conversão por dia (últimos 7 dias)
Pergunta com maior abandono
5. Requisitos Técnicos Simplificados
5.1 Stack Tecnológica
Frontend: Next.js (React)
Backend: Next.js API Routers
5.2 Performance
Widget < 50KB gzipped
Tempo de carregamento < 2s
Resposta entre perguntas < 300ms
5.3 Segurança Básica
Validação e email no backend
6. Fluxo do Usuário Final (Visitante)
Vê o widget/pop-up com título atrativo do lead magnet
Clica para iniciar ("Quero meu e-book grátis!")
Responde perguntas uma por vez:
"Qual seu nome?"
"Qual seu melhor email?"
"Em qual empresa você trabalha?"
"Qual seu cargo?"
Recebe confirmação com botão de download
Baixa o material imediatamente

7.2 Limites Claros
Número de formulários ativos
Leads capturados por mês
Tamanho do arquivo PDF (10MB free, 50MB pagos)
Customização visual (limitada no free)
8. Não-Escopo (Não faremos no MVP)
Editor complexo com condicionais
Integrações nativas (só webhook/Zapier)
Multi-idioma
A/B testing
Campos customizados
Lógica condicional
Templates de indústria
Email automation
CRM interno
9. Estrutura de Dados Simplificada
// Formulário
{
  id: string,
  userId: string,
  title: string,
  description: string,
  leadMagnet: {
    type: 'file' | 'url',
    value: string,
    name: string
  },
  questions: [
    {
      id: string,
      type: 'name' | 'email' | 'phone' | 'text' | 'select',
      question: string,
      required: boolean,
      options?: string[]
    }
  ],
  theme: 'light' | 'dark' | 'colorful',
  accentColor: string,
  stats: {
    views: number,
    completions: number
  }
}

// Lead Capturado
{
  id: string,
  formId: string,
  responses: {
    questionId: string,
    answer: string
  }[],
  completedAt: timestamp,
  ip: string
}

13. Mockup Conceitual do Fluxo
[Landing Page do Cliente]
         ↓
[Widget Chat: "Baixe nosso e-book gratuito!"]
         ↓
[Pergunta 1: "Qual seu nome?"]
         ↓
[Pergunta 2: "Qual seu email?"]
         ↓
[Pergunta 3: "Qual sua empresa?"]
         ↓
[Tela Final: "🎉 Pronto! Baixe seu e-book"]
         ↓
[Download Automático]

—-----------------------------------------------------------
Plano de Implementação - Form Builder para Lead Magnet
📋 Visão Geral das Fases
Fase 1: Setup e Infraestrutura Base 
Fase 2: Editor de Formulários 
Fase 3: Widget de Chat e Publicação 
Fase 4: Dashboard e Analytics 
Fase 5: Otimizações e Deploy 

🚀 FASE 1: Setup e Infraestrutura Base
 Prioridade: P0
1.1 Setup do Projeto
[ ] Inicializar projeto Next.js com TypeScript
[ ] Configurar estrutura de pastas utilizar a estratura APP Router (components, pages, api, lib, types)
[ ] Instalar e configurar dependências essenciais (Tailwind CSS, React Hook Form, Zod)
[ ] Configurar ESLint e Prettier
[ ] Setup do ambiente de desenvolvimento (.env.local)
1.2 Banco de Dados
[ ] Escolher e configurar banco de dados (Supabase/PostgreSQL recomendado)
[ ] Criar schema inicial do banco
[ ] Tabela users
[ ] Tabela forms
[ ] Tabela questions
[ ] Tabela leads
[ ] Tabela responses
[ ] Configurar Prisma ORM
[ ] Criar migrations iniciais
1.3 Autenticação
[ ] Implementar sistema de autenticação (NextAuth.js ou Clerk)
[ ] Criar páginas de login/registro
[ ] Configurar middleware de proteção de rotas
[ ] Implementar contexto de usuário
1.4 Layout Base
[ ] Criar componente de Layout principal
[ ] Implementar navegação/header
[ ] Criar sidebar para dashboard
[ ] Configurar sistema de rotas

🎨 FASE 2: Editor de Formulários
Prioridade: P0
2.1 Interface do Editor
[ ] Criar página /dashboard/forms/new
[ ] Implementar formulário de informações básicas
[ ] Campo: Nome do formulário
[ ] Campo: Título do lead magnet
[ ] Campo: Descrição (com contador de caracteres)
[ ] Criar componente de upload de arquivo
[ ] Validação de tipo (PDF apenas)
[ ] Validação de tamanho (máx 10MB)
[ ] Preview do arquivo
[ ] Implementar campo alternativo de URL
2.2 Editor de Perguntas
[ ] Criar componente QuestionBuilder
[ ] Implementar tipos de pergunta:
[ ] Nome (com validação)
[ ] Email (com validação de formato)
[ ] Telefone (com máscara)
[ ] Empresa (texto curto)
[ ] Cargo (texto/select)
[ ] Tamanho da Empresa (múltipla escolha)
[ ] Interesse/Necessidade (múltipla escolha)
[ ] Implementar limite de 7 perguntas
[ ] Criar funcionalidade de adicionar/remover perguntas
[ ] Implementar drag-and-drop para reordenar (react-beautiful-dnd)
2.3 Personalização Visual
[ ] Criar seletor de tema (Claro/Escuro/Colorido)
[ ] Implementar color picker para cor principal
[ ] Criar upload de logo
[ ] Implementar upload de imagem de fundo (opcional)
[ ] Criar preview em tempo real das customizações
2.4 APIs do Editor
[ ] Criar endpoint POST /api/forms para salvar formulário
[ ] Criar endpoint PUT /api/forms/[id] para atualizar
[ ] Criar endpoint GET /api/forms/[id] para carregar formulário
[ ] Implementar validação de dados no backend
[ ] Criar sistema de auto-save

💬 FASE 3: Widget de Chat e Publicação
Prioridade: P0
3.1 Componente de Chat
[ ] Criar componente ChatWidget standalone
[ ] Implementar interface de chat responsiva
[ ] Criar animações de transição entre perguntas
[ ] Implementar indicador de digitação
[ ] Criar botões de resposta estilizados
[ ] Implementar validação em tempo real
3.2 Lógica do Chat
[ ] Implementar máquina de estados para fluxo de perguntas
[ ] Criar sistema de navegação (próxima/anterior)
[ ] Implementar validação antes de avançar
[ ] Criar tela de confirmação final
[ ] Implementar download automático do lead magnet
3.3 Modos de Publicação
[ ] Widget Embed
[ ] Criar versão widget (canto inferior direito)
[ ] Implementar botão flutuante de abertura
[ ] Criar animação de entrada/saída
[ ] Pop-up
[ ] Implementar modal overlay
[ ] Criar triggers (tempo/scroll)
[ ] Adicionar botão de fechar
[ ] Página Standalone
[ ] Criar rota pública /form/[id]
[ ] Implementar layout fullscreen
[ ] Adicionar meta tags para compartilhamento
3.4 Sistema de Embed
[ ] Criar script de embed minificado
[ ] Implementar carregamento assíncrono
[ ] Criar gerador de código embed
[ ] Adicionar instruções para WordPress/Webflow/HTML
[ ] Implementar CORS adequado
3.5 Captura de Leads
[ ] Criar endpoint POST /api/forms/[id]/submit
[ ] Implementar validação de respostas
[ ] Salvar lead no banco de dados
[ ] Implementar proteção contra spam (rate limiting)
[ ] Criar sistema de notificação (email para o criador)

📊 FASE 4: Dashboard e Analytics
Prioridade: P1
4.1 Lista de Formulários
[ ] Criar página /dashboard
[ ] Implementar lista de formulários do usuário
[ ] Adicionar informações básicas (nome, leads, conversão)
[ ] Criar ações rápidas (editar, duplicar, deletar)
[ ] Implementar busca e filtros
4.2 Dashboard de Leads
[ ] Criar página /dashboard/forms/[id]/leads
[ ] Implementar tabela de leads capturados
[ ] Adicionar filtros por data
[ ] Criar busca por email
[ ] Implementar visualização de respostas individuais
[ ] Adicionar status (completo/incompleto)
4.3 Exportação
[ ] Implementar exportação para CSV
[ ] Criar seleção de campos para exportar
[ ] Adicionar exportação em lote
[ ] Implementar conformidade GDPR (deletar lead)
4.4 Analytics Básico
[ ] Criar página /dashboard/forms/[id]/analytics
[ ] Implementar contador de visualizações
[ ] Criar contador de leads capturados
[ ] Calcular e exibir taxa de conversão
[ ] Implementar gráfico de conversão (últimos 7 dias)
[ ] Identificar pergunta com maior abandono
[ ] Criar componentes de visualização (cards, gráficos)

🎯 Entregáveis por Sprint
Sprint 1 
✅ Projeto configurado e rodando localmente ✅ Autenticação funcionando ✅ Estrutura base do banco de dados
Sprint 2 
✅ Editor de formulários completo ✅ Salvamento e edição funcionando ✅ Personalização visual implementada
Sprint 3 
✅ Widget de chat funcionando ✅ Todos os modos de publicação ativos ✅ Captura de leads operacional
Sprint 4 
✅ Dashboard com lista de leads ✅ Analytics básico funcionando ✅ Exportação CSV implementada
Sprint 5 
✅ Aplicação otimizada ✅ Testes implementados ✅ Deploy em produção

📝 Notas Importantes
Foco no MVP: Manter escopo enxuto, sem features complexas
Mobile-first: Widget deve funcionar perfeitamente em mobile
Performance: Widget leve é crítico para conversão
UX Simples: Interface intuitiva, sem necessidade de tutorial
Iteração Rápida: Lançar versão básica e iterar com feedback
🚫 Fora do Escopo (Não fazer)
Lógica condicional complexa
Integrações nativas (apenas webhook)
Multi-idioma
A/B testing
Templates prontos
Email automation
CRM interno
Stack Recomendada:
Next,js 15+ (App Router)
TypeScript
Tailwind CSS
PostgreSQL
React Hook Form + Zod
Framer Motion (animações)


—------------------------------------------------------------------------------------

flowchart TD
    Start([Início]) --> UserType{Tipo de Usuário}
    
    %% Fluxo do Criador
    UserType -->|Criador| SignUp[Fazer Cadastro/Login]
    SignUp --> Dashboard[Dashboard Principal]
    Dashboard --> CreateForm[Criar Novo Formulário]
    
    CreateForm --> FormSetup[Configurar Informações Básicas<br/>- Nome do formulário<br/>- Título do lead magnet<br/>- Descrição]
    FormSetup --> UploadAsset[Upload do Lead Magnet<br/>PDF até 10MB ou URL]
    
    UploadAsset --> AddQuestions[Adicionar Perguntas<br/>Max: 7 perguntas]
    AddQuestions --> QuestionType{Escolher Tipo<br/>de Pergunta}
    QuestionType -->|Nome| ConfigQ[Configurar Pergunta]
    QuestionType -->|Email| ConfigQ
    QuestionType -->|Telefone| ConfigQ
    QuestionType -->|Empresa| ConfigQ
    QuestionType -->|Cargo| ConfigQ
    QuestionType -->|Tamanho Empresa| ConfigQ
    QuestionType -->|Interesse| ConfigQ
    
    ConfigQ --> MoreQuestions{Adicionar<br/>mais perguntas?}
    MoreQuestions -->|Sim| AddQuestions
    MoreQuestions -->|Não| OrderQuestions[Ordenar Perguntas<br/>Drag & Drop]
    
    OrderQuestions --> ConfigThank[Configurar Mensagem Final<br/>e CTA]
    ConfigThank --> VisualCustom[Personalização Visual<br/>- Escolher tema<br/>- Cor principal<br/>- Logo<br/>- Imagem fundo]
    
    VisualCustom --> PublishFormat{Escolher Formato<br/>de Publicação}
    PublishFormat -->|Widget| GetCode[Obter Código Embed]
    PublishFormat -->|Pop-up| GetCode
    PublishFormat -->|Página Standalone| GetLink[Obter Link Direto]
    
    GetCode --> InstallSite[Instalar no Site]
    GetLink --> ShareLink[Compartilhar Link]
    
    InstallSite --> MonitorLeads[Monitorar Leads<br/>no Dashboard]
    ShareLink --> MonitorLeads
    
    MonitorLeads --> Analytics[Ver Analytics<br/>- Total visualizações<br/>- Leads capturados<br/>- Taxa conversão<br/>- Gráfico 7 dias]
    Analytics --> ExportData[Exportar CSV<br/>dos Leads]
    
    %% Fluxo do Visitante
    UserType -->|Visitante| VisitSite[Visitar Site<br/>com Form Instalado]
    VisitSite --> SeeWidget{Ver Widget/<br/>Pop-up}
    
    SeeWidget -->|Interessado| ClickStart[Clicar para Iniciar<br/>'Quero meu e-book grátis!']
    SeeWidget -->|Não interessado| LeaveS[Sair do Site]
    
    ClickStart --> Q1[Pergunta 1<br/>'Qual seu nome?']
    Q1 --> A1[Responder Nome]
    A1 --> Q2[Pergunta 2<br/>'Qual seu melhor email?']
    Q2 --> A2[Responder Email]
    A2 --> Q3[Pergunta 3<br/>'Em qual empresa trabalha?']
    Q3 --> A3[Responder Empresa]
    A3 --> QN[Perguntas Seguintes...]
    
    QN --> Abandon{Continuar?}
    Abandon -->|Não| LeaveF[Abandonar Formulário]
    Abandon -->|Sim| CompleteForm[Completar Todas<br/>as Perguntas]
    
    CompleteForm --> ThankYou[Tela de Confirmação<br/>🎉 'Pronto!']
    ThankYou --> DownloadCTA[Botão de Download<br/>do Lead Magnet]
    DownloadCTA --> Download[Download Automático<br/>do Material]
    Download --> End([Lead Capturado<br/>com Sucesso])
    
    LeaveS --> EndAbandon([Fim - Sem Conversão])
    LeaveF --> EndAbandon
    
    %% Estilo
    classDef creator fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef visitor fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef success fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px
    classDef fail fill:#ffcdd2,stroke:#c62828,stroke-width:2px
    
    class SignUp,Dashboard,CreateForm,FormSetup,UploadAsset,AddQuestions,ConfigQ,OrderQuestions,ConfigThank,VisualCustom,GetCode,GetLink,InstallSite,ShareLink,MonitorLeads,Analytics,ExportData creator
    class VisitSite,SeeWidget,ClickStart,Q1,A1,Q2,A2,Q3,A3,QN,CompleteForm,ThankYou,DownloadCTA,Download visitor
    class End,Download success
    class LeaveS,LeaveF,EndAbandon fail
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Formulários Conversacionais"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
        </div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Crie Formulários Conversacionais que Convertem
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transforme visitantes em leads com formulários interativos no estilo chat. 
              Simples de criar, poderoso para converter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <button className="px-8 py-4 bg-gradient-primary text-white rounded-xl font-semibold shadow-medium hover:shadow-large transition-all duration-300 hover:scale-105">
                  Começar Gratuitamente
                </button>
              </Link>
              <Link to="/f/marketing-digital-essencial">
                <button className="px-8 py-4 border border-border rounded-xl font-semibold hover:bg-accent transition-colors">
                  Ver Exemplo
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Por que usar formulários conversacionais?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Aumente suas conversões com uma abordagem mais humana e interativa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">💬</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Interface Conversacional</h3>
            <p className="text-muted-foreground">
              Experiência similar a apps de mensagem que seus usuários já conhecem
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Rápido de Criar</h3>
            <p className="text-muted-foreground">
              Crie e publique seu formulário em menos de 3 minutos
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">📈</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Maior Conversão</h3>
            <p className="text-muted-foreground">
              Taxa de conclusão até 3x maior que formulários tradicionais
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-primary text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Crie seu primeiro formulário conversacional agora e veja a diferença na captura de leads
          </p>
          <Link to="/dashboard">
            <button className="px-8 py-4 bg-white text-primary rounded-xl font-semibold shadow-medium hover:shadow-large transition-all duration-300 hover:scale-105">
              Criar Meu Primeiro Formulário
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;

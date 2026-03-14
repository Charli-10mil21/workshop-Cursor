'use client';

import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ChefHat, BookOpen, Zap, Database, Brain, Code } from 'lucide-react';

const sections = [
  'inicio',
  'local-produccion',
  'github',
  'vercel',
  'supabase',
  'mcp',
  'ejemplos'
];

export default function Workshop() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [exampleTitle, setExampleTitle] = useState('');
  const [exampleDescription, setExampleDescription] = useState('');
  const [exampleImageName, setExampleImageName] = useState('');
  const [isSavingExample, setIsSavingExample] = useState(false);
  const [exampleMessage, setExampleMessage] = useState<string | null>(null);

  const handleExampleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSavingExample(true);
    setExampleMessage(null);

    const formData = new FormData();
    formData.append('title', exampleTitle);
    formData.append('description', exampleDescription);
    if (exampleImageName) {
      formData.append('image', exampleImageName);
    }

    fetch('/api/ejemplos', {
      method: 'POST',
      body: formData,
    })
      .then(async (response) => {
        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error || 'No se pudo guardar el ejemplo.');
        }
        setExampleMessage('Ejemplo guardado correctamente en Supabase.');
        setExampleTitle('');
        setExampleDescription('');
        setExampleImageName('');
      })
      .catch((error) => {
        console.error(error);
        setExampleMessage('Hubo un problema al guardar el ejemplo.');
      })
      .finally(() => {
        setIsSavingExample(false);
      });
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-background text-foreground">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 107, 53, 0.2);
          }
          50% {
            box-shadow: 0 0 30px rgba(255, 107, 53, 0.4);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out;
        }
        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out;
        }
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="font-bold text-lg text-accent">Workshop Cursor</div>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <button
              onClick={() => scrollToSection('inicio')}
              className={`px-3 py-1 rounded text-sm transition-colors ${activeSection === 'inicio'
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('local-produccion')}
              className={`px-3 py-1 rounded text-sm transition-colors ${activeSection === 'local-produccion'
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              Local vs Prod
            </button>
            <button
              onClick={() => scrollToSection('github')}
              className={`px-3 py-1 rounded text-sm transition-colors ${activeSection === 'github'
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              GitHub
            </button>
            <button
              onClick={() => scrollToSection('vercel')}
              className={`px-3 py-1 rounded text-sm transition-colors ${activeSection === 'vercel'
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              Vercel
            </button>
            <button
              onClick={() => scrollToSection('ejemplos')}
              className={`px-3 py-1 rounded text-sm transition-colors ${activeSection === 'ejemplos'
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              Ejemplos
            </button>
          </div>
        </div>
      </nav>

      {/* Slide 1: Inicio */}
      <section
        id="inicio"
        className="relative min-h-screen w-full flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        onMouseEnter={() => setActiveSection('inicio')}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background"></div>
        <div className="relative z-10 text-center max-w-4xl">
          <div className="flex justify-center mb-6 animate-float">
            <div className="w-20 h-20 bg-gradient-to-br from-accent to-orange-500 rounded-lg flex items-center justify-center animate-glow">
              <ChefHat className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-balance leading-tight animate-fade-in-up">
            De Local a Producción
          </h1>
          <p className="text-xl text-muted-foreground mb-3 text-balance animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Desplegando tu proyecto con GitHub y Vercel
          </p>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Una guía interactiva sobre cómo llevar tu proyecto del desarrollo local a la producción profesional
          </p>
          <div className="flex gap-4 justify-center flex-wrap animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Button
              onClick={() => scrollToSection('local-produccion')}
              className="bg-accent hover:bg-orange-600 text-accent-foreground px-6 py-4 text-base"
            >
              Comenzar →
            </Button>
          </div>
        </div>
      </section>

      {/* Slide 2: Local vs Producción */}
      <section
        id="local-produccion"
        className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden"
        onMouseEnter={() => setActiveSection('local-produccion')}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/10 to-background"></div>
        <div className="relative z-10 max-w-5xl w-full">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-center text-balance animate-fade-in-up">
            ¿Por Qué Mi Computadora No Es Un Servidor?
          </h2>
          <p className="text-lg text-accent text-center mb-12 font-semibold animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            El Salto de la Cocina de Casa al Restaurante
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Local */}
            <div className="bg-gradient-to-br from-muted to-card rounded-xl p-6 border border-border animate-slide-in-left">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <ChefHat className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Cocina de Casa</h3>
              </div>
              <p className="text-muted-foreground mb-6">Ambiente Local: Cooking para ti mismo</p>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">→</span>
                  <div>
                    <p className="font-semibold">Tráfico</p>
                    <p className="text-sm text-muted-foreground">Solo tú usas la aplicación</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">→</span>
                  <div>
                    <p className="font-semibold">Seguridad</p>
                    <p className="text-sm text-muted-foreground">Alacena abierta, sin restricciones</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">→</span>
                  <div>
                    <p className="font-semibold">Disponibilidad</p>
                    <p className="text-sm text-muted-foreground">Si se apaga, no importa</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Producción */}
            <div className="bg-gradient-to-br from-accent/20 to-card rounded-xl p-6 border border-accent/30 animate-slide-in-right">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-2xl font-bold">Restaurante Profesional</h3>
              </div>
              <p className="text-muted-foreground mb-6">Ambiente Producción: Cooking para cientos</p>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">→</span>
                  <div>
                    <p className="font-semibold">Tráfico</p>
                    <p className="text-sm text-muted-foreground">Cientos de clientes simultáneos</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">→</span>
                  <div>
                    <p className="font-semibold">Seguridad</p>
                    <p className="text-sm text-muted-foreground">Caja fuerte para datos de clientes</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">→</span>
                  <div>
                    <p className="font-semibold">Disponibilidad</p>
                    <p className="text-sm text-muted-foreground">Si se apaga, pierdes dinero y clientes</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 3: GitHub */}
      <section
        id="github"
        className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden"
        onMouseEnter={() => setActiveSection('github')}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/10 to-background"></div>
        <div className="relative z-10 max-w-4xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="animate-slide-in-left">
              <img src="/deployment-flow.jpg" alt="GitHub deployment flow" className="rounded-xl shadow-2xl w-full" />
            </div>
            <div className="text-center md:text-left animate-slide-in-right">
              <div className="flex justify-center md:justify-start mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">
                GitHub: El Libro de Recetas Sagrado
              </h2>
              <div className="bg-gradient-to-br from-muted to-card rounded-xl p-6 border border-border">
                <p className="text-base text-foreground mb-6 leading-relaxed">
                  GitHub es donde todas las versiones de tu receta <span className="text-accent font-semibold">(código)</span> viven y se rastrean. Cada cambio, cada mejora, cada experimento queda registrado.
                </p>
                <p className="text-base text-foreground mb-6 leading-relaxed">
                  Es cómo diferentes chefs <span className="text-accent font-semibold">(desarrolladores)</span> pueden trabajar en el mismo libro sin borrarse mutuamente los cambios.
                </p>
                <div className="bg-primary/20 rounded-lg p-4 text-left">
                  <p className="text-sm text-muted-foreground mb-1">✓ Versionado de código</p>
                  <p className="text-sm text-muted-foreground mb-1">✓ Colaboración en equipo</p>
                  <p className="text-sm text-muted-foreground">✓ Historial completo de cambios</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 4: Vercel */}
      <section
        id="vercel"
        className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden"
        onMouseEnter={() => setActiveSection('vercel')}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/10 to-background"></div>
        <div className="relative z-10 max-w-5xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left order-2 md:order-1 animate-slide-in-left">
              <div className="flex justify-center md:justify-start mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-black to-slate-700 rounded-lg flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">
                Vercel: El Local Comercial Profesional
              </h2>
              <div className="bg-gradient-to-br from-muted to-card rounded-xl p-6 border border-border">
                <p className="text-base text-foreground mb-4 leading-relaxed">
                  Vercel es la empresa de quien alquilas el espacio de tu cocina profesional. No solo te da una habitación...
                </p>
                <p className="text-lg font-bold text-accent mb-4">
                  Automáticamente construye y equipa todo el restaurante desde tu libro de recetas (GitHub)
                </p>
                <p className="text-base text-foreground mb-4 leading-relaxed">
                  Los clientes visitan tu restaurante y cada actualización en el libro significa una actualización instantánea para ellos.
                </p>
                <div className="bg-accent/20 rounded-lg p-4 text-left border border-accent/30 text-sm space-y-2">
                  <p className="text-foreground">⚡ Deploy automático desde GitHub</p>
                  <p className="text-foreground">🌍 Hosting global y rápido</p>
                  <p className="text-foreground">🔄 Actualizaciones instantáneas</p>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 animate-slide-in-right">
              <img src="/restaurant-professional.jpg" alt="Professional restaurant kitchen" className="rounded-xl shadow-2xl w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Slide 5: Supabase */}
      <section
        id="supabase"
        className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden"
        onMouseEnter={() => setActiveSection('supabase')}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/10 to-background"></div>
        <div className="relative z-10 max-w-5xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="animate-slide-in-left">
              <img src="/kitchen-setup.jpg" alt="Kitchen setup with laptop" className="rounded-xl shadow-2xl w-full" />
            </div>
            <div className="text-center md:text-left animate-slide-in-right">
              <div className="flex justify-center md:justify-start mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-lg flex items-center justify-center">
                  <Database className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">
                Supabase: La Despensa Inteligente
              </h2>
              <div className="bg-gradient-to-br from-muted to-card rounded-xl p-6 border border-border">
                <p className="text-base text-foreground mb-4 leading-relaxed">
                  Supabase es la bodega visual, organizada y segura donde viven todos tus ingredientes.
                </p>
                <p className="text-lg font-bold text-accent mb-4">
                  Los datos: perfiles de usuarios, productos, órdenes, todo organizado
                </p>
                <p className="text-base text-foreground mb-4 leading-relaxed">
                  Se conecta de forma segura a tu restaurante profesional (app) para que los chefs puedan obtener exactamente lo que necesitan, cuando lo necesitan.
                </p>
                <div className="bg-emerald-500/20 rounded-lg p-4 text-left border border-emerald-500/30 text-sm space-y-2">
                  <p className="text-foreground">🗄️ Base de datos relacional</p>
                  <p className="text-foreground">🔐 Autenticación integrada</p>
                  <p className="text-foreground">🚀 APIs automáticas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 6: MCP */}
      <section
        id="mcp"
        className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden"
        onMouseEnter={() => setActiveSection('mcp')}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/10 to-background"></div>
        <div className="relative z-10 max-w-4xl w-full text-center animate-fade-in-up">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center animate-glow">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-balance">
            ¿Qué es MCP?
          </h2>
          <p className="text-xl font-bold text-accent mb-8">
            El Asistente de Cocina con Visión X
          </p>
          <div className="bg-gradient-to-br from-muted to-card rounded-xl p-8 border border-border max-w-3xl mx-auto space-y-6">
            <div className="text-left animate-slide-in-left">
              <h3 className="text-lg font-bold mb-3">Sin MCP:</h3>
              <p className="text-base text-muted-foreground">
                Tu asistente IA experto está solo dando consejos por teléfono. No puede ver la despensa, el libro de recetas, ni la estufa.
              </p>
            </div>
            <div className="h-1 bg-accent/30"></div>
            <div className="text-left animate-slide-in-right">
              <h3 className="text-lg font-bold mb-3">Con MCP:</h3>
              <p className="text-base text-foreground font-semibold mb-3">
                Model Context Protocol (MCP) es la conexión crucial
              </p>
              <p className="text-base text-muted-foreground mb-4">
                Tu asistente IA (como Cursor) puede ver dentro de la despensa, el libro de recetas y la estufa. Puede:
              </p>
              <ul className="space-y-2 ml-4 text-sm">
                <li className="flex gap-3">
                  <span className="text-accent">→</span>
                  <p>Arreglar comida que se quema (errores)</p>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">→</span>
                  <p>Sugerir recetas basadas en ingredientes disponibles</p>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">→</span>
                  <p>Trabajar en tiempo real con contexto integrado</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 7: Ejemplos Prácticos */}
      <section
        id="ejemplos"
        className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden"
        onMouseEnter={() => setActiveSection('ejemplos')}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background via-accent/5 to-background"></div>
        <div className="relative z-10 max-w-5xl w-full">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-block px-4 py-2 bg-accent/20 rounded-full border border-accent/30 mb-3">
              <span className="text-accent font-semibold text-sm">⚠️ En Construcción</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-balance">
              Ejemplos Prácticos de Despliegue
            </h2>
            <p className="text-base text-muted-foreground">
              Espacio para comandos y demostraciones durante el workshop
            </p>
          </div>

          <div className="space-y-6">
            {/* Práctica 1 */}
            <div className="bg-gradient-to-br from-muted to-card rounded-xl p-6 border border-border animate-slide-in-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-lg font-bold">Práctica 1: Desplegar Proyecto Semilla</h3>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border min-h-24 flex items-center justify-center">
                <p className="text-muted-foreground italic text-sm">
                  [Espacio para comandos de despliegue]
                </p>
              </div>
            </div>

            {/* Práctica 2 */}
            <div className="bg-gradient-to-br from-muted to-card rounded-xl p-6 border border-border animate-slide-in-right">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-lg font-bold">Práctica 2: Conectar Cursor a MCPs</h3>
              </div>
              <p className="text-muted-foreground mb-4 text-sm">GitHub, Vercel, Supabase</p>
              <div className="bg-background rounded-lg p-6 border border-border min-h-32 flex items-center justify-center">
                <p className="text-muted-foreground italic">
                  [Espacio para configuración de MCPs]
                </p>
              </div>
            </div>

            {/* Formulario: nuevo ejemplo práctico */}
            <div className="bg-gradient-to-br from-muted to-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-lg font-bold">Añadir Ejemplo Práctico</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Completa el formulario para definir un nuevo ejemplo práctico de despliegue que se guardará en Supabase.
              </p>
              <form onSubmit={handleExampleSubmit} className="space-y-4">
                <div className="space-y-1 text-left">
                  <Label htmlFor="example-title">Título</Label>
                  <Input
                    id="example-title"
                    value={exampleTitle}
                    onChange={(e) => setExampleTitle(e.target.value)}
                    placeholder="Ej. Despliegue automático a producción"
                    required
                  />
                </div>
                <div className="space-y-1 text-left">
                  <Label htmlFor="example-description">Descripción</Label>
                  <Textarea
                    id="example-description"
                    value={exampleDescription}
                    onChange={(e) => setExampleDescription(e.target.value)}
                    placeholder="Describe brevemente qué hace este ejemplo de despliegue..."
                    rows={4}
                    required
                  />
                </div>
                <div className="space-y-1 text-left">
                  <Label htmlFor="example-image">Imagen del ejemplo</Label>
                  <Input
                    id="example-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      setExampleImageName(file ? file.name : '');
                    }}
                  />
                  {exampleImageName && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Imagen seleccionada: <span className="font-medium">{exampleImageName}</span>
                    </p>
                  )}
                </div>
                {exampleMessage && (
                  <p className="text-xs text-muted-foreground text-left">
                    {exampleMessage}
                  </p>
                )}
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-accent hover:bg-orange-600 text-accent-foreground"
                    disabled={isSavingExample}
                  >
                    {isSavingExample ? 'Guardando...' : 'Guardar ejemplo'}
                  </Button>
                </div>
              </form>
            </div>

            {/* Proteger API Keys */}
            <div className="bg-gradient-to-br from-red-950 to-card rounded-xl p-10 border border-red-900/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-red-500">🔐</span>
                </div>
                <h3 className="text-2xl font-bold">⚠️ Proteger API Keys: Tus Credenciales</h3>
              </div>
              <div className="bg-background rounded-lg p-6 border border-red-900/30">
                <p className="text-muted-foreground mb-4">
                  Nunca compartas tus credenciales. Utiliza variables de entorno.
                </p>
                <div className="bg-red-900/20 rounded p-4 border border-red-900/30 min-h-24 flex items-center justify-center">
                  <p className="text-muted-foreground italic">
                    [Espacio para advertencias y mejores prácticas]
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
            <p className="text-center sm:text-left text-muted-foreground text-sm">
              De Local a Producción desplegando tu proyecto con GitHub y Vercel | by Carlos Martinez Velasco | 14/03/2026
            </p>
            <Button
              onClick={() => scrollToSection('inicio')}
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            >
              ↑ Volver al Inicio
            </Button>
          </div>
          <div className="text-center text-xs text-muted-foreground">
            Uso de analogía culinaria para entender deployment
          </div>
        </div>
      </footer>
    </div>
  );
}

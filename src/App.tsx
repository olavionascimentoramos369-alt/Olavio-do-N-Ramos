import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  DollarSign, 
  Calculator, 
  Tag, 
  MessageSquare, 
  FileText, 
  Image as ImageIcon, 
  HelpCircle, 
  Users, 
  CreditCard, 
  Settings, 
  LifeBuoy,
  Crown,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  TrendingUp,
  Clock,
  Loader2,
  Download,
  Copy,
  Check,
  Sparkles,
  Percent,
  Lock,
  Mail,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Markdown from 'react-markdown';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { View } from './types';
import { generateAIImage, generateProductDescription, generateAutoMessage, generateSalesAdvice } from './services/gemini';

// Mock data for the chart
const chartData = [
  { name: 'Set', value: 0 },
  { name: 'Out', value: 0 },
  { name: 'Nov', value: 0 },
  { name: 'Dez', value: 0 },
  { name: 'Jan', value: 0 },
  { name: 'Fev', value: 0 },
];

const Aprendizado = () => (
  <div className="flex flex-col gap-8">
    <div className="glass-card p-6 flex items-center gap-4 bg-gradient-to-r from-blue-500/5 to-transparent">
      <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
        <LifeBuoy size={24} />
      </div>
      <div>
        <h1 className="text-xl font-bold">Aprenda a Vender</h1>
        <p className="text-gray-400 text-sm">Do zero à primeira venda na GGMAX</p>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="glass-card overflow-hidden">
          <div className="aspect-video bg-black flex items-center justify-center relative group cursor-pointer">
            <img 
              src="https://picsum.photos/seed/ggmax/1280/720" 
              alt="GGMAX Tutorial" 
              className="w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-black shadow-xl group-hover:scale-110 transition-transform">
                <Menu size={32} className="rotate-90" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
              <h3 className="text-lg font-bold">Como vender na GGMAX: Guia Completo 2024</h3>
              <p className="text-gray-400 text-sm">Assista e aprenda a configurar sua loja em 10 minutos.</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-bold mb-6">Passo a Passo para a Primeira Venda</h3>
          <div className="space-y-6">
            {[
              { step: "01", title: "Escolha seu Nicho", desc: "Contas de jogos, Gift Cards ou Softwares? Escolha o que você mais conhece." },
              { step: "02", title: "Encontre Fornecedores", desc: "Use nossa aba de fornecedores para encontrar produtos com margem alta." },
              { step: "03", title: "Crie Anúncios Irresistíveis", desc: "Use nosso Gerador de Descrição e Imagens IA para se destacar." },
              { step: "04", title: "Atendimento Rápido", desc: "Configure mensagens automáticas para responder seus clientes instantaneamente." }
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="text-2xl font-black text-emerald-500/20">{item.step}</div>
                <div>
                  <h4 className="font-bold text-sm">{item.title}</h4>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="glass-card p-6 bg-emerald-500/5 border-emerald-500/20">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-emerald-500" />
            Dica de Ouro
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            "O segredo da GGMAX é a reputação. Faça suas primeiras vendas com preço baixo para ganhar avaliações positivas rapidamente."
          </p>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-bold mb-4">Recursos Úteis</h3>
          <div className="space-y-3">
            <button className="w-full p-3 bg-white/5 hover:bg-white/10 rounded-lg text-left text-sm flex items-center justify-between transition-all">
              <span>Termos de Uso GGMAX</span>
              <ChevronRight size={14} className="text-gray-600" />
            </button>
            <button className="w-full p-3 bg-white/5 hover:bg-white/10 rounded-lg text-left text-sm flex items-center justify-between transition-all">
              <span>Como evitar golpes</span>
              <ChevronRight size={14} className="text-gray-600" />
            </button>
            <button className="w-full p-3 bg-white/5 hover:bg-white/10 rounded-lg text-left text-sm flex items-center justify-between transition-all">
              <span>Taxas de saque</span>
              <ChevronRight size={14} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PriceGenerator = () => {
  const [cost, setCost] = useState<number>(0);
  const [margin, setMargin] = useState<number>(30);
  const [fee, setFee] = useState<number>(10);

  const idealPrice = cost / (1 - (margin + fee) / 100);
  const profit = idealPrice - cost - (idealPrice * fee / 100);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
          <Tag size={24} />
        </div>
        <h1 className="text-2xl font-bold">Gerador de Preço</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-6">
          <div>
            <label className="text-xs text-gray-500 uppercase font-bold mb-2 block">Custo do Produto (R$)</label>
            <input 
              type="number" 
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              className="w-full bg-white/5 border border-brand-border rounded-lg p-3 focus:border-emerald-500/50 outline-none transition-all"
              placeholder="0,00"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 uppercase font-bold mb-2 block">Margem Desejada (%)</label>
            <input 
              type="number" 
              value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              className="w-full bg-white/5 border border-brand-border rounded-lg p-3 focus:border-emerald-500/50 outline-none transition-all"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 uppercase font-bold mb-2 block">Taxa da Plataforma (%)</label>
            <input 
              type="number" 
              value={fee}
              onChange={(e) => setFee(Number(e.target.value))}
              className="w-full bg-white/5 border border-brand-border rounded-lg p-3 focus:border-emerald-500/50 outline-none transition-all"
            />
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col justify-center items-center text-center">
          <span className="text-gray-500 text-sm mb-2">Preço de Venda Sugerido</span>
          <span className="text-5xl font-black text-emerald-500 mb-4">R$ {idealPrice.toFixed(2)}</span>
          <div className="flex gap-8 mt-4">
            <div>
              <span className="text-gray-500 text-xs block">Lucro Líquido</span>
              <span className="text-lg font-bold">R$ {profit.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-gray-500 text-xs block">Markup</span>
              <span className="text-lg font-bold">{(idealPrice / cost).toFixed(2)}x</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AutoMessageGenerator = () => {
  const [context, setContext] = useState('');
  const [tone, setTone] = useState('Profissional');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!context) return;
    setLoading(true);
    try {
      const text = await generateAutoMessage(context, tone);
      setResult(text || '');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
          <MessageSquare size={24} />
        </div>
        <h1 className="text-2xl font-bold">Gerador de Mensagem Automática</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-6">
          <div>
            <label className="text-xs text-gray-500 uppercase font-bold mb-2 block">Contexto da Mensagem</label>
            <textarea 
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="w-full bg-white/5 border border-brand-border rounded-lg p-3 h-32 focus:border-blue-500/50 outline-none transition-all resize-none"
              placeholder="Ex: Mensagem de boas-vindas após a compra de uma conta de Valorant..."
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 uppercase font-bold mb-2 block">Tom de Voz</label>
            <select 
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full bg-white/5 border border-brand-border rounded-lg p-3 focus:border-blue-500/50 outline-none transition-all"
            >
              <option>Profissional</option>
              <option>Amigável</option>
              <option>Urgente</option>
              <option>Descontraído</option>
            </select>
          </div>
          <button 
            onClick={handleGenerate}
            disabled={loading || !context}
            className="w-full py-4 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-400 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
            {loading ? 'Gerando...' : 'Gerar Mensagem'}
          </button>
        </div>

        <div className="glass-card p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-300">Mensagem Gerada</h3>
            {result && (
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(result);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="p-2 hover:bg-white/5 rounded-lg text-gray-400 transition-all flex items-center gap-2 text-xs"
              >
                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            )}
          </div>
          <div className="flex-1 bg-black/20 rounded-xl p-4 border border-brand-border whitespace-pre-wrap text-sm leading-relaxed text-gray-300">
            {result || "Sua mensagem aparecerá aqui..."}
          </div>
        </div>
      </div>
    </div>
  );
};

const SuppliersView = () => {
  const [misticKey, setMisticKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    if (misticKey) {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
            <Users size={24} />
          </div>
          <h1 className="text-2xl font-bold">Fornecedores Confiáveis</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <a 
            href="https://discordapp.com/channels/@me/1476398320468496415/1476398352823484498" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#5865F2] text-white rounded-lg text-sm font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20"
          >
            <MessageSquare size={18} />
            <span>Comunidade Discord</span>
          </a>
          <a 
            href="https://lzt.market/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white text-black rounded-lg text-sm font-bold hover:bg-gray-200 transition-all flex items-center gap-2 shadow-lg shadow-white/10"
          >
            <Search size={18} />
            <span>LZT Marketplace</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 bg-gradient-to-r from-emerald-500/5 to-transparent border-emerald-500/20">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500 shrink-0">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Central de Fornecedores VIP</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Conectamos você diretamente com os melhores fornecedores do mercado. Use nossa comunidade no Discord para suporte e o LZT Market para compra direta de contas globais com os melhores preços.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { cat: "Games", items: ["Contas Valorant", "Skins CS2", "Moedas LOL"], link: "https://discordapp.com/channels/@me/1476398320468496415/1476398352823484498" },
              { cat: "Software", items: ["Windows 11 Pro", "Office 365", "Adobe Cloud"], link: "https://discordapp.com/channels/@me/1476398320468496415/1476398352823484498" },
              { cat: "Marketplace Global", items: ["LZT.market (Contas)", "Skins Raras", "Games Steam"], link: "https://lzt.market/" }
            ].map((cat, i) => (
              <div key={i} className="glass-card p-6">
                <h3 className="font-bold text-emerald-500 mb-4">{cat.cat}</h3>
                <div className="space-y-3">
                  {cat.items.map((item, j) => (
                    <a 
                      key={j} 
                      href={cat.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-brand-border group hover:border-emerald-500/30 transition-all cursor-pointer"
                    >
                      <span className="text-sm">{item}</span>
                      <Crown size={14} className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
                <a 
                  href={cat.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-6 py-2 text-xs font-bold text-gray-500 hover:text-emerald-500 transition-all text-center block"
                >
                  Acessar {cat.cat}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 border-blue-500/20 bg-blue-500/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                <Settings size={20} />
              </div>
              <h3 className="font-bold">Integração Mistic API</h3>
            </div>
            
            <p className="text-xs text-gray-400 mb-6 leading-relaxed">
              Configure sua API da Mistic para automatizar a entrega de produtos e sincronizar seu estoque em tempo real.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-gray-500 uppercase font-bold mb-2 block">Mistic API Key</label>
                <div className="relative">
                  <input 
                    type="password" 
                    value={misticKey}
                    onChange={(e) => setMisticKey(e.target.value)}
                    className="w-full bg-black/20 border border-brand-border rounded-lg p-3 pr-10 text-sm focus:border-blue-500/50 outline-none transition-all"
                    placeholder="Insira sua chave API..."
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600">
                    <Crown size={16} />
                  </div>
                </div>
              </div>

              <button 
                onClick={handleSave}
                className={cn(
                  "w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2",
                  isSaved ? "bg-emerald-500 text-black" : "bg-blue-500 text-white hover:bg-blue-400"
                )}
              >
                {isSaved ? (
                  <>
                    <Check size={18} />
                    Configuração Salva!
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Salvar Integração
                  </>
                )}
              </button>

              <div className="p-3 bg-white/5 rounded-lg border border-brand-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-gray-500 uppercase font-bold">Status da API</span>
                  <span className={cn(
                    "w-2 h-2 rounded-full animate-pulse",
                    misticKey ? "bg-emerald-500" : "bg-red-500"
                  )} />
                </div>
                <p className="text-[10px] text-gray-400">
                  {misticKey ? "Conectado e pronto para automação." : "Aguardando configuração da chave."}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-brand-border">
              <h4 className="text-xs font-bold text-gray-300 mb-3">Vantagens da Automação:</h4>
              <ul className="space-y-2">
                {[
                  "Entrega 24/7 sem intervenção humana",
                  "Sincronização automática de estoque",
                  "Redução de 90% no tempo de operação",
                  "Maior satisfação do cliente final"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-[10px] text-gray-500">
                    <Check size={12} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AIAssistantView = () => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');

  const handleAsk = async () => {
    if (!question) return;
    setLoading(true);
    try {
      const text = await generateSalesAdvice(question);
      setAnswer(text || '');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex p-3 bg-emerald-500/10 rounded-2xl text-emerald-500 mb-2">
          <LifeBuoy size={32} />
        </div>
        <h1 className="text-3xl font-black">Mentor de Vendas IA</h1>
        <p className="text-gray-500">Tire suas dúvidas sobre vendas, marketplaces e estratégias.</p>
      </div>

      <div className="glass-card p-6 space-y-6">
        <div className="relative">
          <textarea 
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full bg-white/5 border border-brand-border rounded-2xl p-6 h-32 focus:border-emerald-500/50 outline-none transition-all resize-none text-lg"
            placeholder="Como eu faço para vender mais rápido na GGMAX?"
          />
          <button 
            onClick={handleAsk}
            disabled={loading || !question}
            className="absolute bottom-4 right-4 p-3 bg-emerald-500 text-black rounded-xl hover:bg-emerald-400 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {answer && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl"
          >
            <div className="flex gap-4">
              <div className="p-2 bg-emerald-500 rounded-lg h-fit">
                <Sparkles size={16} className="text-black" />
              </div>
              <div className="markdown-body prose prose-invert prose-sm">
                <Markdown>{answer}</Markdown>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const SubscriptionsView = () => (
  <div className="flex flex-col gap-12 py-8">
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-black tracking-tight">Escolha seu Plano</h1>
      <p className="text-gray-500 max-w-lg mx-auto">Acesso total às ferramentas de IA, lista de fornecedores e mentorias exclusivas.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { name: "Iniciante", price: "40", color: "gray", features: ["Calculadora de Taxas", "Gerador de Preço", "Acesso Básico Fornecedores"] },
        { name: "Vendedor Pro", price: "65", color: "emerald", popular: true, features: ["Tudo do Iniciante", "Gerador de Descrição IA", "Gerador de Mensagens", "Suporte Prioritário"] },
        { name: "Império Digital", price: "90", color: "purple", features: ["Tudo do Pro", "Gerador de Imagens IA", "Mentor IA Ilimitado", "Lista VIP Fornecedores"] }
      ].map((plan, i) => (
        <div key={i} className={cn(
          "glass-card p-8 flex flex-col relative overflow-hidden",
          plan.popular && "border-emerald-500/50 shadow-2xl shadow-emerald-500/10"
        )}>
          {plan.popular && (
            <div className="absolute top-4 right-[-35px] rotate-45 bg-emerald-500 text-black text-[10px] font-black py-1 px-10">POPULAR</div>
          )}
          <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
          <div className="flex items-baseline gap-1 mb-8">
            <span className="text-gray-500 text-sm">R$</span>
            <span className="text-4xl font-black">{plan.price}</span>
            <span className="text-gray-500 text-sm">/mês</span>
          </div>
          <div className="space-y-4 flex-1 mb-8">
            {plan.features.map((f, j) => (
              <div key={j} className="flex items-center gap-3 text-sm text-gray-400">
                <Check size={16} className="text-emerald-500" />
                <span>{f}</span>
              </div>
            ))}
          </div>
          <button className={cn(
            "w-full py-4 rounded-xl font-bold transition-all",
            plan.popular ? "bg-emerald-500 text-black hover:bg-emerald-400" : "bg-white/5 hover:bg-white/10"
          )}>
            Assinar Agora
          </button>
        </div>
      ))}
    </div>
  </div>
);

const Faturamento = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="glass-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
            <TrendingUp size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold">Faturamento</h1>
            <p className="text-gray-400 text-sm">Gerencie suas receitas e despesas</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-emerald-500 text-black rounded-lg text-sm font-bold hover:bg-emerald-400 transition-all flex items-center gap-2">
          <X size={16} className="rotate-45" />
          <span>Nova Movimentação</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
              <TrendingUp size={16} />
            </div>
            <span className="text-gray-400 text-xs font-medium">Total Receitas</span>
          </div>
          <span className="text-xl font-bold text-emerald-500">R$ 0,00</span>
        </div>
        <div className="glass-card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
              <TrendingUp size={16} className="rotate-180" />
            </div>
            <span className="text-gray-400 text-xs font-medium">Total Despesas</span>
          </div>
          <span className="text-xl font-bold text-red-500">R$ 0,00</span>
        </div>
        <div className="glass-card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
              <DollarSign size={16} />
            </div>
            <span className="text-gray-400 text-xs font-medium">Saldo Atual</span>
          </div>
          <span className="text-xl font-bold text-emerald-500">R$ 0,00</span>
        </div>
        <div className="glass-card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
              <Percent size={16} />
            </div>
            <span className="text-gray-400 text-xs font-medium">ROI</span>
          </div>
          <span className="text-xl font-bold text-emerald-500">0.0%</span>
        </div>
      </div>

      {/* Chart Section */}
      <div className="glass-card p-6">
        <h3 className="font-bold mb-8">Evolução Mensal</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#71717a" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                dy={10}
              />
              <YAxis 
                stroke="#71717a" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#18181b', 
                  border: '1px solid #27272a',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                itemStyle={{ color: '#10b981' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#10b981" 
                strokeWidth={2} 
                dot={{ fill: '#10b981', r: 4 }} 
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Investments Section */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-bold">Investimentos</h3>
          <button className="px-3 py-1.5 bg-emerald-500 text-black rounded-lg text-xs font-bold hover:bg-emerald-400 transition-all flex items-center gap-1">
            <X size={14} className="rotate-45" />
            <span>Adicionar</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-white/5 rounded-xl border border-brand-border">
            <span className="text-gray-500 text-xs block mb-2">Total Investido</span>
            <span className="text-lg font-bold">R$ 0,00</span>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-xl border border-brand-border">
            <span className="text-gray-500 text-xs block mb-2">Retorno Obtido</span>
            <span className="text-lg font-bold">R$ 0,00</span>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-xl border border-brand-border">
            <span className="text-gray-500 text-xs block mb-2">Saldo Atual</span>
            <span className="text-lg font-bold text-emerald-500">+R$ 0,00</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-12 opacity-20">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
            <TrendingUp size={32} />
          </div>
          <p className="text-sm font-medium">Nenhum investimento registrado</p>
        </div>
      </div>
    </div>
  );
};

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active, 
  onClick, 
  premium 
}: { 
  icon: any, 
  label: string, 
  active?: boolean, 
  onClick: () => void,
  premium?: boolean
}) => (
  <button
    onClick={onClick}
    className={cn(
      "nav-item",
      active && "nav-item-active"
    )}
  >
    <Icon size={20} />
    <span className="flex-1 text-left text-sm font-medium">{label}</span>
    {premium && <Crown size={14} className="text-amber-400" />}
  </button>
);

const StatCard = ({ title, value, subtitle, trend, icon: Icon, color = "emerald" }: any) => (
  <div className="glass-card p-5 flex flex-col gap-2">
    <div className="flex justify-between items-start">
      <div className="flex flex-col">
        <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">{title}</span>
        <span className="text-2xl font-bold mt-1">{value}</span>
      </div>
      <div className={cn("p-2 rounded-lg bg-opacity-10", `bg-${color}-500 text-${color}-500`)}>
        <Icon size={20} />
      </div>
    </div>
    {(subtitle || trend) && (
      <div className="flex items-center gap-2 mt-2">
        {trend && (
          <span className="text-emerald-500 text-xs font-medium flex items-center gap-0.5">
            <TrendingUp size={12} /> {trend}
          </span>
        )}
        {subtitle && <span className="text-gray-500 text-xs">{subtitle}</span>}
      </div>
    )}
  </div>
);

// --- Views ---

const Overview = ({ userName }: { userName: string }) => (
  <div className="flex flex-col gap-8">
    <div className="glass-card p-6 flex items-center gap-4 bg-gradient-to-r from-emerald-500/5 to-transparent">
      <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
        <LayoutDashboard size={24} />
      </div>
      <div>
        <h1 className="text-xl font-bold">Olá, {userName} 👋</h1>
        <p className="text-gray-400 text-sm">Bem-vindo de volta ao all-in</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <StatCard 
        title="Faturamento Total" 
        value="R$ 0,00" 
        subtitle="vs mês anterior" 
        trend="+0%" 
        icon={DollarSign} 
      />
      <StatCard 
        title="Cálculos Realizados" 
        value="0" 
        subtitle="Total de usos" 
        icon={Calculator} 
        color="blue"
      />
      <StatCard 
        title="Descrições Geradas" 
        value="0" 
        subtitle="Total de usos" 
        icon={FileText} 
        color="emerald"
      />
      <StatCard 
        title="Imagens Geradas" 
        value="0" 
        subtitle="Total de usos" 
        icon={ImageIcon} 
        color="purple"
      />
      <StatCard 
        title="Tempo Economizado" 
        value="0.0h" 
        subtitle="Estimativa" 
        icon={Clock} 
        color="orange"
      />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 glass-card p-6 min-h-[300px]">
        <h3 className="font-bold mb-6">Ferramentas Recentes</h3>
        <div className="flex flex-col items-center justify-center h-full text-center py-12">
          <div className="p-4 bg-white/5 rounded-full mb-4">
            <Search size={32} className="text-gray-600" />
          </div>
          <p className="text-gray-400 text-sm">Nenhuma ferramenta usada ainda</p>
          <p className="text-gray-500 text-xs mt-1">Comece a usar as ferramentas do all-in!</p>
        </div>
      </div>
      
      <div className="glass-card p-6">
        <h3 className="font-bold mb-6">Estatísticas Rápidas</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-xl">
              <span className="text-gray-500 text-xs block mb-1">Meta Mensal</span>
              <span className="text-lg font-bold">0%</span>
            </div>
            <div className="p-4 bg-white/5 rounded-xl">
              <span className="text-gray-500 text-xs block mb-1">Lucro Líquido</span>
              <span className="text-lg font-bold">R$ 0,00</span>
            </div>
          </div>
          
          <div className="p-4 bg-white/5 rounded-xl">
            <span className="text-gray-500 text-xs block mb-1">Total Investido</span>
            <span className="text-lg font-bold">R$ 0,00</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Progresso da Meta</span>
              <span className="text-emerald-500 font-bold">0.0%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TaxCalculator = () => {
  const [salePrice, setSalePrice] = useState<number>(0);
  const [costPrice, setCostPrice] = useState<number>(0);
  const [taxRate, setTaxRate] = useState<number>(15);
  const [shipping, setShipping] = useState<number>(0);

  const taxAmount = (salePrice * taxRate) / 100;
  const profit = salePrice - costPrice - taxAmount - shipping;
  const margin = salePrice > 0 ? (profit / salePrice) * 100 : 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
          <Calculator size={24} />
        </div>
        <h1 className="text-2xl font-bold">Calculadora de Taxas</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-4">
          <h3 className="font-bold text-gray-300">Dados da Venda</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">Preço de Venda (R$)</label>
              <input 
                type="number" 
                value={salePrice}
                onChange={(e) => setSalePrice(Number(e.target.value))}
                className="w-full bg-white/5 border border-brand-border rounded-lg p-3 focus:border-blue-500/50 outline-none transition-all"
                placeholder="0,00"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">Custo do Produto (R$)</label>
              <input 
                type="number" 
                value={costPrice}
                onChange={(e) => setCostPrice(Number(e.target.value))}
                className="w-full bg-white/5 border border-brand-border rounded-lg p-3 focus:border-blue-500/50 outline-none transition-all"
                placeholder="0,00"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">Taxa Marketplace (%)</label>
                <input 
                  type="number" 
                  value={taxRate}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                  className="w-full bg-white/5 border border-brand-border rounded-lg p-3 focus:border-blue-500/50 outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">Frete/Outros (R$)</label>
                <input 
                  type="number" 
                  value={shipping}
                  onChange={(e) => setShipping(Number(e.target.value))}
                  className="w-full bg-white/5 border border-brand-border rounded-lg p-3 focus:border-blue-500/50 outline-none transition-all"
                  placeholder="0,00"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col justify-between">
          <h3 className="font-bold text-gray-300 mb-6">Resultado da Operação</h3>
          <div className="space-y-6">
            <div className="flex justify-between items-end border-b border-brand-border pb-4">
              <span className="text-gray-400">Taxas Totais</span>
              <span className="text-xl font-bold text-red-400">- R$ {taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-end border-b border-brand-border pb-4">
              <span className="text-gray-400">Lucro Líquido</span>
              <span className={cn("text-2xl font-bold", profit >= 0 ? "text-emerald-500" : "text-red-500")}>
                R$ {profit.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-gray-400">Margem de Lucro</span>
              <div className="text-right">
                <span className={cn("text-2xl font-bold", margin >= 20 ? "text-emerald-500" : margin >= 10 ? "text-yellow-500" : "text-red-500")}>
                  {margin.toFixed(1)}%
                </span>
                <p className="text-[10px] text-gray-500 mt-1">Margem ideal: {'>'} 20%</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
            <div className="flex gap-3">
              <Sparkles className="text-blue-500 shrink-0" size={20} />
              <p className="text-xs text-blue-200/70 leading-relaxed">
                Dica: Se sua margem está abaixo de 15%, considere renegociar com fornecedores ou ajustar seu preço de venda.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DescriptionGenerator = () => {
  const [name, setName] = useState('');
  const [features, setFeatures] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!name || !features) return;
    setLoading(true);
    try {
      const text = await generateProductDescription(name, features);
      setResult(text || '');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
          <FileText size={24} />
        </div>
        <h1 className="text-2xl font-bold">Gerador de Descrição IA</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-6">
          <div>
            <label className="text-xs text-gray-500 uppercase font-bold mb-2 block">Nome do Produto</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-brand-border rounded-lg p-3 focus:border-emerald-500/50 outline-none transition-all"
              placeholder="Ex: Smartwatch Ultra Pro Max"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 uppercase font-bold mb-2 block">Características Principais</label>
            <textarea 
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              className="w-full bg-white/5 border border-brand-border rounded-lg p-3 h-40 focus:border-emerald-500/50 outline-none transition-all resize-none"
              placeholder="Ex: À prova d'água, bateria de 7 dias, monitor cardíaco, tela AMOLED..."
            />
          </div>
          <button 
            onClick={handleGenerate}
            disabled={loading || !name || !features}
            className="w-full py-4 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
            {loading ? 'Gerando Descrição...' : 'Gerar Descrição Profissional'}
          </button>
        </div>

        <div className="glass-card p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-300">Resultado</h3>
            {result && (
              <button 
                onClick={copyToClipboard}
                className="p-2 hover:bg-white/5 rounded-lg text-gray-400 transition-all flex items-center gap-2 text-xs"
              >
                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            )}
          </div>
          
          <div className="flex-1 bg-black/20 rounded-xl p-4 overflow-y-auto max-h-[500px] border border-brand-border">
            {result ? (
              <div className="markdown-body prose prose-invert prose-sm max-w-none">
                <Markdown>{result}</Markdown>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-600">
                <FileText size={48} className="mb-4 opacity-20" />
                <p className="text-sm">Sua descrição aparecerá aqui após a geração.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const img = await generateAIImage(prompt);
      setImage(img || null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
          <ImageIcon size={24} />
        </div>
        <h1 className="text-2xl font-bold">Gerador de Imagens IA</h1>
        <div className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold rounded uppercase tracking-wider">Premium</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-6">
          <div>
            <label className="text-xs text-gray-500 uppercase font-bold mb-2 block">O que você quer criar?</label>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-white/5 border border-brand-border rounded-lg p-4 h-48 focus:border-purple-500/50 outline-none transition-all resize-none text-lg"
              placeholder="Ex: Uma foto profissional de um smartwatch moderno em fundo escuro com luzes neon..."
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-white/5 rounded-xl border border-brand-border">
              <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Formato</span>
              <span className="text-sm font-medium">Quadrado (1:1)</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-brand-border">
              <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Qualidade</span>
              <span className="text-sm font-medium">Ultra HD</span>
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading || !prompt}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
            {loading ? 'Criando sua imagem...' : 'Gerar Imagem com IA'}
          </button>
        </div>

        <div className="glass-card p-6 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
          {image ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full h-full flex flex-col items-center"
            >
              <img src={image} alt="AI Generated" className="w-full aspect-square object-cover rounded-xl shadow-2xl" />
              <div className="flex gap-4 mt-6 w-full">
                <a 
                  href={image} 
                  download="imperiall-ai-image.png"
                  className="flex-1 py-3 bg-white/5 border border-brand-border rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                >
                  <Download size={18} /> Baixar
                </a>
                <button className="flex-1 py-3 bg-white/5 border border-brand-border rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                  <Copy size={18} /> Copiar
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-gray-600">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                <ImageIcon size={40} className="opacity-20" />
              </div>
              <p className="text-sm font-medium text-gray-400">Sua criação aparecerá aqui</p>
              <p className="text-xs text-gray-500 mt-2 max-w-[250px]">Use o poder da inteligência artificial para criar fotos de produtos incríveis em segundos.</p>
            </div>
          )}

          {loading && (
            <div className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm flex flex-col items-center justify-center z-10">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-500 animate-pulse" size={24} />
              </div>
              <p className="mt-4 font-bold text-purple-400 animate-pulse">A IA está trabalhando...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Login = ({ onLogin }: { onLogin: (name: string) => void }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate auth
    setTimeout(() => {
      setLoading(false);
      onLogin(isRegister ? name : (email.split('@')[0]));
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-2xl text-black mb-4 shadow-xl shadow-emerald-500/20">
            <Crown size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">all-<span className="text-emerald-500">in</span></h1>
          <p className="text-gray-500 mt-2">
            {isRegister ? 'Crie sua conta para começar seu império' : 'Acesse sua conta para gerenciar seu império'}
          </p>
        </div>

        <div className="glass-card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {isRegister && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="text-xs text-gray-500 uppercase font-bold mb-2 block">Nome Completo</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-brand-border rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-emerald-500/50 transition-all"
                      placeholder="Seu nome"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="text-xs text-gray-500 uppercase font-bold mb-2 block">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-brand-border rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-emerald-500/50 transition-all"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500 uppercase font-bold mb-2 block">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-brand-border rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-emerald-500/50 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {!isRegister && (
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-gray-400">
                  <input type="checkbox" className="rounded border-brand-border bg-white/5 text-emerald-500 focus:ring-emerald-500/20" />
                  Lembrar de mim
                </label>
                <a href="#" className="text-emerald-500 hover:text-emerald-400 font-bold">Esqueceu a senha?</a>
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
              {loading ? (isRegister ? 'Criando conta...' : 'Entrando...') : (isRegister ? 'Criar Conta Grátis' : 'Entrar no Dashboard')}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-brand-border text-center">
            <p className="text-sm text-gray-500">
              {isRegister ? 'Já tem uma conta?' : 'Não tem uma conta?'} 
              <button 
                onClick={() => setIsRegister(!isRegister)}
                className="text-emerald-500 font-bold hover:text-emerald-400 ml-1"
              >
                {isRegister ? 'Fazer Login' : 'Criar agora'}
              </button>
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 opacity-50">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Check size={14} className="text-emerald-500" />
            <span>Seguro</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Check size={14} className="text-emerald-500" />
            <span>Criptografado</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('Usuário');
  const [currentView, setCurrentView] = useState<View>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!isAuthenticated) {
    return <Login onLogin={(name) => {
      setUserName(name);
      setIsAuthenticated(true);
    }} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'overview': return <Overview userName={userName} />;
      case 'aprendizado': return <Aprendizado />;
      case 'faturamento': return <Faturamento />;
      case 'taxas': return <TaxCalculator />;
      case 'preco': return <PriceGenerator />;
      case 'mensagem': return <AutoMessageGenerator />;
      case 'descricao': return <DescriptionGenerator />;
      case 'imagem': return <ImageGenerator />;
      case 'ajuda': return <AIAssistantView />;
      case 'fornecedores': return <SuppliersView />;
      case 'assinaturas': return <SubscriptionsView />;
      default: return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <h2 className="text-2xl font-bold text-gray-400">Em desenvolvimento</h2>
          <p className="text-gray-500 mt-2">Esta funcionalidade estará disponível em breve.</p>
        </div>
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-brand-dark">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-brand-card border-r border-brand-border transition-transform duration-300 lg:relative lg:translate-x-0",
          !sidebarOpen && "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-black">A</div>
            <span className="text-xl font-black tracking-tighter uppercase">all-<span className="text-emerald-500">in</span></span>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <div className="px-6 mb-4">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Principal</span>
            </div>
            <nav className="space-y-1">
              <SidebarItem icon={LayoutDashboard} label="Overview" active={currentView === 'overview'} onClick={() => setCurrentView('overview')} />
              <SidebarItem icon={LifeBuoy} label="Aprenda a Vender" active={currentView === 'aprendizado'} onClick={() => setCurrentView('aprendizado')} />
              <SidebarItem icon={BarChart3} label="Dashboard" active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} />
              <SidebarItem icon={DollarSign} label="Faturamento" active={currentView === 'faturamento'} onClick={() => setCurrentView('faturamento')} />
              <SidebarItem icon={Calculator} label="Calculadora de Taxas" active={currentView === 'taxas'} onClick={() => setCurrentView('taxas')} />
              <SidebarItem icon={Tag} label="Gerador de Preço" active={currentView === 'preco'} onClick={() => setCurrentView('preco')} />
              <SidebarItem icon={MessageSquare} label="Gerador de Mensagem" active={currentView === 'mensagem'} onClick={() => setCurrentView('mensagem')} />
              <SidebarItem icon={FileText} label="Geradores de Descrição" active={currentView === 'descricao'} onClick={() => setCurrentView('descricao')} />
              <SidebarItem icon={ImageIcon} label="Gerador de Imagens IA" premium active={currentView === 'imagem'} onClick={() => setCurrentView('imagem')} />
              <SidebarItem icon={Sparkles} label="Ajuda & IA" active={currentView === 'ajuda'} onClick={() => setCurrentView('ajuda')} />
              <SidebarItem icon={Users} label="Fornecedores" active={currentView === 'fornecedores'} onClick={() => setCurrentView('fornecedores')} />
              <SidebarItem icon={CreditCard} label="Assinaturas" active={currentView === 'assinaturas'} onClick={() => setCurrentView('assinaturas')} />
            </nav>

            <div className="px-6 mt-8 mb-4">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Sistema</span>
            </div>
            <nav className="space-y-1">
              <SidebarItem icon={Settings} label="Configurações" active={currentView === 'configuracoes'} onClick={() => setCurrentView('configuracoes')} />
              <SidebarItem icon={HelpCircle} label="Central de Ajuda" onClick={() => {}} />
              <SidebarItem icon={LogOut} label="Sair" onClick={() => setIsAuthenticated(false)} />
            </nav>
          </div>

          <div className="p-4 border-t border-brand-border">
            <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">{userName}</p>
                <p className="text-[10px] text-gray-500 truncate">Plano Pro</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-brand-border flex items-center justify-between px-6 sticky top-0 bg-brand-dark/80 backdrop-blur-md z-40">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-white/5 rounded-lg"
          >
            <Menu size={20} />
          </button>

          <div className="flex-1 max-w-xl mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Pesquisar ferramentas..." 
                className="w-full bg-white/5 border border-brand-border rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/5 rounded-lg relative">
              <Bell size={20} className="text-gray-400" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-brand-dark" />
            </button>
            <div className="h-8 w-[1px] bg-brand-border mx-2" />
            <button className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500 text-black rounded-lg text-sm font-bold hover:bg-emerald-400 transition-all">
              <Crown size={16} />
              <span>Upgrade</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6 lg:p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {!sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        />
      )}
    </div>
  );
}

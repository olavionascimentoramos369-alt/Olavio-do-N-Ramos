export type View = 
  | 'overview' 
  | 'dashboard' 
  | 'faturamento' 
  | 'taxas' 
  | 'preco' 
  | 'mensagem' 
  | 'descricao' 
  | 'imagem' 
  | 'ajuda' 
  | 'fornecedores' 
  | 'assinaturas' 
  | 'configuracoes'
  | 'aprendizado';

export interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: string;
  icon: React.ReactNode;
  color?: string;
}

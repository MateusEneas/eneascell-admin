export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
  categories: Categoria[];
}

export interface Categoria {
  id: string;
  nome: string;
}

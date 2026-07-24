export type Nicho = "ecommerce" | "servico" | "infoproduto" | "local";

export const NICHO_LABEL: Record<Nicho, string> = {
  ecommerce: "E-commerce",
  servico: "Serviço",
  infoproduto: "Infoproduto",
  local: "Local",
};

export interface CasoScenario {
  r: number;
  label: string;
  payback: string;
  miles: [number, string][];
}

export interface Caso {
  slug: string;
  cliente: string;
  nicho: Nicho;
  metricaPrincipal: string;
  periodo: string;
  resumo: string;
  contexto: string;
  desafio: string;
  oQueAKivoFez: string[];
  depoimento: {
    texto: string;
    autor: string;
    cargo: string;
  };
  scenario: CasoScenario;
}

// TODO: revisar copy — dados de placeholder até termos os cases reais aprovados pelo cliente.
export const casos: Caso[] = [
  {
    slug: "loja-atelie-norte",
    cliente: "Ateliê Norte",
    nicho: "ecommerce",
    metricaPrincipal: "4,1x ROAS",
    periodo: "8 meses de gestão",
    resumo:
      "E-commerce de decoração saiu de vendas irregulares pra um fluxo de caixa previsível com Meta Ads.",
    contexto:
      "A Ateliê Norte vendia bem no orgânico, mas as campanhas pagas rodavam sem estrutura de teste — verba concentrada em poucos anúncios, sem pixel configurado corretamente.",
    desafio:
      "CAC alto e ROAS instável mês a mês, sem visibilidade clara de quais produtos e criativos realmente traziam margem.",
    oQueAKivoFez: [
      "Reestruturação completa do rastreamento (pixel + API de conversão)",
      "Testes de criativo em ciclos de 7 dias, separados por categoria de produto",
      "Campanhas de catálogo dinâmico para retomada de carrinho",
      "Dashboards semanais de ROAS por produto",
    ],
    depoimento: {
      texto:
        "A gente parou de adivinhar o que funcionava. Hoje sabemos exatamente onde cada real de mídia vai.",
      autor: "Camila R.",
      cargo: "Sócia-fundadora, Ateliê Norte",
    },
    scenario: {
      r: 1.17,
      label: "+410%",
      payback: "mês 3",
      miles: [
        [3, "Payback"],
        [6, "Escala validada"],
        [8, "Melhor mês histórico"],
      ],
    },
  },
  {
    slug: "clinica-vitta",
    cliente: "Clínica Vitta",
    nicho: "servico",
    metricaPrincipal: "-42% CPL",
    periodo: "6 meses de gestão",
    resumo:
      "Clínica de estética reduziu custo por lead e passou a operar com agenda cheia previsível.",
    contexto:
      "Dependência de indicação e uma agenda de procedimentos com ociosidade em semanas específicas do mês.",
    desafio:
      "Custo por lead alto no Meta Ads e nenhuma campanha de Google captando quem já buscava o procedimento.",
    oQueAKivoFez: [
      "Campanhas de Google Search para captura de demanda quente",
      "Funil de agendamento com página de captura dedicada por procedimento",
      "Segmentação por bairro e remarketing para quem visitou mas não agendou",
      "Rotina de otimização semanal de públicos e lances",
    ],
    depoimento: {
      texto:
        "Em três meses a agenda virou o nosso problema bom: ter vaga suficiente pra atender.",
      autor: "Dr. Rafael M.",
      cargo: "Diretor clínico, Clínica Vitta",
    },
    scenario: {
      r: 1.15,
      label: "+330%",
      payback: "mês 4",
      miles: [
        [4, "Payback"],
        [7, "Escala validada"],
        [11, "Melhor mês histórico"],
      ],
    },
  },
  {
    slug: "metodo-avanti",
    cliente: "Método Avanti",
    nicho: "infoproduto",
    metricaPrincipal: "5,8x ROAS",
    periodo: "12 meses de gestão",
    resumo:
      "Infoproduto de educação financeira escalou de lançamento pontual pra esteira perpétua.",
    contexto:
      "Faturamento concentrado em 2 lançamentos por ano, com equipe exausta entre eles e caixa irregular.",
    desafio:
      "Sair da lógica de lançamento e construir uma operação de tráfego que gerasse venda todos os dias.",
    oQueAKivoFez: [
      "Estrutura de funil perpétuo com webinar automatizado",
      "Testes de ângulo de oferta e criativo em Meta Ads",
      "Campanhas de retargeting por estágio do funil",
      "Integração de rastreamento com a plataforma de checkout",
    ],
    depoimento: {
      texto:
        "Hoje vendemos todos os dias, não só duas vezes por ano. Isso mudou o caixa e mudou a operação inteira.",
      autor: "Bruno T.",
      cargo: "Fundador, Método Avanti",
    },
    scenario: {
      r: 1.21,
      label: "+780%",
      payback: "mês 2",
      miles: [
        [2, "Payback"],
        [5, "Escala validada"],
        [9, "Melhor mês histórico"],
      ],
    },
  },
  {
    slug: "marcenaria-bom-corte",
    cliente: "Marcenaria Bom Corte",
    nicho: "local",
    metricaPrincipal: "3,2x ROAS",
    periodo: "5 meses de gestão",
    resumo:
      "Marcenaria sob medida saiu da dependência de indicação boca a boca pra um funil local previsível.",
    contexto:
      "Negócio local tradicional, sem histórico de mídia paga, com orçamento enxuto e ticket médio alto.",
    desafio:
      "Gerar leads qualificados dentro de um raio de atuação viável, sem desperdiçar verba com curiosos.",
    oQueAKivoFez: [
      "Campanhas de geolocalização por raio de entrega",
      "Criativos com portfólio real de projetos entregues",
      "Formulário de orçamento qualificando verba e prazo antes do contato",
      "WhatsApp integrado ao funil para resposta rápida",
    ],
    depoimento: {
      texto:
        "Passamos a receber pedido de orçamento de gente que já sabia o que queria e tinha orçamento pra isso.",
      autor: "João P.",
      cargo: "Proprietário, Marcenaria Bom Corte",
    },
    scenario: {
      r: 1.13,
      label: "+265%",
      payback: "mês 4",
      miles: [
        [4, "Payback"],
        [7, "Escala validada"],
        [10, "Melhor mês histórico"],
      ],
    },
  },
  {
    slug: "loja-vertti-moda",
    cliente: "Vertti Moda",
    nicho: "ecommerce",
    metricaPrincipal: "4,6x ROAS",
    periodo: "9 meses de gestão",
    resumo:
      "Moda feminina consolidou operação de tráfego pago como principal canal de aquisição.",
    contexto:
      "Marca com bom produto e fotos, mas campanhas amadoras rodando sem estrutura de teste ou CRO na loja.",
    desafio:
      "Alta dependência de promoções agressivas de margem pra sustentar volume de vendas.",
    oQueAKivoFez: [
      "CRO na página de produto e no checkout",
      "Testes de criativo em vídeo com UGC",
      "Campanhas de catálogo por coleção",
      "Estrutura de escala por públicos semelhantes validados",
    ],
    depoimento: {
      texto:
        "Conseguimos vender com margem saudável de novo, sem depender de desconto pra girar estoque.",
      autor: "Marina S.",
      cargo: "CEO, Vertti Moda",
    },
    scenario: {
      r: 1.16,
      label: "+380%",
      payback: "mês 3",
      miles: [
        [3, "Payback"],
        [6, "Escala validada"],
        [9, "Melhor mês histórico"],
      ],
    },
  },
  {
    slug: "clinica-odonto-prime",
    cliente: "Odonto Prime",
    nicho: "servico",
    metricaPrincipal: "-35% CPL",
    periodo: "7 meses de gestão",
    resumo:
      "Rede de clínicas odontológicas padronizou aquisição de pacientes em 3 unidades.",
    contexto:
      "Cada unidade rodava campanha própria, sem padrão de rastreamento nem comparação de performance entre elas.",
    desafio:
      "Unificar operação de mídia mantendo relevância local pra cada unidade.",
    oQueAKivoFez: [
      "Estrutura de campanha replicável por unidade com rastreamento unificado",
      "Google Ads local para procedimentos de maior ticket",
      "Dashboard comparativo entre unidades",
      "Central de atendimento com SLA de resposta ao lead",
    ],
    depoimento: {
      texto:
        "Pela primeira vez conseguimos comparar unidade com unidade e replicar o que funciona.",
      autor: "Dra. Fernanda L.",
      cargo: "Sócia, Odonto Prime",
    },
    scenario: {
      r: 1.145,
      label: "+250%",
      payback: "mês 4",
      miles: [
        [4, "Payback"],
        [7, "Escala validada"],
        [11, "Melhor mês histórico"],
      ],
    },
  },
];

export function getCasoBySlug(slug: string): Caso | undefined {
  return casos.find((c) => c.slug === slug);
}

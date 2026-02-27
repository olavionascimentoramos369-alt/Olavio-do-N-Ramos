import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateProductDescription(productName: string, features: string) {
  const model = "gemini-3-flash-preview";
  const prompt = `Gere uma descrição de produto profissional e persuasiva para um e-commerce.
  Nome do Produto: ${productName}
  Características: ${features}
  
  A descrição deve incluir:
  1. Um título chamativo.
  2. Um parágrafo de introdução focado em benefícios.
  3. Uma lista de características principais.
  4. Uma conclusão com chamada para ação (CTA).
  
  Responda em Português do Brasil.`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
  });

  return response.text;
}

export async function generateAutoMessage(context: string, tone: string) {
  const model = "gemini-3-flash-preview";
  const prompt = `Gere uma mensagem automática de atendimento ao cliente para um vendedor de produtos digitais (como contas de jogos, gift cards, etc).
  Contexto da mensagem: ${context}
  Tom de voz: ${tone}
  
  A mensagem deve ser profissional, clara e amigável. Se for uma mensagem de entrega, inclua espaços reservados como [LINK] ou [CÓDIGO].
  
  Responda em Português do Brasil.`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
  });

  return response.text;
}

export async function generateSalesAdvice(question: string) {
  const model = "gemini-3-flash-preview";
  const prompt = `Você é um mentor especialista em vendas digitais e marketplaces como GGMAX, Mercado Livre e Shopee.
  O usuário perguntou: ${question}
  
  Dê conselhos práticos, estratégias de vendas e dicas de como evitar golpes ou melhorar o atendimento.
  Seja direto e motivador.
  
  Responda em Português do Brasil.`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
  });

  return response.text;
}

export async function generateAIImage(prompt: string) {
  const model = "gemini-2.5-flash-image";
  
  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [{ text: prompt }]
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  
  throw new Error("Não foi possível gerar a imagem.");
}

#  Galeria de Fotos
### Este projeto foi desenvolvido para conclusão do Desafio de Programação para o Processo Seletivo da Aceleradora Ágil 2025/1
##### O projeto consiste em uma aplicação web que exibe uma galeria de fotos, permitindo que os usuários visualizem, filtrem e pesquisem imagens com base em palavras-chave.

## Projeto desenvolvido utilizando as seguintes tecnologias
  - React
  - Typescript
  - Next
  - Tailwind css
  - *Unsplash API*

*Este projeto foi inicializado com [Next](https://nextjs.org/) na versão 14 utilizando o diretório app.*

## Visualização do Projeto
*Acesse o projeto em produção [aqui](https://aceleradora.vercel.app/)*

Para visualizar o projeto localmente, siga as instruções abaixo.

1. Clone o repositório:
```bash
git clone https://github.com/matheusdsilva01/aceleradora.git
```

2. Acesse o diretório do projeto frontend e instale as dependências: 

```bash
cd aceleradora
cd frontend
npm install
```

3. Crie um arquivo `.env.local` na raiz do projeto frontend e adicione a chave `Access Key` do Unsplash:\
Para uso da API do Unsplash é necessário criar uma conta em [Unsplash](https://unsplash.com/documentation#getting-started) e registrar um aplicativo para geração da chave `Access key`.

Para facilitar o acesso a aplicação, durante o período do processo seletivo, está disponível uma chave de acesso, no arquivo .env.local no repositório, para uso da API do Unsplash.  

```bash
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=SUA CHAVE 'Access Key' AQUI
```

4. Após a instalação das dependências, execute o projeto:

```bash
npm run dev
```

## Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm install`

Para instalação de todas as dependências necessárias para funcionamento do projeto.

### `npm run dev`

Executa o aplicativo:\
Abra [http://localhost:3000](http://localhost:3000) para visualizá-lo no navegador.\
A página será recarregada se você fizer edições no código.

### `npm run build`

Constrói o aplicativo para produção na pasta `.next`.\
Ele agrupa corretamente o React no modo de produção e otimiza o build para obter o melhor desempenho.

### `npm start`

Inicia o aplicativo em produção.\
O aplicativo será servido em [http://localhost:3000](http://localhost:3000).
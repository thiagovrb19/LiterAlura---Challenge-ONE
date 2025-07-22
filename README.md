# 📚 LiterAlura Thiago Marques - Catálogo de Livros Interativo

Bem-vindo ao LiterAlura Thiago Marques, um catálogo de livros interativo e moderno que permite explorar milhares de obras clássicas do Project Gutenberg! Desenvolvido com as mais recentes tecnologias web, este projeto oferece uma experiência de busca e visualização de livros fluida e visualmente atraente.

## ✨ Funcionalidades

*   **Busca Dinâmica**: Pesquise livros por título ou autor em tempo real.
*   **Filtro por Idioma**: Refine sua busca selecionando o idioma desejado (Inglês, Português, Espanhol, Francês, Alemão, entre outros).
*   **Interface Intuitiva**: Design limpo e responsivo, adaptado para diferentes tamanhos de tela.
*   **Animações Suaves**: Transições e efeitos visuais que enriquecem a experiência do usuário, utilizando Framer Motion.
*   **Exibição Detalhada**: Cards de livros com informações essenciais como título, autor, idioma e contagem de downloads.
*   **Feedback Visual**: Mensagens claras para estados de carregamento, erro e resultados não encontrados.

## 🚀 Tecnologias Utilizadas

*   **Vite**: Ferramenta de build rápida para desenvolvimento web moderno.
*   **React 18.2.0**: Biblioteca JavaScript para construção de interfaces de usuário.
*   **TailwindCSS 3.3.2**: Framework CSS utilitário para estilização rápida e responsiva.
*   **Framer Motion 10.16.4**: Biblioteca para animações declarativas e fluidas.
*   **Lucide React 0.292.0**: Coleção de ícones bonitos e personalizáveis.
*   **React Helmet 6.1.0**: Para gerenciamento de tags `<head>` do documento, otimizando SEO.
*   **API Gutendex**: Fonte de dados para os livros, fornecendo acesso a mais de 70 mil obras do Project Gutenberg.

## 🛠️ Como Rodar o Projeto Localmente

Siga os passos abaixo para configurar e executar o projeto em sua máquina:

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/en/) (versão 20 ou superior) e o [npm](https://www.npmjs.com/) instalados em seu sistema.

### Instalação

1.  **Clone o repositório** (se estiver no GitHub):
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd literalura-thiago-marques
    ```
    (Se você baixou o arquivo ZIP, descompacte-o e navegue até a pasta do projeto no terminal.)

2.  **Instale as dependências**:
    ```bash
    npm install
    ```

### Executando o Servidor de Desenvolvimento

Para iniciar o aplicativo em modo de desenvolvimento:

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173` (ou outra porta, se a 5173 estiver em uso).

### Construindo para Produção

Para gerar uma versão otimizada para produção:

```bash
npm run build
```

Os arquivos de produção serão gerados na pasta `dist/`.

### Visualizando a Build de Produção

Para testar a build de produção localmente:

```bash
npm run preview
```

## 💡 Como Usar

1.  **Navegação**: Ao abrir o aplicativo, você verá uma lista de livros populares.
2.  **Busca**: Utilize a barra de pesquisa no cabeçalho para digitar o título ou autor do livro que deseja encontrar.
3.  **Filtro por Idioma**: Selecione um idioma no dropdown ao lado da barra de pesquisa para filtrar os resultados.
4.  **Interação**: Clique nos cards dos livros para futuras funcionalidades (atualmente, eles exibem informações básicas).

## 💖 Créditos

*   Desenvolvido com ❤️ por Thiago Marques.
*   Dados fornecidos pela [API Gutendex](https://gutendex.com/).
*   Ícones por [Lucide React](https://lucide.dev/).
*   Animações por [Framer Motion](https://www.framer.com/motion/).

---

**LiterAlura Thiago Marques** - Explore o mundo dos livros com uma nova perspectiva!

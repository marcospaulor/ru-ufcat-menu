Sistema de Gerenciamento de Cardápio do RU - UFCAT Serviços

O Sistema de Gerenciamento de Cardápio do RU - UFCAT Serviços é uma aplicação web desenvolvida para gerenciar o cardápio do Restaurante Universitário (RU) da UFCAT. Construído com Next.js e Firebase, permite atualizar cardápios e visualizar avaliações da comunidade universitária, integrando-se ao aplicativo UFCAT Serviços (desenvolvido com Flutter e Firebase). Este projeto promove transparência e engajamento na gestão nutricional da UFCAT.
🚀 Funcionalidades

Atualização dinâmica do cardápio do RU.
Visualização de avaliações e feedback da comunidade.
Integração com o app UFCAT Serviços via Firebase.
Interface intuitiva e responsiva para administradores.

🛠️ Tecnologias

Frontend: Next.js, React, TypeScript
Backend: Firebase (Firestore, Authentication)
Estilização: Tailwind CSS (ou substitua pela tecnologia usada)
Outros: Conventional Commits, ESLint, Prettier

📋 Pré-requisitos

Node.js (v16 ou superior)
npm ou Yarn
Conta no Firebase (para configuração do backend)
Git

⚙️ Instalação e Execução

Clone o repositório:
git clone https://github.com/seu-usuario/sistema-ru-menu-ufcat.git
cd sistema-ru-menu-ufcat


Instale as dependências:
npm install


Configure o Firebase:

Crie um projeto no Firebase Console.
Ative o Firestore e Authentication.
Copie as credenciais do Firebase e adicione-as em um arquivo .env.local:NEXT_PUBLIC_FIREBASE_API_KEY=seu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id




Execute a aplicação:
npm run dev

Abra http://localhost:3000 no navegador para ver o resultado.


🚀 Deploy

Build da aplicação:
npm run build


Deploy:

Use plataformas como Vercel, Netlify ou Firebase Hosting.
Exemplo para Vercel:vercel





📂 Estrutura do Projeto
sistema-ru-menu-ufcat/
├── src/
│   ├── app/
│   │   ├── components/         # Componentes React
│   │   │   ├── MenuForm.tsx    # Formulário para atualização de cardápios
│   │   │   ├── FeedbackList.tsx # Lista de avaliações
│   │   ├── hooks/             # Hooks customizados
│   │   │   ├── useMenu.ts     # Hook para gerenciar cardápios
│   │   │   ├── useFeedback.ts # Hook para avaliações
│   │   ├── interfaces/        # Interfaces TypeScript
│   │   │   ├── IMenu.ts       # Interface para cardápios
│   │   │   ├── IFeedback.ts   # Interface para avaliações
│   ├── pages/                 # Páginas Next.js
│   ├── public/                # Arquivos estáticos
│   ├── styles/                # Estilos globais (ex.: Tailwind CSS)
├── .env.local                 # Variáveis de ambiente
├── README.md                  # Documentação

Adicionando Componentes

Crie componentes em src/app/components/.
Declare propriedades com TypeScript:export interface MenuFormProps {
  onSubmit: (data: IMenu) => void;
}



Adicionando Hooks

Crie hooks em src/app/hooks/.
Exemplo:export interface UseMenuReturn {
  menus: IMenu[];
  addMenu: (menu: IMenu) => void;
}



Adicionando Interfaces

Crie interfaces em src/app/interfaces/.
Cada interface mapeia uma entidade ou rota da API:export interface IMenu {
  id: string;
  date: string;
  items: string[];
}



📝 Conventional Commits
Siga o padrão de Conventional Commits para mensagens de commit:

feat: Novas funcionalidades.
fix: Correção de bugs.
refactor: Refatoração de código.
style: Alterações de estilo (ex.: CSS).
test: Criação de testes.
docs: Atualizações na documentação.
chore: Tarefas que não alteram o código.

Exemplo:
git commit -m "feat: add menu update form"

🤝 Contribuição

Faça um fork do repositório.
Crie uma branch para sua feature (git checkout -b feat/nova-funcionalidade).
Commit suas alterações seguindo o padrão Conventional Commits.
Envie um pull request.

📜 Licença
Este projeto está licenciado sob a MIT License.
📬 Contato
Para dúvidas ou sugestões, abra uma issue ou entre em contato via seu-email@example.com.

⭐ Gostou do projeto? Dê uma estrela no GitHub!

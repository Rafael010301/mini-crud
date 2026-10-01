# GameTrack API - Documentação de Requisições HTTP e Testes (Insomnia)

Esta documentação detalha a arquitetura de comunicação HTTP entre a aplicação web GameTrack e o servidor simulado (JSON Server), servindo como guia prático para execução de testes através do Insomnia.

---

## Mapeamento de Métodos HTTP e Protocolo

A API segue os padrões da arquitetura RESTful para a manipulação dos recursos da coleção `jogos`. Cada operação utiliza um verbo HTTP específico para indicar a intenção da chamada ao servidor:

- **GET**: Utilizado para consulta e leitura de dados. Não altera o estado do servidor.
- **POST**: Utilizado para criação de novos registos na base de dados.
- **PUT**: Utilizado para atualização completa de um registo existente através do seu identificador.
- **DELETE**: Utilizado para remoção permanente de um registo.

Servidor Base: `http://localhost:3000`
Endpoint Principal: `http://localhost:3000/jogos`

---

## Coleção de Requisições para o Insomnia

### 1. Listar Todos os Jogos (GET)
- **Objetivo**: Recuperar a lista completa de jogos armazenados.
- **Método**: `GET`
- **URL**: `http://localhost:3000/jogos`
- **Cabeçalhos (Headers)**: Nenhum necessário.
- **Corpo (Body)**: Nenhum.
- **Resposta Esperada**: Código `200 OK` com o array JSON de todos os jogos.

---

### 2. Consultar Jogo por ID (GET)
- **Objetivo**: Obter os dados detalhados de um jogo específico através do seu ID.
- **Método**: `GET`
- **URL**: `http://localhost:3000/jogos/{id}` (Exemplo: `http://localhost:3000/jogos/1`)
- **Cabeçalhos (Headers)**: Nenhum necessário.
- **Corpo (Body)**: Nenhum.
- **Resposta Esperada**: Código `200 OK` com o objeto JSON do jogo solicitado, ou `404 Not Found` caso o ID não exista.

---

### 3. Filtrar Jogos por Consulta / Query String (GET)
- **Objetivo**: Realizar pesquisas por parâmetros específicos no banco de dados.
- **Método**: `GET`
- **Exemplos de URLs**:
  - Filtro exato por status: `http://localhost:3000/jogos?status=Finalizado`
  - Filtro por gênero: `http://localhost:3000/jogos?genero=RPG`
  - Filtro por plataforma: `http://localhost:3000/jogos?plataforma=PC`
- **Cabeçalhos (Headers)**: Nenhum necessário.
- **Corpo (Body)**: Nenhum.
- **Resposta Esperada**: Código `200 OK` contendo apenas os registos que correspondem estritamente aos parâmetros enviados.

---

### 4. Cadastrar Novo Jogo (POST)
- **Objetivo**: Criar e persistir um novo registo de jogo. O JSON Server gera automaticamente a propriedade `id`.
- **Método**: `POST`
- **URL**: `http://localhost:3000/jogos`
- **Cabeçalhos (Headers)**:
  - `Content-Type`: `application/json`
- **Corpo (Body - JSON)**:
```json
{
  "titulo": "The Witcher 3: Wild Hunt",
  "genero": "RPG",
  "plataforma": "PC",
  "nota": 9.8,
  "status": "Finalizado"
}
```
- **Resposta Esperada**: Código `201 Created` com o objeto JSON do jogo criado, incluindo o `id` gerado automaticamente.

---

### 5. Atualizar Jogo Existente (PUT)
- **Objetivo**: Substituir integralmente os dados de um jogo já existente no banco de dados.
- **Método**: `PUT`
- **URL**: `http://localhost:3000/jogos/{id}` (Exemplo: `http://localhost:3000/jogos/1`)
- **Cabeçalhos (Headers)**:
  - `Content-Type`: `application/json`
- **Corpo (Body - JSON)**:
```json
{
  "titulo": "The Witcher 3: Wild Hunt - Complete Edition",
  "genero": "RPG",
  "plataforma": "PC / PS5",
  "nota": 10.0,
  "status": "Finalizado"
}
```
- **Resposta Esperada**: Código `200 OK` com o objeto atualizado, ou `404 Not Found` se o recurso não for encontrado.

---

### 6. Remover Jogo (DELETE)
- **Objetivo**: Excluir permanentemente um registo do banco de dados.
- **Método**: `DELETE`
- **URL**: `http://localhost:3000/jogos/{id}` (Exemplo: `http://localhost:3000/jogos/1`)
- **Cabeçalhos (Headers)**: Nenhum necessário.
- **Corpo (Body)**: Nenhum.
- **Resposta Esperada**: Código `200 OK` (ou `204 No Content`) confirmando a remoção do registo.

---

### 7. Códigos de Status HTTP Principais
- `200 OK`: Requisição executada com sucesso (GET, PUT, DELETE).
- `201 Created`: Novo recurso criado com sucesso (POST).
- `400 Bad Request`: Erro de sintaxe na requisição ou JSON malformado.
- `404 Not Found`: Endpoint ou ID do recurso não encontrado no servidor.

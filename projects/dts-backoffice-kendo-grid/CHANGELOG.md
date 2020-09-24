# Changelog

**2.1.3 (24-09-2020):**

Correções:
- Edição de campo do tipo Numérico - Não estava respeitando o locale de formato (Americano x Europeu). E, quando entrava no modo de edição, os valores estavam sendo arredondados sempre para 2 decimais, mesmo que tenha sido parametrizado mais decimais no formato. Agora, ele irá respeitar a quantidade de decimais parametrizados no formato.
- Edição de campo do tipo Currency - Estava ocorrendo erro ao informar decimais neste tipo de campo.
- Edição de campo do tipo Lógico - Ao editar o campo, ele pedia o valor no formato de string (sim/não) e não atualizar o Grid após a edição. Agora, na edição, ele será um check-box.

**2.1.2 (22-09-2020):**

Correções:
- Coluna do tipo "currency" - Para colunas deste tipo, o valor será alinhado direita e, caso não seja informado a moeda, será considerado o símbolo "$" como padrão.

**2.1.1 (21-09-2020):**

Correções:
- Ações da Table - Dependendo da posição e a quantidade de ações da table, o menu-popup aparecia fora da tela, assim não era possível clicar em alguns itens. Agora, o Menu de Ações irá verificar a sua posição e se ajustar automaticamente na tela, para que todos os itens estejam visíveis.
- Dados da Table - Em alguns caso, quando a variável dos itens do grid era "nula", ocorria um erro e não era apresentado o Grid.

Refatoração:
- Dependência - Retirada a dependência ao pacote "@totvs/thf-kendo", antigo THF Kendo Grid.
- Versões Kendo Grid - Atualizada as versões dos pacotes Kendo Grid. Ver na documentação, no tópico "Pré-Requisitos -> Dependências" as atuais versões homologadas.

**2.1.0 (10-09-2020):**

Correções:
- Edição no Grid - Não era possível acessar diretamente uma célula ao clicar, somente era possível com TAB;
- Edição no Grid - Ao clicar em qualquer lugar, já saia da edição. Agora somente sairá, se clicar fora da linha que está sendo editada;
- Manipulação do Grid - Ao realizar algumas ações combinadas (Edição, Filtro, Agrupamento, Classificação, etc..) em alguns casos os registros eram duplicados ou sobrescritos. 

Melhorias:
- Edição no Grid - Incluída as ações de teclado:<br>
Enter - Confirma a inclusão ou alteração da linha.<br>
Esc - Cancela a inclusão ou alteração realizada.	
- Edição no Grid - Se a Toolbar do Grid estiver visível e o usuário estiver na edição o Grid (inclusão ou alteração), será apresentado na Toolbar o botão "Cancelar", que tem a mesma ação da tecla "Esc".

Refatoração:
- Edição no Grid - Os parâmetros "d-add-action" e "d-save-action", que recebiam uma string (função a ser disparada durante a edição do Grid), foram excluídos e substituídos pelo parâmetro "d-edit-actions", que é um objeto contendo as ações que poderam ser disparadas durante a edição. Este objeto irá utilizar uma nova interface chamada DtsEditAction.

**2.0.0 (02-09-2020):**

ATUALIZAÇÃO: **PO-UI v2** E **ANGULAR 9** e Documentação.

**0.0.24 (02-04-2020):**

Correção para aplicar a definição das colunas quando houver alteração.

**0.0.17 (03-02-2020):** 

Arquivo css para aplicar o tema da TOTVS no Kendo Grid.

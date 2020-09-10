# Changelog

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

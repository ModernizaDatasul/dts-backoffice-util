# Changelog

**15.1.0 (12-12-2023):**

Melhorias:
- ATUALIZAÇÃO: Evoluídas as versões das Bibliotecas do Kendo para serem compatíveis com o Angular 15.

**15.0.1 (19-10-2023):**

Correção:
- **Gerenciador de Colunas** - Corrigido para apresentar corretamente o gerenciador de colunas e as colunas disponíveis para alteração. Correção apenas visual.
- **Ações da Tabela** - Corrigido para apresentar corretamente o menu-popup de ações da tabela. Correção apenas visual.

**15.0.0 (31-03-2023):**

Melhorias:
- ATUALIZAÇÃO: **PO-UI v15** E **ANGULAR v15**.

**14.0.0 / 14.0.1 / 14.0.2 / 14.0.3 (02-09-2022):**

Melhorias:
- ATUALIZAÇÃO: **PO-UI v14** E **ANGULAR v14**.

**6.0.0 / 6.0.1 (13-06-2022):**

Melhorias:
- ATUALIZAÇÃO: **PO-UI v6** E **ANGULAR v13**.

**5.0.1 / 5.0.2 (13-06-2022):**

Correção:
- **Edição de Campo Data** - Corrigido o cabeçalho para apresentar corretamente o mês/ano e as setas anterior/próximo.

**5.0.0 (13-06-2022):**

Melhorias:
- ATUALIZAÇÃO: **PO-UI v5** E **ANGULAR v12**.

**4.0.0 / 4.0.1 (10-06-2022):**

Melhorias:
- ATUALIZAÇÃO: **PO-UI v4** E **ANGULAR v11**.

**3.0.0 / 3.0.1 (10-06-2022):**

Melhorias:
- ATUALIZAÇÃO: **PO-UI v3** E **ANGULAR v10**.

**2.8.1 / 2.8.2 (17-03-2021):**

Documentação:
- Atualização pré-requisitos. 

**2.8.0 (28-01-2021):**

Melhorias:
- **Seleção de Linha** - Incluída propriedade **d-single-select**: Quando a seleção de linha está habilitada (**d-selectable = true**), indica que somente é possí­vel selecionar uma linha.

**2.7.2 (19-01-2021):**

Correção:
- **Gerenciador de Colunas** - Ao disparar o evento **d-save-column-manager**, a lista passada será somente das colunas que estão disponíveis para manutenção (**locked = false**). Antes, passava todas as colunas.

**2.7.0 / 2.7.1 (25-11-2020):**

Melhorias:
- **Barra de Ferramentas (Grid Tools)** - As opções de "Maximizar/Minimizar", "Gerenciador de Colunas" e "Exportar (Excel/PDF)", foram reunidas em uma "Barra de Ferramentas", que é acessada através do botão de "Configuração", disponível no canto superior direito. Mas, a Barra somente estará disponível se for habilitada mais de uma opção. Se por exemplo, for habilitada somente a opção de "Gerenciador de Colunas", o acesso dele estará disponível diretamente no Grid (no lugar do botão de "Configuração").

**2.6.0 / 2.6.1 / 2.6.2 (09-11-2020):**

Melhorias:
- **Maximização**
<br>- Incluída a propriedade **d-show-maximize**, que permite ao usuário "Maximizar" o Grid, sendo possível configurar para que ele ocupe toda a tela.
<br>- Incluído o evento **d-maximize-change**, que é disparado quando o usuário Maximiza ou Minimiza o Grid.
- **Resize de Coluna**
<br>- Incluída a propriedade **d-resizable**, que indica se o usuário poderá alterar o tamanho das colunas.

**2.5.0 (23-10-2020):**

Melhorias:
- **Colunas do Grid**
<br>- Incluído a propriedade **"locked"** para indicar se o usuário pode alterar a visualização da coluna.
<br>- Criada a Interface **"DtsColumnConfigView"**, para alterar as configurações de visualização das colunas.

Breaking Changes:
- Métodos
<br>- **changeVisibleColumn** - Alterado o nome para **changeColumnConfigView** e seus parâmetros.
<br>- **changeVisibleColumnList** - Alterado o nome para **changeColumnConfigViewList** e seus parâmetros.

**2.4.0 / 2.4.1 / 2.4.2 (22-10-2020):**

Correções:
- **Campo Data + Filtro e Edição**
<br>- O Filtro e a Edição não estavam funcionando, ocorria um erro e não apresentava/atualizava nada.
<br>- Não estava respeitando a formatação de data conforme o idioma do usuário.

Melhorias:
- **Campo Data + Filtro e Edição**
<br>- Customizado o Filtro e a Edição, para apresentar o calendário no mesmo formato existente no PO-UI.
<br>- Incluída a opção "Hoje" no calendário.

**2.3.3 (15-10-2020):**

Correções:
- **Edição no Grid** - O parâmetro enviado para o método "d-save-value", referente a linha após a alteração (event.data) era apenas uma cópia. Agora será enviada a linha original, já com as alterações. Portanto, se for realizada alguma alteração neste objeto dentro do método, ele será repassado automaticamente para linha original.  

**2.3.2 (13-10-2020):**

Correções:
- **Edição no Grid**
<br>- O método saveAction (Interface: DtsEditAction) recebe o item que está sendo editado. Se este item fosse alterado dentro do método, a alteração não estava sendo repassada para a tela.
<br>- Quando o Grid está em Modal, e existe algum controle de erro no método "saveAction", o método continuava executando (e apresentando o erro), mesmo após a modal ser fechada.
<br>- O evento de "Esc" somente estava funcionando se o foco estivesse na linha em edição. Agora, ao clicar no "Esc" a edição será cancelada, mesmo que o foco não esteja na linha.

**2.3.1 (08-10-2020):**

Correções:
- **Colunas do Grid** - Para colunas do tipo "boolean", quando o valor era inválido, está sendo considerando/apresentado como "Não". Agora será considerado como inválido e apresentado "branco" no Grid.

**2.3.0 (07-10-2020):**

Correções:
- **Ações da Tabela** - Quando o usuário usava o Scroll, o menu fica "perdido". Agora, ao usar o Scroll, o menu irá sumir.

Melhorias:
- **Coluna de Comando** - No final do Grid existe uma coluna virtual chamada "Coluna de Comando", onde fica por exemplo, o menu de Ações da Tabela. Ela estava sempre visível, mesmo quando o Grid não possuía Ações, desta forma ocupando um espaço no final do Grid. Agora, esta coluna somente será apresentada se o Grid tiver ações, ou o Gerenciador de Colunas.
- **Gerenciador de Colunas** - Incluído o Gerenciador de Colunas, que permite ao usuário escolher quais colunas estarão visíveis no Grid. O componente também disponibiliza um método para que a configuração seja salva, para ser recuperada na próxima abertura da tela. Por padrão, ele estará oculto, para ativá-lo, deve-se utilizar o parâmetro **d-show-column-manager** do Grid.
- **Visualização das Colunas** - Incluído o método **changeVisibleColumnList** no Grid, que permite alterar a configuração de visible (yes/no) das colunas em lote.

**2.2.0 (02-10-2020):**

Melhorias:
- **Edição x Ações da Tabela** - Ao entrar no modo de edição (inclusão/alteração), o menu de Ações (TableActions) será oculto. Quando o usuário sair do modo de edição, o menu irá reaparecer.
- **Colunas do Grid**
<br>- Incluída propriedade **"checkbox"** (yes/no) para indicar se a coluna do tipo "boolean" deve ser apresentada como um Check-Box ou um Texto (Sim/Não).
<br>- Incluída propriedade **"visible"** (yes/no) para indicar se a coluna deve ser apresentada ou não.

**2.1.5 (29-09-2020):**

Correções:
- **Agrupamento x Tipos de Campo** - Ao realizar um agrupamento, o valor apresentado para o Grupo sempre era o valor interno, desta forma, para as colunas do tipo: date, label, boolean, number e currency, a informação não vinha formatada ou não apresentada o label.
- **Colunas do Grid - Propriedade: groupHeader** - A propriedade não estava funcionando corretamente, e em alguns casos, trazia a coluna agrupada em duplicidade.
- **Literais** - Caso a linguagem parametrizada não fosse válida ou não suportada, ocorria um erro e o Grid não era apresentado. Caso ela seja inválida ou não suportada, será utilizada como padrão o valor "en-US". 

**2.1.4 (28-09-2020):**

Correções:
- **Agrupador + Seleção de Linha** - Quando era realizado o agrupamento de mais de um campo, não era possível selecionar a linha. 
- **Ações da Tabela** - Quando o Grid está em um Modal e usa ações, ao abrir a Modal, o menu aparecia "perdido". Além disto, quando o usuário clicava nas ações "...", o menu aparecia em uma posição errada.

**2.1.2 / 2.1.3 (24-09-2020):**

Correções:
- **Edição campo Numérico** - Não estava respeitando o locale de formato (Americano x Europeu). E, quando entrava no modo de edição, os valores estavam sendo arredondados sempre para 2 decimais, mesmo que tenha sido parametrizado mais decimais no formato. Agora, ele irá respeitar a quantidade de decimais parametrizados no formato.
- **Edição campo Monetário** - Estava ocorrendo erro ao informar decimais neste tipo de campo. O valor estava alinhado a esquerda, e estava apresentando o símbolo "R$" como padrão. Agora o símbolo padrão, quando não informado, será "$".
- **Edição campo Lógico** - Ao editar o campo, ele pedia o valor no formato de string (sim/não) e não atualizar o Grid após a edição. Agora, na edição, ele será um check-box.

**2.1.1 (21-09-2020):**

Correções:
- **Ações da Tabela** - Dependendo da posição e a quantidade de ações da table, o menu-popup aparecia fora da tela, assim não era possível clicar em alguns itens. Agora, o Menu de Ações irá verificar a sua posição e se ajustar automaticamente na tela, para que todos os itens estejam visíveis.
- **Dados da Tabela** - Em alguns caso, quando a variável dos itens do grid era "nula", ocorria um erro e não era apresentado o Grid.

Refatoração:
- **Dependência** - Retirada a dependência ao pacote "@totvs/thf-kendo", antigo THF Kendo Grid.
- **Versões Kendo Grid** - Atualizada as versões dos pacotes Kendo Grid. Ver na documentação, no tópico "Pré-Requisitos -> Dependências" as atuais versões homologadas.

**2.1.0 (10-09-2020):**

Correções:
- **Edição no Grid**
<br>- Não era possível acessar diretamente uma célula ao clicar, somente era possível com TAB.
<br>- Ao clicar em qualquer lugar, já saia da edição. Agora somente sairá, se clicar fora da linha que está sendo editada.
- **Manipulação do Grid** - Ao realizar algumas ações combinadas (Edição, Filtro, Agrupamento, Classificação, etc..) em alguns casos os registros eram duplicados ou sobrescritos. 

Melhorias:
- **Edição no Grid**
<br>- Incluída as ações de teclado:<br>
**Enter** - Confirma a inclusão ou alteração da linha.<br>
**Esc** - Cancela a inclusão ou alteração realizada.	
<br>- Se a Toolbar do Grid estiver visível e o usuário estiver na edição o Grid (inclusão ou alteração), será apresentado na Toolbar o botão "Cancelar", que tem a mesma ação da tecla "Esc".

Refatoração:
- **Edição no Grid** - Os parâmetros "d-add-action" e "d-save-action", que recebiam uma string (função a ser disparada durante a edição do Grid), foram excluídos e substituídos pelo parâmetro "d-edit-actions", que é um objeto contendo as ações que poderam ser disparadas durante a edição. Este objeto irá utilizar uma nova interface chamada DtsEditAction.

**2.0.0 (02-09-2020):**

Melhorias:
- ATUALIZAÇÃO: **ANGULAR v9**
- Documentação.

**0.0.24 (02-04-2020):**

Correções:
- **Colunas do Grid** - Aplicar a definição das colunas quando houver alteração.

**0.0.17 (03-02-2020):** 

Melhorias:
- **CSS** - Arquivo css para aplicar o tema da TOTVS no Kendo Grid.

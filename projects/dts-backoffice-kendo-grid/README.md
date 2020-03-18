## Componente que implementa o Kendo Grid

**Parâmetros**:

**INPUT - d-sortable (boolean)**
Habilta a ordenação da coluna ao clicar no cabeçalho.

**INPUT - d-selectable (boolean)** 
Cria uma coluna no inicio do GRID para permitir a seleção de uma ou mais linhas.

**INPUT - d-groupable (boolean)**
Habilita a opção para agrupamento de colunas.

**INPUT - d-data (Array < any >)**
Lista de objeto a serem exibidos.
**INPUT - d-columns (Array < DtsKendoGridColumn > )**
Objeto com as informações das colunas a serem exibidas.

**INPUT - d-show-more-disabled (boolean)**
Habilitar ou desabilitar o botão "Carregar Mais Resultados".

**INPUT - d-show-cancel-button (boolean)**
Habilita o botão "Cancelar" permitindo que o usuário possa cancelar a alteração da linha.

**INPUT - d-show-remove-button (boolean)**
Habilita o botão "Cancelar" permitindo que o usuário possa remover uma linha do grid.

**INPUT - d-show-add-button (boolean)**
Habilita o botão para adicionar linhas.

**INPUT - d-save-action (string)**
Executa um método antes de salvar uma linha editada no dts-kendo-grid. Este método recebe como parâmetro o atributo "event", para acessar o objeto selecionado no dts-kendo-grid utilizando o "event.data".  Se o método retornar o valor booleano "true", a edição da linha é confirmada, caso contrário as informações alteradas serão canceladas.

**INPUT - d-remove-action (string)**
Executa um método antes de remover uma linha selecionada no dts-kendo-grid. Este método recebe como parâmetro o atributo "event", para acessar o objeto selecionado no dts-kendo-grid utilizando o "event.data". Se o método retornar o valor booleano "true", a remoção da linha é confirmada, caso contrário as informações serão mantidas.

**INPUT - d-add-action (string)**
Método executado antes de adicionar uma nova linha ao dts-kendo-grid. Esse método recebe como parâmetro o atributo "data" contendo a referência do objeto que será adicionado, dessa forma é possível informar alguns valores para a nova linha. Para que as alterações sejam efetivadas, deve-se retornar "true". É possível cancelar a inclusão de uma nova linha retornando "false", nesse caso as informações serão descartadas e a nova linha não será incluída no dts-kendo-grid.

**INPUT - d-literals (objeto)**
Objeto com as literais que serão utilizadas dentro do componente, caso não seja enviado será utilizado os valores de tradução que o componente já possui em português, inglês e espanhol.
```
// Pode ser enviado um objeto parcial, por exemplo, quero customizar apenas a tradução do 'groupPanelEmpty' então mando o objeto abaixo:
{
	groupPanelEmpty:  'Minha tradução',
}

// Lista completa de literais
{
	noRecords:  'Nenhum registro encontrado',
	groupPanelEmpty:  'Arraste o cabeçalho da coluna e solte aqui para agrupar os dados por essa coluna',
	filterAndLogic:  'E',
	filterOrLogic:  'Ou',
	filterContainsOperator:  'Contêm',
	filterNotContainsOperator:  'Não contêm',
	filterEqOperator:  'Igual',
	filterNotEqOperator:  'Não é igual',
	filterStartsWithOperator:  'Começa com',
	filterEndsWithOperator:  'Termina com',
	filterIsNullOperator:  'É nulo',
	filterIsNotNullOperator:  'Não é nulo',
	filterIsEmptyOperator:  'É vazio',
	filterIsNotEmptyOperator:  'Não é vazio',
	filterClearButton:  'Limpar',
	filterFilterButton:  'Filtrar',
	filterGteOperator:  'Maior ou igual que',
	filterGtOperator:  'Maior que',
	filterLtOperator:  'Menor que',
	filterLteOperator:  'Menor ou igual que',
	filterAfterOrEqualOperator:  'Depois ou igual que',
	filterAfterOperator:  'Depois de',
	filterBeforeOrEqualOperator:  'Antes ou igual que',
	filterBeforeOperator:  'Antes de',
	filterIsTrue:  'Sim',
	filterIsFalse:  'Não',
	add:  'Salvar',
	showMore:  'Carregar mais resultados'
};
```
**INPUT - d-filterable (boolean)**
Habilita a opção de filtro nas colunas do GRID. 

**INPUT - d-actions (Array)** 
Lista de ações que devem ser apresentadas nas linhas do GRID, funciona semelhante a p-actions do portinari.

**OUTPUT - d-show-more (função)**
Função que deve ser executado ao clicar no botão "showMore" (Carregar mais resultados).

**OUTPUT - d-selection-change (funcão)**
Evento de seleção de linha que chama um método do componente. Este atributo é utilizado em conjunto com o atributo "d-selectable".

**OUTPUT - d-save-value (função)**
Evento disparado ao salvar dados do modo de edição inline, recebendo o modelo que foi alterado.

**OUTPUT - d-group-change (função)**
Não implementado

**Interfaces**

DtsKendoGridColumn
| Propriedade | Tipo | Descrição|
|--|--|--| 
| column | string | Nome do atributo do JSON passado no atributo "d-data" do componente
| label | string | Nome da coluna a ser exibido na tabela |
| width | number | Tamanho da coluna em pixels |
| groupHeader | boolean | Informa se a coluna está agrupada|
| checkbox | boolean | Se for passado "true" é habilitado o componente checkbox na coluna|
| editable | boolean | Se for passado o valor "true" é habilitado o campo de edição no modo edição habilitado|
| required | boolean | Se for passado o valor "true" o campo se torna obrigatório no modo edição habilitado |
| type | string | Define o tipo da coluna. Valores válidos: string, number, date, currency, label e subtitle |
| format | string | Formata os dados da coluna de acordo com o tipo |
| labels | Array < DtsLabel > | Lista de valores que poderão exibidos quando "type" = subtitle|

DtsLabel (Interface utilizado nos campos do tipo label e subtitle)

| Propriedade | Tipo | Descrição|
|--|--|--| 
| value | string | Valor do campo|
| label | string | Texto que será exibido dentro |
| color | string| Cor que será exbido, deve ser utilizad as cores disponíveis no portinari|
| tooltip | string | Texto que será exibido ao passar o mouse por cima, se aplica apenas para o tipo subtitle|

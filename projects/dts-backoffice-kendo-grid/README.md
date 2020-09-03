# Documentação do Dts Kendo GRID

ÚLTIMA VERSÃO: **2.0.0 (02-09-2020)** **([**VER CHANGE LOG**](https://github.com/ModernizaDatasul/dts-backoffice-util/blob/master/projects/dts-backoffice-kendo-grid/CHANGELOG.md))**

<br>

## Objetivo

Componente que encapsula o [Kendo GRID](https://www.telerik.com/kendo-angular-ui/components/grid/), facilitando o desenvolvimento (similar ao **PO-UI**) e agregando novas funcionalidades.

<br>

## Pré-Requisitos

**Importar o módulo:**

```
import { DtsBackofficeKendoGridModule } from 'dts-backoffice-kendo-grid';

@NgModule({
    declarations: [
        ...
    ],
    imports: [
        ...
        DtsBackofficeKendoGridModule,
    ],
    providers: [
        ...
    ],
})
```

<br>

## Tema TOTVS

Para que o Kendo Grid utilize o tema da TOTVS, deve deve ser importado o CSS no angular.json, conforme abaixo:

```
"styles": [
  "node_modules/@totvs/po-theme/css/po-theme-default.min.css",
  "node_modules/@progress/kendo-theme-default/dist/all.css",
  "node_modules/dts-backoffice-util/lib/css/kendo.min.css",
  "src/styles.css"
],
```

<br>

## Utilização no HTML

```
<dts-kendo-grid class="po-md-12"
	[d-sortable]="true"
	[d-selectable]="true"
	[d-groupable]="true"
	[d-filterable]="true"
	[d-editable]="false"
	[d-show-add-button]="false"
	[d-reorderable]="true"
	[d-show-export-buttons]="false"
	[d-actions]="tableActions"
	[d-columns]="columns"
	[d-data]="items"
	[d-show-more-disabled]="!hasNext"
	[d-literals]="literals"
	(d-selection-change)="onSelectionChange($event)"
	(d-save-value)="onSaveValue($event)"
	(d-group-change)="onGroupChange($event)"
	(d-show-more)="search(true)">
</dts-kendo-grid>
```

**Como deve ficar:**

![Exemplo](https://github.com/ModernizaDatasul/dts-backoffice-util/blob/master/projects/dts-backoffice-kendo-grid/src/lib/assets/example-1.gif?raw=true)

<br>

## Parâmetros

| Parâmetro | Tipo | Descrição |
|--|--|--|
| **d-sortable** | boolean | Habilta a ordenação da coluna ao clicar no cabeçalho. |
|**d-selectable**| boolean | Cria uma coluna no inicio do GRID para permitir a seleção de uma ou mais linhas. |
| **d-groupable** | boolean | Habilita a opção para agrupamento de colunas. |
| **d-filterable** | boolean | Habilita a opção de filtro nas colunas do GRID. | 
| **d-editable** | boolean | Habilta a edição de linha no GRID. |
| **d-show-add-button** | boolean | Habilita o botão para adicionar linhas. |
| **d-reorderable** | boolean | Habilita a mudança da ordem das colunas, através do arrastar e soltar no cabeçalho da coluna. |
| **d-show-export-buttons** | boolean | Disponibiliza os botões de Exportação do GRID: Excel e PDF. | 
| **d-actions** | Array | Lista de ações que devem ser apresentadas nas linhas do GRID, funciona semelhante a p-actions do PO-UI. |
| **d-columns** | Array | Objetos com as informações das colunas a serem exibidas. O objeto deve utilizar a interface **DtsKendoGridColumn**. |
| **d-data** | Array | Informações que serão apresentadas no GRID. |
| **d-show-more-disabled** | boolean | Habilitar ou desabilitar o botão "Carregar Mais Resultados". |
| **d-literals** | Object | Objeto com as literais que serão utilizadas dentro do componente, caso não seja enviado será utilizado os valores de tradução que o componente já possui em português, inglês e espanhol. Ver abaixo o tópico **Literais do Componente** para verificar as literais disponíveis. |
| **d-add-action** | Function | Método executado antes de adicionar uma nova linha ao GRID. Esse método recebe como parâmetro o atributo "data" contendo a referência do objeto que será adicionado, dessa forma é possível informar alguns valores para a nova linha. Para que as alterações sejam efetivadas, deve-se retornar "true". É possível cancelar a inclusão de uma nova linha retornando "false", nesse caso as informações serão descartadas e a nova linha não será incluída no GRID. |
| **d-save-action** | Function | Método executado antes de salvar uma linha editada no GRID. Este método recebe como parâmetro o atributo "event", para acessar o objeto selecionado no GRID utilizando "event.data". Se o método retornar o valor booleano "true", a edição da linha é confirmada, caso contrário as informações alteradas serão canceladas. |
| **(d-selection-change)** | EventEmitter | Evento disparado quando a linha é selecionada. Este evento é utilizado em conjunto com o parâmetro "d-selectable". |
| **(d-save-value)** | EventEmitter | Evento disparado ao salvar dados do modo de edição da linha, recebendo o modelo que foi alterado. |
| **(d-group-change)** | EventEmitter | Evento disparador quando ocorrer o agrupamento das colunas. |
| **(d-show-more)** | EventEmitter | Função que deve ser executado ao clicar no botão "showMore" (Carregar mais resultados). |
|________________________|||

<br>

## Literais do Componente

Segue abaixo as literais utilizadas pelo componente com as respectivas traduções padrões.
Elas podem ser customizadas enviando um objeto com as literais que se deseja alterar, conforme exemplo abaixo:
```
{
	groupPanelEmpty:  'Arraste uma coluna aqui para agrupar os valores !!'
}
```
| Literal | Descrição |
|-|-|
| **noRecords** | Nenhum registro encontrado |
| **groupPanelEmpty** | Arraste o cabeçalho da coluna e solte aqui para agrupar os dados por essa coluna |
| **filterAndLogic** | E |
| **filterOrLogic** | Ou |
| **filterContainsOperator** | Contêm |
| **filterNotContainsOperator** | Não contêm |
| **filterEqOperator** | Igual |
| **filterNotEqOperator** | Não é igual |
| **filterStartsWithOperator** | Começa com |
| **filterEndsWithOperator** | Termina com |
| **filterIsNullOperator** | É nulo |
| **filterIsNotNullOperator** | Não é nulo |
| **filterIsEmptyOperator** | É vazio |
| **filterIsNotEmptyOperator** | Não é vazio |
| **filterClearButton** | Limpar |
| **filterFilterButton** | Filtrar |
| **filterGteOperator** | Maior ou igual que |
| **filterGtOperator** | Maior que |
| **filterLtOperator** | Menor que |
| **filterLteOperator** | Menor ou igual que |
| **filterAfterOrEqualOperator** | Depois ou igual que |
| **filterAfterOperator** | Depois de |
| **filterBeforeOrEqualOperator** | Antes ou igual que |
| **filterBeforeOperator** | Antes de |
| **filterIsTrue** | Sim |
| **filterIsFalse** | Não |
| **add** | Adicionar |
| **showMore** | Carregar mais resultados |

<br>

## Interfaces

<br>

**DtsKendoGridColumn**

**Objetivo:** Definir as colunas do GRID.

| Propriedade | Tipo | Descrição |
|--|--|--| 
| **column** | string | Nome do atributo do JSON passado no atributo "d-data" do componente. |
| **label** | string | Nome da coluna a ser exibido na tabela. |
| **width** | number | Tamanho da coluna em pixels. |
| **groupHeader** | boolean | Informa se a coluna está agrupada. |
| **editable** | boolean | Se for passado o valor "true" é habilitado o campo de edição no modo edição habilitado. |
| **required** | boolean | Se for passado o valor "true" o campo se torna obrigatório no modo edição habilitado. |
| **type** | string | Define o tipo da coluna. Valores válidos: string, number, date, currency, checkbox, label e subtitle. |
| **format** | string | Formata os dados da coluna de acordo com o tipo. |
| **labels** | Array | Lista de valores que poderão ser exibidos quando o "type" é label ou subtitle. O objeto da lista deve utilizar a interface **DtsLabel**. |
| **currency** | string | Moeda utilizada para formatar campos do tipo 'currency' usando o [Currency PIPE](https://angular.io/api/common/CurrencyPipe). |
| **symbol** | string | Formato utilizada para formatar campos do tipo 'currency' usando o [Currency PIPE](https://angular.io/api/common/CurrencyPipe). |

<br>

**DtsLabel**

**Objetivo:** Apresentar os valores em formato de **tags** coloridas. Utilizado nos campos do tipo label e subtitle. 

| Propriedade | Tipo | Descrição |
|--|--|--| 
| **value** | string | Valor do campo. |
| **label** | string | Texto que será exibido dentro. |
| **color** | string | Cor que será exbido, deve ser utilizada cores disponíveis no PO-UI. |
| **tooltip** | string | Texto que será exibido ao passar o mouse por cima, se aplica apenas para o tipo subtitle. |

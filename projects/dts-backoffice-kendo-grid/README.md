# Documentação do Dts Kendo GRID

ÚLTIMA VERSÃO: **2.1.2 (22-09-2020)** **([**VER CHANGE LOG**](https://github.com/ModernizaDatasul/dts-backoffice-util/blob/master/projects/dts-backoffice-kendo-grid/CHANGELOG.md))**

<br>

## Objetivo

Componente que encapsula o [Kendo Grid](https://www.telerik.com/kendo-angular-ui/components/grid/), facilitando o desenvolvimento (similar ao **PO-UI**) e agregando novas funcionalidades.

<br>

## Pré-Requisitos

**Dependências:**

É necessário incluir no package do projeto as Dependências do **Kendo Grid**.
Segue abaixo as dependência utilizas e as respectivas **versões homologadas** para o componente:

```
	"@progress/kendo-angular-buttons": "^5.5.1",
	"@progress/kendo-angular-common": "^1.2.3",
	"@progress/kendo-angular-dateinputs": "^4.3.1",
	"@progress/kendo-angular-dropdowns": "^4.3.2",
	"@progress/kendo-angular-excel-export": "^3.1.2",
	"@progress/kendo-angular-grid": "^4.7.4",
	"@progress/kendo-angular-inputs": "^6.6.1",
	"@progress/kendo-angular-intl": "^2.0.3",
	"@progress/kendo-angular-l10n": "^2.0.2",
	"@progress/kendo-angular-pdf-export": "^2.0.4",
	"@progress/kendo-angular-popup": "^3.0.6",
	"@progress/kendo-data-query": "^1.5.2",
	"@progress/kendo-drawing": "^1.9.1",
	"@progress/kendo-theme-default": "^2.63.0",
```

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
| **d-sortable** | boolean | Habilita a ordenação da coluna ao clicar no cabeçalho. |
|**d-selectable**| boolean | Cria uma coluna no início do Grid para permitir a seleção de uma ou mais linhas. |
| **d-groupable** | boolean | Habilita a opção para agrupamento de colunas. |
| **d-filterable** | boolean | Habilita a opção de filtro nas colunas do Grid. | 
| **d-editable** | boolean | Habilita a edição de linha no Grid.<br>Quando habilitado e o usuário estiver incluindo ou alterando uma linha, ao clicar em qualquer lugar fora desta linha, a inclusão/alteração será confirmar. É possível utilizar a teclas **"Enter"** para confirmar a inclusão/alteração, ou **"Esc"** para cancelar. Se a Toolbar do Grid estiver visível, também será apresentado o botão **"Cancelar"**, que tem a mesma ação do tecla **"Esc"**. |
| **d-show-add-button** | boolean | Disponibiliza o botão "Adicionar" no Toolbar do Grid, utilizado para inclusão de novas linhas. |
| **d-reorderable** | boolean | Habilita a mudança da ordem das colunas, através do arrastar e soltar no cabeçalho da coluna. |
| **d-show-export-buttons** | boolean | Disponibiliza os botões de Exportação do Grid: Excel e PDF. | 
| **d-actions** | Array | Lista de ações que devem ser apresentadas nas linhas do Grid, funciona semelhante a p-actions do PO-UI. |
| **d-columns** | Array | Objetos com as informações das colunas a serem exibidas. O Objeto deve utilizar a interface **DtsKendoGridColumn**. |
| **d-data** | Array | Informações que serão apresentadas no Grid. |
| **d-show-more-disabled** | boolean | Habilitar ou desabilitar o botão "Carregar Mais Resultados". |
| **d-literals** | Object | Objeto com as literais que serão utilizadas dentro do componente, caso não seja enviado será utilizado os valores de tradução que o componente já possui em português, inglês e espanhol. Ver abaixo o tópico **Literais do Componente** para verificar as literais disponíveis. |
| **d-edit-actions** | Object | Objeto com as funções que serão disparadas durante a Edição de uma Linha no Grid, para por exemplo, trazer valores padrões em uma inclusão, ou validar uma alteração. O Objeto deve utilizar a interface **DtsEditAction**. |
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
| **cancel** | Cancelar |
| **showMore** | Carregar mais resultados |

<br>

## Interfaces

<br>

**DtsKendoGridColumn**

**Objetivo:** Definir as colunas do Grid.

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

**Exemplo:** 
```
columns: Array<DtsKendoGridColumn>;
		
this.columns = [
	{ column: 'code', required: true, label: this.literals['code'], editable: true, type: 'number' },
	{ column: 'shortName', required: true, label: this.literals['shortName'], editable: true, type: 'string' },
	{ column: 'name', label: this.literals['name'], editable: true, type: 'string' },
	{ column: 'country', label: this.literals['country'], editable: true, type: 'string' },
	{ column: 'tax', label: this.literals['tax'], editable: true, type: 'checkbox' },
	{ column: 'taxValue', label: this.literals['taxValue'], editable: true, type: 'currency', currency: 'BRL', symbol: '1.2-9' },
	{ column: 'admissDate', label: this.literals['admissDate'], type: 'date', format: this.literals['dateFormat'] }
];
```

<br>

**DtsLabel**

**Objetivo:** Apresentar os valores em formato de **Tags** coloridas. Utilizado nos campos do tipo label e subtitle. 

| Propriedade | Tipo | Descrição |
|--|--|--| 
| **value** | string | Valor do campo. |
| **label** | string | Texto que será exibido dentro. |
| **color** | string | Cor que será exibido, deve ser utilizada cores disponíveis no PO-UI. |
| **tooltip** | string | Texto que será exibido ao passar o mouse por cima, se aplica apenas para o tipo subtitle. |

**Exemplo:**<br>
```
statusLabelList: Array<DtsLabel>;
statesSubtitleList: Array<DtsLabel>;
columns: Array<DtsKendoGridColumn>;
	
this.statusLabelList = [
	{ value: 1, label: literals['active'], color: 'color-11' },
	{ value: 2, label: literals['inactive'], color: 'color-07' },
	{ value: 3, label: literals['blocked'], color: 'color-08' }
];

this.statesSubtitleList = [
	{ value: 'RS', label: literals['rsTag'], color: 'color-01', tooltip: literals['rsDesc'] },
	{ value: 'SC', label: literals['scTag'], color: 'color-05', tooltip: literals['scDesc'] },
	{ value: 'PR', label: literals['prTag'], color: 'color-09', tooltip: literals['prDesc'] },
	{ value: 'SP', label: literals['spTag'], color: 'color-12', tooltip: literals['spDesc'] },
	{ value: 'RJ', label: literals['rjTag'], color: 'color-08', tooltip: literals['rjDesc'] },
	{ value: 'BH', label: literals['bhTag'], color: 'color-03', tooltip: literals['bhDesc'] }
];

this.columns = [
	{ column: 'status', label: this.literals['status'], type: 'label', labels: this.statusLabelList },
	{ column: 'states', label: this.literals['states'], type: 'subtitle', labels: this.statesSubtitleList }
];
```

<br>

**DtsEditAction**

**Objetivo:** Definir as funções que serão disparadas durante a edição de uma linha no Grid. 

| Propriedade | Tipo | Descrição |
|--|--|--|
| addAction | Function | Método executado antes de adicionar uma nova linha ao Grid. Ele recebe como parâmetro o modelo do objeto que está sendo incluído, dessa forma é possível informar alguns valores para a nova linha. Para que a linha fique disponível para inclusão, o método deve retornar o valor **"true"**, caso contrário a inclusão não será permitida. |
| saveAction | Function | Método executado antes de salvar uma linha incluida ou editada no Grid. Este método recebe como parâmetro o item que foi incluído/editado. Se o método retornar o valor **"true"**, a inclusão/edição da linha é confirmada, caso contrário ela fica pendente, esperando a ação do usuário (realizar alguma alteração ou cancelar). |

**Exemplo:** 
```
editActions: DtsEditAction;

this.editActions = {
	addAction: this.onAddAction.bind(this),
	saveAction: this.onSaveAction.bind(this)
};

onAddAction(item: ICustomer) {
	if (item) {
		item.shortName = 'Novo';
		item.name = 'Novo Cliente';
	}
	return true;
}

onSaveAction(item: ICustomer) {
	if (item && item.shortName === '') {
		this.poNotification.error({
			message: this.literals['msgErroEdit']
		});
		return false;
	}
	return true;
}
```

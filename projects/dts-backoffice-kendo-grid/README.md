# Documentação do Dts Kendo GRID

ÚLTIMA VERSÃO: **4.0.1 (10-06-2022)** **([**VER CHANGE LOG**](https://github.com/ModernizaDatasul/dts-backoffice-util/blob/master/projects/dts-backoffice-kendo-grid/CHANGELOG.md))**

<br>

## Objetivo

Componente que encapsula o [Kendo Grid](https://www.telerik.com/kendo-angular-ui/components/grid/), facilitando o desenvolvimento (similar ao **PO-UI**) e agregando novas funcionalidades.

<br>

## Pré-Requisitos

**Dependências:**

É necessário incluir no package do projeto as Dependências do **Kendo Grid**.
Segue abaixo as dependência utilizadas e as respectivas **versões homologadas** para o componente:

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

**Instalação do Pacote:**

```
npm install dts-backoffice-kendo-grid
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
  "src/styles.css"
],
```

<br>

## Utilização no HTML

```
<dts-kendo-grid class="po-md-12"
	[d-columns]="columns"
	[d-data]="items"
	[d-show-more-disabled]="!hasNext"
	[d-sortable]="true"
	[d-filterable]="true"
	[d-groupable]="true"
	[d-reorderable]="true"
	[d-selectable]="true"
	[d-editable]="false"
	[d-literals]="literals"
	[d-actions]="tableActions"
	[d-show-add-button]="false"
	[d-show-export-buttons]="false"
	(d-show-more)="search(true)"
	(d-group-change)="onGroupChange($event)"
	(d-selection-change)="onSelectionChange($event)"
	(d-save-value)="onSaveValue($event)">
</dts-kendo-grid>
```

**Como deve ficar:**

![Exemplo](https://github.com/ModernizaDatasul/dts-backoffice-util/blob/master/projects/dts-backoffice-kendo-grid/src/lib/assets/example-1.gif?raw=true)

<br>

## Parâmetros

| Parâmetro | Tipo | Descrição |
|-|-|-|
| **d-columns** | Array | Objetos com as informações das colunas a serem exibidas. O Objeto deve utilizar a interface **DtsKendoGridColumn**. |
| **d-data** | Array | Informações que serão apresentadas no Grid. |
| **d-show-more-disabled** | boolean | Habilitar ou desabilitar o botão "Carregar Mais Resultados". |
| **d-sortable** | boolean | Habilita a ordenação da coluna ao clicar no cabeçalho. |
| **d-filterable** | boolean | Habilita a opção de filtro nas colunas do Grid. | 
| **d-groupable** | boolean | Habilita a opção para agrupamento de colunas. |
| **d-reorderable** | boolean | Habilita a mudança da ordem das colunas, através do clicar, arrastar e soltar o cabeçalho da coluna. |
| **d-resizable** | boolean | Habilita a mudança de tamanho das colunas, através do clicar e arrastar o cabeçalho da coluna (final da coluna). |
| **d-selectable** | boolean | Cria uma coluna no início do Grid para permitir a seleção de uma ou mais linhas. |
| **d-single-select** | boolean | Quando a seleção de linha está habilitada (**d-selectable = true**), indica que somente é possí­vel selecionar uma linha. |
| **d-editable** | boolean | Habilita a edição de linha no Grid.<br>Quando habilitado e o usuário estiver incluindo ou alterando uma linha, ao clicar em qualquer lugar fora desta linha, a inclusão/alteração será confirmar. É possível utilizar a teclas **"Enter"** para confirmar a inclusão/alteração, ou **"Esc"** para cancelar. Se a Toolbar do Grid estiver visível, também será apresentado o botão **"Cancelar"**, que tem a mesma ação do tecla **"Esc"**.<br>**Importante:** Se o Grid estiver em uma **po-modal**, informe o parâmetro **p-hide-close** na modal. Isto é necessário para que o evento de **"Esc"** funcione corretamente na edição da linha, se este parâmetro não for informado, o "Esc" irá fechar a modal. |
| **d-literals** | Object | Objeto com as literais que serão utilizadas dentro do componente, caso não seja enviado será utilizado os valores de tradução que o componente já possui em português, inglês e espanhol. Ver abaixo o tópico **Literais do Componente** para verificar as literais disponíveis. |
| **d-actions** | Array | Lista de ações que devem ser apresentadas nas linhas do Grid, funciona semelhante a p-actions do PO-UI. |
| **d-edit-actions** | Object | Objeto com as funções que serão disparadas durante a Edição de uma Linha no Grid, para por exemplo, trazer valores padrões em uma inclusão, ou validar uma alteração. O Objeto deve utilizar a interface **DtsEditAction**. |
| **d-show-maximize** | string | Disponibiliza o botão **"Maximizar"** do Grid (ícone **"zoom"** no canto superior direito). Os valores possíveis para este parâmetro são:<br>- **normal**: O Grid irá ocupar toda a área do container "pai", ficando "por cima" dos demais objetos que estiverem dentro do mesmo container.<br>**Exemplo:** Dentro de uma div existem: dois botões, o Grid e um input. Ao ser maximizado, o Grid irá ocupar todo o espaço da div, desta forma, os botões e o input não estarão visíveis.<br>**Importante:** Nesta opção, altura do Grid não é alterada, ela continua sendo igual a quantidade de registros, portanto, se o Grid estiver vazio ou com poucos registros, os objetos que estiverem "por baixo" do Grid poderão aparecer. Neste caso, pode ser utilizado o evento **d-maximize-change** para esconder os objetos.<br>- **fixed**: Funciona da mesma forma que a opção "normal", ocupando o espaço do container "pai" mas, neste opção, a altura do Grid é Fixa (independente da quantidade de registros), desta forma, será gerado um Scroll dentro do Grid.<br>- **full**: A ser maximizado, o Grid irá ocupar todo espaço disponível na aba do navegador.|
| **d-show-column-manager** | boolean | Disponibiliza o Gerenciador de Colunas no Grid (ícone **"configuração"** no canto superior direito), que permite ao usuário escolher quais colunas estarão visíveis ou não. Ele irá apresentar todas as colunas do Grid configuradas no parâmetro **d-columns**.<br>O Gerenciador disponibiliza dois botões:<br>- **Restaurar Padrão**: Retorna a visualização das colunas (true/false) conforme configurado inicialmente no objeto do parâmetro **d-columns** (propriedade **"visible"**). Caso a propriedade não tenha sido informada, será considerado como **"true"**.<br>- **Salvar**: Executa o método informado no parâmetro **d-save-column-manager** (Obs: o botão somente será apresentado se este parâmetro for informado). |
| **d-show-add-button** | boolean | Disponibiliza o botão "Adicionar" no Toolbar do Grid, utilizado para inclusão de novas linhas. |
| **d-show-export-buttons** | boolean | Disponibiliza os botões de Exportação do Grid: Excel e PDF. | 
| **(d-show-more)** | EventEmitter | Função que deve ser executado ao clicar no botão "showMore" (Carregar mais resultados). |
| **(d-group-change)** | EventEmitter | Método disparador quando ocorrer o agrupamento das colunas. |
| **(d-selection-change)** | EventEmitter | Método disparado quando a linha é selecionada. Este Método é utilizado em conjunto com o parâmetro "d-selectable". Ele recebe como parâmetro um objeto, contendo o atributo "data", que contêm o objeto da linha que foi selecionado. Caso o usuário clique na opção de selecionar todos (checkbox no topo da coluna de seleção), será enviado no atributo "data" a string fixa "ALL". |
| **(d-maximize-change)** | EventEmitter | Método disparado quando o usuário clica no botão **"Maximizar"** do Grid (ver parâmetro **d-show-maximize**). Ele irá receber como parâmetro um **boolean**, indicando se o Grid foi "Maximizado" ou "Minimizado". |
| **(d-save-column-manager)** | EventEmitter | Método disparado quando o usuário clica no botão **"Salvar"** do Gerenciador de Colunas. Este método deve ser utilizado para salvar a configuração de visualização das colunas. Ele recebe a lista de colunas disponíveis para manuteção (**locked = false**), que é um Array do Objeto com as propriedades: **column (string)** e **visible (boolean)**. Veja um exemplo da implementação no tópico **Salvando a configuração do Gerenciador de Colunas**. |
| **(d-save-value)** | EventEmitter | Método disparado ao salvar dados do modo de edição da linha, recebendo o modelo que foi alterado. |
|________________________|||

<br>

## Métodos

| Método | Descrição |
|-|-|
| changeColumnConfigView | Utilizado para alterar as propriedades de visualização da coluna. Para por exemplo, fazer com que a coluna seja ocultada no Grid.<br>**Parâmetro:**<br>- cfgView (DtsColumnConfigView): Objeto com as propriedades que devem ser alteradas. Ver interface: **DtsColumnConfigView**.<br>**Retorno:** Não há. |
| changeColumnConfigViewList | Utilizado para alterar as propriedades de visualização de várias colunas.<br>**Parâmetro:**<br>- cfgViewList (array(DtsColumnConfigView)): Lista de Objetos com as propriedades a serem alteradas. Deve ser um Array da interface **DtsColumnConfigView**.<br>**Retorno:** Não há. |
---

**Exemplo:**

Para utilizar os métodos do Grid, é necessário pegar a referência dele no TS. Para isto, ele deve ser **"nomeado"** no HTML utilizando **"#"**.
Abaixo segue o exemplo de como pegar a referência e fazer a chamada dos métodos.

```
- HTML -
<dts-kendo-grid #gridCustomer
	...
</dts-kendo-grid>

- TS -
@ViewChild('gridCustomer', { static: true }) gridCustomer: DtsKendoGridComponent;
...
this.gridCustomer.changeColumnConfigView({ column: 'country', visible: true });

this.gridCustomer.changeColumnConfigView({ column: 'internalId', visible: false, locked: true });

this.gridCustomer.changeColumnConfigViewList([
	{ column: 'code', visible: true, locked: true },
	{ column: 'shotName', visible: false, locked: false },
	{ column: 'country', visible: true },
	{ column: 'internalId', locked: false }
]);
```

<br>

## Salvando a configuração do Gerenciador de Colunas

Quando o Gerenciador de Colunas estiver disponível (parâmetro **d-show-column-manager**) é possível disponibilizar um botão, para que o usuário salve a configuração (parâmetro **d-save-column-manager**). Esta configuração pode ser salva no localStorage do Browse, ou mesmo no Banco de Dados. Segue abaixo um exemplo da implementação, para salvar e recuperar ao inicializar a tela considerando o localStorage. Para salvar nas preferências do Datasul, verifique o serviço **ProfileService** da biblioteca [dtsBackOfficeUtil](https://github.com/ModernizaDatasul/dts-backoffice-util/tree/master/projects/dts-backoffice-util).
```
- HTML -
<dts-kendo-grid #gridCustomer
	d-show-column-manager="true"
	(d-save-column-manager)="onSaveColumnManager($event)"
	...
</dts-kendo-grid>

- TS -
@ViewChild('gridCustomer', { static: true }) gridCustomer: DtsKendoGridComponent;
...
ngOnInit(): void {
	...
	this.gridCustomer.changeColumnConfigViewList(this.loadLocalStorage('columnList'));
	...
}

onSaveColumnManager(event: any) {
	this.saveLocalStorage('columnList', event);
}

saveLocalStorage(key: string, value: any): void {
	if (typeof (Storage) === 'undefined') { return; }
	localStorage.setItem(`customer-maint.${key}`, JSON.stringify(value));
}

loadLocalStorage(key: string): any {
	if (typeof (Storage) === 'undefined') { return; }
	return JSON.parse(localStorage.getItem(`customer-maint.${key}`));
}
```

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
| **save** | Salvar |
| **showMore** | Carregar mais resultados |
| **columnsManager** | Gerenciar Colunas |
| **restoreDefault** | Restaurar Padrão |
| **dateFormat** | dd/MM/yyyy |
| **dateFormatDesc** | dia/mês/ano |
| **yes** | Sim |
| **no** | Não |
---

<br>

## Interfaces

<br>

**DtsKendoGridColumn**

**Objetivo:** Definir as colunas do Grid.

| Propriedade | Obrig? | Tipo | Descrição |
|--|--|--|--| 
| **column** | Sim |  string | Nome do atributo do JSON passado no atributo **"d-data"** do componente. |
| **label** | Sim | string | Nome da coluna a ser exibido na tabela. |
| **type** | Não | string | Define o tipo da coluna. Os Tipos válidos são:<br>**"string" (padrão)**: Campo do tipo texto.<br>**"number"**: Campo do tipo numérico.<br>**"currency"**: Campo do tipo monetário.<br>**"boolean"**: Campo do tipo lógico.<br>**"date"**: Campo do tipo data.<br>**"label"**: Campo do tipo label (apresenta uma TAG).<br>**"subtitle"**: Campo do tipo label (apresenta uma lista de TAG's).|
| **format** | Não | string | Formata os dados da coluna de acordo com o tipo. |
| **width** | Não | number | Tamanho da coluna em pixels. |
| **checkbox** | Não | boolean | Indica se a coluna do tipo "boolean" deve ser apresentada como um Check-Box ou um texto (Sim/Não). |
| **currency** | Não | string | Moeda utilizada para formatar campos do tipo 'currency' usando o [Currency PIPE](https://angular.io/api/common/CurrencyPipe). |
| **symbol** | Não | string | Formato utilizada para formatar campos do tipo 'currency' usando o [Currency PIPE](https://angular.io/api/common/CurrencyPipe). |
| **labels** | Não | Array | Lista de valores que poderão ser exibidos quando o "type" é label ou subtitle. O objeto da lista deve utilizar a interface **DtsLabel**. |
| **editable** | Não | boolean | Indica se o campo deve ser habilitado para edição.<br>**Obs:** Para que isto seja feito, o parâmetro **"d-editable"** do Grid deve ser igual a **"true"**. |
| **required** | Não | boolean | Indica se o campo é obrigatório na edição.<br>**Obs:** Para que isto seja feito, o parâmetro **"editable"** da coluna o parâmetro **"d-editable"** do Grid devem ser igual a **"true"**. |
| **groupHeader** | Não | boolean | Indica se a coluna deve ser agrupada na inicialização.<br>**Obs:** Para que isto seja feito, o parâmetro **"d-groupable"** do Grid deve ser igual a **"true"**. |
| **visible** | Não | boolean | Indica se a coluna deve ser apresentada ou não.<br>**Obs:** Para manipular esta opção em tempo de execução, utilize o método **"changeColumnConfigView"**. |
| **locked** | Não | boolean | Indica se a coluna pode ou não ser escondida pelo usuário. Portanto, for igual a **"true"**, a coluna não será apresentada no Gerenciador de Colunas.<br>**Obs:** Para manipular esta opção em tempo de execução, utilize o método **"changeColumnConfigView"**. |
---

**Exemplo:** 
```
columns: Array<DtsKendoGridColumn>;
		
this.columns = [
	{ column: 'code', required: true, label: this.literals['code'], editable: true, type: 'number' },
	{ column: 'shortName', required: true, label: this.literals['shortName'], editable: true, type: 'string' },
	{ column: 'name', label: this.literals['name'], editable: true, type: 'string', visible: false },
	{ column: 'country', label: this.literals['country'], editable: true, type: 'string' },
	{ column: 'tax', label: this.literals['tax'], editable: true, type: 'boolean', checkbox: true },
	{ column: 'taxValue', label: this.literals['taxValue'], editable: true, type: 'currency', currency: 'BRL', symbol: '1.2-9' },
	{ column: 'admissDate', label: this.literals['admissDate'], type: 'date', format: this.literals['dateFormat'] },
	{ column: 'internalId', label: this.literals['internalId'], editable: false, type: 'number', visible: false, locked: true }
];
```

<br>

**DtsLabel**

**Objetivo:** Apresentar os valores em formato de **Tags** coloridas. Utilizado nos campos do tipo label e subtitle. 

| Propriedade | Obrig? | Tipo | Descrição |
|--|--|--|--| 
| **value** | Sim | string | Valor do campo. |
| **label** | Sim | string | Texto que será exibido dentro. |
| **color** | Sim | string | Cor que será exibido, deve ser utilizada cores disponíveis no PO-UI. |
| **tooltip** | Não | string | Texto que será exibido ao passar o mouse por cima, se aplica apenas para o tipo subtitle. |
---

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

| Propriedade | Obrig? | Tipo | Descrição |
|--|--|--|--|
| addAction | Não | Function | Método executado antes de adicionar uma nova linha ao Grid. Ele recebe como parâmetro o modelo do objeto que está sendo incluído, dessa forma é possível informar alguns valores para a nova linha. Para que a linha fique disponível para inclusão, o método deve retornar o valor **"true"**, caso contrário a inclusão não será permitida. |
| saveAction | Não | Function | Método executado antes de salvar uma linha incluida ou alterado no Grid. Este método recebe como parâmetro o item que está sendo incluído/alterado. Se o método retornar o valor **"true"**, a inclusão/alteração da linha é confirmada, caso contrário ela fica pendente, esperando a ação do usuário (realizar alguma alteração ou cancelar). Se dentro do método, for realizada alguma alteração no item recebido, esta alteração será repassado para a tela, e se for confirmada a inclusão/alteração, será gravada na linha original. |
---

**Exemplo:** 
```
- HTML -
<dts-kendo-grid
    [d-edit-actions]="editActions"
	...
</dts-kendo-grid>

- TS -
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

<br>

**DtsColumnConfigView**

**Objetivo:** Alterar as configurações de Visualização das Colunas do Grid. 

| Propriedade | Obrig? | Tipo | Descrição |
|--|--|--|--| 
| **column** | Sim | string | Nome da Coluna. |
| **visible** | Não | boolean | Indica se a coluna deve ser apresentada (**true**) ou escondida (**false**) no Grid. |
| **locked** | Não | boolean | Indica se o usuário pode ou não alterar a visualização da coluna. Quando for igual a **"true"**, a coluna não será apresentada no Gerenciador de Colunas. |
---

**Exemplo:**<br>
```
cfgView: DtsColumnConfigView;

cfgView = { 
	column: 'country', 
	visible: true,
	locked: false
};

this.gridCustomer.changeColumnConfigView(cfgView);
```

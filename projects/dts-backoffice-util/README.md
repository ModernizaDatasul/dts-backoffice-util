# Documentação dos Componentes e Utils

## Objetivo

Biblioteca que engloba diversos componentes e serviços utilizados no desenvolvimento HTML/Angular com PO-UI.

<br>

## Versões

Segue abaixo as últimas versões da Biblioteca, conforme a versão do PO-UI e Angular correspondentes.<br>Detalhes das alterações: **[**VER CHANGE LOG**](https://github.com/ModernizaDatasul/dts-backoffice-util/blob/master/projects/dts-backoffice-util/CHANGELOG.md)**.

| PO-UI | Angular | Versão dtsBackofficeUtil |
|-|-|-|
| v18 | v18 | 18.3.0 |
| v17 | v17 | 17.1.0 |
| v16 | v16 | 16.1.0 |
| v15 | v15 | 15.4.1 |
| v14 | v14 | 14.4.1 |
| v6 | v13 | 6.0.2 |
| v5 | v12 | 5.0.1 |
| v4 | v11 | 4.0.1 |
| v3 | v10 | 3.0.1 |
| v2 | v9 | 2.8.4 |

<br>

## Pré-Requisitos

**Instalação do Pacote:**

```cmd
npm install dts-backoffice-util
```

<br> 

# Componentes

## TotvsScheduleExecutionComponent
<br>

**Objetivo:** Componente para realização de agendamentos RPW.

**Dependências:** Para usar esse componente deve ser instalado no projeto o pacote rxjs-compat.<br/>
```cmd
npm i rxjs-compat --save
```
**Importação:** No módulo da aplicação importar o módulo abaixo:
```ts
@NgModule({
    declarations: [
        ...
    ],
    imports: [
        ...,
        DtsBackofficeUtilsModule.forRoot()
    ],
    providers: [],
    bootstrap: [...]
})
```

**Parâmetros:**

| Nome | Tipo | Obrigatório | Descrição |
|-|-|-|-|
| programName | string | Sim | Código de Programa cadastrado no menu, do programa que será executado no RPW. |
| externalName | string | Sim | Nome completo do Programa que será executado no RPW, diretório + nome externo.<br>**Importante:** Em virtude do dicionário (Foundation), este parâmetro é limitado a 24 dígitos. |
| programEMS5 | boolean | Não | Indica se o programa progress é do EMS5. |
| programStyle | number | Não | Número que representa o Estilo do Relatório no EMS5. | 
| programVersion | string | Não | Versão do programa progress. |
| parameters | Array | Sim | Objeto representando a Temp-Table que será enviada ao progress. |
| paramDigitDef | Array | Não | Definição da Temp-Table tt-digita. Utilizado apenas pelo EMS2. Para cada campo da tt-digita, deve ser enviado um objeto com o seguinte formato: **{"chave": "string", "tipo": "string" }**. Onde **chave** representa o nome do campo, e **tipo** representa o tipo de dado (exemplo: character, integer, etc...). |
| paramDigitData | Array | Não | Dados que serão enviados e alimentados na tt-digita. Utilizado apenas pelo EMS2. |
| paramSelections | Array | Não | Parâmetros de Seleção. Utilizado apenas pelo EMS5. |
| disabledParams | boolean | Não | Quando for igual a **"Sim"**, irá desabilitar todos os campos do Agendamento (Data Execução, Servidor, Repetir ocorrência, etc...). |
| loading | boolean | Não | Quando for igual a **"Sim"**, irá apresentar a tela de "loading" no momento da criação da agenda até o retorno do serviço. |
| endExecution | EventEmitter | Não | Evento que será disparado ao finalizar o agendamento. Ele irá enviar como parâmetro um objeto da interface **IScheduleParameters**, contendo os parâmetros informados pelo usuário. |
---
**Métodos:**

| Nome | Descrição |
|-|-|
| setScheduleParameters | Atualiza as informações de agendamento com base no objeto que foi enviado como parâmetro.<br>**Parâmetros:**<br>- schParam (**IScheduleParameters**): Objeto com as informações do agendamento (Data Execução, Servidor, Repetir ocorrência, etc...).<br>**Retorno:** Não há. |
| getScheduleParameters | Retorna um objeto da interface **IScheduleParameters**, contendo os atuais parâmetros informados pelo usuário na tela de agendamento.<br>**Parâmetros:** Não há.<br>**Retorno:**<br>- schParam (**IScheduleParameters**): Objeto com as informações do agendamento (Data Execução, Servidor, Repetir ocorrência, etc...). |
---
**Exemplo de Uso:**

Em conjunto com o parâmetro **endExecution** o método **setScheduleParameters** pode ser utilizado para salvar e recuperar as informações de agendamento informadas pelo usuário.

**Definições no HTML:**
```html
// EXEMPLO PARA EMS5
<app-totvs-schedule-execution #schParam
  programName="rpt_grp_repres"
  externalName="rpt_grp_repres"        
  programEMS5="true"
  programStyle="40"
  programVersion="1.00.00.004"
  [parameters]="parametersRpw"
  [paramSelections]="paramSelectionsRpw"
  (endExecution)="endExecutionSchedule($event)">
</app-totvs-schedule-execution>

// EXEMPLO PARA EMS2
<app-totvs-schedule-execution #schParam
  programName="pdapi701"
  externalName="pdp/pdapi701.p"
  [parameters]="parametersRpw"
  [paramDigitDef]="paramDigitDefRpw"
  [paramDigitData]="paramDigitDataRpw"
  (endExecution)="endExecutionSchedule($event)">
</app-totvs-schedule-execution>    
```
**Definições no JavaScript:**
```ts
@ViewChild('schParam', { static: true }) schParam: TotvsScheduleExecutionComponent;

scheduleParams: IScheduleParameters;
parametersRpw = new Array<any>();
paramDigitDefRpw = new Array<any>();
paramDigitDataRpw = new Array<any>();
paramSelectionsRpw = new Array<any>();

ngOnInit(): void {
  this.loadLocalStorage();
  this.schParam.setScheduleParameters(this.scheduleParams);

  this.createParametersRpw();
}

createParametersRpw(): void {
  // Parâmetros
  this.parametersRpw = [
    { chave: 'destino', valor: 2, tipo: 'integer' },
    { chave: 'arquivo', valor: '', tipo: 'character' },
    { chave: 'usuario', valor: 'FERNANDO', tipo: 'character' },
    { chave: 'perfil', valor: 880, tipo: 'integer' }
  ];

  // Definição da tt-digita (EMS2)
  this.paramDigitDefRpw = [
    { chave: 'cod-estab', tipo: 'character' },
    { chave: 'cod-ccusto', tipo: 'integer' }
  ];

  // Dados da tt-digita (EMS2)
  this.paramDigitDataRpw = [
    { "cod-estab": '19', "cod-ccusto": 17 },
    { "cod-estab": '28', "cod-ccusto": 11 },
    { "cod-estab": '73', "cod-ccusto": 90 }
  ];

  // Seleção (Relatório Regra/Exceção do EMS5)
  this.paramSelectionsRpw = [
    { ind_dwb_set_type: "Regra", cod_dwb_set: "estab",
      cod_dwb_set_initial: "01", cod_dwb_set_final: "FF", log_dwb_rule: true },
    { ind_dwb_set_type: "Exceção", cod_dwb_set: "ccusto",
      cod_dwb_set_initial: "30", cod_dwb_set_final: "35", log_dwb_rule: false }
  ]
}

endExecutionSchedule(event): void {
  this.scheduleParams = event;
  this.saveLocalStorage();
}

private saveLocalStorage(): void {
  if (typeof (Storage) === 'undefined') { return; }
  localStorage.setItem('param-maint.schParam', JSON.stringify(this.scheduleParams));
}

private loadLocalStorage(): void {
  if (typeof (Storage) === 'undefined') { return; }
  this.scheduleParams = JSON.parse(localStorage.getItem('param-maint.schParam'));
}
```
**Definições no Progress:**
```ts
DEFINE TEMP-TABLE tt-param NO-UNDO
  FIELD destino AS INTEGER
  FIELD arquivo AS CHARACTER
  FIELD usuario AS CHARACTER
  FIELD perfil  AS INTEGER.

DEFINE TEMP-TABLE tt-digita NO-UNDO
  FIELD cod-estab  AS CHARACTER
  FIELD cod-ccusto AS INTEGER.
```

Interfaces:

IScheduleParameters
| Nome | Tipo | Descrição | Valor - Label Valor |
|-|-|-|-|
| executionType | number | Tipo Execução | 1 - Executar Hoje<br>2 - Agendar Execução |
| execAppointDate | date | Data Agendada | |
| execAppointHour | string | Hora Agendada | |
| executionServer | string | Servidor RPW | |
| repeatExecution | boolean | Repetir Ocorrência | |
| repeatType | number | Tipo Repetição | 1 - Diária<br>2 - Semanal<br>3 - Mensal |
| frequency | string | Frequência | "no" - Uma vez no dia<br>"yes" - Várias vezes no dia |
| frequencyValue | number | Quantidade da Frequência | |
| frequencyType | string | Tipo Frequência | "hour" - Hora(s)<br>"minute" - Minuto(s) |
| execAppointHourInit | string | Hora Inicial Frequência | |
| execAppointHourFinal | string | Hora Final Frequência | |
| selectWeeklys | Array | Dia da Semana<br>Frequência Semanal | Sunday - Domingo<br>Monday - Segunda<br>Tuesday - Terça<br>Wednesday - Quarta<br>Thursday - Quinta<br>Friday - Sexta<br>Saturday - Sábado |
| dayOfMonth | number | Dia do Mês<br>Frequência Mensal | |
---
<br>

## TotvsMapComponent
<br>

**Objetivo:** Componente para utilização de um mapa do Brasil interativo, que permite a seleção de um estado específico, que dispara um evento, pegando o estado selecionado.

**Importação:** Importar o componente do mapa no módulo que será utilizado.

```ts
@NgModule({
    declarations: [
        ...
    ],
    imports: [
        ...,
        DtsBackofficeUtilsModule.forRoot()
    ],
    providers: [],
    bootstrap: [...]
})
```

**Parâmetros:**

| Nome | Tipo | Obrigatório | Descrição |
|-|-|-|-|
| enabledStates | string[] | Não | Parâmetro que recebe uma lista de siglas de estados que devem ser habilitados no mapa, aqueles não que forem informados serão desabilitado. Se este parâmetro não for informado, todos os estados ficaram habilitados.<br>Se o parâmetro receber uma variável, sempre que o conteúdo dela for alterado, o mapa será atualizado automaticamente com o novo valor.
| initialSelectedState | string | Não | Parâmetro para fornecer um estado a ser selecionado no mapa.<br>Se o parâmetro receber uma variável, sempre que o conteúdo dela for alterado, o mapa será atualizado automaticamente com o novo valor.
| selectedStateEvent | EventEmitter | Sim | Evento disparado ao selecionar um estado do mapa.<br>**Parâmetros:**<br>- State: Responsável por receber do componente o estado selecionado. |
---
**Exemplo de Uso:**

Para a utilização, basta chamar o componente no .HTML e fazer a definição no .TS do seu método.

**Definições no HTML:**
```html
// EXEMPLO 
<app-totvs-map
   [enabledStates]="enabledStates"
   [initialSelectedState]="initialSelectedState"
   (selectedStateEvent)="selectedState($event)">
</app-totvs-map>
```

**Definições no JavaScript:**
```ts
state: string;
enabledStates: string[];
initialSelectedState: string;

searchTax(): void {
    this.servTaxSubscription$ = this.servTax
        .getTax()
        .subscribe((response: ITotalTax) => {

        if (response) {
            ...
            this.enabledStates = response.listStates;
            this.initialSelectedState = response.listStates[0];
        }
    });
}

selectedState(state: string) {
  this.state = state;
}    
```

**Alterando as cores do mapa:**

O mapa já possui as cores da TOTVS como padrão. Mas caso seja necessário alterar alguma cor, deve-se utilizar o código abaixo dentro do styles.css do projeto, alterando os valores.

```css
/* Cor padrão de um estado não selecionado */
.defaultState {
    fill: #0c6c94;
}

/* Cor padrão de um estado não selecionado, quando passar o mouse em cima*/
.defaultState:hover {
    fill: #29b5c4;
    cursor: pointer;
}

/* Cor padrão de um estado pequeno (DF, ES, RJ) não selecionado */
.defaultStateCircle {
    fill: #0c6c94;
}

/* Cor padrão de um estado pequeno (DF, ES, RJ) não selecionado, quando passar o mouse em cima */
.defaultStateCircle:hover {
    fill: #29b5c4;
    cursor: pointer;
}

/* Cor padrão de um estado desabilitado */
.disabledState {
    fill: grey !important;
}

/* Cor padrão de um estado selecionado */
.selectedState {
    fill: #29b5c4;
}

/* Cor padrão de um estado pequeno (DF, ES, RJ) selecionado */
.selectedStateCircle {
    fill: #29b5c4;
}

.disableEvents {
    pointer-events: none;
}

/* Cor e fonte padrão do nome dos estados */
.text {
    fill: #fff;
    font: 12px Arial-BoldMT, sans-serif;
    cursor: pointer
}

/* Padrão do estado como um todo - estado + texto (que seria a tag <a>) */
.stateWithText {
    text-decoration: none
}

.stateWithText:hover {
    cursor: pointer;
    text-decoration: none;
}

/* Cor padrão ao passar o mouse em cima do estado como um todo - estado + texto */
.stateWithText:hover .defaultState, .stateWithText:hover .defaultStateCircle {
    fill: #29b5c4;
}
```

# Pipes

## dtsDateFormat

**Objetivo:** PIPE para formatar datas, ele foi criado pois o PIPE date do angular não consegue formatada datas inferiores a 1901.

**Importação:** No módulo de funcionalidade importar o módulo abaixo:
```ts
@NgModule({
    declarations: [
        ...
    ],
    imports: [
        ...,
        DtsBackofficeUtilsModule
    ],
    providers: [],
    bootstrap: [...]
})
```

Exemplo de uso:
```html
<po-info p-label="Data"
    [p-value]="date | dtsDateFormat : 'dd/MM/yyyy'">
</po-info>

<po-info p-label="Data"
    [p-value]="date | dtsDateFormat : 'MM/dd/yyyy'">
</po-info>
```
<br>

# Serviços

## BreadcrumbControlService 

**Objetivo:** Realiza a criação e controle do breadcrumb das telas.

**Importação:**
```ts
import { BreadcrumbControlService } from 'dts-backoffice-util';
```

**Métodos:**

| Nome | Descrição |
|-|-|
| newBreadcrumb | "Reinicia" o breadcrumb quando necessário. Ex: Telas que possuem menu lateral, ao passar de um menu para outro, o breadcrumb deve ser reiniciado.<br>**Parâmetros:** Não há.<br>**Retorno:** Não há. |
| addBreadcrumb | Adiciona um item ao breadcrumb, considerando a URL atual da tela.<br>**Parâmetros:**<br>- literal (string): Nome da tela que será apresentado no breadcrumb.<br>- activatedRoute (ActivatedRoute): ActivedRoute da tela.<br>**Retorno:** Não há. |
| addBreadcrumbURL | Adiciona um item ao breadcrumb, informando uma URL específica.<br>**Parâmetros:**<br>- literal (string): Nome da tela que será apresentado no breadcrumb.<br>- url (string): URL específica.<br>**Retorno:** Não há. |
| updBreadcrumbURL | Altera uma informação qualquer contida na URL do item informado.<br>**Parâmetros:**<br>- literal (string): Nome da tela que está no breadcrumb.<br>- valueOld (string): Valor a ser substituído.<br>- valueNew (string): Novo valor.<br>**Retorno:** Não há. |
| delBreadcrumb | Exclui um item do breadcrumb.<br>**Parâmetros:**<br>- literal (string): Nome do item (nome da tela), que deve ser excluído do breadcrumb.<br>**Retorno:** Não há. |
| getBreadcrumb | Retorna o breadcrumb atual completo.<br>**Parâmetros:** Não há.<br>**Retorno:**<br>- breadcrumb (PoBreadcrumb) |
| getCurrentRouter | Retorna a URL do breadcrumb do item corrente.<br>**Parâmetros:** Não há.<br>**Retorno:**<br>- url (string) |
| getPrevRouter | Retorna a URL do breadcrumb do item anterior.<br>**Parâmetros:** Não há.<br>**Retorno:**<br>- url (string) |
| hasPreviousRouter | Indica se existe um item de breadcrumb anterior.<br>**Parâmetros:** Não há.<br>**Retorno:**<br>- exist (boolean) |
---

<br>

## MenuDatasulService 

**Objetivo:** Interagir com o Menu do Datasul.

**Importação:**
```ts
import { MenuDatasulService } from 'dts-backoffice-util';

constructor(public menuDatasulService: MenuDatasulService) {
}
```

**Métodos:**

| Nome | Descrição |
|-|-|
| callProgress | Executa uma tela Progress que esteja cadastrada no menu.<br>**Importante:** Este método realiza uma integração direta com o Menu do Datasul (parte HTML do Menu). Portanto, ele somente funciona quando o projeto está sendo executado por dentro do Menu do Datasul.<br>**Parâmetros:**<br>- program (object): Objeto com os seguintes atributos:<br>prg (string): Nome do programa no menu.<br>params (Array(object)): Array de Objetos de Parâmetros. O objeto possui dois atributos: "type" com o tipo de dado (character, integer, logical, etc...). E "value" com o conteúdo.<br>**Retorno:** Não há. |
| openTHF | Executa uma tela construídas em THF1 que esteja cadastrada no menu.<br>**Importante:** Este método realiza uma integração direta com o Menu do Datasul (parte HTML do Menu). Portanto, ele somente funciona quando o projeto está sendo executado por dentro do Menu do Datasul.<br>**Parâmetros:**<br>- externalName (string): Nome EXTERNO do Programa, cadastro de menu.<br>- params (string): Parâmetros que serão adicionados na URL.<br>- parent (boolean): Indica se a tela deve abrir na mesma Aba do Navegador (valor: **true**) ou em outra Aba do Navegador (valor: **false**). **Obs:** Quando a tela abrir na mesma Aba do Navegador, irá abrir em outra Aba do Menu do Datasul.<br>**Retorno:** Não há. |
| openPath | Executa uma tela PO-UI que esteja cadastrada no menu.<br>**Importante:** Este método realiza uma integração direta com o Menu do Datasul (parte HTML do Menu). Portanto, ele somente funciona quando o projeto está sendo executado por dentro do Menu do Datasul.<br>**Parâmetros:**<br>- programName (string): Nome INTERNO do Programa, código do programa cadastro de menu.<br>- params (string): Parâmetros que serão adicionados na URL.<br>- parent (boolean): Indica se a tela deve abrir na mesma Aba do Navegador (valor: **true**) ou em outra Aba do Navegador (valor: **false**). **Obs:** Quando a tela abrir na mesma Aba do Navegador, irá abrir em outra Aba do Menu do Datasul.<br>**Retorno:** Não há. |
| sendNotification | Apresenta uma notificação ao usuário.<br>**Importante:** Este método realiza uma integração direta com o Menu do Datasul (parte HTML do Menu). Portanto, ele somente funciona quando o projeto está sendo executado por dentro do Menu do Datasul.<br>**Parâmetros:**<br>- notification (object): Objeto com os seguintes atributos:<br>type (string): Tipo de notificação (success, warning, error).<br>title (string): Título da Notificação.<br>detail (string): Descrição da Notificação.<br>**Retorno:** Não há. |
| programSecurity | Verifica a Segurança do Menu, identificando se o usuário corrente possui acesso a um ou mais programas.<br>**Parâmetros:**<br>- programName (string ou Array): Nome do Programa cadastro no Menu, que se deseja consultar a segurança. Podendo ser informado uma string simples com o Nome do Programa, ou um Array de strings com a lista de Programas.<br>**Retorno:** response (Observable(Array)): Array com as informações dos Programas pesquisados. O objeto contido no Array terá dois atributos:<br>programName (string): Nome do Programa no Menu.<br>hasAccess (boolean): Valor "TRUE" ou "FALSE", indicando se o usuário tem acesso ao programa. **Obs:** Se o programa não estiver cadastro no Menu, o retorno deste atributo será "FALSE". |
---

**Exemplo de uso:**
```ts
// Executando uma tela Progress
program = { 
  prg: 'bas_lote_liquidac_acr',
  params: [
    { type: 'character', value: 'ABC' },
    { type: 'integer', value: '345' }
  ]
};
this.menuDatasulService.callProgress(program);

// Executando uma Tela THF1
this.menuDatasulService.openTHF('dts/mab/activities', '', true);

// Executando uma Tela PO-UI
this.menuDatasulService.openPath('html.creditCardOperator', '1509;10;1', true);

// Disparando uma Notificação
notification = { 
  type: 'success',
  title: 'Operação foi executada com Sucesso.',
  detail: 'A Operação 4343 foi executada conforme parametrizado e finalizou.'
};
this.menuDatasulService.sendNotification(notification);

// Validando a Segurança de um Programa
this.menuDatasulService
  .programSecurity('html.cashControl')
  .subscribe((response: Array<Object>) => {
    console.log('response:', response[0]);
    // Resposta: { programName: "html.cashControl", hasAccess: true }
});

// Validando a Segurança de uma Lista de Programas
let programList = [];
programList.push('pr0590');
programList.push('html.prgNoExist');
programList.push('bas_empresa');

this.menuDatasulService
  .programSecurity(programList)
  .subscribe((response: Array<Object>) => {
    console.log('response:', response);
    /* Resposta:
       [
         0: { programName: "pr0590", hasAccess: false }
         1: { programName: "html.prgNoExist", hasAccess: false }
         2: { programName: "bas_empresa", hasAccess: true }
       ] */
});
```

<br>

## ProfileService

**Objetivo:** Salvar preferências do usuário.

**Importação:**
```ts
import { ProfileService, IProfile } from 'dts-backoffice-util';

constructor(public preferenceService: ProfileService) {
}
```

**Métodos:**

| Nome | Descrição |
|-|-|
| setProfile | Salva informações no profile do usuário.<br>**Parâmetros:**<br>- profile (IProfile): Objeto com as informações do usuário e as informações serem salvas.<br>**Retorno:**<br>- response (Observable(any)): Retorno do BackEnd. |
| getProfileAsString | Retorna os valores salvos no formato de uma string.<br>**Parâmetros:**<br>- profile (IProfile): Objeto com as informações do usuário.<br>- showLoading (boolean): Indica se deve apresentar a tela de loading enquanto busca as informações.<br>**Retorno:**<br>- response (Observable(string)): Informações salvas. |
| getProfileAsJSON | Retorna os valores salvos no formato de um JSON.<br>**Parâmetros:**<br>- profile (IProfile): Objeto com as informações do usuário.<br>- showLoading (boolean): Indica se deve apresentar a tela de loading enquanto busca as informações.<br>**Retorno:**<br>- response (Observable(object)): Informações salvas. |
---

**Interfaces:**

IProfile
| Nome | Tipo | Obrigatório | Descrição |
|-|-|-|-|
| pageId | string | Sim | Um ID para identificar a Tela que está salvando os parâmetros. |
| userCode | string | Sim | Código do usuário (login). |
| dataCode | string | Sim | Um ID para identificar o parâmetro. | 
| dataValue | string | Não | Valor a ser salvo, nos GET's é opcional. |
---

**Exemplo de Uso:**
```ts
const profile: IProfile = {
  pageId: 'about-component',
  userCode: 'super',
  dataCode: 'preference',
  dataValue: this.preference
};

this.preferenceService
  .setProfile(profile)
  .subscribe((response) => {
  this.notification.success('Preferência salva com sucesso!');
}, (error) => {
  this.notification.error('Não foi possível salvar a preferência');
});
```

<br>

## ReportService

**Objetivo:** Faz a chamada do datasul-report e realiza o download do arquivo caso seja especificado.

**Importação:**
```ts
import { 
  ReportService, 
  IReportServiceParams, 
  ReportFormats
} from 'dts-backoffice-util';

constructor(public reportService: ReportService) {
}
```
**Métodos:**

| Nome | Descrição |
|-|-|
| generate | Retorna o arquivo binário gerado pelo datasul-report e faz o download do arquivo.<br>**Parâmetros:**<br>- params (IReportServiceParams): Parâmetros para execução do relatório.<br>- showLoading (boolean): Indica se deve apresentar a tela de loading enquanto busca as informações.<br>**Retorno:**<br>- response (Observable(Blob)) |
---
<br>

**Interfaces:**

IReportServiceParams

| Nome | Tipo | Obrigatório | Descrição |
|-|-|-|-|
| reportName | string | Sim | Nome do arquivo .rptDesign |
| programName | string | Sim | Nome do programa progress. | 
| properties | Array | Sim | Lista de parâmetros que serão enviados ao progress. O objeto do Array deve implementar a interface **IProperty**. |
| dialect | string | Sim | Idioma do usuário. |
| downloadName | string | Sim | Nome que será dado ao arquivo de download. |
| download | boolean | Sim | O download deve ser efetuado |
| format | enum | Sim | Formato do Arquivo (XLSX, PDF, DOCX ou HTML). Enum: **ReportFormats**. |
---

IProperty

| Nome | Tipo | Obrigatório | Descrição |
|-|-|-|-|
| name | string | Sim | Nome do parâmetro |
| value | string | Sim | Valor do parâmetro |
---

<br>

**Enums**
```ts
declare enum ReportFormats {
    XLSX = "xlsx",
    PDF = "pdf",
    DOCX = "docx",
    HTML = "html"
}
```

**Exemplo de Uso:**
```ts
const properties: Array<IProperty> = [
  { 
    name: 'custom.quick_search', 
    value: '186'
  }
];

const params: IReportServiceParams = {
  reportName: 'crm/rel_campaign_export',
  programName: '/report/crm/crm0010',
  properties,
  dialect: 'pt',
  download: true,
  downloadName: '2020-1-10_13-51-53_CRM_CAMPANHAS',
  format: ReportFormats.XLSX
};

this.reportService
  .generate(params)
  .subscribe(() => {
  this.notification.error("Arquivo baixado com sucesso!");
}, () => {
  this.notification.error("Não foi possível baixar o arquivo");
});
```
<br>

## TotvsScheduleExecutionService

**Objetivo:** Serviço que disponibiliza métodos para geração de agendamento e acompanhamento do RPW.

**Métodos:**

| Nome | Descrição |
|-|-|
| createExecutionForNow | Cria de forma simplificada (poucos parâmetros) um agendamento no RPW, para ser executado "agora" e sem repetição.<br>**Parâmetros:**<br>- executionParams (**IExecutionParameters**): Objeto com as informações necessárias para execução do agendamento (Servidor RPW, Programa a ser Executado, etc...).<br>- loading (boolean): Quando for igual a **"Sim"**, irá apresentar a tela de "loading" até finalizar a criação do agendamento.<br>**Retorno:** Objeto com as informações do Agendamento (Data de Criação, ID interno do Agendamento (**jobScheduleID**), etc...). |
| getExecutionByJobScheduleID | Retorna os dados e status de um agendamento com base no seu código interno: **JobScheduleID**.<br>**Parâmetros:**<br>- jobScheduleID (string): Código interno da agenda.<br>- loading (boolean): Quando for igual a **"Sim"**, irá apresentar a tela de "loading" até finalizar a busca do agendamento.<br>**Retorno:** response (Observable(IExecutionStatus)): Objeto com as informações do Agendamento (Data de Criação, ID interno do Agendamento (**jobScheduleID**), Número da Agenda (**executionID**) etc...).| 
| getExecutionByExecutionID | Retorna os dados e status de um agendamento com base no número da agenda: **executionID**.<br>**Parâmetros:**<br>- executionID (string): Número da agenda.<br>- loading (boolean): Quando for igual a **"Sim"**, irá apresentar a tela de "loading" até finalizar a busca do agendamento.<br>**Retorno:** response (Observable(IExecutionStatus)): Objeto com as informações do Agendamento (Data de Criação, ID interno do Agendamento (**jobScheduleID**), Número da Agenda (**executionID**) etc...).|
| followUpExcByJobScheduleID | Utilizado para acompanhar a execução do agendamento realizado no RPW, verificando o status da execução, até que ele seja finalizado.<br>**Parâmetros:**<br>- jobScheduleID (string): ID interno do Agendamento que se deseja acompanhar.<br>- intervalNum (number): Tempo em milisegundos para verificação do status do agendamento. Por exemplo, se for informado **5000**, será verificado o status do agendamento em 5 e 5 segundos até a execução terminar.<br>- fncCallBack (Function): Método que será executado após a tela receber o status da execução do agendamento. Ele será executado várias vezes até a execução terminar, no intervalo de tempo determinado no parâmetro **intervalNum**. Este método irá receber um objeto da interface **IExecutionStatus** com o status da execução. O método deverá retornar um valor **boolean** indicando se o processo deve continuar sendo monitorado ou não. Se for retornado "false", o agendamento não será mais monitorado. **Observação**: Isto não afeta a execução do agendamento no RPW, ele continuará executando normalmente.<br>- loading (boolean): Quando for igual a **"Sim"**, irá apresentar a tela de "loading" até finalizar o acompanhamento do agendamento.<br>**Retorno:** Não há. |
| followUpExcByExecutionID | Utilizado para acompanhar a execução do agendamento realizado no RPW, verificando o status da execução, até que ele seja finalizado.<br>**Parâmetros:**<br>- executionID (string): Número do Agendamento que se deseja acompanhar.<br>- intervalNum (number): Tempo em milisegundos para verificação do status do agendamento. Por exemplo, se for informado **5000**, será verificado o status do agendamento em 5 e 5 segundos até a execução terminar.<br>- fncCallBack (Function): Método que será executado após a tela receber o status da execução do agendamento. Ele será executado várias vezes até a execução terminar, no intervalo de tempo determinado no parâmetro **intervalNum**. Este método irá receber um objeto da interface **IExecutionStatus** com o status da execução. O método deverá retornar um valor **boolean** indicando se o processo deve continuar sendo monitorado ou não. Se for retornado "false", o agendamento não será mais monitorado. **Observação**: Isto não afeta a execução do agendamento no RPW, ele continuará executando normalmente.<br>- loading (boolean): Quando for igual a **"Sim"**, irá apresentar a tela de "loading" até finalizar o acompanhamento do agendamento.<br>**Retorno:** Não há. |
| getObjectByValue <br> getFilteredItems | Métodos utilizados pelo componente PO-LOOKUP. Desta forma, é possível utilizar o **TotvsScheduleExecutionService** para disponibilizar um lookup de Servidor de Execução RPW na tela. |
---
**Exemplo de Uso:**

Segue abaixo exemplos da geração de agendamento, busca e acompanhamento da execução.

**Definições no HTML:**
```html
<po-lookup
  p-label="Servidor RPW"
  p-placeholder="Servidor RPW"
  [p-columns]="zoomRpwServiceColumns"
  [p-field-format]="fieldRpwServiceFormat"
  [p-filter-service]="scheduleExecution"
  p-field-label="name"
  p-field-value="code"
  [(ngModel)]="executionServer">
</po-lookup>
```
**Definições no JavaScript:**
```ts
executionServer: string;
jobScheduleID: string;
executionID: string;
execStatus: string;

zoomRpwServiceColumns: Array<PoLookupColumn> = [
  { property: 'code', label: 'Servidor', type: 'string', width: '20%' },
  { property: 'name', label: 'Descrição', type: 'string', width: '80%' }
];

private schedExecSubscription$: Subscription;

constructor(
  ...
  public scheduleExecution: TotvsScheduleExecutionService
}

fieldRpwServiceFormat(value) {
  return `${value.code} - ${value.name}`;
}

createSchedule(): void {

  // Criar um Agendamento para ser Executado "agora"
  const execParam = new ExecutionParameters();
  execParam.executionServer = executionServer;

  // Exemplo de Parâmetros para o EMS5
  execParam.programName = 'rpt_grp_repres';
  execParam.externalName = 'rpt_grp_repres';
  execParam.programEMS5 = true;
  execParam.programStyle = 40;
  execParam.programVersion = '1.00.00.004';
  execParam.businessParams = [
    { chave: 'cTipoCarga', valor: 'register', tipo: 'character' },
    { chave: 'lCargaTotal', valor: false, tipo: 'logical' },
    { chave: 'dDataCorte', valor: null, tipo: 'date' }
  ];
  // Seleção (Relatório Regra/Exceção do EMS5)
  execParam.paramSelections = [
    { ind_dwb_set_type: "Regra", cod_dwb_set: "estab",
      cod_dwb_set_initial: "01", cod_dwb_set_final: "FF", log_dwb_rule: true },
    { ind_dwb_set_type: "Exceção", cod_dwb_set: "ccusto",
      cod_dwb_set_initial: "30", cod_dwb_set_final: "35", log_dwb_rule: false }
  ];

  // Exemplo de Parâmetros para o EMS2
  execParam.programName = 'pdapi701';
  execParam.externalName = 'pdp/pdapi701.p';
  execParam.businessParams = [
    { chave: 'destino', valor: 2, tipo: 'integer' },
    { chave: 'arquivo', valor: '', tipo: 'character' },
    { chave: 'usuario', valor: 'FERNANDO', tipo: 'character' },
    { chave: 'perfil', valor: 880, tipo: 'integer' }
  ];
  // Definição da tt-digita (EMS2)
  execParam.paramDigitDef = [
    { chave: 'cod-estab', tipo: 'character' },
    { chave: 'cod-ccusto', tipo: 'integer' }
  ];
  // Dados da tt-digita (EMS2)
  execParam.paramDigitData = [
    { "cod-estab": '19', "cod-ccusto": 17 },
    { "cod-estab": '28', "cod-ccusto": 11 },
    { "cod-estab": '73', "cod-ccusto": 90 }
  ];

  this.schedExecSubscription$ = this.scheduleExecution
    .createExecutionForNow(execParam, true)
    .subscribe((response: any) => {

      // Guarda o ID do Agendamento para fazer o acompanhamento
      this.jobScheduleID = response.jobScheduleID;
    });
}

getExecution(type: string): void {

  if (type === 'jobScheduleID') {
    this.schedExecSubscription$ = this.scheduleExecution
      .getExecutionByJobScheduleID(this.jobScheduleID, true)
      .subscribe((response: IExecutionStatus) => {

        if (response) {
          // Guarda o Número do Agendamento e o Status
          this.executionID = response.executionID;
          this.execStatus = response.status;
        } else {
          this.executionID = 'Não Encontrado !';
          this.execStatus = '';
        }
      });
  }

  if (type === 'executionID') {
    this.schedExecSubscription$ = this.scheduleExecution
      .getExecutionByExecutionID(this.executionID, true)
      .subscribe((response: IExecutionStatus) => {

        if (response) {
          // Guarda o ID interno do Agendamento e o Status
          this.jobScheduleID = response.jobScheduleID;
          this.execStatus = response.status;          
        } else {
          this.jobScheduleID = 'Não Encontrado !';
          this.execStatus = '';
        }
      });
  }
}

followUp(type: string): void {

  if (type === 'jobScheduleID') {
    // Inicia o Acompanhamento
    this.scheduleExecution.followUpExcByJobScheduleID(this.jobScheduleID, 5000, this.followUpCallBack.bind(this));
  }

  if (type === 'executionID') {
    // Inicia o Acompanhamento
    this.scheduleExecution.followUpExcByExecutionID(this.executionID, 5000, this.followUpCallBack.bind(this));
  }
}

followUpCallBack(execStatus: IExecutionStatus): boolean {
  // Verifica o Status do Agendamento
  switch (execStatus.status) {
    case 'PENDING': // Ainda não iniciou

      console.log('Esta esperando para executar...');
      break;

    case 'RUNNING': // Em execução

      console.log('Esta rodando...');
      break;

    case 'SUCCESS': // Terminou OK

      console.log('Terminou OK...');
      break;

    case 'FAILURE': // Terminou com Erro

      console.log('Terminou com o erro:', execStatus.error);
      break;
  }

  return true; // Continua monitorando - retornar "false" para parar o monitoramento
}
```
**Definições no Progress:**
```ts
DEFINE TEMP-TABLE tt-param NO-UNDO
  FIELD destino AS INTEGER
  FIELD arquivo AS CHARACTER
  FIELD usuario AS CHARACTER
  FIELD perfil  AS INTEGER.

DEFINE TEMP-TABLE tt-digita NO-UNDO
  FIELD cod-estab  AS CHARACTER
  FIELD cod-ccusto AS INTEGER.
```

**Interfaces:**

IExecutionParameters
| Nome | Tipo | Obrigatório | Descrição |
|-|-|-|-|
| executionServer | string | Sim | Código do Servidor RPW. |
| programName | string | Sim | Código de Programa cadastrado no menu, do programa que será executado no RPW. |
| externalName | string | Sim | Nome completo do Programa que será executado no RPW, diretório + nome externo.<br>**Importante:** Em virtude do dicionário (Foundation), este parâmetro é limitado a 24 dígitos. |
| programEMS5 | boolean | Não | Indica se o programa progress é do EMS5. |
| programStyle | number | Não | Número que representa o Estilo do Relatório no EMS5. | 
| programVersion | string | Não | Versão do programa progress. |
| businessParams | Array | Não | Objeto representando a Temp-Table que será enviada ao progress. |
| paramDigitDef | Array | Não | Definição da Temp-Table tt-digita. Utilizado apenas pelo EMS2. Para cada campo da tt-digita, deve ser enviado um objeto com o seguinte formato: **{"chave": "string", "tipo": "string" }**. Onde **chave** representa o nome do campo, e **tipo** representa o tipo de dado (exemplo: character, integer, etc...). |
| paramDigitData | Array | Não | Dados que serão enviados e alimentados na tt-digita. Utilizado apenas pelo EMS2. |
| paramSelections | Array | Não | Parâmetros de Seleção. Utilizado apenas pelo EMS5. |
---

IExecutionStatus
| Nome | Tipo | Descrição |
|-|-|-|
| jobScheduleID | string | ID Interno do Agendamento. |
| executionID | string | Número da Agenda (código da execução). Pode ser utilizado para, por exemplo, apresentar ao usuário, assim ele pode realizar a consulta dos detalhes da execução através do Monitor de Pedido de Execução (programa padrão do Foundation). |
| startedDate | Date | Data e hora em que o agendamento iniciou a execução no RPW. |
| error | string | Quando o status for igual a **'FAILURE'**, esta propriedade terá a descrição do erro. |
| status | string | Status da execução, podendo ser:<br>- PENDING: O agendamento está enfileirado, aguardando o início da execução.<br>- RUNNING: O agendamento está em execução.<br>- SUCCESS: O agendamento terminou corretamente, sem erros.<br>- FAILURE: O agendamento terminou com erro. A descrição do erro estará disponível na propriedade **error**. Observação: Caso não exista um agendamento com o ID informado, também será retornar este status de erro. |
---

<br>

## TranslateService 

**Objetivo:** Realizar o controle do idioma corrente, considerando o que estiver parametrizado no Cadastro de Usuários do Datasul, e caso não esteja informado, será considerado o idioma informado no Browse.

**Importação:**
```ts
import { TranslateService } from 'dts-backoffice-util';
```

**Métodos:**

| Nome | Descrição |
|-|-|
| getCurrentLanguage | Retorna o idioma corrente. Será considerado no primeiro momento a chave "user.language" do localStorage. Caso ela não exista ou seja inválida, será considerado o idioma parametrizado no Browse. Além disso, o idioma deve estar disponível na lista de suportados, conforme métodos "getSuportLanguage".<br>**Parâmetros:** Não há.<br>**Retorno:** string |
| getSuportLanguage | Retornar uma lista com os atuais idiomas suportados.<br>**Parâmetros:** Não há.<br>**Retorno:** Array(string) |
---

<br>

## UserLoginService

**Objetivo:** Retorna o login do usuário tanto no framework atual e quanto no novo framework.

**Importação:**
```ts
import { UserLoginService } from 'dts-backoffice-util';

constructor( public sessionService: UserLoginService) {
}
```

**Métodos:**

| Nome | Descrição |
|-|-|
| getUserLogin | Retorna o login do usuário.<br>**Parâmetros:** Não há.<br>**Retorno:**<br>- response (Observable(string)) |
---

**Exemplo de Uso:**
```ts
this.sessionService
  .getUserLogin()
  .subscribe((user) => {
  this.notification.success(`O usuário logado é ${user}`);
});
```
<br>

## ValidateService

**Objetivo:** Realizar o tratamento da validação de campos em formulários, quando utilizados vários componentes **Dynamic Form** na tela de criação/edição. Nesse caso, ao disparar uma validação através de um campo presente em um formulário e nessa validação alterar propriedades e valores de campos que estão em um formulário diferente, a validação não é aplicada. Para o correto funcionamento das validações, é necessário que haja um tratamento da validação no Front End utilizando os métodos criados neste serviço.

**Importação:**
```ts
import { ValidateService } from 'dts-backoffice-util';

constructor(private validateService: ValidateService) { 
}
```

**Métodos:**

| Nome | Descrição |
|-|-|
| validate | Realiza uma requisição com o verbo POST para a URL de validação recebida por parâmetro e enviando no payload o objeto de validação também recebido por parâmetro.<br>**Parâmetros:** <br>- url (string): URL referente ao endPoint de validação de formulários da API. Ex.: "/api/rep/v1/userParameters/validateForm".<br>- value ([PoDynamicFormFieldChanged](https://github.com/po-ui/po-angular/blob/master/projects/ui/src/lib/components/po-dynamic/po-dynamic-form/po-dynamic-form-validation/po-dynamic-form-field-changed.interface.ts)): Objeto com a interface do PO UI que é recebido na função de `validate` do [Dynamic Form](https://po-ui.io/documentation/po-dynamic-form).<br>**Retorno:** Promise([PoDynamicFormValidation](https://github.com/po-ui/po-angular/blob/master/projects/ui/src/lib/components/po-dynamic/po-dynamic-form/po-dynamic-form-validation/po-dynamic-form-validation.interface.ts)) - Retorna uma promise de um objeto com a interface  PoDynamicFormValidation.  |
| updateFormFields | Atualiza as propriedades dos campos do formulário enviado por parâmetro com base nas validações, também recebidas por parâmetro.<br>**Parâmetros:** <br>- validation ([PoDynamicFormValidation](https://github.com/po-ui/po-angular/blob/master/projects/ui/src/lib/components/po-dynamic/po-dynamic-form/po-dynamic-form-validation/po-dynamic-form-validation.interface.ts)): Objeto com o resultado das validações retornado pelo método validate.<br>- fields (Array([PoDynamicFormField](https://github.com/po-ui/po-angular/blob/master/projects/ui/src/lib/components/po-dynamic/po-dynamic-form/po-dynamic-form-field.interface.ts))): Array de objetos com a interface do PO UI. Esse array corresponde à lista de campos do formulário, utilizado para definir a propriedade `fields` no [Dynamic Form](https://po-ui.io/documentation/po-dynamic-form).<br>**Retorno:** Array([PoDynamicFormField](https://github.com/po-ui/po-angular/blob/master/projects/ui/src/lib/components/po-dynamic/po-dynamic-form/po-dynamic-form-field.interface.ts)) - Retorna o array de campos com as propriedades atualizadas conforme a validação. |
| updateFormValue | Atualiza os valores dos campos utilizados no formulário com base nas validações.<br>**Parâmetros:** <br>- validation ([PoDynamicFormValidation](https://github.com/po-ui/po-angular/blob/master/projects/ui/src/lib/components/po-dynamic/po-dynamic-form/po-dynamic-form-validation/po-dynamic-form-validation.interface.ts)): Objeto com o resultado das validações retornado pelo método validate.<br>- value (Objeto(any)): Objeto com os dados da entidade/recurso utilizado para alimentar os campos dos formulários, utilizado para definir a propriedade `fields` no [Dynamic Form](https://po-ui.io/documentation/po-dynamic-form).<br>**Retorno:** Objeto(any) - Retorna o objeto de dados da entidade/recurso com os dados atualizados conforme a validação. |
---

**Exemplo de Uso:**

**Definições no HTML:**

Ao invés de passar diretamente a url do endPoint para a propriedade `p-validate` do componente Dynamic Form, deve ser passada uma função `[p-validate]="onValidate.bind(this)"`, como apresentado a seguir. Fazer isso para todos os componentes Dynamic Form.
```html
<po-accordion-item [p-label]="metadata?.literals?.enableDisableFields" #enableDisableFields>
    <po-dynamic-form name="formEnableDisableFields" 
        [p-fields]="metadata?.fieldsTypingEnableDisable"
        [p-value]="userParameters"
        [p-validate]="onValidate.bind(this)"
        [p-validate-fields]='metadata?.validateFields'>
    </po-dynamic-form>
</po-accordion-item>

<po-accordion-item [p-label]="metadata?.literals?.configurations" #configurationsTyping>
    <po-dynamic-form name="formConfigurations" 
        [p-fields]="metadata?.fieldsTypingConfigurations"
        [p-value]="userParameters"
        [p-validate]="onValidate.bind(this)"
        [p-validate-fields]='metadata?.validateFields'>
    </po-dynamic-form>
</po-accordion-item>  
```
**Definições no TypeScript:**

No typescript de controle do componente defina a função de validação conforme apresentado a seguir.
```ts
public async onValidate(fieldChanged: PoDynamicFormFieldChanged){
    let validation: PoDynamicFormValidation = await this.validateService.validate('/api/rep/v1/userParameters/validateForm', fieldChanged);
    
    this.metadata.fieldsTypingEnableDisable = [...this.validateService.updateFormFields(validation, this.metadata.fieldsTypingEnableDisable)];
    this.metadata.fieldsTypingConfigurations = [...this.validateService.updateFormFields(validation, this.metadata.fieldsTypingConfigurations)];

    this.userParameters = {...this.validateService.updateFormValue(validation, this.userParameters)};
    
    return validation;
}
```
> Notas:
> + A função `onValidate` precisar ser definado com a palavre `async`, pois precisa aguardar o retorno da função `validate` do serviço.
> + Substitua o array de campos nas chamadas do método `updateFormFields` para corresponder ao array utilizado no Dynamic Form. Para cada formulário dinâmico existente na tela, deve haver uma chamada ao método `updateFormFields`.
> + Substitua o objeto na chamada do método `updateFormValue` para corresponder ao objeto utilizado no `p-value` dos formulários. Como será utilizado o mesmo objeto para os valores essa chamada ocorrerá apenas uma vez.

<br> 

# Utils

## DateUtil

**Objetivo:** Manipula informações de data.

**Importação:**
```ts
import { DateUtil } from 'dts-backoffice-util';
```

**Métodos:**

| Nome | Descrição |
|-|-|
| dateToQueryParam | Transforma uma data para o padrão YYYY-MM-DD.<br>**Parâmetros:**<br>- date (Date): Data.<br>**Retorno:**<br>- date (string) |
| queryParamToDate | Transforma uma data no padrão YYYY-MM-DD para objeto Date.<br>**Parâmetros:**<br>- date (string): Data.<br>**Retorno:**<br>- date (Date) |
| isValidDate | Verifica se a data é válida.<br>**Parâmetros:**<br>- date (Date): Data.<br>**Retorno:**<br>- valid (boolean) |
| ajustDate | Ajusta a data retornando no padrão do objeto Date.<br>**Parâmetros:**<br>- param (any): Data.<br>**Retorno:**<br>- date (date) |
| ajustDateToModel | Ajusta a data para o padrão do objeto Date. Utilizado nos construtores dos modelos.<br>**Parâmetros:**<br>- object (object): Objeto que possui atributos do tipo data.<br>- fieldName (string): Nome do Atributo que possui a data.<br>**Retorno:**<br>- date (date) |
| pad | Adiciona zero à esquerda do número.<br>**Parâmetros:**<br>- number (number): Número.<br>**Retorno:**<br>- number (string) |
---
<br>

## DisclaimerUtil

xxxx

<br> 

## FieldValidationUtil

xxxx

<br> 

## FileUtil

**Objetivo:** Auxílio na manipulação de Arquivos.

**Importação:**
```ts
import { FileUtil } from 'dts-backoffice-util';
```

**Métodos:**

| Nome | Descrição |
|-|-|
| downloadFile | Realiza o Download de um arquivo que foi enviado do backEnd.<br>**Parâmetros:**<br>- data (any): Conteúdo do Arquivo, podendo estar no formato Base64 ou Blob.<br>- fileName (string): Nome do Arquivo, podendo ser diferente do nome original. O valor informado, será o nome que o arquivo terá, quando for realizado o download.<br>- contentType (string): Tipo do Arquivo no formato [**MIME Type**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types). Este parâmetro é opcional, mas quando não informado, deve-se garantir que a extensão do arquivo, informado no nome do arquivo, esteja correta.<br>- base64 (boolean): Indica se o conteúdo do arquivo está no formato Base64. Se o parâmetro não for informado ou for igual a **"true"**, será considerado como Base64. Se for informado **"false"**, será considerado o formato Blob.<br>**Retorno:** não há. |
| downloadData | Realiza a criação e o download de um arquivo CSV gerado a partir de um listagem de dados (criada diretamente no FrontEnd ou retornada do BackEnd). Este método pode ser utilizado para, por exemplo, exportar os dados de um Grid.<br>**Parâmetros:**<br>- data (Array): Um Array com a listagem de dados, por exemplo, uma lista de clientes.<br>- dwldDataParam (IDownloadDataParams): Parâmetros de configuração do arquivo. Este parâmetro é opcional, caso ele não seja informado, serão assumidos valores padrões de configuração, conforme descrito na inteface **IDownloadDataParams**.<br>**Retorno:** não há. |
| fileToB64 | Realiza a conversão de um arquivo para o formato Base64.<br>**Parâmetros:**<br>- file (File): Objeto do Tipo "File".<br>**Retorno:**<br>- content (string): Conteúdo do arquivo no formato Base64. |
| b64toBlob | Realiza a conversão de um arquivo que está no formato Base64, para o formato Blob.<br>**Parâmetros:**<br>- b64Data (any): Conteúdo do Arquivo no formato Base64.<br>- contentType (string): Tipo do Arquivo no formato [**MIME Type**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types). Este parâmetro é opcional.<br>**Retorno:**<br>- content (Blob): Conteúdo do arquivo no formato Blob. |
---

**Exemplo de Uso:**

**Definições no JavaScript:**
```ts
// TS da Tela

import { FileUtil } from 'dts-backoffice-util';

fileBase64: string;

downloadFile() {
  this.servCustomerSubscription$ = this.servCustomer
    .getFile('1') // Código do cliente 1
    .subscribe((response: Object) => {

      FileUtil.downloadFile(response['content'], response['filename']);
    });
}

downloadQrCode() {
  this.servCustomerSubscription$ = this.servCustomer
    .getQrCode('00020126360014BR.GOV.BCB.PIX0114+554798402310452040000530398654071500.005802BR5916Robervaldo6009Joinville62070503Novo%20QR%20pix63047EF5') // Texto Exemplo para Geração do QrCode
    .subscribe((response: Blob) => {

      FileUtil.downloadFile(response, 'qrCode.png', '', false);
  });
}

downloadList() {
  this.servCustomerSubscription$ = this.servCustomer
    .query([], [], 1, 999) // Método padrão de Query do Serviço de Cliente
    .subscribe((response: TotvsResponse<ICustomer>) => {

      const dwldDataParam = new DownloadDataParams();
      dwldDataParam.fileName = 'clientes.csv';
      dwldDataParam.columnDelimiter = ';';
      dwldDataParam.literals = this.literals;
      dwldDataParam.columnList = ['shortName', 'name', 'country', 'status', 'tax'];

      FileUtil.downloadData(response.items, dwldDataParam);
  });
}

onConfirmUpload(): void {
  // fileToSend: variável utilizada no ngModel do componente de Upload
  if (!this.fileToSend || this.fileToSend.length < 1) { return; }

  // fileBase64: variável do programa para receber o conteúdo em Base64
  FileUtil.fileToB64(this.fileToSend[0].rawFile).then(
    (data: string) => this.fileBase64 = data
  );
}

// TS do Serviço

getFile(id: string): Observable<Object> {
  const url = `/customer/${id}/file`;
  return this.http.get(url);
}

getQrCode(text: string): Observable<Blob> {
  const url = `/qrcode/download?text=${text}`;
  return this.http.get(url, { responseType: 'blob' });
}
```
**Definições no Progress:**
```ts
// Conteúdo do Método que BackEnd que retorna o Arquivo em Base64
DEFINE VARIABLE v_dir_arq AS CHARACTER NO-UNDO.
DEFINE VARIABLE v_cod_arq AS CHARACTER NO-UNDO.
DEFINE VARIABLE v_mtr_arq AS MEMPTR    NO-UNDO.
DEFINE VARIABLE v_lch_arq AS LONGCHAR  NO-UNDO.

ASSIGN v_dir_arq = "\\arpoador\Publico\"
       v_cod_arq = "layout_pagfor Sistema DDA.pdf".

COPY-LOB FROM FILE STRING(v_dir_arq + v_cod_arq) TO v_mtr_arq.
ASSIGN v_lch_arq = BASE64-ENCODE(v_mtr_arq).

oOutput = NEW JsonObject().
oOutput:ADD("filename", v_cod_arq).
oOutput:ADD("content",  v_lch_arq).
```

**Interfaces:**

IDownloadDataParams

| Nome | Tipo | Obrigatório | Descrição |
|-|-|-|-|
| fileName | string | Não | Nome do Arquivo. Caso não seja informado será usado o nome **"data.csv"**. |
| literals | any | Não | Objeto de Literais que será utilizado para tradução do Cabeçalho e do conteúdo dos campos do tipo Lógico. Nele, deverão existir literais que sejam iguais as propriedades da listagem. Por exemplo, se for uma listagem de Clientes, que possua uma propriedade chamada shortName, deverá existir uma literal com este nome. Também, deve existir as literais **"true"** e **"false"** para tradução dos campos lógicos. Caso não seja informado, o cabeçalho será gerado com os nomes das propriedades. |
| columnDelimiter | string | Não | Caracter utilizado para separação das colunas. Caso não seja informado, será utilizado o caracter **";"**. |
| columnList | Array(string) | Não | Lista das colunas que devem ser exportadas para o arquivo. As colunas serão exportadas na mesma ordem informada neste parâmetro. Caso não seja informada, serão exportadas todas as colunas da listagem. |
| columnExclude | Array(string) | Não | Lista das colunas que não devem ser exportadas para o arquivo. Caso não seja informada, serão exportadas todas as colunas da listagem. |
---

<br> 

## FilterRangeUtil

xxxx

<br> 

## GenericFunctionsUtils

xxxx

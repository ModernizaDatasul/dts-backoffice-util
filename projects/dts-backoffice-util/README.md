# Documentação dos Componentes e Utils

ÚLTIMA VERSÃO: **2.8.3 (16-11-2021)** **([**VER CHANGE LOG**](https://github.com/ModernizaDatasul/dts-backoffice-util/blob/master/projects/dts-backoffice-util/CHANGELOG.md))**

<br>

## Objetivo

Biblioteca que engloba diversos componentes e serviços utilizados no desenvolvimento HTML/Angular com PO-UI.

<br>

## Pré-Requisitos

**Instalação do Pacote:**

```
npm install dts-backoffice-util
```

<br> 

# Componentes e Serviços Disponíveis

<br>

# TranslateService 

**Objetivo:** Realizar o controle do idioma corrente, considerando o que estiver parametrizado no Cadastro de Usuários do Datasul, e caso não esteja informado, será considerado o idioma informado no Browse.

Importação:
```
import { TranslateService } from 'dts-backoffice-util';
```

Métodos:

| Nome | Descrição |
|-|-|
| getCurrentLanguage | Retorna o idioma corrente. Será considerado no primeiro momento a chave "user.language" do localStorage. Caso ela não exista ou seja inválida, será considerado o idioma parametrizado no Browse. Além disso, o idioma deve estar disponível na lista de suportados, conforme métodos "getSuportLanguage".<br>**Parâmetros:** Não há.<br>**Retorno:** string |
| getSuportLanguage | Retornar uma lista com os atuais idiomas suportados.<br>**Parâmetros:** Não há.<br>**Retorno:** Array(string) |
---

<br>

# dtsDateFormat

**Objetivo:** PIPE para formatar datas, ele foi criado pois o PIPE date do angular não consegue formatada datas inferiores a 1901.

**Importação:** No módulo de funcionalidade importar o módulo abaixo:
```
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
```
<po-info p-label="Data"
    [p-value]="date | dtsDateFormat : 'dd/MM/yyyy'">
</po-info>

<po-info p-label="Data"
    [p-value]="date | dtsDateFormat : 'MM/dd/yyyy'">
</po-info>
```

<br>

# MenuDatasulService 

**Objetivo:** Interagir com o Menu do Datasul.

Importação:
```
import { MenuDatasulService } from 'dts-backoffice-util';

constructor(public menuDatasulService: MenuDatasulService) {
}
```

Métodos:

| Nome | Descrição |
|-|-|
| callProgress | Executa uma tela Progress que esteja cadastrada no menu.<br>**Parâmetros:**<br>- program (object): Objeto com os seguintes atributos:<br>prg (string): Nome do programa no menu.<br>params (Array(object)): Array de Objetos de Parâmetros. O objeto possui dois atributos: "type" com o tipo de dado (character, integer, logical, etc...). E "value" com o conteúdo.<br>**Retorno:** Não há. |
| openPath | Executa uma tela PO-UI que esteja cadastrada no menu.<br>**Parâmetros:**<br>- programName (string): Nome interno do Programa, no cadastro de menu.<br>- params (string): Parâmetros que serão adicionados na URL.<br>- parent (boolean): Indica se a tela deve abrir na mesma Aba do Navegador (valor: **true**) ou em outra Aba do Navegador (valor: **false**). **Obs:** Quando a tela abrir na mesma Aba do Navegador, irá abrir em outra Aba do Menu do Datasul.<br>**Retorno:** Não há. |
| sendNotification | Apresenta uma notificação ao usuário.<br>**Parâmetros:**<br>- notification (object): Objeto com os seguintes atributos:<br>type (string): Tipo de notificação (success, warning, error).<br>title (string): Título da Notificação.<br>detail (string): Descrição da Notificação.<br>**Retorno:** Não há. |
---

Exemplo de uso:
```
program = { 
  prg: 'bas_lote_liquidac_acr',
  params: [
    { type: 'character', value: 'ABC' },
    { type: 'integer', value: '345' }
  ]
};
this.menuDatasulService.callProgress(program);

this.menuDatasulService.openPath('html.inquiryItem', '1509;10;1', true);

notification = { 
  type: 'success',
  title: 'Operação foi executada com Sucesso.',
  detail: 'A Operação 4343 foi executada conforme parametrizado e finalizou.'
};
this.menuDatasulService.sendNotification(notification);
```

<br>

# TotvsScheduleExecutionComponent

**Objetivo:** Componente para realização de agendamentos RPW.

**Dependências:** Para usar esse componente deve ser instalado no projeto o pacote rxjs-compat.<br/>
- **npm i rxjs-compat --save**

**Importação:** No módulo da aplicação importar o módulo abaixo:
```
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

No HTML usar da seguinte forma:
```
<app-totvs-schedule-execution 
  programName="pdapi701"
  externalName="pdp/pdapi701"
  programEMS5="false"
  programVersion=""
  [parameters]="parametersRpw"
  (endExecution)="endExecution($event)">
</app-totvs-schedule-execution>
```

**Definição no JavaScript:**
```
this.parametersRpw = [
    { chave: 'destino', valor: 2, tipo: 'integer' },
    { chave: 'arquivo', valor: '', tipo: 'character' },
    { chave: 'usuario', valor: 'FERNANDO', tipo: 'character' },
    { chave: 'perfil', valor: 880, tipo: 'integer' }
];
```
**Definição no Progress:**
```
DEFINE TEMP-TABLE tt-param NO-UNDO
    FIELD destino AS INTEGER
    FIELD arquivo AS CHARACTER
    FIELD usuario AS CHARACTER
    FIELD perfil AS INTEGER.
```
Parâmetros:

| Nome | Tipo | Obrigatório | Descrição |
|-|-|-|-|
| programName | string | Sim | Nome do Programa (nome no menu). |
| externalName | string | Sim | Nome completo do Programa, diretório + nome externo.<br>**Importante:** Em virtude do dicionário (Foundation), este parâmetro é limitado a 24 dígitos. |
| programEMS5 | boolean | Não | Indica se o programa progress é do EMS5. |
| programVersion | string | Não | Versão do programa progress. |
| parameters | Array | Sim | Objeto representando a Temp-Table que será enviada ao progress. |
| disabledParams | boolean | Não | Quando for igual a **"Sim"**, irá desabilitar todos os campos do Agendamento (Data Execução, Servidor, Repetir ocorrência, etc...). |
| loading | boolean | Não | Quando for igual a **"Sim"**, irá apresentar a tela de "loading" no momento da criação da agenda até o retorno do serviço. |
| endExecution | EventEmitter | Não | Evento que será disparado ao finalizar o agendamento. Ele irá enviar como parâmetro um objeto da interface **IScheduleParameters**, contendo os parâmetros informados pelo usuário. |

Métodos:

| Nome | Descrição |
|-|-|
| setScheduleParameters | Atualiza as informações de agendamento com base no objeto que foi enviado como parâmetro.<br>**Parâmetros:**<br>- schParam (**IScheduleParameters**): Objeto com as informações do agendamento (Data Execução, Servidor, Repetir ocorrência, etc...).<br>**Retorno:** Não há. |

Exemplo de Uso:

Em conjunto com o parâmetro **endExecution** o método **setScheduleParameters** pode ser utilizado para salvar e recuperar as informações de agendamento informadas pelo usuário.

```
- HTML -
<app-totvs-schedule-execution #schParam
  ...
  (endExecution)="endExecutionSchedule($event)">
</app-totvs-schedule-execution>

- TS -
@ViewChild('schParam', { static: true }) schParam: TotvsScheduleExecutionComponent;
...
scheduleParams: IScheduleParameters;
...
ngOnInit(): void {
  ...
  this.loadLocalStorage();
  this.schParam.setScheduleParameters(this.scheduleParams);
  ...
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

<br>

# TotvsScheduleExecutionService

**Objetivo:** Serviço que disponibiliza métodos para geração de agendamento e acompanhamento do RPW.

Métodos:

| Nome | Descrição |
|-|-|
| createExecutionForNow | Cria de forma simplificada (poucos parâmetros) um agendamento no RPW, para ser executado "agora" e sem repetição.<br>**Parâmetros:**<br>- executionParams (**IExecutionParameters**): Objeto com as informações necessárias para execução do agendamento (Servidor RPW, Programa a ser Executado, etc...).<br>- loading (boolean): Quando for igual a **"Sim"**, irá apresentar a tela de "loading" até finalizar a criação do agendamento.<br>**Retorno:** Objeto com as informações do Agendamento (Data de Criação, ID interno do Agendamento (**jobScheduleID**), etc...). |
| getExecutionByJobScheduleID | Retorna os dados e status de um agendamento com base no seu código interno: **JobScheduleID**.<br>**Parâmetros:**<br>- jobScheduleID (string): Código interno da agenda.<br>- loading (boolean): Quando for igual a **"Sim"**, irá apresentar a tela de "loading" até finalizar a busca do agendamento.<br>**Retorno:** response (Observable(IExecutionStatus)): Objeto com as informações do Agendamento (Data de Criação, ID interno do Agendamento (**jobScheduleID**), Número da Agenda (**executionID**) etc...).| 
| getExecutionByExecutionID | Retorna os dados e status de um agendamento com base no número da agenda: **executionID**.<br>**Parâmetros:**<br>- executionID (string): Número da agenda.<br>- loading (boolean): Quando for igual a **"Sim"**, irá apresentar a tela de "loading" até finalizar a busca do agendamento.<br>**Retorno:** response (Observable(IExecutionStatus)): Objeto com as informações do Agendamento (Data de Criação, ID interno do Agendamento (**jobScheduleID**), Número da Agenda (**executionID**) etc...).|
| followUpExcByJobScheduleID | Utilizado para acompanhar a execução do agendamento realizado no RPW, verificando o status da execução, até que ele seja finalizado.<br>**Parâmetros:**<br>- jobScheduleID (string): ID interno do Agendamento que se deseja acompanhar.<br>- intervalNum (number): Tempo em milisegundos para verificação do status do agendamento. Por exemplo, se for informado **5000**, será verificado o status do agendamento em 5 e 5 segundos até a execução terminar.<br>- fncCallBack (Function): Método que será executado após a tela receber o status da execução do agendamento. Ele será executado várias vezes até a execução terminar, no intervalo de tempo determinado no parâmetro **intervalNum**. Este método irá receber um objeto da interface **IExecutionStatus** com o status da execução. O método deverá retornar um valor **boolean** indicando se o processo deve continuar sendo monitorado ou não. Se for retornado "false", o agendamento não será mais monitorado. **Observação**: Isto não afeta a execução do agendamento no RPW, ele continuará executando normalmente.<br>- loading (boolean): Quando for igual a **"Sim"**, irá apresentar a tela de "loading" até finalizar o acompanhamento do agendamento.<br>**Retorno:** Não há. |
| followUpExcByExecutionID | Utilizado para acompanhar a execução do agendamento realizado no RPW, verificando o status da execução, até que ele seja finalizado.<br>**Parâmetros:**<br>- executionID (string): Número do Agendamento que se deseja acompanhar.<br>- intervalNum (number): Tempo em milisegundos para verificação do status do agendamento. Por exemplo, se for informado **5000**, será verificado o status do agendamento em 5 e 5 segundos até a execução terminar.<br>- fncCallBack (Function): Método que será executado após a tela receber o status da execução do agendamento. Ele será executado várias vezes até a execução terminar, no intervalo de tempo determinado no parâmetro **intervalNum**. Este método irá receber um objeto da interface **IExecutionStatus** com o status da execução. O método deverá retornar um valor **boolean** indicando se o processo deve continuar sendo monitorado ou não. Se for retornado "false", o agendamento não será mais monitorado. **Observação**: Isto não afeta a execução do agendamento no RPW, ele continuará executando normalmente.<br>- loading (boolean): Quando for igual a **"Sim"**, irá apresentar a tela de "loading" até finalizar o acompanhamento do agendamento.<br>**Retorno:** Não há. |
| getObjectByValue <br> getFilteredItems | Métodos utilizados pelo componente PO-LOOKUP. Desta forma, é possível utilizar o **TotvsScheduleExecutionService** para disponibilizar um lookup de Servidor de Execução RPW na tela. |

Exemplo de Uso:

Segue abaixo exemplos da geração de agendamento, busca e acompanhamento da execução.

```
- HTML -
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

- TS -
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
  execParam.programName = 'api_executa_carga_dados_carol';
  execParam.externalName = 'api_executa_carga_dados_carol';
  execParam.programEMS5 = true;
  execParam.programVersion = '1.00.00.001';
  execParam.businessParams = [
    { chave: 'cTipoCarga', valor: 'register', tipo: 'character' },
    { chave: 'lCargaTotal', valor: false, tipo: 'logical' },
    { chave: 'dDataCorte', valor: null, tipo: 'date' }
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

Interfaces:

IExecutionParameters
| Nome | Tipo | Obrigatório | Descrição |
|-|-|-|-|
| executionServer | string | Sim | Código do Servidor RPW. |
| programName | string | Sim | Nome do Programa (nome no menu). |
| externalName | string | Sim | Nome completo do Programa, diretório + nome externo.<br>**Importante:** Em virtude do dicionário (Foundation), este parâmetro é limitado a 24 dígitos. |
| programEMS5 | boolean | Não | Indica se o programa progress é do EMS5. |
| programVersion | string | Não | Versão do programa progress. |
| businessParams | Array | Não | Objeto representando a Temp-Table que será enviada ao progress. Ver exemplo do objeto **parametersRpw** no **TotvsScheduleExecutionComponent**. |

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

# ProfileService

**Objetivo:** Salvar preferências do usuário.

Importação:
```
import { ProfileService, IProfile } from 'dts-backoffice-util';

constructor(public preferenceService: ProfileService) {
}
```

Métodos:

| Nome | Descrição |
|-|-|
| setProfile | Salva informações no profile do usuário.<br>**Parâmetros:**<br>- profile (IProfile): Objeto com as informações do usuário e as informações serem salvas.<br>**Retorno:**<br>- response (Observable(any)): Retorno do BackEnd. |
| getProfileAsString | Retorna os valores salvos no formato de uma string.<br>**Parâmetros:**<br>- profile (IProfile): Objeto com as informações do usuário.<br>- showLoading (boolean): Indica se deve apresentar a tela de loading enquanto busca as informações.<br>**Retorno:**<br>- response (Observable(string)): Informações salvas. |
| getProfileAsJSON | Retorna os valores salvos no formato de um JSON.<br>**Parâmetros:**<br>- profile (IProfile): Objeto com as informações do usuário.<br>- showLoading (boolean): Indica se deve apresentar a tela de loading enquanto busca as informações.<br>**Retorno:**<br>- response (Observable(object)): Informações salvas. |
---

Interfaces:

IProfile
| Nome | Tipo | Obrigatório | Descrição |
|-|-|-|-|
| pageId | string | Sim | Um ID para identificar a Tela que está salvando os parâmetros. |
| userCode | string | Sim | Código do usuário (login). |
| dataCode | string | Sim | Um ID para identificar o parâmetro. | 
| dataValue | string | Não | Valor a ser salvo, nos GET's é opcional. |
---

Exemplo de Uso:
```
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

# UserLoginService

**Objetivo:** Retorna o login do usuário tanto no framework atual e quanto no novo framework.

Importação:
```
import { UserLoginService } from 'dts-backoffice-util';

constructor( public sessionService: UserLoginService) {
}
```

Métodos:

| Nome | Descrição |
|-|-|
| getUserLogin | Retorna o login do usuário.<br>**Parâmetros:** Não há.<br>**Retorno:**<br>- response (Observable(string)) |
---

Exemplo de Uso:
```
this.sessionService
  .getUserLogin()
  .subscribe((user) => {
  this.notification.success(`O usuário logado é ${user}`);
});
```

<br>

# ReportService

**Objetivo:** Faz a chamada do datasul-report e realiza o download do arquivo caso seja especificado.

Importação:
```
import { 
  ReportService, 
  IReportServiceParams, 
  ReportFormats
} from 'dts-backoffice-util';

constructor(public reportService: ReportService) {
}
```
Métodos:

| Nome | Descrição |
|-|-|
| generate | Retorna o arquivo binário gerado pelo datasul-report e faz o download do arquivo.<br>**Parâmetros:**<br>- params (IReportServiceParams): Parâmetros para execução do relatório.<br>- showLoading (boolean): Indica se deve apresentar a tela de loading enquanto busca as informações.<br>**Retorno:**<br>- response (Observable(Blob)) |
---

Interfaces:

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

Enums
```
declare enum ReportFormats {
    XLSX = "xlsx",
    PDF = "pdf",
    DOCX = "docx",
    HTML = "html"
}
```

Exemplo de Uso:
```
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

# BreadcrumbControlService 

**Objetivo:** Realiza a criação e controle do breadcrumb das telas.

Importação:
```
import { BreadcrumbControlService } from 'dts-backoffice-util';
```

Métodos:

| Nome | Descrição |
|-|-|
| newBreadcrumb | "Reinicia" o breadcrumb quando necessário. Ex: Telas que possuem menu lateral, ao passar de um menu para outro, o breadcrumb deve ser reiniciado.<br>**Parâmetros:** Não há.<br>**Retorno:** Não há. |
| addBreadcrumb | Adiciona um item ao breadcrumb, considerando a URL atual da tela.<br>**Parâmetros:**<br>- literal (string): Nome da tela que será apresentado no breadcrumb.<br>- activatedRoute (ActivatedRoute): ActivedRoute da tela.<br>**Retorno:** Não há. |
| addBreadcrumbURL | Adiciona um item ao breadcrumb, informando uma URL específica.<br>**Parâmetros:**<br>- literal (string): Nome da tela que será apresentado no breadcrumb.<br>- url (string): URL específica.<br>**Retorno:** Não há. |
| updBreadcrumbURL | Altera uma informação qualquer contida na URL do item informado.<br>**Parâmetros:**<br>- literal (string): Nome da tela que está no breadcrumb.<br>- valueOld (string): Valor a ser substituído.<br>- valueNew (string): Novo valor.<br>**Retorno:** Não há. |
| getBreadcrumb | Retorna o breadcrumb atual completo.<br>**Parâmetros:** Não há.<br>**Retorno:**<br>- breadcrumb (PoBreadcrumb) |
| getCurrentRouter | Retorna a URL do breadcrumb do item corrente.<br>**Parâmetros:** Não há.<br>**Retorno:**<br>- url (string) |
| getPrevRouter | Retorna a URL do breadcrumb do item anterior.<br>**Parâmetros:** Não há.<br>**Retorno:**<br>- url (string) |
| hasPreviousRouter | Indica se existe um item de breadcrumb anterior.<br>**Parâmetros:** Não há.<br>**Retorno:**<br>- exist (boolean) |
---

<br> 

# DateUtil

**Objetivo:** Manipula informações de data.

Importação:
```
import { DateUtil } from 'dts-backoffice-util';
```

Métodos:

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

# FileUtil

**Objetivo:** Auxílio na manipulação de Arquivos.

Importação:
```
import { FileUtil } from 'dts-backoffice-util';
```

Métodos:

| Nome | Descrição |
|-|-|
| downloadFile | Realiza o Download de um arquivo que foi enviado do backEnd.<br>**Parâmetros:**<br>- data (any): Conteúdo do Arquivo, podendo estar no formato Base64 ou Blob.<br>- fileName (string): Nome do Arquivo, podendo ser diferente do nome original. O valor informado, será o nome que o arquivo terá, quando for realizado o download.<br>- contentType (string): Tipo do Arquivo no formato [**MIME Type**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types). Este parâmetro é opcional, mas quando não informado, deve-se garantir que a extensão do arquivo, informado no nome do arquivo, esteja correta.<br>- base64 (boolean): Indica se o conteúdo do arquivo está no formato Base64. Se o parâmetro não for informado ou for igual a **"true"**, será considerado como Base64. Se for informado **"false"**, será considerado o formato Blob.<br>**Retorno:** não há. |
| downloadData | Realiza a criação e o download de um arquivo CSV gerado a partir de um listagem de dados (criada diretamente no FrontEnd ou retornada do BackEnd). Este método pode ser utilizado para, por exemplo, exportar os dados de um Grid.<br>**Parâmetros:**<br>- data (Array): Um Array com a listagem de dados, por exemplo, uma lista de clientes.<br>- dwldDataParam (IDownloadDataParams): Parâmetros de configuração do arquivo. Este parâmetro é opcional, caso ele não seja informado, serão assumidos valores padrões de configuração, conforme descrito na inteface **IDownloadDataParams**.<br>**Retorno:** não há. |
---

Exemplo de Uso:
```
-- JavaScript --

- TS da Tela -
import { FileUtil } from 'dts-backoffice-util';

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

- TS do Serviço -
getFile(id: string): Observable<Object> {
  const url = `/customer/${id}/file`;
  return this.http.get(url);
}

getQrCode(text: string): Observable<Blob> {
  const url = `/qrcode/download?text=${text}`;
  return this.http.get(url, { responseType: 'blob' });
}

-- Progress --

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

Interfaces:

IDownloadDataParams

| Nome | Tipo | Obrigatório | Descrição |
|-|-|-|-|
| fileName | string | Não | Nome do Arquivo. Caso não seja informado será usado o nome **"data.csv"**. |
| literals | any | Não | Objeto de Literais que será utilizado para tradução do Cabeçalho e do conteúdo dos campos do tipo Lógico. Nele, deverão existir literais que sejam iguais as propriedades da listagem. Por exemplo, se for uma listagem de Clientes, que possua uma propriedade chamada shortName, deverá existir uma literal com este nome. Também, deve existir as literais **"true"** e **"false"** para tradução dos campos lógicos. Caso não seja informado, o cabeçalho será gerado com os nomes das propriedades. |
| columnDelimiter | string | Não | Caracter utilizado para separação das colunas. Caso não seja informado, será utilizado o caracter **";"**. |
| columnList | Array(string) | Não | Lista das colunas que devem ser exportadas para o arquivo. As colunas serão exportadas na mesma ordem informada neste parâmetro. Caso não seja informada, serão exportadas todas as colunas da listagem. |
| columnExclude | Array(string) | Não | Lista das colunas que não devem ser exportadas para o arquivo. Caso não seja informada, serão exportadas todas as colunas da listagem. |

<br> 

# DisclaimerUtil

xxxx

<br> 

# FieldValidationUtil

xxxx

<br> 

# FilterRangeUtil

xxxx

<br> 

# GenericFunctionsUtils

xxxx

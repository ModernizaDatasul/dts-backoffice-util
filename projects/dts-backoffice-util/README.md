# Documentação dos Componentes e Utils

ÚLTIMA VERSÃO: **2.4.1 (31-03-2021)** **([**VER CHANGE LOG**](https://github.com/ModernizaDatasul/dts-backoffice-util/blob/master/projects/dts-backoffice-util/CHANGELOG.md))**

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
| callProgress | Executa uma tela Progress que esteja cadastrada no menu.<br>**Parâmetros:**<br>- program (object): Objeto com os seguintes atributos:<br>prg (string): Nome do programa no menu.<br>params (array(object)): Array de Objetos de Parâmetros. O objeto possui dois atributos: "type" com o tipo de dado (character, integer, logical, etc...). E "value" com o conteúdo.<br>**Retorno:** Não há. |
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
| programName | string | Sim | Nome da API. |
| externalName | string | Sim | Nome da API completo, pasta + nome.<br>**Importante:** Em virtude do dicionário (Foundation), este parâmetro é limitado a 24 dígitos. |
| programEMS5 | boolean | Não | Indica se o programa progress é do EMS5. |
| programVersion | string | Não | Versão do programa progress. |
| parameters | array | Sim | Objeto representando a Temp-Table que será enviada ao progress. |
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
| downladFile | Realiza o Download de um arquivo que foi enviado do backEnd.<br>**Parâmetros:**<br>- fileContent (any): Conteúdo do Arquivo no formato Base64.<br>- fileName (string): Nome do Arquivo, podendo ser diferente do nome original. O valor informado, será o nome que o arquivo terá, quando for realizado o download.<br>- contentType (string): Tipo do Arquivo no formato [**MIME Type**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types). Este parâmetro é opcional, mas quando não informado, deve-se garantir que a extensão do arquivo, informado no nome do arquivo, esteja correta.<br>**Retorno:** não há. |
---

Exemplo de Uso:
```
-- JavaScript --

import { FileUtil } from 'dts-backoffice-util';

this.servCustomer.getFile().subscribe((response: Object) => {

  FileUtil.downladFile(response['content'], response['filename']);

});

-- Progress --

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

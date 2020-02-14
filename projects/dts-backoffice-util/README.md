## Changelog

**0.0.18 (14-02-2020):** 

Ajuste no serviço **disclaimer.util.ts** para possibilitar a tradução do value no **makeDisclaimerFromMultiSelect**. Foi incluido um novo parâmetro **tradValue** para indicar se deve ou não ser traduzido.
Para tradução o value deve estar no literals que foi enviado para o serviço


**0.0.17 (03-02-2020):** 

Arquivo css para aplicar estilo TOTVS no Kendo Grid

Para utilizado deve ser importado o CSS no angular.json, conforme abaixo

```

"styles": [
  "node_modules/@totvs/portinari-theme/css/po-theme-default.min.css",
  "node_modules/@progress/kendo-theme-default/dist/all.css",
  "node_modules/dts-backoffice-util/lib/css/kendo.min.css",
  "src/styles.css"
],
```

**0.0.16 (03-02-2020):** 

Ajustes documentação

**0.0.15 (03-02-2020)**

Correção no **ReportService:** Realizado ajuste para a impressão funciona no novo framework

**0.0.14 (31-01-2020)**

Correção no **TotvsScheduleExecutionComponent:** Adicionando o "zero" na frente da hora que forem menor que 10

**0.0.13 (30-01-2020)**

**dtsDateFormat:** PIPE para formatar datas, ele foi criado pois o PIPE date do angular não consegue formatada datas inferiores a 1901.

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

**openPath:** Função openPath criada para abrir telas em nova aba do Datasul.
| Nome  |  Parâmetros  | Resultado |
| ------------ | -------------- |--- |
| openPath  | programName Parameters OpenParent| Abre a tela em uma nova aba do Datasul|

Importação:
```
import { MenuDatasulService } from 'dts-backoffice-util';

constructor(public menuDatasulService: MenuDatasulService) {
}
```

Exemplo de uso:
```
this.menuDatasulService
    .openPath('html.inquiryItem', '1509;10;1', true);
```

**0.0.12 (28-01-2020)**

**TotvsScheduleExecutionComponent:** Componente para realização de agendamentos RPW.

**Dependências:** Para usar esse componente deve ser instalado no projeto o pacote rxjs-compat. <br/>
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
  parameters="parametersRpw"
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

| Nome  |  Tipo | Descrição |
| ------------ | --- | ------------ |
| programName | String | Nome da API|
| externalName | String | Nome da API completo, pasta + nome |
| parameters | Array | Objeto representando a Temp-Table que será enviada ao progress |
| endExecution | EventEmitter```<boolean>``` | Evento que será emitido ao finalizar o agendamento |
**0.0.11 (24-01-2020)**

Primeira versão, serviços disponíveis:
- breadcrumb-control.service
- cache-params.service
- menu-datasul.service
- profile.service
- report.service
- session-info.service
- date.util
- disclaimer.util
- field-validation.util
- filter-range.util
- generic-functions.utils


**Profile Service**

Salvar preferências do usuáro.

Importação:
```
import { ProfileService, IProfile } from 'dts-backoffice-util';

constructor(public preferenceService: ProfileService) {
}

```

Exemplo de Uso:
```
const profile: IProfile = {
	dataCode: 'preference',
	pageId: 'about-component',
	dataValue: this.preference,
	userCode: 'super'
};

this.preferenceService.setProfile(profile)
                      .subscribe((response) => {
	this.notification.success('Preferência salva com sucesso!');
}, (error) => {
	this.notification.error('Não foi possível salvar a preferência');
});
```

Métodos:

| Nome  |  Parâmetros  | Resultado |
| ------------ | ------------ |--- |
| setProfile  | IProfile | Nenhum resultado, erros devem ser tratados|
| getProfileAsString  | IProfile <br/> showLoading  | Retorna o valor salvo como uma string  |
| getProfileAsJSON  | IProfile <br/> showLoading  | Retorna o valor salvo como um objeto (JSON) |

Interface
| Nome  |  Tipo  | Obrigatório| Descrição |
| ------------ |--------| ------------ |--- |
| pageId | string | Sim | Código da página |
| dataCode | string | Sim | Código do parâmetro | 
| userCode | string | Sim | Código do usuário (login) |
| dataValue | string | Não | Valor a ser salvo, nos GET'S é opcional |

---

**UserLoginService**

Retorna o login do usuário tanto no framework atual e quanto no novo framework.

Importação:
```
import { UserLoginService } from 'dts-backoffice-util';

constructor( public sessionService: UserLoginService) {
}
```
Exemplo de Uso:
```
this.sessionService.getUserLogin().subscribe((user) => {
	this.notification.success(`O usuário logado é ${user}`);
});
```
Métodos:

| Nome  |  Parâmetros  | Resultado |
| ------------ | ------------ |--- |
| getUserLogin  |  | Retorna um Observable<String> com o login do usuário|

---

**ReportService**

Faz a chamada do datasul-report e realiza o download do arquivo caso seja especificado.

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
Exemplo de Uso:
```
const properties: Array<IProperty> = [
  { name: 'custom.quick_search', 
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

this.reportService.generate(params).subscribe(() => {
	this.notification.error("Arquivo baixado com sucesso!");
}, () => {
	this.notification.error("Não foi possível baixar o arquivo");
});
```
Métodos:

| Nome  |  Parâmetros  | Resultado |
| ------------ | ------------ |--- |
| generate  | IReportServiceParams, showLoading (opcional): boolean | Retorna o arquivo binário gerado pelo datasul-report e faz o download do arquivo |

---

Interfaces

ReportServiceParams

| Nome  |  Tipo  | Obrigatório| Descrição |
| ------------ |--------| ------------ |--- |
| reportName | string | Sim | Nome do arquivo .rptDesign |
| programName | string | Sim | Nome do programa progress | 
| properties | Array<IProperty> | Sim | Lista de parâmetros que serão enviados ao progress |
| dialect | string | Sim | Idioma do usuário |
| downloadName | string | Sim | Nome que será dado ao arquivo de download |
| download | boolean | Sim | O download deve ser efetuado |
| format | ENum - ReportFormats | Sim | Formato do Arquivo (XLSX, PDF, DOCX ou HTML) |

IProperty

| Nome  |  Tipo  | Obrigatório | Descrição |
| ------------ |--------| ------------ |--- |
| name | string | Sim | Nome do parâmetro |
| value | string | Sim | Vaor do parâmetro |

Enums
```
declare enum ReportFormats {
    XLSX = "xlsx",
    PDF = "pdf",
    DOCX = "docx",
    HTML = "html"
}
```
---

**BreadcrumbControlService** 

Realiza a criação e controle do breadcrumb das telas.

Importação:
```
import { BreadcrumbControlService } from 'dts-backoffice-util';
```


Métodos:

| Nome  |  Parâmetros  | Resultado |
| ------------ | ------------ |--- |
| newBreadcrumb  |  | Cria um novo breadcrumb e armazena no contexto do serviço |
| addBreadcrumb  | literal: string <br/> activatedRoute: ActivatedRoute | Adiciona um novo item ao breadcrumb do contexto do serviço |
| addBreadcrumbURL  | literal: string <br/> url: string  | Adiciona um novo item ao breadcrumb do contexto do serviço |
| updBreadcrumbURL  | literal: string <br/> valueOld: string <br/> valueNew: string  | Alterar o breadcrumb do contexto do serviço  |
| getBreadcrumb  |  | Retorna breadcrumb do contexto do serviço |
| getCurrentRouter  |  |  |
| getPrevRouter  |  |  |
| hasPreviousRouter  |  |  |

--- 

**DateUtil**

Manipula informações de data.

Importação:
```
  import { DateUtil } from 'dts-backoffice-util';
```

Métodos:

| Nome  |  Parâmetros  | Resultado |
| ------------ | ------------ |--- |
| dateToQueryParam | date: Date | Transforma data para o padrão YYYY-MM-DD |
| queryParamToDate | param: string | Transforma data no padrão YYYY-MM-DD para DATE |
| isValidDate | date: Date | Valida se foi informado uma data válida |
| ajustDate | param: any | Ajusta a data retornando o padrão DATE |
| ajustDateToModel | values: Object <br/> fieldName: string | Ajusta a data para o padrão DATE - utilizada nos construtores dos modelos |
| pad | number: Number |  Adicona zero a esquerda do número |

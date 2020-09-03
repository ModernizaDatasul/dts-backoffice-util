# Documentação dos Componentes e Utils

ÚLTIMA VERSÃO: **2.0.4 (02-09-2020)** **([**VER CHANGE LOG**](https://github.com/ModernizaDatasul/dts-backoffice-util/blob/master/projects/dts-backoffice-util/CHANGELOG.md))**

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

# openPath 

**Objetivo:** Função openPath criada para abrir telas em nova aba do Datasul.
| Nome | Parâmetros | Descrição |
| ------------ | -------------- |--- |
| openPath  | programName Parameters OpenParent | Abre a tela em uma nova aba do Datasul |

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

<br>

# TotvsScheduleExecutionComponent

**Objetivo:** Componente para realização de agendamentos RPW.

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
| - | - | - | - |
| programName | string | Sim | Nome da API |
| externalName | string | Sim | Nome da API completo, pasta + nome |
| programEMS5 | boolean | Não | Indica se o programa progress é do EMS5 |
| programVersion | string | Não | Versão do programa progress |
| parameters | array | Sim | Objeto representando a Temp-Table que será enviada ao progress |
| endExecution | EventEmitter | Não | Evento que será emitido ao finalizar o agendamento |

<br>

# Profile Service

**Objetivo:** Salvar preferências do usuáro.

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

| Nome | Parâmetros | Descrição |
| ------------ | ------------ |--- |
| setProfile | IProfile | Nenhum resultado, erros devem ser tratados |
| getProfileAsString | IProfile <br/> showLoading | Retorna o valor salvo como uma string  |
| getProfileAsJSON | IProfile <br/> showLoading | Retorna o valor salvo como um objeto (JSON) |

Interface
| Nome | Tipo | Obrigatório | Descrição |
| ------------ | -------- | ------------ | --- |
| pageId | string | Sim | Código da página |
| dataCode | string | Sim | Código do parâmetro | 
| userCode | string | Sim | Código do usuário (login) |
| dataValue | string | Não | Valor a ser salvo, nos GET's é opcional |

<br>

# UserLoginService

**Objetivo:** Retorna o login do usuário tanto no framework atual e quanto no novo framework.

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

| Nome  |  Parâmetros  | Descrição |
| ------------ | ------------ |--- |
| getUserLogin |  | Retorna um Observable<String> com o login do usuário |

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

<br>

# BreadcrumbControlService 

**Objetivo:** Realiza a criação e controle do breadcrumb das telas.

Importação:
```
import { BreadcrumbControlService } from 'dts-backoffice-util';
```

Métodos:

| Nome  |  Parâmetros  | Descrição |
| ------------ | ------------ |--- |
| newBreadcrumb | | "Reinicia" o breadcrumb quando necessário. Ex: Telas que possuem menu lateral, ao passar de um menu para outro, o breadcrumb de ser reiniciado. |
| addBreadcrumb | INPUT: literal (string) <br> INPUT: activatedRoute (ActivatedRoute) | Adiciona um item ao breadcrumb, considerando a URL atual da tela. |
| addBreadcrumbURL | INPUT: literal (string) <br> INPUT: url (string) | Adiciona um item ao breadcrumb, informando uma URL específica. |
| updBreadcrumbURL | INPUT: literal (string) <br> INPUT: valueOld (string) <br> INPUT: valueNew (string) | Altera uma informação qualquer, contida na URL do item informado. |
| getBreadcrumb | OUTPUT: breadcrumb (PoBreadcrumb) | Retorna o breadcrumb atual completo. |
| getCurrentRouter | OUTPUT: url (string) | Retorna a URL do breadcrumb do item corrente. |
| getPrevRouter | OUTPUT: url (string) | Retorna a URL do breadcrumb do item anterior. |
| hasPreviousRouter | OUTPUT: exist (boolean) | Indica se existe um item de breadcrumb anterior. |

<br> 

# DateUtil

**Objetivo:** Manipula informações de data.

Importação:
```
  import { DateUtil } from 'dts-backoffice-util';
```

Métodos:

| Nome  |  Parâmetros  | Descrição |
| ------------ | ------------ |--- |
| dateToQueryParam | date: Date | Transforma data para o padrão YYYY-MM-DD |
| queryParamToDate | param: string | Transforma data no padrão YYYY-MM-DD para DATE |
| isValidDate | date: Date | Valida se foi informado uma data válida |
| ajustDate | param: any | Ajusta a data retornando o padrão DATE |
| ajustDateToModel | values: Object <br/> fieldName: string | Ajusta a data para o padrão DATE - utilizada nos construtores dos modelos |
| pad | number: Number |  Adicona zero a esquerda do número |

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

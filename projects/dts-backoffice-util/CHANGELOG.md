# Changelog

**2.1.1 / 2.1.2 (09-11-2020):**

Correção:
- **openPath** - Corrigido para abrir as telas PO-UI corretamente no Novo FrameWork (Tomcat). 

**2.1.0 (07-10-2020):**

Melhorias:
- **GenericFunctionsUtils** - Incluído o método **"focusInternalInput"**, para dar foco a um campo do PO-UI quando ele está em um Modal, ou não está disponível na abertura da tela (quando não é possível utilizar o @ViewChild).

**2.0.8 / 2.0.9 (02-10-2020):**

Documentação:
- Ajustes documentação.

**2.0.5 / 2.0.6 / 2.0.7 (29-09-2020):**

Melhorias:
- **TranslateService** - Criação do serviço, para realização o controle do idioma.

**2.0.4 (02-09-2020):**

Documentação:
- Ajustes documentação.

**2.0.3 (13-06-2020):**

Correções:
- **DisclaimerUtil** - Ajuste no método **"atzBooleanFromDisclamer"**, para retornar um valor **verdadeiramente boolean**. Em alguns casos, retornava uma string com "true" ou "false". Assim o componente **"po-switch"** não funciona corretamente.  

**2.0.1 / 2.0.2 (15-05-2020):**

Melhorias:
- **TotvsScheduleExecutionComponent**<br>- Inclusão do atributo (opcional) **"programEMS5"**: Indica que o programa a ser executado é do EMS5.<br>- Inclusão do atributo (opcional) **"programVersion"**: Indica a versão do programa progress a ser executado.<br>- Alterado o parâmetro **"endExecution"**: Para ser um função (e não boolean). Será disparada a função depois que retornar do serviço de agendamento.<br>- Incluída a opção de Recorrência **"Mensal"** (Agora temos: Diária, Semanal e Mensal).<br>- Incluída a opção de **"Frequência"**, permitido que a execução seja repetida várias vezes no mesmo dia (quando for Recorrência).

**2.0.0 (12-04-2020):**

Melhorias:
- ATUALIZAÇÃO: **PO-UI v2** E **ANGULAR 9**.

**0.0.22 (01-04-2020):**

Melhorias:
- Repasse da biblioteca.

**0.0.20 / 0.0.21 (19-03-2020):** 

Correções:
- **ReportService:**<br>- Ajuste no nome do arquivo de download, não estava respeitando o parâmetro enviado.<br>- Ajuste na montagem da URL, não estava mandando & quando havia mais de um parâmetro.

**0.0.19 (18-03-2020):** 

Correções:
- **TotvsScheduleExecutionComponent** - A hora da execução estava indo com a data errada, não respeitando o que era informado em tela.      

**0.0.18 (14-02-2020):** 

Melhorias:
- **DisclaimerUtil** - Ajuste no método **makeDisclaimerFromMultiSelect**, para possibilitar a tradução do value. Foi incluído um novo parâmetro **tradValue** para indicar se deve ou não ser traduzido. Para tradução o value deve estar no literals que foi enviado para o serviço.

**0.0.16 / 0.017 (03-02-2020):** 

Documentação:
- Ajustes documentação.

**0.0.15 (03-02-2020):**

Correções:
- **ReportService** - Realizado ajuste para a impressão funciona no novo framework.

**0.0.14 (31-01-2020):**

Correções:
- **TotvsScheduleExecutionComponent** - Adicionando o "zero" na frente da hora que forem menor que 10.

**0.0.13 (30-01-2020):**

Melhorias:
- **dtsDateFormat** - Criação do componente, para formatação de Data.
- **MenuDatasulService** - Criação do método **openPath**, para abrir telas em nova aba do Datasul.

**0.0.12 (28-01-2020):**

Melhorias:
- **TotvsScheduleExecutionComponent** - Criação do componente, para realização de agendamentos RPW.

**0.0.11 (24-01-2020):**

Melhorias:<br>
- **Primeira versão** - Serviços disponíveis:
<br>- breadcrumb-control.service
<br>- cache-params.service
<br>- menu-datasul.service
<br>- profile.service
<br>- report.service
<br>- session-info.service
<br>- date.util
<br>- disclaimer.util
<br>- field-validation.util
<br>- filter-range.util
<br>- generic-functions.utils

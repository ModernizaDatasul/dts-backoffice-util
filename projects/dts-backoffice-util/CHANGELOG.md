# Changelog

**2.0.4 (02-09-2020):**

Atualiação de Documentação.

**2.0.3 (13-06-2020):**

Ajuste do método **"atzBooleanFromDisclamer"** do **DisclaimerUtils** para retornar um valor **verdadeiramente boolean**. Em alguns casos, retornava uma string com "true" ou "false". Assim o componente **"po-switch"** não funciona corretamente.  

**2.0.1 / 2.0.2 (15-05-2020):**

Ajustes no componente **TotvsScheduleExecutionComponent**:
- Inclusão do atributo (opicional) **"programEMS5"**: Indica que o programa a ser executado é do EMS5.
- Inclusão do atributo (opicional) **"programVersion"**: Indica a versão do programa progress a ser executado.
- Alterado o parâmetro **"endExecution"**: Para ser um função (e não boolean). Será disparada a função depois que retornar do serviço de agendamento.
- Incluída a opção de Recorrência **"Mensal"** (Agora temos: Diária, Semanal e Mensal);
- Incluída a opção de **"Frequência"**, permitido que a execução seja repetida várias vezes no mesmo dia (quando for Recorrência).

**2.0.0 (12-04-2020):**

ATUALIZAÇÃO: **PO-UI v2** E **ANGULAR 9**.

**0.0.22 (01-04-2020):**

Repasse da biblioteca.

**0.0.20 / 0.0.21 (19-03-2020):** 

Correção no **ReportService:**
- Ajuste no nome do arquivo de download, não estava respeitando o parâmetro enviado.
Correção no **ReportService:**
- Ajuste na montagem da URL, não estava mandando & quando havia mais de um parâmetro.

**0.0.19 (18-03-2020):** 

Correção no **TotvsScheduleExecutionComponent:** A hora da execução estava indo com a data errada, não respeitando o que era informado em tela.      

**0.0.18 (14-02-2020):** 

Ajuste no serviço **disclaimer.util.ts** para possibilitar a tradução do value no **makeDisclaimerFromMultiSelect**. Foi incluido um novo parâmetro **tradValue** para indicar se deve ou não ser traduzido.
Para tradução o value deve estar no literals que foi enviado para o serviço

**0.0.16 / 0.017 (03-02-2020):** 

Ajustes documentação.

**0.0.15 (03-02-2020):**

Correção no **ReportService:** Realizado ajuste para a impressão funciona no novo framework.

**0.0.14 (31-01-2020):**

Correção no **TotvsScheduleExecutionComponent:** Adicionando o "zero" na frente da hora que forem menor que 10.

**0.0.13 (30-01-2020):**

Criação dos componentes:
- **dtsDateFormat:** para formatação de Data.
- **openPath:** para abrir telas em nova aba do Datasul.

**0.0.12 (28-01-2020):**

Criação do componente **TotvsScheduleExecutionComponent**, para realização de agendamentos RPW.

**0.0.11 (24-01-2020):**

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

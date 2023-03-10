# Changelog

**5.0.0 / 5.0.1 (13-06-2022):**

Melhorias:
- ATUALIZAÇÃO: **PO-UI v5** E **ANGULAR 12**.

**4.0.0 (10-06-2022):**

Melhorias:
- ATUALIZAÇÃO: **PO-UI v4** E **ANGULAR 11**.

**3.0.0 (10-06-2022):**

Melhorias:
- ATUALIZAÇÃO: **PO-UI v3** E **ANGULAR 10**.

**2.8.1 / 2.8.2 (16-11-2021):**

Melhorias:
- **FileUtil**<br>- No método **downloadFile** foi incluído o parâmetro "base64" (boolean) para indicar se o conteúdo recebido do backEnd está no formato base64 ou Blob.<br>- No método **downloadData**, caso seja informado o parâmetro **IDownloadDataParams.columnList**, indicando as colunas a serem exportadas, o método irá respeitar a ordem informada dos campos, desta forma, as colunas estarão na mesma ordem no arquivo.

**2.8.0 (13-10-2021):**

Melhorias:
- **TotvsScheduleExecutionService**<br>- Novos métodos para consulta do status atual da agenda: Pelo jobScheduleID - Id Interno (**getExecutionByJobScheduleID**) ou executionID - Número da Agenda (**getExecutionByExecutionID**).<br>- O método para acompanhamento de execução (**followUpExecution**) foi substituído por dois novos métodos, onde é possível indicar, a partir de que código deve ser feito o acompanhamento: Pelo jobScheduleID - Id Interno (**followUpExcByJobScheduleID**) ou executionID - Número da Agenda (**followUpExcByExecutionID**).

Breaking Changes:
- Método **followUpExecution** - Renomeado para **followUpExcByJobScheduleID**. Os parâmetros e o comportamento do método, continuam os mesmos.

**2.7.0 (06-09-2021):**

Melhorias:
- **FileUtil** - Novo método **downloadData** que realiza a criação e o download de um arquivo CSV gerado a partir de um listagem de dados (criada diretamente no FrontEnd ou retornada do BackEnd). Este método pode ser utilizado para, por exemplo, exportar os dados de um Grid.

**2.6.0 (30-08-2021):**

Melhorias:
- **TotvsScheduleExecutionService** - Novo serviço que possibilita criar, de forma simplificada, agendamentos que serão executados "agora" no RPW, via código (sem tela). E também um método que permite "monitorar" a execução do agendamento, verificando o status da execução, até que ele seja finalizado.

**2.5.0 / 2.5.1 (20-08-2021):**

Correção:
- **TotvsScheduleExecutionComponent** - Em algumas momentos, ao selecionar a opção "Repetir ocorrência?", quando o campo "Hora Início" era apresentado, o conteúdo ficava "piscando" e não era possível editar o valor.

Melhorias:
- **TotvsScheduleExecutionComponent** - O campo "Servidor de Execução" utilizava o componente de "combo" para selecionar o servidor. Ele foi alterado para utilizar o componente de "lookup", desta forma, passa a ter um "Zoom" onde o usuário pode visualizar/filtrar/selecionar o servidor desejado. 

**2.4.1 (31-03-2021):**

Melhorias:
- **TotvsScheduleExecutionComponent** - Incluído um novo parâmetro chamado **loading** para indicar que, ao executar a criação da agenda, a tela seja travada até o retorno do serviço.

**2.4.0 (25-03-2021):**

Melhorias:
- **DisclaimerUtil** - Incluído o método **makeDisclaimerFromMultiSelectNumber**, para geração de Disclaimer a partir de um Multi-Select, onde o Label é uma String, mas o valor é um número. Desta forma, quando incluído no Filtro, irá apresentar os Labels, mas internamente irá guardar os valores numéricos.

**2.3.0 / 2.3.1 (17-03-2021):**

Melhorias:
- **TotvsScheduleExecutionComponent**<br>- Para busca do Servidor RPW, passa a utilizar o endPoint oficial do framework (/dts/datasul-rest/resources/prg/btb/v1/servidoresExecucao).<br>- Novo parâmetro: **"disabledParams"**, utilizado para habilitar/desabilitar as informações do agendamento (Data Execução, Servidor, Repetir ocorrência, etc...).<br>- Novo método: **"setScheduleParameters"**, utilizado para enviar as informações do agendamento, que serão apresentadas na tela. Isto para, por exemplo, apresentar a última configuração realizada pelo usuário.<br>- Alterado o parâmetro **"endExecution"**, para enviar as informações do agendamento quando for disparado o método informado nele. Isto para, por exemplo, salvar as informações digitadas pelo usuário.<br>- Nova interface: **"IScheduleParameters"**, que descreve as informações recebidas no método **"setScheduleParameters"** e enviadas no método informado no parâmetro **"endExecution"**.

**2.2.1 (13-11-2020):**

Correção:
- **TotvsScheduleExecutionComponent** - Correção da mensagem de finalização do Agendamento, para: 'Agendamento realizado com sucesso !'.

**2.2.0 (10-11-2020):**

Melhorias:
- **FileUtil** - Nova biblioteca para controle de Arquivo, onde foi disponibilizado o método **downloadFile** para realizar o download de Arquivos provenientes do BackEnd.

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

/**
 * @usedBy DtsKendoGridComponent
 *
 * @description
 *
 * Interface para definição das colunas do dts-kendo-grid.
 */

interface DtsLabel {
    value: string | number;
    label: string;
    color: string;
    tooltip: string;
}

export interface DtsKendoGridColumn {
    /**
     * Nome do atributo do JSON passado no atributo "t-data" do componente
     * que representerá o valor a ser exibido na coluna.
     */
    column: string;

    /** Nome da coluna a ser exibido na tabela. */
    label: string;

    /** Tamanho da coluna em pixels. */
    width?: number;


    /**
     * Informa se a coluna está agrupada.
     *
     * Ao iniciar o Totvs Grid com essa propriedade setada como `true`, a coluna iniciará agrupada automaticamente,
     * por padrão todas as colunas vem desagrupadas (`false`).
     *
     * Importante: Para agrupar uma coluna é necessário que a propriedade `t-groupable` do componente Totvs Grid esteja setada como
     * `true`, caso contrário, esta configuração será ignorada.
     */
    groupHeader?: boolean;

    /** Se for passado "true" é habilitado o componente checkbox na coluna. */
    checkbox?: boolean;

    /** Se for passado o valor "true" é habilitado o campo de edição no modo edição habilitado. */
    editable?: boolean;

    /** Se for passado o valor "true" o campo se torna obrigatório no modo edição habilitado. */
    required?: boolean;

    /**
     * Define o tipo de campo em modo de edição. Valores válidos:
     *
     * - **`string` (padrão)**: campo do tipo texto;
     * - **`number`**: campo do tipo numérico;
     * - **`date`**: campo do tipo date;
     * - **`currency`**: campo do tipo monetário.
     * - **`label`**: campo do tipo label.
     */
    type?: string;

    /**
     * Formata os dados da coluna de acordo com o tipo. Segue abaixo exemplos de preenchimento:
     *
     * - **Formato para data (`date`)**: aceita apenas os caracteres de dia(dd), mês(MM ou mm) e ano (yyyy ou yy),
     * valor padrão é 'dd/MM/yyyy'. Exemplos: 'dd/MM/yyyy', 'dd-MM-yy', 'mm/dd/yyyy'.
     */
    format?: string;

    labels?: Array<DtsLabel>;
}


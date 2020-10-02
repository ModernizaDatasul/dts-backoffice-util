/**
 * @usedBy DtsKendoGridComponent
 *
 * @description
 *
 * Interface para definição das colunas do dts-kendo-grid.
 */

 export interface DtsLabel {
    value: string | number;
    label: string;
    color: string;
    tooltip?: string;
}

export interface DtsKendoGridColumn {
    /** Nome do atributo do JSON passado no atributo "d-data" do componente. */
    column: string;

    /** Nome da coluna a ser exibido na tabela. */
    label: string;

    /**
     * Define o tipo da coluna. Os Tipos válidos são:
     * - **`string` (padrão)**: Campo do tipo texto.
     * - **`number`**: Campo do tipo numérico.
     * - **`currency`**: Campo do tipo monetário.
     * - **`boolean`**: Campo do tipo lógico.
     * - **`date`**: Campo do tipo data.
     * - **`label`**: Campo do tipo label (apresenta uma TAG).
     * - **`subtitle`**: Campo do tipo label (apresenta uma lista de TAG's).
     */
    type?: string;

    /** Formata os dados da coluna de acordo com o tipo. */
    format?: string;

    /** Tamanho da coluna em pixels. */
    width?: number;

    /** Se definido e igual a "true", campos do tipo 'boolean' são apresentado como checkbox, senão, apresenta como texto (Sim/Não). */
    checkbox?: boolean;

    /** Moeda utilizada para formatar campos do tipo 'currency' usando o Currency PIPE (https://angular.io/api/common/CurrencyPipe). */
    currency?: string;

    /** Formato utilizada para formatar campos do tipo 'currency' usando o Currency PIPE (https://angular.io/api/common/CurrencyPipe). */
    symbol?: string;

    /** Lista de valores que devem ser exibidos quando o tipo é label ou subtitle. O objeto da lista utiliza a interface DtsLabel. */
    labels?: Array<DtsLabel>;

    /** Indica se o campo deve ser hablitado para edição. O parâmetro "d-editable" do Grid deve ser igual a "true". */
    editable?: boolean;

    /** Indica se o campo é obrigatório na edição. Os parâmetros "editable" (coluna) o "d-editable" (Grid) devem ser igual a "true". */
    required?: boolean;

    /** Indica se a coluna deve ser agrupada na inicialização. O parâmetro "d-groupable" do Grid deve ser igual a "true". */
    groupHeader?: boolean;

    /** Indica se a coluna está visível ou não */
    visible?: boolean;
}

export interface DtsEditAction {
    addAction?: Function;
    saveAction?: Function;
}

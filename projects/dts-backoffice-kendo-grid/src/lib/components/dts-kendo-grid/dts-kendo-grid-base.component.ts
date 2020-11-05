// tslint:disable: variable-name
// tslint:disable: no-input-rename
// tslint:disable: no-output-rename
// tslint:disable: directive-class-suffix
import { Input, EventEmitter, Output, Directive } from '@angular/core';
import { DtsKendoGridColumn, DtsEditAction, DtsColumnConfigView } from './dts-kendo-grid-column.interface';

/**
 * @description
 *
 * O componente `dts-kendo-grid` é utilizado para desenvolver tabelas mais complexas como as funcionalidades
 * de classificação de dados, adição e remoção de linhas e edição de dados *"in line"*.
 *
 * **Boas práticas:**
 *
 * - Importe o `DtsKendoModule` apenas nos módulos em que ele será realmente utilizado.
 *
 * **Utilização:**
 *
 * Realize a instalação do *package* `@totvs/dts-kendo` em sua aplicação.
 *
 * ```
 * npm i --save @totvs/dts-kendo
 * ```
 *
 * Adicione o módulo `DtsKendoModule` em seu projeto.
 *
 * > Para o correto funcionamento do DTS Grid, deve ser importado o módulo `BrowserAnimationsModule` no módulo principal da sua aplicação.
 *
 * ```
 * import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 *
 * import { DtsKendoModule } from '@totvs/dts-kendo';
 * ...
 *
 * @NgModule({
 *   imports: [
 *     BrowserModule,
 *     BrowserAnimationsModule,
 *     ...
 *     DtsKendoModule,
 *     ...
 *   ],
 *   declarations: [
 *     AppComponent
 *   ],
 *   providers: [],
 *   bootstrap: [AppComponent]
 * })
 * export class AppModule { }
 * ```
 *
 * No arquivo `angular.json` da sua aplicação você deve importar o arquivo `all.css` que contém o tema padrão do `kendo-grid` e
 * o arquivo `dts-theme-default.min.css` com as personalizações do `DTS`.
 *
 * ```
 * ...
 * "styles": [
 *   "node_modules/@progress/kendo-theme-default/dist/all.css",
 *   "node_modules/@totvs/dts-theme/css/dts-theme-default.min.css"
 * ]
 * ...
 * ```
 *
 * > É importante seguir essa ordem para que o tema padrão do `kendo-grid` seja sobreposto pelo tema personalizado do `DTS`.
 */
@Directive()
export abstract class DtsKendoGridBaseComponent {

    /** Objetos com as informações das colunas a serem exibidas. */
    public columnsOrig: Array<DtsKendoGridColumn>;
    public columns: Array<DtsKendoGridColumn>;
    @Input('d-columns') set dColumns(columns: Array<DtsKendoGridColumn>) {
        this.columnsOrig = columns ? columns : [];
        this.columns = JSON.parse(JSON.stringify(this.columnsOrig));
        this.initializeColumns();
    }

    /** Informações que serão apresentadas no Grid. */
    @Input('d-data') data: Array<any>;

    /** Habilitar ou desabilitar o botão "Carregar Mais Resultados". */
    @Input('d-show-more-disabled') showMoreDisabled = 'false';

    /** Habilita a ordenação da coluna ao clicar no cabeçalho. */
    private _sortable: boolean;
    @Input('d-sortable') set sortable(sortable: boolean) {
        this._sortable = sortable != null && sortable.toString() === '' ? true : this.convertToBoolean(sortable);
    }
    get sortable() {
        return this._sortable;
    }

    /** Habilita a opção de filtro nas colunas do Grid. */
    @Input('d-filterable') filterable = false;

    /** Habilita a opção para agrupamento de colunas. */
    private _groupable: boolean;
    @Input('d-groupable') set groupable(groupable: boolean) {
        this._groupable = groupable != null && groupable.toString() === '' ? true : this.convertToBoolean(groupable);
        if (!this._groupable) {
            this.cleanGroups();
        }
    }
    get groupable() {
        return this._groupable;
    }

    /** Habilita a mudança da ordem das colunas, através do arrastar e soltar no cabeçalho da coluna. */
    @Input('d-reorderable') reorderable = false;

    /** Cria uma coluna no início do Grid para permitir a seleção de uma ou mais linhas. */
    private _selectable: boolean;
    @Input('d-selectable') set selectable(selectable: boolean) {
        this._selectable = selectable != null && selectable.toString() === '' ? true : this.convertToBoolean(selectable);
    }
    get selectable() {
        return this._selectable;
    }

    /** Habilita a edição de linha no Grid. */
    private _editable: boolean;
    @Input('d-editable') set editable(editable: boolean) {
        this._editable = editable != null && editable.toString() === '' ? true : this.convertToBoolean(editable);
    }
    get editable() {
        return this._editable;
    }

    /** Objeto com as literais que serão utilizadas dentro do componente. */
    @Input('d-literals') literals: any = {};

    /** Lista de ações que devem ser apresentadas nas linhas do Grid. */
    @Input('d-actions') actions = [];

    /** Objeto com as funções que serão disparadas durante a Edição de uma Linha no Grid. */
    @Input('d-edit-actions') editActions?: DtsEditAction;

    /** Disponibiliza o botão de Maximizar o Grid. */
    @Input('d-show-maximize') maximizeButton = null;

    /** Disponibiliza o botão de Gerencimento de Colunas. */
    @Input('d-show-column-manager') columnManagerButton = false;

    /** Disponibiliza o botão "Adicionar" no Toolbar do Grid, utilizado para inclusão de novas linhas. */
    @Input('d-show-add-button') addButton = false;

    /** Disponibiliza os botões de Exportação do Grid: Excel e PDF. */
    @Input('d-show-export-buttons') exportButtons = false;

    /** Função que deve ser executado ao clicar no botão "showMore" (Carregar mais resultados). */
    @Output('d-show-more') showMore = new EventEmitter<any>();

    /** Evento disparador quando ocorrer o agrupamento das colunas. */
    @Output('d-group-change') dtsGroupChange = new EventEmitter<any>();

    /** Evento disparado quando a linha é selecionada. */
    @Output('d-selection-change') selectionChange = new EventEmitter<any>();

    /** Evento disparado ao clicar no 'salvar' do Gerenciador de Colunas. */
    @Output('d-save-column-manager') saveColumnManager = new EventEmitter<any>();

    /** Evento disparado ao salvar dados do modo de edição da linha, recebendo o modelo que foi alterado. */
    @Output('d-save-value') saveValue = new EventEmitter<any>();

    protected initColumnVisible: Array<DtsColumnConfigView> = [];
    protected defaultColumnVisible: Array<DtsColumnConfigView> = [];

    protected clickoutListener: () => void;

    protected abstract onShowMore(): void;

    protected abstract onSelectionChange(event: any): void;

    protected abstract cleanGroups(): void;

    protected convertToBoolean(val: any): boolean {
        if (typeof val === 'string') {
            val = val.toLowerCase().trim();
            return (val === 'true' || val === 'on' || val === '');
        }

        if (typeof val === 'number') {
            return val === 1;
        }

        return !!val;
    }

    private initializeColumns(): void {
        if (!this.columns) {
            this.columns = [];
        } else {
            this.defineColumnType();
            this.defineColumnVisible();
        }
    }

    // Define a configuração da coluna em modo edição de acordo com o tipo informado.
    private defineColumnType() {

        const lookupTableType = {
            string: column => {
                column.type = 'text';
                column.filterType = 'text';
                column.editType = 'text';
            },
            number: column => {
                column.type = 'numeric';
                column.filterType = 'numeric';
                column.editType = 'numeric';
                column.format = column.format ? column.format : '';
                column.editFormat = this.getEditFormat(column.format);
            },
            currency: column => {
                column.type = 'currency';
                column.filterType = 'numeric';
                column.editType = 'numeric';
                column.currency = column.currency ? column.currency : '$';
                column.symbol = column.symbol ? column.symbol : '1.2-2';
                column.editFormat = this.getEditFormat(column.symbol);
            },
            boolean: column => {
                column.type = 'boolean';
                column.filterType = 'boolean';
                column.editType = 'boolean';
            },
            date: column => {
                column.type = 'date';
                column.filterType = 'date';
                column.editType = 'date';
                column.format = column.format && column.format.trim().length > 0 ? `${column.format}` : 'dd/MM/yyyy';
            },
            label: column => {
                column.type = 'label';
                column.filterType = 'text';
                column.editType = 'text';
            },
            subtitle: column => {
                column.type = 'subtitle';
                column.filterType = 'text';
                column.editType = 'text';
            }
        };

        this.columns.forEach(column => {
            if (column.type && lookupTableType.hasOwnProperty(column.type.trim().toLowerCase())) {
                lookupTableType[column.type.trim().toLowerCase()](column);
            } else {
                column.type = 'text';
            }
        });
    }

    private getEditFormat(decimalPipe: string): string {
        if (!decimalPipe) { return 'n0'; }

        let part = decimalPipe.split('.');
        if (part.length < 2) { return 'n0'; }

        part = part[1].split('-');
        if (part.length < 2) { return 'n0'; }

        return `n${part[1]}`;
    }

    private defineColumnVisible() {
        this.columns.forEach(column => {
            if (column.visible === undefined || column.visible === null) { column.visible = true; }
            if (column.locked === undefined || column.locked === null) { column.locked = false; }

            this.defaultColumnVisible.push({ column: column.column, visible: column.visible });
        });

        if (this.initColumnVisible.length > 0) {
            this.changeColumnConfigViewList(this.initColumnVisible);
        }
    }

    public changeColumnConfigView(configView: DtsColumnConfigView): void {
        if (!configView) { return; }

        if (!this.columns) {
            this.initColumnVisible.push(configView);
            return;
        }

        const columnFind = this.columns.find(col => col.column === configView.column);
        this.atzColumnByConfigView(columnFind, configView);

        const columnOrig = this.columnsOrig.find(col => col.column === configView.column);
        this.atzColumnByConfigView(columnOrig, configView);
    }

    private atzColumnByConfigView(column: DtsKendoGridColumn, configView: DtsColumnConfigView) {
        if (!column) { return; }

        if (configView.visible !== undefined && configView.visible !== null) {
            column.visible = configView.visible;
        }

        if (configView.locked !== undefined && configView.locked !== null) {
            column.locked = configView.locked;
        }
    }

    public changeColumnConfigViewList(columnList: Array<DtsColumnConfigView>): void {
        if (!columnList) { return; }
        columnList.map(cfgView => this.changeColumnConfigView(cfgView));
    }
}

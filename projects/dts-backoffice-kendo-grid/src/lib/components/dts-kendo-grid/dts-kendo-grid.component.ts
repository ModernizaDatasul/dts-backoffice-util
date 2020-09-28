import { Component, DoCheck, IterableDiffers, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ViewEncapsulation, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataStateChangeEvent, GridComponent, GridDataResult, SelectAllCheckboxState, RowArgs, CommandColumnComponent } from '@progress/kendo-angular-grid';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { GroupDescriptor, process, State, SortDescriptor } from '@progress/kendo-data-query';
import { DtsKendoGridBaseComponent } from './dts-kendo-grid-base.component';
import { DtsKendoGridColumn } from './dts-kendo-grid-column.interface';

/**
 * @docsExtends DtsKendoGridBaseComponent
 *
 * @example
 *
 * <example name="dts-kendo-grid" title="Totvs Kendo Grid Labs">
 *  <file name='sample-dts-kendo-grid.component.html'> </file>
 *  <file name='sample-dts-kendo-grid.component.ts'> </file>
 * </example>
 */
@Component({
    // tslint:disable-next-line: component-selector
    selector: 'dts-kendo-grid',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './dts-kendo-grid.component.html',
    styleUrls: ['./custom-telerik.css', './dts-kendo-grid.component.css']
})
export class DtsKendoGridComponent extends DtsKendoGridBaseComponent implements OnInit, DoCheck, AfterViewInit {
    @ViewChild(GridComponent, { static: true }) private grid: GridComponent;

    currentRow: any;

    isNewRow = false;
    EditedRow: any = null;
    tableEditIndex = -1;
    formGroup: FormGroup;
    cancelButton = false;

    groups: Array<GroupDescriptor> = [];

    gridView: GridDataResult;

    selectableSettings = {
        checkboxOnly: true,
        mode: 'multiple'
    };

    sortableObject: any;

    sort: Array<SortDescriptor> = [];

    target: any;

    idGrid = `idGrid${this.create_UUID(true)}`;

    idPopup = this.create_UUID();
    showPopup = true;
    arrowDirection = 'top-right';
    popupSize = {
        height: 0,
        width: 0
    };

    state: State = {};

    columnFilter = {
        filter: false
    };

    localLiterals: any;

    language = localStorage.getItem('user.language') || navigator.language;

    private dataArrayOrdered: Array<any>;
    private differ: any;

    constructor(
        differs: IterableDiffers,
        private renderer: Renderer2,
        private el: ElementRef) {
        super();

        this.allData = this.allData.bind(this);
        this.differ = differs.find([]).create(null);
    }

    isShowToolbarGrid(): boolean {
        return (this.addButton || this.exportButtons);
    }

    isEditGrid(): boolean {
        return (this.editable || this.addButton);
    }

    isInEditionGrid(): boolean {
        return (this.EditedRow || this.isNewRow);
    }

    isGroup(): boolean {
        return (this.groups && this.groups.length > 0);
    }

    isRowSelected = (row: RowArgs) => {
        return row.dataItem.$selected;
    }

    ngAfterViewInit() {
        this.calcPopupSize();
    }

    ngOnInit() {
        this.renderer.listen(
            'document',
            'click',
            ({ target }) => {
                this.validateSaveEventInDocument(target, 'click');
            });
        this.renderer.listen(
            'document',
            'keydown',
            ({ target, key }) => {
                this.validateSaveEventInDocument(target, key);
            });

        // this.initializeColumns();
        this.initializeSorter();
        this.initializeData();

        this.setLocalLiterals();
    }

    setLocalLiterals() {
        const pt = {
            noRecords: 'Nenhum registro encontrado',
            groupPanelEmpty: 'Arraste o cabeçalho da coluna e solte aqui para agrupar os dados por essa coluna',
            filterAndLogic: 'E',
            filterOrLogic: 'Ou',
            filterContainsOperator: 'Contêm',
            filterNotContainsOperator: 'Não contêm',
            filterEqOperator: 'Igual',
            filterNotEqOperator: 'Não é igual',
            filterStartsWithOperator: 'Começa com',
            filterEndsWithOperator: 'Termina com',
            filterIsNullOperator: 'É nulo',
            filterIsNotNullOperator: 'Não é nulo',
            filterIsEmptyOperator: 'É vazio',
            filterIsNotEmptyOperator: 'Não é vazio',
            filterClearButton: 'Limpar',
            filterFilterButton: 'Filtrar',
            filterGteOperator: 'Maior ou igual que',
            filterGtOperator: 'Maior que',
            filterLtOperator: 'Menor que',
            filterLteOperator: 'Menor ou igual que',
            filterAfterOrEqualOperator: 'Depois ou igual que',
            filterAfterOperator: 'Depois de',
            filterBeforeOrEqualOperator: 'Antes ou igual que',
            filterBeforeOperator: 'Antes de',
            filterIsTrue: 'Sim',
            filterIsFalse: 'Não',
            add: 'Adicionar',
            cancel: 'Cancelar',
            showMore: 'Carregar mais resultados'
        };

        const en = {
            noRecords: 'No records available',
            groupPanelEmpty: 'Drag a column header and drop it here to group by that column',
            filterAndLogic: 'And',
            filterOrLogic: 'Or',
            filterContainsOperator: 'Contains',
            filterNotContainsOperator: 'Does not contain',
            filterEqOperator: 'Is equal to',
            filterNotEqOperator: 'Is not equal to',
            filterStartsWithOperator: 'Starts with',
            filterEndsWithOperator: 'Ends with',
            filterIsNullOperator: 'Is null',
            filterIsNotNullOperator: 'Is not null',
            filterIsEmptyOperator: 'Is empty',
            filterIsNotEmptyOperator: 'Is not empty',
            filterClearButton: 'Clear',
            filterFilterButton: 'Filter',
            filterGteOperator: 'Is greater than or equal to',
            filterGtOperator: 'Is greater than',
            filterLtOperator: 'Is less than',
            filterLteOperator: 'Is less than or equal to',
            filterAfterOrEqualOperator: 'Is after or equal to',
            filterAfterOperator: 'Is after',
            filterBeforeOrEqualOperator: 'Is before or equal to',
            filterBeforeOperator: 'Is before',
            filterIsTrue: 'Yes',
            filterIsFalse: 'No',
            add: 'Add',
            cancel: 'Cancel',
            showMore: 'Load more data'
        };

        const es = {
            noRecords: 'No hay registros disponibles.',
            groupPanelEmpty: 'Arrastre la columna y suéltela aquí para agrupar los datos por esa columna',
            filterAndLogic: 'Y',
            filterOrLogic: 'O',
            filterContainsOperator: 'Contiene',
            filterNotContainsOperator: 'No contiene',
            filterEqOperator: 'Es igual a',
            filterNotEqOperator: 'No es igual a',
            filterStartsWithOperator: 'Comienza con',
            filterEndsWithOperator: 'Termina con',
            filterIsNullOperator: 'Es nula',
            filterIsNotNullOperator: 'No es nula',
            filterIsEmptyOperator: 'Esta vacía',
            filterIsNotEmptyOperator: 'No esta vacía',
            filterClearButton: 'Clara',
            filterFilterButton: 'Filtrar',
            filterGteOperator: 'Es mayor o igual que',
            filterGtOperator: 'Es mayor que',
            filterLtOperator: 'Es menor que',
            filterLteOperator: 'Es menor o igual que',
            filterAfterOrEqualOperator: 'Es posterior o igual a',
            filterAfterOperator: 'Es posterior',
            filterBeforeOrEqualOperator: 'Es anterior o igual a',
            filterBeforeOperator: 'Es antes',
            filterIsTrue: 'Sí',
            filterIsFalse: 'No',
            add: 'Agregar',
            cancel: 'Cancelar',
            showMore: 'Cargar más datos'
        };

        const allLiterals = {
            pt: { ...pt },
            en: { ...en },
            es: { ...es },
            'pt-BR': { ...pt },
            'en-US': { ...en }
        };

        this.localLiterals = allLiterals[this.language] || allLiterals['pt-br'];
    }

    ngDoCheck() {
        const change = this.differ.diff(this.data);
        if (change) {
            this.initializeData();
        }
    }

    sortChange(sort: Array<SortDescriptor>) {
        this.sort = sort;
    }

    isGroupingBy(field) {
        return this.groups.some(obj => obj.field === field);
    }

    dataStateChange(state: DataStateChangeEvent) {
        this.state = state;
        this.refreshGrid();
    }

    refreshGrid() {
        if (!this.data) { this.data = []; }
        this.gridView = process(this.data, this.state);
    }

    addHandler({ sender }) {
        if (this.isInEditionGrid()) {
            if (!this.saveClick()) {
                return;
            }
        }

        this.isNewRow = true;
        this.cancelButton = true;

        this.createFormGroup();

        if (this.editActions && this.editActions.addAction) {
            if (this.executeFunctionValidation(this.editActions.addAction, this.formGroup.value)) {
                this.formGroup.setValue(this.formGroup.value);
            } else {
                return;
            }
        }

        sender.addRow(this.formGroup);
    }

    saveLine() {
        if (!this.isEditGrid()) {
            return;
        }

        if (!this.isInEditionGrid()) {
            return;
        }

        if (this.formGroup) {
            let newRowValue;
            let oldRowValue;

            if (this.isNewRow) {
                oldRowValue = {};
                newRowValue = this.formGroup.value;
                this.data.push(newRowValue);
            } else {
                oldRowValue = Object.assign({}, this.EditedRow);
                Object.assign(this.EditedRow, this.formGroup.value);
                newRowValue = this.EditedRow;
            }

            this.saveValue.emit({ data: newRowValue, oldData: oldRowValue });
        }

        this.initializeSorter();
    }

    editClickHandler(event) {
        if (!this.isEditGrid()) {
            return;
        }

        if (this.isInEditionGrid()) {
            this.saveClick();
            return;
        }

        if (!this.editable) {
            return;
        }

        if (event && event.column instanceof CommandColumnComponent) {
            return;
        }

        this.editHandler({
            sender: this.grid,
            rowIndex: event.rowIndex,
            dataItem: event.dataItem
        });
    }

    editHandler({ sender, rowIndex, dataItem }) {
        if (!this.isEditGrid()) {
            return;
        }

        this.sortableObject = null;
        this.EditedRow = dataItem;
        this.tableEditIndex = rowIndex;
        this.cancelButton = true;

        this.formGroup = new FormGroup({});
        const keys = Object.keys(dataItem);
        for (let count = 0; count <= keys.length; count++) {
            const key = keys[count];
            const columnTemp = this.getColumn(key);

            if (columnTemp && columnTemp.editable) {
                const control = columnTemp.required ? new FormControl(dataItem[key], Validators.required) : new FormControl(dataItem[key]);
                this.formGroup.addControl(key, control);
            }
        }

        sender.editRow(rowIndex, this.formGroup);
    }

    saveClick(): boolean {
        if (!this.validateSaveClick()) {
            return false;
        }

        this.saveLine();
        this.closeEditor(this.grid);
        this.refreshGrid();

        return true;
    }

    closeEditor(grid) {
        if (grid) {
            grid.closeRow(this.tableEditIndex);
        }

        this.isNewRow = false;
        this.EditedRow = null;
        this.tableEditIndex = -1;
        this.formGroup = null;
        this.cancelButton = false;
    }

    // Cancela a propagação de eventos no botão "Cancelar" da edição por linhas.
    cancelPropagation(event) {
        event.stopPropagation();
    }

    onChooseBtCancel() {
        this.cancelHandler({ sender: this.grid });
    }

    cancelHandler({ sender }) {
        this.closeEditor(sender);
    }

    isValidForm() {
        return (this.formGroup && this.formGroup.valid);
    }

    allData(): ExcelExportData {
        return {
            data: process(this.data, {}).data
        };
    }

    onSelectionChange(event) {
        if (!event) { return; }

        if (event.selectedRows && event.selectedRows.length > 0) {
            event.selectedRows.forEach(item => {
                if (item.dataItem) { item.dataItem.$selected = true; }
            });
        }

        if (event.deselectedRows && event.deselectedRows.length > 0) {
            event.deselectedRows.forEach(item => {
                if (item.dataItem) { item.dataItem.$selected = false; }
            });
        }

        let itemSelected: any;
        if (event.shiftKey) {
            itemSelected = 'ALL';
        } else {
            itemSelected = event.selectedRows[0] && event.selectedRows[0].dataItem ?
                event.selectedRows[0].dataItem : event.deselectedRows[0].dataItem;
        }

        this.selectionChange.emit({ data: itemSelected });
    }

    onShowMore() {
        this.showMore.emit(null);
    }

    groupChange(groups: Array<GroupDescriptor>) {
        if (this.isInEditionGrid()) {
            if (!this.saveClick()) {
                return;
            }
        }

        this.groups = groups;
        this.dtsGroupChange.emit(this.groups);
    }

    cleanGroups(): void {
        this.groups.splice(0, this.groups.length);
        this.refreshGrid();
    }

    // Define se a coluna de ações será visível.
    isCommandColumnVisible(): boolean {
        return true; // this.showRemoveButton || this.isEditGrid();
    }

    private createFormGroup() {
        const group: any = {};
        this.columns.forEach(columnTemp => {
            if (!columnTemp.checkbox) {
                group[columnTemp.column] = columnTemp.required ? new FormControl('', Validators.required) : new FormControl('');
            }
        });
        this.formGroup = new FormGroup(group);
    }

    // Se for passada uma função para validação e ela retornar True
    private executeFunctionValidation(func, param) {
        return (func && func(param));
    }

    private validateSaveClick(): boolean {
        if (this.editActions && this.editActions.saveAction && this.formGroup) {
            let editLine;

            if (this.isNewRow) {
                editLine = this.formGroup.value;
            } else {
                editLine = Object.assign({}, this.EditedRow);
                editLine = Object.assign(editLine, this.formGroup.value);
            }

            if (editLine && !this.executeFunctionValidation(this.editActions.saveAction, editLine)) {
                return false;
            }
        }

        if (!this.isValidForm()) {
            return false;
        }

        return true;
    }

    private getColumn(key): DtsKendoGridColumn {
        return this.columns.find(element => element.column === key);
    }

    private getObjects(data: Array<any>) {
        data.forEach(value => {
            if (value.items instanceof Array) {
                this.getObjects(value.items);
            } else {
                this.dataArrayOrdered.push(value);
            }
        });
    }

    private initializeData(): void {
        if (!this.data) { this.data = []; }

        if (this.groupable) {
            this.initializeGroups();
        }

        this.gridView = {
            data: this.data,
            total: this.data.length
        };

        this.refreshGrid();
    }

    private initializeSorter(): void {
        if (this.sortable) {
            this.sortableObject = {
                allowUnsort: this.sortable,
                mode: 'single'
            };
        }
    }

    private initializeGroups(): void {
        const arraySize = this.columns.length;
        for (let count = 0; count < arraySize; count++) {
            const columnTemp = this.columns[count];
            if (this.groups.length < 2 && columnTemp.groupHeader) {
                this.groups.push({ field: columnTemp.column });
            }
        }
    }

    matches(el, selector) {
        return (el.matches || el.msMatchesSelector).call(el, selector);
    }

    private validateSaveEventInDocument(target: any, event: string) {
        if (!this.isEditGrid()) {
            return;
        }

        if (!this.isInEditionGrid()) {
            return;
        }

        if (event === 'Enter' ||
            !this.matches(target, `#${this.idGrid} tbody *, #${this.idGrid} .k-grid-toolbar .k-button`)) {

            if (this.matches(target, '.po-toaster, .po-toaster-message, .po-icon-close')) {
                return;
            }

            this.saveClick();
            return;
        }

        if (event === 'Escape' || event === 'Esc') {
            this.onChooseBtCancel();
        }
    }

    onClickColumn($event) {
    }

    onClickAction(row: any, action: any) {
        action.action(row);
    }

    executeAction(action: any) {
        action.action(this.currentRow);
    }

    onSelectAllChange(checkedState: SelectAllCheckboxState) {
    }

    // popup controllers
    onClickActions($event: MouseEvent, row: any) {
        this.currentRow = { ...row };
        this.showPopup = true;

        this.target = $event.target;

        this.setPopupPosition(this.target);

        this.clickoutListener = this.renderer.listen('document', 'click', (event: MouseEvent) => {
            this.closePopupOnClickout(event);
        });
    }

    calcPopupSize(popupRef = null) {
        if (!this.actions || this.actions.length < 2) { return; }

        this.popupSize.height = 0;
        this.popupSize.width = 0;

        if (!popupRef) {
            popupRef = document.getElementById(`popupRef${this.idPopup}`);
        }

        if (!popupRef || !popupRef.getBoundingClientRect()) { return; }

        this.popupSize.height = popupRef.getBoundingClientRect().height;
        this.popupSize.width = popupRef.getBoundingClientRect().width;
    }

    setPopupPosition(target: any) {
        const popupRef = document.getElementById(`popupRef${this.idPopup}`);
        const divOffset = this.offset(target);

        if (this.popupSize.height === 0 || this.popupSize.width === 0) {
            this.calcPopupSize(popupRef);
        }

        /* Em Baixo (seta na direita) */
        this.arrowDirection = 'top-right';
        let top = divOffset.top + 20;
        let left = divOffset.left - this.popupSize.width + 8;

        /* Lado Esquerdo (seta no meio) */
        if (!this.isCanShowPopup(top, left)) {
            this.arrowDirection = 'right';
            top = divOffset.top - (this.popupSize.height / 2) + 8;
            left = divOffset.left - this.popupSize.width - 22;
        }

        /* Lado Esquerdo (seta em baixo) */
        if (!this.isCanShowPopup(top, left)) {
            this.arrowDirection = 'right-bottom';
            top = divOffset.top - this.popupSize.height + 20;
            left = divOffset.left - this.popupSize.width - 22;
        }

        popupRef.style.top = `${top}px`;
        popupRef.style.left = `${left}px`;
    }

    isCanShowPopup(top: number, left: number): boolean {
        if ((top + this.popupSize.height) > window.innerHeight) { return false; }
        if ((left + this.popupSize.width) > window.innerWidth) { return false; }
        return true;
    }

    offset(el: any) {
        const element = el.getBoundingClientRect();
        return { top: element.top, left: element.right };
    }

    elementContains(element: HTMLElement, className: string) {
        return element && element.classList.contains(className);
    }

    clickedOutDisabledItem(event) {
        const containsItemDisabled = this.elementContains(event.target, 'po-popup-item-disabled') ||
            this.elementContains(event.target.parentElement, 'po-popup-item-disabled');

        return !containsItemDisabled;
    }

    clickedOutTarget(event) {
        return this.target && !this.target.contains(event.target);
    }

    closePopupOnClickout(event: MouseEvent) {
        if (this.clickedOutTarget(event) && this.clickedOutDisabledItem(event)) {
            this.showPopup = false;
        }
    }

    create_UUID(firstpart = false) {
        let dt = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        if (firstpart) { uuid = uuid.split('-')[0]; }

        return uuid;
    }

    isValidSubtitle(rowValue: any, labels: string) {
        const listLabels = labels ? labels.split(',') : [];

        return listLabels.some((list) => list === rowValue);
    }
}

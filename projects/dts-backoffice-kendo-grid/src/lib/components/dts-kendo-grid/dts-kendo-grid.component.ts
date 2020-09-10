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
    @ViewChild('popupRef') popupRef: any;
    @ViewChild('gridCustom') gridCustom: ElementRef;

    currentRow: any;

    isNewRow = false;
    EditedRow: any = null;
    tableEditIndex = -1;
    formGroup: FormGroup;
    cancelButton = false;

    groups: Array<GroupDescriptor> = [];

    gridView: GridDataResult;

    left = 0;

    selectableSettings = {
        checkboxOnly: true,
        mode: 'multiple'
    };

    showPopup = false;

    sortableObject: any;

    sort: Array<SortDescriptor> = [];

    target: any;

    top = 0;

    idGrid = `idGrid${this.create_UUID(true)}`;
    idPopup = this.create_UUID();

    state: State = {};

    columnFilter = {
        filter: false
    };

    localLiterals: any;

    language = localStorage.getItem('user.language') || navigator.language;

    selectedAll = false;

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

    isRowSelected = (row: RowArgs) => {
        return row.dataItem.$selected;
    }

    ngAfterViewInit() {
        // Escuta todos os eventos de clique que ocorrem dentro do componente
        this.renderer.listen(
            this.el.nativeElement,
            'click',
            ({ target }) => {
                // Foi clicado no checkbox da tabela, todas as linhas serão marcadas
                const isSelectAll = target.getAttribute('class') &&
                    target.getAttribute('class').indexOf('k-checkbox-label') > -1 &&
                    target.outerHTML.indexOf('-select-all') > -1;

                // Foi clicado no checkbox da linha
                const isSelectOne = target.getAttribute('class') &&
                    target.getAttribute('class').indexOf('k-checkbox-label') > -1 &&
                    target.outerHTML.indexOf('-select-all') === -1;

                if (isSelectOne) {
                    const index = +target.getAttribute('for').split('-')[2].replace('checkbox', '');
                    this.selectRow(index);
                } else if (isSelectAll) {
                    this.selectRows(target.getAttribute('for'));
                    this.selectedAll = true;
                }
            });
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

    selectRows(selector) {
        const element: any = document.querySelector(`#${selector}`);
        const isChecked = !element.checked;

        // Os registros estão espalhados dentro dos agrupadores
        if (this.gridView.data[0].items) {
            this.gridView.data.forEach((data) => {
                data.items.forEach((item) => {
                    item.$selected = isChecked;
                });
            });
        } else {
            this.gridView.data.forEach((item, i) => {
                // Alterar o valor do $selected de todos os registros para ficar igual ao checkbox da tabela
                this.gridView.data[i].$selected = isChecked;
            });
        }
    }

    selectRow(index) {
        // Inverte o valor do $selected da linha
        let count = 0;

        // Os registros estão espalhados dentro dos agrupadores
        if (this.gridView.data[0].items) {
            this.gridView.data.forEach((data) => {
                data.items.forEach((item) => {
                    if (count === index) {
                        item.$selected = !item.$selected;
                    }
                    count++;
                });
            });
        } else {
            this.gridView.data[index].$selected = !this.gridView.data[index].$selected;
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

    // changeValueCheckbox(event, index, data, column) {
    //     if (!this.isEditGrid()) {
    //         event.target.checked = !event.target.checked;
    //         return;
    //     }
    //     data[column] = event.target.checked;
    //     this.data[index] = Object.assign(data);
    //     this.saveValue.emit({ data: this.data[index] });
    // }

    onSelectionChange(event) {
        const itemSelected = event && event.selectedRows[0] && event.selectedRows[0].dataItem ?
            event.selectedRows[0].dataItem : event.deselectedRows[0].dataItem;

        if (this.selectedAll) {
            this.selectionChange.emit({ data: this.gridView.data });
        } else {
            this.selectionChange.emit({ data: itemSelected });
        }

        this.selectedAll = false;
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

        if (event === 'Escape') {
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
    onClickActions($event: Event, row: any) {
        this.currentRow = { ...row };
        this.showPopup = true;

        this.target = $event.target;

        this.setPopupPosition(this.target);

        this.clickoutListener = this.renderer.listen('document', 'click', (event: MouseEvent) => {
            this.closePopupOnClickout(event);
        });
    }

    setPopupPosition(target: any) {
        const popupRef: any = document.querySelector(`#popupRef${this.idPopup}`);
        const divOffset = this.offset(this.target);

        this.left = divOffset.left;
        this.top = divOffset.top;

        popupRef.style.top = `${this.top + 20}px`;
        popupRef.style.left = `${this.left - 35}px`;
    }

    offset(el: any) {
        const element = el.getBoundingClientRect();
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        return { top: element.top + scrollTop, left: element.left + scrollLeft }
    }

    elementContains(element: HTMLElement, className: string) {
        return element && element.classList.contains(className);
    }

    clickedOutDisabledItem(event) {
        const containsItemDisabled = this.elementContains(event.target, 'po-popup-item-disabled') ||
            this.elementContains(event.target.parentElement, 'po-popup-item-disabled');

        return !containsItemDisabled;
    }

    clickedOutHeaderTemplate(event) {
        const popupHeaderTemplate = this.popupRef && this.popupRef.nativeElement.querySelector('[p-popup-header-template]');
        return !(popupHeaderTemplate && popupHeaderTemplate.contains(event.target));
    }

    clickedOutTarget(event) {
        return this.target && !this.target.contains(event.target);
    }

    closePopupOnClickout(event: MouseEvent) {
        if (this.clickedOutTarget(event) && this.clickedOutDisabledItem(event) && this.clickedOutHeaderTemplate(event)) {
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

    getFilterType(type: string) {
        switch (type) {
            case 'date':
                return 'date';
            case 'numeric':
                return 'numeric';
            case 'checkbox':
                return 'boolean';
            default:
                return 'text';
        }
    }
}

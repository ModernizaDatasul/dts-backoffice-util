import { Component, DoCheck, ElementRef, IterableDiffers, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ViewEncapsulation, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataStateChangeEvent, GridComponent, GridDataResult, SelectAllCheckboxState, RowArgs, CommandColumnComponent } from '@progress/kendo-angular-grid';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { GroupDescriptor, process, State, SortDescriptor } from '@progress/kendo-data-query';
import { DtsKendoGridBaseComponent } from './dts-kendo-grid-base.component';
import { DtsKendoGridColumn } from './dts-kendo-grid-column.interface';
import { TranslateService } from './services/translate.service';
import { KgPopup } from './model/kg-popup.model';

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
export class DtsKendoGridComponent extends DtsKendoGridBaseComponent implements OnInit, DoCheck, AfterViewInit, OnDestroy {
    @ViewChild(GridComponent, { static: true }) private grid: GridComponent;
    @ViewChild('columnManagerTarget') private btColManager: ElementRef;

    private currentRow: any;

    private isNewRow = false;
    private EditedRow: any = null;
    private tableEditIndex = -1;
    private formGroup: FormGroup;
    public cancelButton = false;

    public gridView: GridDataResult;

    public selectableSettings = {
        checkboxOnly: true,
        mode: 'multiple'
    };

    public groups: Array<GroupDescriptor> = [];

    public sortableSettings: any;
    public sort: Array<SortDescriptor> = [];

    private target: any;

    public idGrid = `idGrid${this.create_UUID(true)}`;

    public arrowDirection = 'top-right';
    public kgPopupAct = new KgPopup({
        id: `idPopAct${this.create_UUID()}`, showHtml: true, showUser: false, height: 0, width: 0
    });
    public kgPopupColMng = new KgPopup({
        id: `idPopCoM${this.create_UUID()}`, showHtml: true, showUser: false, height: 0, width: 0
    });

    public state: State = { sort: this.sort, group: this.groups };

    public columnFilter = {
        filter: false
    };

    public localLiterals: any;

    private dataArrayOrdered: Array<any>;
    private differ: any;

    constructor(
        differs: IterableDiffers,
        private renderer: Renderer2) {
        super();

        this.allData = this.allData.bind(this);
        this.differ = differs.find([]).create(null);
    }

    public ngOnInit() {
        this.setLocalLiterals();

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

        this.initializeSorter();
        this.initializeGroups();
        this.initializeData();
    }

    public ngAfterViewInit() {
        window.addEventListener('scroll', this.onWindowScroll.bind(this), true);

        if (this.isHasActions(1)) { this.calcPopupSize(this.kgPopupAct); }
        if (this.columnManagerButton) { this.calcPopupSize(this.kgPopupColMng); }
    }

    public ngOnDestroy() {
        window.removeEventListener('scroll', this.onWindowScroll.bind(this), true);
    }

    private onWindowScroll() {
        if (this.isHasActions(1)) { this.hidePopup(this.kgPopupAct); }
        if (this.columnManagerButton && this.kgPopupColMng && this.kgPopupColMng.showUser) {
            this.setPopupPosition(this.kgPopupColMng, this.btColManager.nativeElement);
        }
    }

    public isShowToolbarGrid(): boolean {
        return (this.addButton || this.exportButtons);
    }

    private isEditGrid(): boolean {
        return (this.editable || this.addButton);
    }

    private isInEditionGrid(): boolean {
        return (this.EditedRow || this.isNewRow);
    }

    public isGroup(): boolean {
        return (this.groups && this.groups.length > 0);
    }

    public isRowSelected = (row: RowArgs) => {
        return row.dataItem.$selected;
    }

    public isHasActions(numAct = 0) {
        return this.actions && this.actions.length > numAct;
    }

    public getBooleanDescription(value: boolean): string {
        if (value === null || value === undefined) { return ''; }
        return value ? (this.literals['yes'] || this.localLiterals['yes']) : (this.literals['no'] || this.localLiterals['no']);
    }

    private setLocalLiterals() {
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
            showMore: 'Carregar mais resultados',
            columnsManager: 'Gerenciar Colunas',
            restoreDefault: 'Restaurar Padrão',
            save: 'Salvar',
            yes: 'Sim',
            no: 'Não'
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
            showMore: 'Load more data',
            columnsManager: 'Manage Columns',
            restoreDefault: 'Restore Default',
            save: 'Save',
            yes: 'Yes',
            no: 'No'
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
            showMore: 'Cargar más datos',
            columnsManager: 'Administrar columnas',
            restoreDefault: 'Restore Estandár',
            save: 'Guardar',
            yes: 'Sí',
            no: 'No'
        };

        const allLiterals = {
            pt: { ...pt },
            en: { ...en },
            es: { ...es },
            'pt-BR': { ...pt },
            'en-US': { ...en }
        };

        this.localLiterals = allLiterals[TranslateService.getCurrentLanguage()] || allLiterals['pt-BR'];
    }

    public ngDoCheck() {
        const change = this.differ.diff(this.data);
        if (change) {
            this.initializeData();
        }
    }

    public sortChange(sort: Array<SortDescriptor>) {
        this.sort = sort;
    }

    public isGroupingBy(field) {
        return this.groups.some(obj => obj.field === field);
    }

    public dataStateChange(state: DataStateChangeEvent) {
        this.state = state;
        this.refreshGrid();
    }

    private refreshGrid() {
        if (!this.data) { this.data = []; }
        this.gridView = process(this.data, this.state);
    }

    public addHandler({ sender }) {
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

    private saveLine() {
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

    public editClickHandler(event) {
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

    private editHandler({ sender, rowIndex, dataItem }) {
        if (!this.isEditGrid()) {
            return;
        }

        this.sortableSettings = null;
        this.EditedRow = dataItem;
        this.tableEditIndex = rowIndex;
        this.cancelButton = true;

        if (this.columnManagerButton) { this.hidePopup(this.kgPopupColMng); }

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

    private saveClick(): boolean {
        if (!this.validateSaveClick()) {
            return false;
        }

        this.saveLine();
        this.closeEditor(this.grid);
        this.refreshGrid();

        return true;
    }

    private closeEditor(grid) {
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
    public cancelPropagation(event) {
        event.stopPropagation();
    }

    public onChooseBtCancel() {
        this.cancelHandler({ sender: this.grid });
    }

    private cancelHandler({ sender }) {
        this.closeEditor(sender);
    }

    private isValidForm() {
        return (this.formGroup && this.formGroup.valid);
    }

    public allData(): ExcelExportData {
        return {
            data: process(this.data, {}).data
        };
    }

    public onSelectionChange(event) {
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

    public onShowMore() {
        this.showMore.emit(null);
    }

    public groupChange(groups: Array<GroupDescriptor>) {
        if (this.isInEditionGrid()) {
            if (!this.saveClick()) {
                return;
            }
        }

        this.groups = groups;
        this.dtsGroupChange.emit(this.groups);
    }

    public cleanGroups(): void {
        this.groups.splice(0, this.groups.length);
        this.refreshGrid();
    }

    // Define se a coluna de ações será visível.
    public isCommandColumnVisible(): boolean {
        if (this.isInEditionGrid()) { return false; }
        if (this.isHasActions()) { return true; }
        if (this.columnManagerButton) { return true; }
        return false;
    }

    private createFormGroup() {
        const group: any = {};
        this.columns.forEach(column => {
            group[column.column] = column.required ? new FormControl('', Validators.required) : new FormControl('');
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

        this.gridView = {
            data: this.data,
            total: this.data.length
        };

        this.refreshGrid();
    }

    private initializeSorter(): void {
        if (this.sortable) {
            this.sortableSettings = {
                allowUnsort: this.sortable,
                mode: 'single'
            };
        }
    }

    private initializeGroups(): void {
        if (!this.groupable) { return; }

        this.columns.map(column => {
            if (column.groupHeader) {
                this.groups.push({ field: column.column });
            }
        });
    }

    private matches(el, selector) {
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

    public onClickColumn($event) {
    }

    public onClickAction(row: any, action: any) {
        action.action(row);
    }

    public executeAction(action: any) {
        action.action(this.currentRow);
    }

    public onSelectAllChange(checkedState: SelectAllCheckboxState) {
    }

    public onClickActions($event: MouseEvent, row: any) {
        if (this.kgPopupAct.showUser) {
            this.hidePopup(this.kgPopupAct);
            return;
        }

        this.currentRow = { ...row };

        this.kgPopupAct.showHtml = true;
        this.kgPopupAct.showUser = true;
        if (this.columnManagerButton) { this.hidePopup(this.kgPopupColMng); }

        this.target = $event.target;

        this.setPopupPosition(this.kgPopupAct, this.target);

        this.clickoutListener = this.renderer.listen('document', 'click', (event: MouseEvent) => {
            this.closePopupOnClickout(event);
        });
    }

    public onClickColumnManager($event: MouseEvent) {
        if (this.kgPopupColMng.showUser) {
            this.hidePopup(this.kgPopupColMng);
            return;
        }

        this.kgPopupColMng.showHtml = true;
        this.kgPopupColMng.showUser = true;
        if (this.isHasActions(1)) { this.hidePopup(this.kgPopupAct); }

        this.target = $event.target;

        this.setPopupPosition(this.kgPopupColMng, this.target);
    }

    public onClickVisibleColumnManager(column: string, visible: boolean) {
        this.changeVisibleColumn(column, !visible);
    }

    public onClickRestoreDefault() {
        this.changeVisibleColumnList(this.defaultColumnVisible);
    }

    public onClickSaveColumnManager() {
        const colList: Array<{ column: string, visible: boolean }> = [];

        this.columns.map(col => {
            colList.push({ column: col.column, visible: col.visible });
        });

        this.saveColumnManager.emit(colList);
        this.hidePopup(this.kgPopupColMng);
    }

    public hidePopup(kgPopup: KgPopup) {
        if (!kgPopup.showUser) { return; }

        if (kgPopup.height === 0 && kgPopup.width === 0) {
            this.calcPopupSize(kgPopup);
            if (kgPopup.height === 0 && kgPopup.width === 0) {
                return;
            }
        }

        kgPopup.showHtml = false;
        kgPopup.showUser = false;
    }

    private calcPopupSize(kgPopup: KgPopup, popupRef = null) {
        if (!popupRef) {
            popupRef = document.getElementById(kgPopup.id);
        }

        if (!popupRef || !popupRef.getBoundingClientRect()) { return; }

        kgPopup.height = popupRef.getBoundingClientRect().height;
        kgPopup.width = popupRef.getBoundingClientRect().width;
    }

    private setPopupPosition(kgPopup: KgPopup, target: any) {
        const popupRef = document.getElementById(kgPopup.id);
        if (!popupRef) { return; }

        const divOffset = this.offset(target);

        if (kgPopup.height === 0 || kgPopup.width === 0) {
            this.calcPopupSize(kgPopup, popupRef);
        }

        /* Em Baixo (seta na direita) */
        this.arrowDirection = 'top-right';
        let top = divOffset.top + 20;
        let left = divOffset.left - kgPopup.width + 8;

        /* Lado Esquerdo (seta em cima) */
        if (!this.isCanShowPopup(kgPopup, top, left)) {
            this.arrowDirection = 'right-top';
            top = divOffset.top - 4;
            left = divOffset.left - kgPopup.width - 22;
        }

        /* Lado Esquerdo (seta no meio) */
        if (!this.isCanShowPopup(kgPopup, top, left)) {
            this.arrowDirection = 'right';
            top = divOffset.top - (kgPopup.height / 2) + 8;
            left = divOffset.left - kgPopup.width - 22;
        }

        /* Lado Esquerdo (seta em baixo) */
        if (!this.isCanShowPopup(kgPopup, top, left)) {
            this.arrowDirection = 'right-bottom';
            top = divOffset.top - kgPopup.height + 20;
            left = divOffset.left - kgPopup.width - 22;
        }

        popupRef.style.top = `${top}px`;
        popupRef.style.left = `${left}px`;
    }

    private isCanShowPopup(kgPopup: KgPopup, top: number, left: number): boolean {
        if ((top + kgPopup.height) > window.innerHeight) { return false; }
        if ((left + kgPopup.width) > window.innerWidth) { return false; }
        return true;
    }

    private offset(el: any) {
        const element = el.getBoundingClientRect();
        return { top: element.top, left: element.right };
    }

    private elementContains(element: HTMLElement, className: string) {
        return element && element.classList.contains(className);
    }

    private clickedOutDisabledItem(event) {
        const containsItemDisabled = this.elementContains(event.target, 'po-popup-item-disabled') ||
            this.elementContains(event.target.parentElement, 'po-popup-item-disabled');

        return !containsItemDisabled;
    }

    private clickedOutTarget(event) {
        return this.target && !this.target.contains(event.target);
    }

    private closePopupOnClickout(event: MouseEvent) {
        if (this.clickedOutTarget(event) && this.clickedOutDisabledItem(event)) {
            if (this.isHasActions(1)) { this.hidePopup(this.kgPopupAct); }
        }
    }

    private create_UUID(firstpart = false) {
        let dt = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        if (firstpart) { uuid = uuid.split('-')[0]; }

        return uuid;
    }

    public isValidSubtitle(rowValue: any, labels: string) {
        const listLabels = labels ? labels.split(',') : [];

        return listLabels.some((list) => list === rowValue);
    }
}

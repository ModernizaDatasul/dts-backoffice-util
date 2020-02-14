// tslint:disable: component-selector
// tslint:disable: no-input-rename
import {
    Component, DoCheck, Input, IterableDiffers, OnInit, Renderer2, ViewChild, ViewContainerRef, ViewEncapsulation, AfterViewInit
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { DataStateChangeEvent, GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { GroupDescriptor, process, State, orderBy, SortDescriptor } from '@progress/kendo-data-query';

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
    selector: 'dts-kendo-grid',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './dts-kendo-grid.component.html',
    styleUrls: ['./custom-telerik.css',
        './dts-kendo-grid.component.css']
})
export class DtsKendoGridComponent extends DtsKendoGridBaseComponent implements OnInit, DoCheck, AfterViewInit {

    editedRowIndex = -1;
    editedProducted: any;
    formGroup: FormGroup;
    gridView: GridDataResult;
    sortableObject: any;
    sort: Array<SortDescriptor> = [];
    state: State = { skip: 0 };
    selectableSettings = {
        checkboxOnly: true,
        mode: 'multiple'
    };
    editable = false;

    @Input('d-grid-filter-state') availableGridState: State;

    /** Habilita a opção para exportação dos dados. */
    @Input('d-show-export-buttons') exportButtons = false;

    private addButtonCalled = false;
    private dataArrayOrdered: Array<any>;
    private differ: any;

    @ViewChild(GridComponent, { static: true }) private grid: GridComponent;

    constructor(viewRef: ViewContainerRef, private renderer: Renderer2, differs: IterableDiffers) {
        super();
        this.parentRef = viewRef['_view']['component'];
        this.allData = this.allData.bind(this);
        this.differ = differs.find([]).create(null);
    }

    ngAfterViewInit() {
        document.querySelector('#k-grid0-select-all').addEventListener('click', () => {
            const element: any = document.querySelector('.k-checkbox');
            this.data.forEach((item, i) => {
                this.data[i].$selected = element.checked;
            });
        });

        document.querySelectorAll('.k-checkbox').forEach((item, index) => {
            if (index !== 0) {
                item.addEventListener('click', (evt) => {
                    this.data[index - 1].$selected = !this.data[index - 1].$selected;
                    evt.stopPropagation();
                });
            }
        });
    }

    ngOnInit() {
        this.renderer.listen(
            'document',
            'click',
            ({ target }) => {
                this.validateSaveEventInDocument(target);
            });

        this.initializeColumns();
        this.initializeSorter();
        this.initializeData();

        // if (!this.editable) {
        //     this.grid = null;
        // }
    }

    ngDoCheck() {
        const change = this.differ.diff(this.data);
        // if (change) {
        //     this.initializeData();
        // }
    }

    sortChange(sort: Array<SortDescriptor>) {
        this.sort = sort;

        if (this.sort && this.sort[0].dir && !this.isGroupingBy(this.sort[0].field)) {
            this.loadData();
        }
    }

    isGroupingBy(field) {
        return this.groups.some(obj => obj.field === field);
    }

    dataStateChange(state: DataStateChangeEvent) {
        // Esta condição foi realizada para não deixar adicionar mais de 2 grupos devido
        // a um problema no kendo grid. Ja tem um chamado aberto para este problema.
        // if (state.group.length > 2) {
        //     state.group.splice(0, 1);
        // }

        this.state = state;
        this.gridView = process(this.data, this.state);
    }

    addHandler({ sender }) {
        if (this.editedRowIndex >= 0) {
            this.closeEditor(sender, this.editedRowIndex);
        }

        this.addButtonCalled = true;

        this.createFormGroup();

        if (this.addAction) {
            if (this.executeFunctionValidation(this.addAction, this.formGroup.value)) {
                this.formGroup.setValue(this.formGroup.value);
            } else {
                return;
            }
        }
        sender.addRow(this.formGroup);
    }

    saveLine() {
        if (this.editable && this.formGroup) {
            let newRowValue;
            if (this.editedRowIndex >= 0) {
                newRowValue = Object.assign(this.data[this.editedRowIndex], this.formGroup.value);
                this.data[this.editedRowIndex] = newRowValue;
            } else if (this.addButtonCalled) {
                newRowValue = this.formGroup.value;
                this.data.push(newRowValue);
                this.addButtonCalled = false;
            }

            this.saveValue.emit({ data: newRowValue });
        }

        this.initializeSorter();
    }

    editClickHandler(event) {
        if (!this.editable) {
            return;
        }

        let { rowIndex } = event;
        const { dataItem } = event;
        if (this.executeFunctionValidation(this.saveAction, { data: this.data[this.editedRowIndex] })) {
            if (!this.isValidForm() && this.formGroup) {
                return;
            }
            this.saveLine();
        }

        // Verifica se está utilizando agrupamento e busca o indice atualizado
        // do objeto que está sendo editado no momento.
        if (this.isGroup()) {
            rowIndex = this.getRowIndex(this.data, dataItem);
        }

        this.editHandler({
            sender: this.grid,
            rowIndex,
            dataItem
        });
        this.grid.editRow(rowIndex);
    }

    editHandler({ sender, rowIndex, dataItem }) {
        if (!this.editable) {
            // this.changeSelectedStatus(rowIndex);
            return;
        }

        this.sortableObject = null;

        this.closeEditor(sender);
        this.editedProducted = Object.assign({}, dataItem);
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

        this.editedRowIndex = rowIndex;
        sender.editRow(rowIndex, this.formGroup);
    }

    saveClick() {
        if (!this.validateSaveClick()) {
            return;
        }

        this.saveLine();
        this.closeEditor(this.grid);
        this.loadData();
    }

    closeEditor(grid, rowIndex = this.editedRowIndex) {
        if (grid) {
            grid.closeRow(rowIndex);
        }
        this.editedRowIndex = undefined;
        this.formGroup = undefined;
    }

    saveHandler({ sender, rowIndex, formGroup, isNew }) {
        const item = formGroup.value;
        if (isNew && !this.editable) {
            this.data.push(item);
        } else {
            this.data[rowIndex] = Object.assign(this.data[rowIndex], item);
        }

        this.loadData();

        sender.closeRow(rowIndex);
    }

    // Cancela a propagação de eventos no botão "Cancelar" da edição por linhas.
    cancelPropagation(event) {
        event.stopPropagation();
    }

    cancelHandler({ sender, rowIndex }) {
        if (this.editedProducted != null) {
            this.data[rowIndex] = this.editedProducted;
            this.editedProducted = null;
        }

        this.loadData();

        this.closeEditor(sender);
    }

    removeHandler({ rowIndex }) {
        if (this.removeAction && !this.executeFunctionValidation(this.removeAction, { data: this.data[rowIndex] })) {
            return;
        }
        this.data.splice(rowIndex, 1);
        this.loadData();
    }

    // Verifica se o formulário está válido
    isValidForm() {
        return (this.formGroup && this.formGroup.valid);
    }

    allData(): ExcelExportData {
        return {
            data: process(this.data, {}).data
        };
    }

    changeValueCheckbox(event, index, data, column) {
        if (!this.editable) {
            event.target.checked = !event.target.checked;
            return;
        }
        data[column] = event.target.checked;
        this.data[index] = Object.assign(data);
        this.saveValue.emit({ data: this.data[index] });
    }

    onSelectionChange(event) {
        const itemSelected = event && event.selectedRows[0] && event.selectedRows[0].dataItem;

        this.selectionChange.emit({ data: itemSelected });
    }

    onShowMore() {
        this.showMore.emit(null);
        this.loadData();
    }

    groupChange(groups: Array<GroupDescriptor>) {
        this.groups = groups;
        this.dtsGroupChange.emit(this.groups);
        this.loadData();
    }

    cleanGroups(): void {
        this.groups.splice(0, this.groups.length);
        this.loadDataDefault();
    }

    // Define se a coluna de ações será visível.
    isCommandColumnVisible(): boolean {
        return this.showRemoveButton || this.editable || this.addButton;
    }

    // Carrega os dados do grid novamente, com ou sem agrupamento.
    private loadData() {
        console.log('this.isGroup()', this.isGroup());
        if (this.isGroup()) {
            this.loadDataGroupable();
        } else {
            this.loadDataDefault();
        }
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
        return (func && this.parentRef[func](param));
    }

    // Procura um objeto dentro de um array de objetos, sem considerar nenhum atributo único.
    private getRowIndex(arr, searchFor) {
        for (let i = 0; i < arr.length; i++) {
            const isEqual = Object.keys(searchFor).every(key => (arr[i][key] === searchFor[key]));
            if (isEqual) {
                return i;
            }
        }

        return -1;
    }

    private validateSaveClick(): boolean {
        if (this.addButtonCalled && this.saveAction && this.formGroup) {
            if (!this.executeFunctionValidation(this.saveAction, { data: this.formGroup.value })) {
                return false;
            }
        } else if (this.editedRowIndex >= 0 && this.saveAction &&
            !this.executeFunctionValidation(this.saveAction, { data: this.data[this.editedRowIndex] })) {
            this.closeEditor(this.grid, this.editedRowIndex);
            return false;
        }

        if (!this.isValidForm()) {
            return false;
        }

        return true;
    }

    private isGroup() {
        return (this.groups && this.groups.length > 0);
    }

    private getColumn(key): DtsKendoGridColumn {
        return this.columns.find(element => element.column === key);
    }

    private loadDataDefault() {
        // A variavel "this.data" é a fonte de dados principal,
        // na linha abaixo eu estou atualizando a fonte de dados
        // principal com a fonte de dados ordenada para os indices
        // não se perderem na hora de salvar uma edição.
        this.updateIndex(orderBy(this.data, this.sort));

        this.gridView = {
            data: this.data,
            total: this.data.length
        };
    }

    private loadDataGroupable() {
        this.gridView = process(orderBy(this.data, this.sort), { group: this.groups });
        this.dataArrayOrdered = [];
        this.getObjects(this.gridView.data);
        this.updateIndex(this.dataArrayOrdered);
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

    private updateIndex(dataUpdated) {
        // A variavel "this.data" é a fonte de dados principal,
        // na linha abaixo eu estou atualizando a fonte de dados
        // principal com a fonte de dados ordenada para os indices
        // não se perderem na hora de salvar uma edição.
        for (let i = 0, dataLength = dataUpdated.length; i < dataLength; i++) {
            this.data[i] = dataUpdated[i];
        }
    }

    private initializeColumns(): void {
        if (!this.columns) {
            this.columns = [];
        } else {
            this.defineColumnType();
        }
    }

    private initializeData(): void {
        if (!this.data) {
            this.data = [];
        }

        if (this.groupable) {
            this.initializeGroups();
            this.loadDataGroupable();
        } else {
            this.loadDataDefault();
        }
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

    // Define a configuração da coluna em modo edição de acordo com o tipo informado.
    private defineColumnType() {

        const lookupTableType = {
            number: column => {
                column.type = 'numeric';
                column.format = undefined;
            },
            currency: column => {
                column.type = 'numeric';
                column.format = '{0:c}';
            },
            date: column => {
                column.type = 'date';
                column.format = column.format && column.format.trim().length > 0 ? `${column.format}` : 'dd/MM/yyyy';
            },
            string: column => {
                column.type = 'text';
                column.format = undefined;
            },
            label: column => {
                column.type = 'label';
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

    private isChildOf(el, className) {
        while (el && el.parentElement) {

            if (this.hasClass(el.parentElement, className)) {
                return true;
            }
            el = el.parentElement;
        }
        return false;
    }

    private hasClass(el, className) {
        return new RegExp(className).test(el.className);
    }

    private validateSaveEventInDocument(target: any) {
        if (!this.isChildOf(target, 'k-grid-content') && !this.isChildOf(target, 'k-grid-toolbar')) {
            this.saveClick();
        }
    }

    onClickColumn($event) {
    }

}

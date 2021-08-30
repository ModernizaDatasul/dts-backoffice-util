import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { PoRadioGroupOption, PoI18nService, PoNotificationService, PoLookupColumn } from '@po-ui/ng-components';
import { IScheduleParameters, ScheduleParameters } from './totvs-schedule-execution.model';
import { NgForm } from '@angular/forms';
import { TotvsScheduleExecutionService } from './totvs-schedule-execution.service';

@Component({
    selector: 'app-totvs-schedule-execution',
    templateUrl: './totvs-schedule-execution.component.html',
    styleUrls: ['./totvs-schedule-execution.component.css']
})

export class TotvsScheduleExecutionComponent implements OnInit {
    @ViewChild('scheduleExecutionForm', { static: true }) scheduleExecutionForm: NgForm;

    @Input() programName: string;
    @Input() externalName: string;
    @Input() programEMS5 = false;
    @Input() programVersion = '';
    @Input() parameters: [];
    @Input() disabledParams = false;
    @Input() loading = false;
    @Output() endExecution = new EventEmitter();

    constructor(
        public poI18nService: PoI18nService,
        public rpwService: TotvsScheduleExecutionService,
        public poNotification: PoNotificationService) {
    }

    executionTypeOptions: Array<PoRadioGroupOption>;
    frequencyOptions: Array<PoRadioGroupOption>;
    frequencyTypeOptions: Array<PoRadioGroupOption>;
    weeklyOptions: Array<PoRadioGroupOption>;
    zoomRpwServiceColumns: Array<PoLookupColumn>;
    model: ScheduleParameters;
    private jsonObject: any = {};

    literals: any = {};

    ngOnInit() {
        /* VERIFICAR COMO FICARÁ A TRADUÇÃO
        forkJoin(
              this.poI18nService.getLiterals(),
              this.poI18nService.getLiterals({ context: 'generalRpw' })
          ).subscribe(literals => {
              literals.map(item => Object.assign(this.literals, item) );
              this.setupComponents();
          });*/

        this.setupComponents();
    }

    setupComponents() {
        this.executionTypeOptions = [
            { label: 'Executar Hoje', value: 1 },
            { label: 'Agendar Execução', value: 2 }
        ];

        this.frequencyOptions = [
            { label: 'Uma vez no dia', value: 'no' },
            { label: 'Várias vezes no dia', value: 'yes' }
        ];

        this.frequencyTypeOptions = [
            { label: 'Hora(s)', value: 'hour' },
            { label: 'Minuto(s)', value: 'minute' }
        ];

        this.weeklyOptions = [
            { label: 'Domingo', value: 'Sunday' },
            { label: 'Segunda', value: 'Monday' },
            { label: 'Terça', value: 'Tuesday' },
            { label: 'Quarta', value: 'Wednesday' },
            { label: 'Quinta', value: 'Thursday' },
            { label: 'Sexta', value: 'Friday' },
            { label: 'Sábado', value: 'Saturday' }
        ];

        this.zoomRpwServiceColumns = [
            { property: 'code', label: 'Servidor', type: 'string', width: '20%' },
            { property: 'name', label: 'Descrição', type: 'string', width: '80%' }
        ];

        this.model = new ScheduleParameters();
        this.model.executionType = 1;
        this.model.repeatType = 1;
        this.model.repeatExecution = false;
    }

    public setScheduleParameters(schParam: IScheduleParameters) {
        if (!schParam) { return; }
        this.model = schParam;
    }

    fieldRpwServiceFormat(value) {
        return `${value.code} - ${value.name}`;
    }

    isExecutionSchedule(): boolean {
        return (this.model.executionType === 2);
    }

    isRepeatExecution(): boolean {
        return this.model.repeatExecution;
    }

    isFrenquency(): boolean {
        return (this.model.frequency === 'yes');
    }

    changeRepeatExecution() {
        const date = new Date();

        if (!this.model.execAppointHourInit) { this.model.execAppointHourInit = `${this.addZero(date.getHours())}:${this.addZero(date.getMinutes())}`; }
        if (!this.model.execAppointHourFinal) { this.model.execAppointHourFinal = `${this.addZero(date.getHours())}:${this.addZero(date.getMinutes())}`; }
        this.model.selectWeeklys = [];
        this.model.dayOfMonth = 0;
        this.model.frequency = 'no';
        this.model.frequencyType = 'hour';
        this.model.frequencyValue = 0;
    }

    changeExecutionType() {
        const date = new Date();

        this.model.execAppointDate = date;
        this.model.execAppointHour = `${this.addZero(date.getHours())}:${this.addZero(date.getMinutes())}`;
    }

    changeTypeFrequency() {
    }

    getActiveTab(codTab: number) {
        return (this.model.repeatType === codTab);
    }

    setActiveTab(codTab: number) {
        this.model.repeatType = codTab;
    }

    addZero(num: number): string {
        let str = `${num}`;
        if (num < 10) { str = `0${num}`; }
        return str;
    }

    executeSchedule() {
        if (this.disabledParams) { return; }
        if (!this.validate()) { return; }

        this.jsonObject = {};
        this.jsonObject.status = 'active';
        this.jsonObject.processID = this.programName;
        this.jsonObject.recurrent = this.model.repeatExecution;
        this.jsonObject.executionParameter = {};

        if (this.model.executionType === 1) {
            const date = new Date();
            this.jsonObject.firstExecution = `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}T${this.addZero(date.getHours())}:${this.addZero(date.getMinutes())}:00.000Z`;
        }
        if (this.model.executionType === 2) {
            this.jsonObject.firstExecution = `${this.model.execAppointDate}T${this.model.execAppointHour}:00.000Z`;
        }

        this.jsonObject.executionParameter.parametros = [];
        this.jsonObject.executionParameter.parametros[0] = { chave: 'rpwServer', valor: this.model.executionServer };
        this.jsonObject.executionParameter.parametros[1] = { chave: 'RPW_PROGRAM', valor: this.externalName };
        this.jsonObject.executionParameter.parametros[2] = { chave: 'RPW_PRG_EMS5', valor: this.programEMS5 ? 'yes' : 'no' };
        this.jsonObject.executionParameter.parametros[3] = { chave: 'RPW_PRG_VERS', valor: this.programVersion };

        this.jsonObject.executionParameter.parametros[4] = {};
        this.jsonObject.executionParameter.parametros[4].parametros_negocio = this.parameters;

        // Executa hoje ou agendada
        this.rpwService.createExecution(this.jsonObject, this.loading).subscribe(() => {
            this.poNotification.success('Agendamento realizado com sucesso !');
        });

        if (this.model.repeatExecution) {
            if (this.model.repeatType === 1) {
                this.jsonObject.daily = {
                    hour: this.getHourOrMinute(this.model.execAppointHourInit, 'h'),
                    minute: this.getHourOrMinute(this.model.execAppointHourInit, 'm')
                };
            }

            if (this.model.repeatType === 2) {
                this.jsonObject.weekly = {
                    hour: this.getHourOrMinute(this.model.execAppointHourInit, 'h'),
                    minute: this.getHourOrMinute(this.model.execAppointHourInit, 'm'),
                    daysOfWeek: this.model.selectWeeklys
                };
            }

            if (this.model.repeatType === 3) {
                this.jsonObject.monthly = {
                    hour: this.getHourOrMinute(this.model.execAppointHourInit, 'h'),
                    minute: this.getHourOrMinute(this.model.execAppointHourInit, 'm'),
                    day: this.model.dayOfMonth
                };
            }

            if (this.isFrenquency()) {
                this.jsonObject.rangeExecutions = {
                    frequency: {
                        type: this.model.frequencyType,
                        value: this.model.frequencyValue
                    },
                    rangeLimit: {
                        hour: this.getHourOrMinute(this.model.execAppointHourFinal, 'h'),
                        minute: this.getHourOrMinute(this.model.execAppointHourFinal, 'm')
                    }
                };
            }

            // Executa a diária, semanal ou mensal
            this.rpwService.createExecution(this.jsonObject, this.loading).subscribe(() => {
            });
        }

        this.endExecution.emit(this.model);
    }

    getHourOrMinute(value: string, type: string): number {
        if (type === 'h') { return +value.substring(0, 2); }
        if (type === 'm') { return +value.substring(3, 6); }
    }

    compareHour(hourInit: string, hourFinal: string): boolean {
        if (hourInit === hourFinal) { return false; }
        if (this.getHourOrMinute(hourInit, 'h') < this.getHourOrMinute(hourFinal, 'h')) { return true; }
        if (this.getHourOrMinute(hourInit, 'm') > this.getHourOrMinute(hourFinal, 'm')) { return false; }
        return true;
    }

    validate(): boolean {

        if (!this.scheduleExecutionForm.valid) {
            this.poNotification.error('Verifique as inconsistências em tela.');
            return false;
        }

        if (!this.model.executionServer) {
            this.poNotification.error('Servidor de Execução não foi informado.');
            return false;
        }

        if (this.isExecutionSchedule() && (!this.model.execAppointDate || !this.model.execAppointHour)) {
            this.poNotification.error('Informar a data e a hora para agendamento da execução.');
            return false;
        }

        if (this.model.repeatExecution) {
            if (!this.model.execAppointHourInit) {
                this.poNotification.error('Informar a hora de início para a execução.');
                return false;
            }

            if (this.model.repeatType === 2 && (this.model.selectWeeklys.length === 0)) {
                this.poNotification.error('Informar os dias da semana para a execução.');
                return false;
            }

            if (this.model.repeatType === 3 && (!this.model.dayOfMonth)) {
                this.poNotification.error('Informar o dia para a execução.');
                return false;
            }

            if (this.isFrenquency()) {
                if (!this.compareHour(this.model.execAppointHourInit, this.model.execAppointHourFinal)) {
                    this.poNotification.error('Hora Fim deve ser maior que Hora Início.');
                    return false;
                }

                if (this.model.frequencyValue === 0) {
                    this.poNotification.error('Informar a frequência de execução (A cada hora/minuto).');
                    return false;
                }
            }
        }

        return true;
    }
}

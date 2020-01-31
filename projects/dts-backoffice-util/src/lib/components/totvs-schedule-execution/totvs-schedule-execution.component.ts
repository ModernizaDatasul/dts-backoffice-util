import { Component, OnInit, Input, ViewChild, Output } from '@angular/core';
import { PoRadioGroupOption, PoLookupColumn, PoI18nService, PoNotificationService } from '@portinari/portinari-ui';
import { ParametersRpw } from './totvs-schedule-execution.model';
import { NgForm } from '@angular/forms';
import { RpwService } from './totvs-schedule-execution.service';


@Component({
  selector: 'app-totvs-schedule-execution',
  templateUrl: './totvs-schedule-execution.component.html',
  styleUrls: ['./totvs-schedule-execution.component.css']
})

export class TotvsScheduleExecutionComponent implements OnInit {

    @ViewChild('scheduleExecutionForm', {static: true}) scheduleExecutionForm: NgForm;

    @Input() programName: string;
    @Input() externalName: string;
    @Input() parameters: [];
    @Output() endExecution: boolean;

    constructor(public thfI18nService: PoI18nService,
                public rpwService: RpwService,
                public poNotification: PoNotificationService) {}

    TypeExecutionOptions: Array<PoRadioGroupOption>;
    weeklyOptions: Array<PoRadioGroupOption>;
    model: ParametersRpw;
    columns: Array<PoLookupColumn>;
    private jsonObject: any = {};

    literals: any = {};
    validation: boolean;

    ngOnInit() {
      /* VERIFICAR COMO FICARÁ A TRADUÇÃO
      forkJoin(
            this.thfI18nService.getLiterals(),
            this.thfI18nService.getLiterals({ context: 'generalRpw' })
        ).subscribe(literals => {
            literals.map(item => Object.assign(this.literals, item) );
            this.setupComponents();
        });*/

        this.setupComponents();
    }

    setupComponents() {
      this.TypeExecutionOptions = [{ label: 'Executar Hoje', value: 1 }, { label: 'Agendar Execução', value: 2 }];
      this.weeklyOptions = [{label: 'Domingo', value: 'SUNDAY'},
                            {label: 'Segunda', value: 'MONDAY'},
                            {label: 'Terça', value: 'TUESDAY'},
                            {label: 'Quarta', value: 'WEDNESDAY'},
                            {label: 'Quinta', value: 'THURSDAY'},
                            {label: 'Sexta', value: 'FRIDAY'},
                            {label: 'Sábado', value: 'SATURDAY'}];
      this.columns = [
          { property: 'cod_servid_exec', label: 'Código' },
          { property: 'des_servid_exec', label: 'Descrição' }
      ];

      this.model = new ParametersRpw();
      this.model.typeExecution = 1;
      this.model.activeTab = 1;
      this.model.repeatExecution = false;
    }

    changeTypeExecution() {
      const date = new Date();

      this.model.executionAppointmentDate = date;
      this.model.executionAppointmentHour = this.addZero(date.getHours()) + ':' + this.addZero(date.getMinutes());
    }

    setActiveTab(codTab) {
      const date = new Date();

      this.model.activeTab = codTab;
      this.model.executionAppointmentHourDaily = this.addZero(date.getHours()) + ':' + this.addZero(date.getMinutes());
      this.model.executionAppointmentHourWeekly = this.addZero(date.getHours()) + ':' + this.addZero(date.getMinutes());
    }

    addZero(i) {
      if (i < 10) {
        i = '0' + i;
      }
      return i;
    }

    executeSchedule() {

      this.validate();
      if (this.validation) { return; }

      this.jsonObject = {};
      this.jsonObject.status = 'active';
      this.jsonObject.processID = this.programName;
      this.jsonObject.recurrent = this.model.repeatExecution;
      this.jsonObject.executionParameter = {};

      if (this.model.typeExecution === 1) {
        this.jsonObject.firstExecution = new Date();
      } else if (this.model.typeExecution === 2) {
        this.jsonObject.firstExecution = new Date(this.model.executionAppointmentDate + 'T' + this.model.executionAppointmentHour);
      }

      this.jsonObject.executionParameter.parametros = [];
      this.jsonObject.executionParameter.parametros[0] = {chave: 'rpwServer', valor: this.model.executionServer};
      this.jsonObject.executionParameter.parametros[1] = {chave: 'RPW_PROGRAM', valor: this.externalName};
      this.jsonObject.executionParameter.parametros[2] = {chave: 'RPW_PRG_EMS5', valor: 'no'};
      this.jsonObject.executionParameter.parametros[3] = {chave: 'RPW_PRG_VERS', valor: ''};

      this.jsonObject.executionParameter.parametros[4] = {};
      this.jsonObject.executionParameter.parametros[4].parametros_negocio = this.parameters;

      // Executa hoje ou agendada
      this.rpwService.createRpw(this.jsonObject).subscribe(() => {
          this.poNotification.success('Execução efetuada com sucesso!');
      });

      if (this.model.repeatExecution) {
        if (this.model.activeTab === 1) {
          this.jsonObject.daily = {hour: this.getHourOrMinute(this.model.executionAppointmentHourDaily, 'h'),
                                  minute: this.getHourOrMinute(this.model.executionAppointmentHourDaily, 'm')};
        } else if (this.model.activeTab === 2) {
          this.jsonObject.weekly = {hour: this.getHourOrMinute(this.model.executionAppointmentHourWeekly, 'h'),
                                    minute: this.getHourOrMinute(this.model.executionAppointmentHourWeekly, 'm'),
                                    daysOfWeek : this.model.selectWeeklys};
        }
        // Monthy não será aplicado nesse momento
        // this.jsonObject.monthly = {'hour': '14', 'minute': '50', 'day': '27'};

        // Executa a diária ou mensal
        this.rpwService.createRpw(this.jsonObject).subscribe(() => {
        });
      }

      this.endExecution = true;
    }

    getHourOrMinute(value, type) {
      if (type === 'h') {
        return value.substring(0, 2);
      } else if (type === 'm') {
        return value.substring(3, 6);
      }
    }

    validate() {
      this.validation = true;
      if (!this.scheduleExecutionForm.valid) {
        this.poNotification.error('Verifique as inconsistências em tela.');
        return;
      }

      if (!this.model.executionServer) {
        this.poNotification.error('Servidor de Execução não foi informado.');
        return;
      }

      if (this.model.typeExecution === 2 && (!this.model.executionAppointmentDate || !this.model.executionAppointmentHour)) {
        this.poNotification.error('Informar a data e a hora para a execução.');
        return;
      }

      if (this.model.repeatExecution) {
        if (this.model.activeTab === 1 && !this.model.executionAppointmentHourDaily) {
          this.poNotification.error('Informar a hora para a execução diária.');
          return;
        }

        if (this.model.activeTab === 2 && (!this.model.executionAppointmentHourWeekly || this.model.selectWeeklys.length === 0)) {
          this.poNotification.error('Informar a hora e os dias da semana para a execução mensal.');
          return;
        }
      }

      this.validation = false;
    }
}

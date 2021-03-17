export interface IScheduleParameters {
    executionType: number;
    execAppointDate: Date;
    execAppointHour: string;
    executionServer: string;
    repeatExecution: boolean;
    repeatType: number;
    frequency: string;
    frequencyValue: number;
    frequencyType: string;
    execAppointHourInit: string;
    execAppointHourFinal: string;
    selectWeeklys: [];
    dayOfMonth: number;
}

export class ScheduleParameters implements IScheduleParameters {
    executionType: number;
    execAppointDate: Date;
    execAppointHour: string;
    executionServer: string;
    repeatExecution: boolean;
    repeatType: number;
    frequency: string;
    frequencyValue: number;
    frequencyType: string;
    execAppointHourInit: string;
    execAppointHourFinal: string;
    selectWeeklys: [];
    dayOfMonth: number;
}

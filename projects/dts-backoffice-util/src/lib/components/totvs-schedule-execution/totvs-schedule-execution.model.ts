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

export interface IExecutionStatus {
    startedDate: Date;
    executionID: string;
    error: string;
    status: string;
}

export class ExecutionStatus implements IExecutionStatus {
    startedDate: Date;
    executionID: string;
    error: string;
    status: string;
}

export interface IExecutionParameters {
    executionServer: string;
    programName: string;
    externalName: string;
    programEMS5: boolean;
    programVersion: string;
    businessParams: Array<any>;
}

export class ExecutionParameters implements IExecutionParameters {
    executionServer: string;
    programName: string;
    externalName: string;
    programEMS5: boolean;
    programVersion: string;
    businessParams: Array<any>;
}

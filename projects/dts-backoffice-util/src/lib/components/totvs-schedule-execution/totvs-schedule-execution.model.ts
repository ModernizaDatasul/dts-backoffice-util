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
    listExecutionID: string[];
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
    listExecutionID: string[];
}

export interface IExecutionStatus {
    jobScheduleID: string;
    executionID: string;
    startedDate: Date;
    error: string;
    status: string;
}

export class ExecutionStatus implements IExecutionStatus {
    jobScheduleID: string;
    executionID: string;
    startedDate: Date;
    error: string;
    status: string;
}

export interface IExecutionParameters {
    executionServer: string;
    programName: string;
    externalName: string;
    programEMS5?: boolean;
    programStyle?: number;
    programVersion?: string;
    businessParams: Array<any>;
    paramDigitDef?: Array<any>;
    paramDigitData?: Array<any>;
    paramSelections?: Array<any>;
}

export class ExecutionParameters implements IExecutionParameters {
    executionServer: string;
    programName: string;
    externalName: string;
    programEMS5?: boolean;
    programStyle?: number;
    programVersion?: string;
    businessParams: Array<any>;
    paramDigitDef?: Array<any>;
    paramDigitData?: Array<any>;
    paramSelections?: Array<any>;
}

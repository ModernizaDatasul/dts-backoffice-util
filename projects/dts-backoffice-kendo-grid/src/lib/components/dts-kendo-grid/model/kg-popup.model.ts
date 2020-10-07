export interface IKgPopup {
    id: string;
    showHtml: boolean;
    showUser: boolean;
    height: number;
    width: number;
}

export class KgPopup implements IKgPopup {
    id: string;
    showHtml: boolean;
    showUser: boolean;
    height: number;
    width: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    get $id(): string { return this.id; }
    get $showHtml(): boolean { return this.showHtml; }
    get $showUser(): boolean { return this.showUser; }
    get $height(): number { return this.height; }
    get $width(): number { return this.width; }

    set $id(value: string) { this.id = value; }
    set $showHtml(value: boolean) { this.showHtml = value; }
    set $showUser(value: boolean) { this.showUser = value; }
    set $height(value: number) { this.height = value; }
    set $width(value: number) { this.width = value; }
}

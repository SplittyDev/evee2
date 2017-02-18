export interface IEvent {
    readonly action: IEventHandler;
    readonly id: number;
    readonly name: string;
}
export interface IEventHandler {
    (): any;
}
export interface IEventHolder {
    readonly name: string;
    items: Array<IEvent>;
}
export declare class Evee {
    private debug;
    private gid;
    private holders;
    constructor(debug?: boolean);
    on(name: string, action: IEventHandler): IEvent;
    private internal_get_holders();
}

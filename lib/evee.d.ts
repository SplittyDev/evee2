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
    private gid;
    private holders;
    constructor();
    on(name: string, action: IEventHandler): IEvent;
    drop(event: string | IEvent): void;
    private internal_get_holders();
}

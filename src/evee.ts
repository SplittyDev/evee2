/**
 * Event.
 *
 * @export
 * @interface IEvent
 */
export interface IEvent {
  /**
   * The event callback.
   *
   * @type {IEventHandler}
   * @memberOf IEvent
   */
  readonly action: IEventHandler;

  /**
   * The unique event identifier.
   *
   * @type {number}
   * @memberOf IEvent
   */
  readonly id: number;

  /**
   * The event name.
   *
   * @type {string}
   * @memberOf IEvent
   */
  readonly name: string;
}

/**
 * Event handler.
 *
 * @export
 * @interface IEventHandler
 */
export interface IEventHandler {
  (): any;
}

/**
 * Event holding bag.
 *
 * @interface IEventHolder
 */
export interface IEventHolder {

  /**
   * The name of the events.
   *
   * @type {string}
   * @memberOf IEventHolder
   */
  readonly name: string;

  /**
   * The events held by the `IEventHolder`.
   *
   * @type {Array<IEvent>}
   * @memberOf IEventHolder
   */
  items: Array<IEvent>;
}

export class Evee {
  /**
   * The global event identifier.
   * Used internally to identify an event.
   *
   * @private
   * @type {number}
   * @memberOf Evee
   */
  private gid: number;

  /**
   * A collection of event holders.
   *
   * @private
   * @type {Array<IEventHolder>}
   * @memberOf Evee
   */
  private holders: Array<IEventHolder>;

  /**
   * Creates an instance of Evee.
   *
   * @memberOf Evee
   */
  constructor() {
    this.gid = 0;
    this.holders = [];
  }

  /**
   * Subscribes to an event.
   *
   * @param {string} name
   * @param {IEventHandler} action
   * @returns {IEvent}
   *
   * @memberOf Evee
   */
  public on(name: string, action: IEventHandler): IEvent {
    // Create the event.
    let event = <IEvent> {
      action: action,
      id: this.gid++,
      name: name,
    };
    // Try pushing the event to its holder.
    for (let holderIndex = 0; holderIndex < this.holders.length; holderIndex++) {
      let items = this.holders[holderIndex];
      if (items.name === name) {
        items.items.push(event);
        // Return early to avoid unnecessary iterations.
        return event;
      }
    }
    // There is no holder yet, so create one.
    this.holders.push(<IEventHolder> {
      items: [event],
      name: name,
    });
    // Return the event.
    return event;
  }

  /**
   * Drops an event subscription.
   *
   * If a `string` is passed, all events with that name are dropped.
   * If an `IEvent` is passed, only that particular event is dropped.
   *
   * @param {(string | IEvent)} event
   *
   * @memberOf Evee
   */
  public drop(event: string | IEvent): void {
    if (event.constructor === String) {
      let eventName = <string> event;
      // The event is a string, drop all events with that name.
      for (let holderIndex = 0; holderIndex < this.holders.length; holderIndex++) {
        let holder = this.holders[holderIndex];
        if (holder.name === eventName) {
          // Drop all events in the holder.
          holder.items = [];
          // Return early to avoid unnecessary iterations.
          return;
        }
      }
    } else {
      // Assume that the event acts as an IEvent.
      let eventObject = <IEvent> event;
      for (let holderIndex = 0; holderIndex < this.holders.length; holderIndex++) {
        let holder = this.holders[holderIndex];
        if (holder.name === eventObject.name) {
          for (let eventIndex = 0; eventIndex < holder.items.length; eventIndex++) {
            let currentEvent = holder.items[eventIndex];
            if (currentEvent.id === eventObject.id) {
              // Remove the event from the holder.
              holder.items.splice(eventIndex, 1);
              // Return early to avoid unnecessary iterations.
              return;
            }
          }
        }
      }
    }
  }

  /**
   * Retrieves the currently used holders.
   * ONLY USED FOR TESTING.
   *
   * @private
   * @returns {Array<IEventHolder>}
   *
   * @memberOf Evee
   */
  private internal_get_holders(): Array<IEventHolder> {
    return this.holders;
  }
}

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
   * Whether debug mode is enabled.
   * In debug mode, Evee does additional sanity checks
   * on the arguments passed to it.
   *
   * @private
   * @type {boolean}
   * @memberOf Evee
   */
  private debug: boolean;

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
   * @param {boolean} [debug=false]
   *
   * @memberOf Evee
   */
  constructor(debug: boolean = false) {
    this.debug = debug;
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

    // Sanity checks.
    if (this.debug) {
      if (name.constructor !== String) {
        throw new TypeError("name has to be of type <String>.");
      }
      if (action.constructor !== Function) {
        throw new TypeError("action has to be of type <Function>.");
      }
    }

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
        // Return early to reduce unnecessary iterations.
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
   * Retrieves the currently used holders.
   * ONLY USE THIS FOR TESTING.
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

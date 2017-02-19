/// <reference path="../node_modules/@types/mocha/index.d.ts" />

import { Evee, IEventHolder } from "../src/evee";
import * as chai from "chai";

const expect = chai.expect;

function get_holders(evee: Evee): Array<IEventHolder> {
  return <Array<IEventHolder>> evee["internal_get_holders"]();
}

function get_holder(evee: Evee, n: number): IEventHolder {
  return get_holders(evee)[n];
}

describe("Evee", () => {
  describe("#on(string, IEventHandler)", () => {
    it("creates a new holder for every new name", () => {
      const evee = new Evee();
      evee.on("foo", () => {});
      evee.on("bar", () => {});
      expect(get_holder(evee, 0).name).to.equal("foo");
      expect(get_holder(evee, 1).name).to.equal("bar");
    });
    it("reuses holders for every recurring name", () => {
      const evee = new Evee();
      evee.on("foo", () => {});
      evee.on("foo", () => {});
      expect(get_holder(evee, 0).name).to.equal("foo");
      expect(get_holders(evee).length).to.equal(1);
    });
    it("returns the event", () => {
      const evee = new Evee();
      const fooAction = () => {};
      let fooEvent = evee.on("foo", fooAction);
      expect(fooEvent.action).to.equal(fooAction);
      expect(fooEvent.id).to.equal(0);
      expect(fooEvent.name).to.equal("foo");
    });
  });
  describe("#drop(string)", () => {
    it("drops the event", () => {
      const evee = new Evee();
      let fooEvent = evee.on("foo", () => {});
      evee.drop(fooEvent);
      expect(get_holder(evee, 0).items).to.be.empty;
    });
    it("drops all events with the same name", () => {
      const evee = new Evee();
      evee.on("foo", () => {});
      evee.on("foo", () => {});
      evee.drop("foo");
      expect(get_holder(evee, 0).items).to.be.empty;
    });
  });
  describe("#drop(IEvent)", () => {
    it("drops the event", () => {
      const evee = new Evee();
      let fooEvent = evee.on("foo", () => {});
      evee.drop(fooEvent);
      expect(get_holder(evee, 0).items).to.be.empty;
    });
    it("leaves events with the same name intact", () => {
      const evee = new Evee();
      let fooEventA = evee.on("foo", () => {});
      let fooEventB = evee.on("foo", () => {});
      evee.drop(fooEventA);
      expect(get_holder(evee, 0).items[0]).to.equal(fooEventB);
    });
  });
});

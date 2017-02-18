
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
  describe("#on", () => {
    it("creates a new holder for every new name", () => {
      let evee = new Evee();
      evee.on("foo", () => {});
      evee.on("bar", () => {});
      expect(get_holder(evee, 0).name).to.equal("foo");
      expect(get_holder(evee, 1).name).to.equal("bar");
    });
    it("reuses holders for every recurring name", () => {
      let evee = new Evee();
      evee.on("foo", () => {});
      evee.on("foo", () => {});
      expect(get_holder(evee, 0).name).to.equal("foo");
      expect(get_holders(evee).length).to.equal(1);
    });
  });
});

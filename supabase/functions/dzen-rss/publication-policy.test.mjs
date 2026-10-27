import assert from "node:assert/strict";
import test from "node:test";
import { publicationCategories } from "./publication-policy.mjs";

test("Dzen imports must not force articles into drafts", () => {
  assert.equal(publicationCategories.includes("native-draft"), false);
  assert.equal(publicationCategories.includes("format-article"), true);
});
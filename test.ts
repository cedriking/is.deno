import {
  assertEquals,
  assertNotEquals,
  assert,
} from "https://deno.land/std/testing/asserts.ts";
import { is } from "./mod.ts";

Deno.test("Number Tests", (): void => {
  // Number
  assertEquals(true, is.Number(123));
  assertEquals(true, is.Number(5.1512));
  assertEquals(false, is.Number("asdf"));
  // Integer
  assertEquals(true, is.Integer(123));
  assertEquals(false, is.Integer(12.345));
  // Float
  assertEquals(true, is.Float(123.45));
  assertEquals(false, is.Float(1234));
  // Multiple Of
  assertEquals(true, is.MultipleOf(4, 2));
  assertEquals(false, is.MultipleOf(10, 4));
  // Even
  assertEquals(true, is.Even(8));
  assertEquals(false, is.Even(15));
  // Odd
  assertEquals(true, is.Odd(15));
  assertEquals(false, is.Odd(8));
  // NaN
  assertEquals(true, is.NaN("asdf"));
  assertEquals(true, is.NaN("123"));
  assertEquals(false, is.NaN(123));
});

Deno.test("String tests", (): void => {
  // String
  assertEquals(is.String("asdf"), is.String("bcd"));
  assertNotEquals(is.String({}), is.String("asdf"));
  // Blank
  assertEquals(true, is.Blank(""));
  assertEquals(true, is.Blank("      "));
  assertEquals(false, is.Blank(" adsf "));
  assertEquals(false, is.Blank("abc"));
  // Credit Card
  assertEquals(true, is.CreditCard("342649334847812"));
  assertEquals(true, is.CreditCard("342649334847812", "amex"));
  assertEquals(false, is.CreditCard("342649334847812", "visa"));
  assertEquals(true, is.CreditCard("6011497065974141"));
  assertEquals(true, is.CreditCard("6011497065974141", "discover"));
  assertEquals(true, is.CreditCard("4036465602953114"));
  assertEquals(true, is.CreditCard("4036465602953114", "visa"));
  // Email
  assertEquals(true, is.Email("test@google.com"));
  assertEquals(true, is.Email("jash.hdhs@jdhs.hshdhd.hshsh.com"));
  assertEquals(false, is.Email("asdf.com"));
  assertEquals(false, is.Email("@asdf.com"));
  assertEquals(false, is.Email("localhost@localhost"));
  // Latitude/Longitude
  assertEquals(true, is.LatitudeLongitude("21.567547,6.328125"));
  assertEquals(true, is.LatitudeLongitude("32.1224412"));
  assertEquals(false, is.LatitudeLongitude("asdf"));
  // Phone
  assertEquals(true, is.Phone("202-555-0110", "us"));
  assertEquals(false, is.Phone("202-555-0110", "ar"));
  assertEquals(true, is.Phone("01632 960602", "uk"));
  assertEquals(false, is.Phone("01632 960602", "us"));
  assertEquals(true, is.Phone("613-555-0141", "ca"));
  assertEquals(false, is.Phone("613-555-0141", "fr"));
  assertEquals(true, is.Phone("0491 570 156", "au"));
  // Zip
  assertEquals(true, is.Zip("50265"));
  assertEquals(false, is.Zip("50265", "ca"));
  assertEquals(true, is.Zip("H1S 1N1", "ca"));
});

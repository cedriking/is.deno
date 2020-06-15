/*
is.js ported to Deno
Built with <3 by Cedriking
*/
class Is {
  // Numbers
  Number(obj: any): boolean {
    return this.isType(obj, "Number");
  }
  Integer(num: number): boolean {
    return num % 1 === 0;
  }
  Float(num: number): boolean {
    return !this.Integer(num);
  }
  MultipleOf(num: number, multiple: number): boolean {
    return num % multiple === 0;
  }
  Even(num: number): boolean {
    return this.MultipleOf(num, 2);
  }
  Odd(num: number): boolean {
    return !this.Even(num);
  }
  NaN(num: any): boolean {
    // @ts-ignore
    return !this.Number(num);
  }

  // Strings
  String(obj: any): boolean {
    return this.isType(obj, "String");
  }
  Blank(str: string): boolean {
    return str.trim().length === 0;
  }
  CreditCard(
    str: string,
    network: "any" | "amex" | "discover" | "mastercard" | "visa" = "any",
  ): boolean {
    let re = /^[0-9]{15,16}$/;

    switch (network) {
      case "amex":
        re = /^(34)|(37)\d{14}$/;
        break;
      case "discover":
        re = /^6011\d{12}$/;
        break;
      case "mastercard":
        re = /^5[1-5]\d{14}$/;
        break;
      case "visa":
        re = /^4\d{15}$/;
        break;
    }

    return re.test(str);
  }
  Email(str: string): boolean {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      .test(str);
  }
  LatitudeLongitude(str: string): boolean {
    return /-?\d{1,3}\.\d+/.test(str);
  }
  Phone(
    str: string,
    country: "ar" | "au" | "ca" | "fr" | "is" | "uk" | "us" = "us",
  ): boolean {
    const re = (function () {
      switch (country) {
        case "ar":
          return /^(?:\+|[0]{2})?(54)?(:?[\s-])*\d{4}(:?[\s-])*\d{4}$/;
        case "au":
          return /^(?:\+|0)?(?:61)?\s?[2-478](?:[ -]?[0-9]){8}$/;
        case "ca":
          return /^(1-?)?(([2-9]\d{2})|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/;
        case "fr":
          return /^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$/;
        case "is":
          return /^(?:\+|[0]{2})?(354)?(:?[\s-])*\d{3}(:?[\s-])*\d{4}$/;
        case "uk":
          return /^(?:\+|044)?(?:\s+)?\(?(\d{1,5}|\d{4}\s*\d{1,2})\)?\s+|-(\d{1,4}(\s+|-)?\d{1,4}|(\d{6}))\d{6}$/;
        case "us":
          return /^(1-?)?(\d{3})(:?[\s\-])*(\d{3})(:?[\s\-])*(\d{4})$/;
      }
    })();

    return re.test(str);
  }
  Zip(
    str: string,
    country:
      | "ar"
      | "au"
      | "at"
      | "be"
      | "br"
      | "ca"
      | "dk"
      | "de"
      | "es"
      | "gb"
      | "hu"
      | "is"
      | "it"
      | "jp"
      | "nl"
      | "pl"
      | "se"
      | "us" = "us",
  ): boolean {
    let re = (function () {
      switch (country) {
        case "ar":
          return /^\d{4}$/;
        case "au":
          return /^\d{4}$/;
        case "at":
          return /^\d{4}$/;
        case "be":
          return /^\d{4}$/;
        case "br":
          return /^\d{5}[\-]?\d{3}$/;
        case "ca":
          return /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
        case "dk":
          return /^\d{3,4}$/;
        case "de":
          return /^\d{5}$/;
        case "es":
          return /^((0[1-9]|5[0-2])|[1-4]\d)\d{3}$/;
        case "gb":
          return /^[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]? \d[ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}$/;
        case "hu":
          return /^\d{4}$/;
        case "is":
          return /^\d{3}$/;
        case "it":
          return /^\d{5}$/;
        case "jp":
          return /^\d{3}-\d{4}$/;
        case "nl":
          return /^\d{4}$/;
        case "pl":
          return /^\d{2}\-\d{3}$/;
        case "se":
          return /^\d{3}\s?\d{2}$/;
        case "us":
          return /^(\d{5}([\-]\d{4})?)$/;
      }
    })();
    return re.test(str);
  }

  // Dates
  Date(obj: any): boolean {
    return this.isType(obj, "Date");
  }
  Past(date: Date, compareTo: Date): boolean {
    return date.getTime() < compareTo.getTime();
  }
  Future(date: Date, compareTo: Date): boolean {
    return date.getTime() > compareTo.getTime();
  }
  Weekday(date: Date): boolean {
    return date.getUTCDay() > 0 && date.getUTCDay() < 6;
  }
  Weekend(date: Date): boolean {
    return date.getUTCDay() === 0 || date.getUTCDay() === 6;
  }
  LeapYear(date: Date): boolean {
    const year = date.getFullYear();
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }
  ValidDate(date: Date): boolean {
    return !this.NaN(date.getTime());
  }

  // Objects/Extras
  Object(obj: any): boolean {
    return this.isType(obj, "Object");
  }
  Array(obj: any): boolean {
    return this.isType(obj, "Array");
  }
  Boolean(obj: any): boolean {
    return this.isType(obj, "Boolean");
  }
  Function(obj: any): boolean {
    return this.isType(obj, "Function");
  }
  RegExp(obj: any): boolean {
    return this.isType(obj, "RegExp");
  }
  Empty(obj: any): boolean {
    if (obj === null || typeof obj !== "object") {
      return !(obj && obj.length > 0);
    }

    return Object.keys(obj).length === 0;
  }
  SameType(obj: any, obj2: any): boolean {
    return Object.prototype.toString.call(obj) ===
      Object.prototype.toString.call(obj2);
  }
  OwnProperty(obj: any, prop: string): boolean {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }
  Type(obj: any, type: string): boolean {
    return this.isType(obj, type);
  }

  // Utils and private functions
  private isType(obj: any, type: string) {
    return Object.prototype.toString.call(obj) === `[object ${type}]`;
  }
}
export const is = new Is();

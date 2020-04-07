import { AuthorsField } from "./src/fields/authors";
import { RangeNumberField } from "./src/fields/number";
import { AdvancedSelect } from "./src/fields/select";

export const onClientEntry = () => {
  window.tinacms.fields.add({
    name: "authors",
    Component: AuthorsField
  });

  window.tinacms.fields.add({
    name: "rangeNumber",
    Component: RangeNumberField,
    parse: value => +value,
    validate(number, allValues, meta, field) {
      let min,
            max;
      if (field.max) {
        max = field.max;
      } else {
        max = 99999999999;
      }

      if (field.min) {
        min = field.min;
      } else {
        min = 0;
      }

      const isValidNumber = typeof number === "number";
      const isInRange = number <= max && number >= min;

      if (!isValidNumber) return "Invalid number";
      if (!isInRange) return `Please enter a number between ${min} and ${max}.`;

      return false;
    }
  });

  window.tinacms.fields.add({
    name: "advancedSelect",
    Component: AdvancedSelect,
    parse: value => +value,
    validate(number, allValues, meta, field) {
      // if (!isValidNumber) return "Invalid number";
      // if (!isInRange) return `Please enter a number between ${min} and ${max}.`;

      return false;
    }
  });
};

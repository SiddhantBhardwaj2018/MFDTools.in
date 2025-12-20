const modifyNumberValueForLocaleRepresentation = (value) => {
  // Allow empty or just decimal while typing
  if (value === "" || value === ".") return value;

  // Remove existing commas (input may already be formatted)
  const sanitizedValue = value.replace(/,/g, "");

  // Split integer and decimal parts
  const [integerPart, decimalPart] = sanitizedValue.split(".");

  // Handle case like ".5"
  const safeIntegerPart =
    integerPart === "" ? "0" : integerPart;

  // Format integer part in en-IN
  const formattedInteger = new Intl.NumberFormat("en-IN").format(
    Number(safeIntegerPart)
  );

  // Reattach decimal part if it exists (preserve typing)
  if (decimalPart !== undefined) {
    return `${formattedInteger}.${decimalPart}`;
  }

  return formattedInteger;
};

const formatINR = (num) => {
  return '₹' + num.toLocaleString("en-IN");
};


const numericRegex = /^[\d,]*\.?\d*$/;

export default {
    modifyNumberValueForLocaleRepresentation,
    numericRegex,
    formatINR
}
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
  return '₹' + Math.round(num).toLocaleString("en-IN");
};

const formatSensex = (num) => {
  return Math.round(num).toLocaleString("en-IN");
};


const numericRegex = /^[\d,]*\.?\d*$/;

const formatDateToWords = (dateStr) => {
  const date = new Date(dateStr);

  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };

  return date.toLocaleDateString('en-GB', options);
}

export default {
    modifyNumberValueForLocaleRepresentation,
    numericRegex,
    formatSensex,
    formatINR,
    formatDateToWords
}
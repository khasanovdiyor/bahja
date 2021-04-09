import createNumberMask from "text-mask-addons/dist/createNumberMask";
const priceMask = createNumberMask({
  prefix: "",
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: " ",
  allowNegative: false,
});
export default priceMask
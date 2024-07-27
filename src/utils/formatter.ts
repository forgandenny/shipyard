const formatter = (n: number | string) => {
  const f = Intl.NumberFormat("en", { notation: "compact" })
  if (!isNaN(Number(n))) {
    return f.format(Number(n))
  }
  return "n/a"
}

export default formatter

export function FormatText({
  title,
  category,
  toLowerCase = false,
}: {
  title?: string;
  category?: string;
  toLowerCase?: boolean;
}) {
  const text = title
    ? title
        ?.replace("-", " ")
        .replace(/\s{2,}/g, "-")
        .replace(/\s/g, "-")
        .replace(".", "")
    : category?.replace(" ", "").replace("'", "");

  if (toLowerCase) {
    return text?.toLowerCase();
  }

  return text;
}

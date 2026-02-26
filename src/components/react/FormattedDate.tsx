function FormattedDate({ date }: { date: string }) {
  const _date = new Date(date);
  return (
    <time dateTime={_date.toISOString()}>
      {_date.toLocaleDateString("fr", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}
    </time>
  );
}

export default FormattedDate;

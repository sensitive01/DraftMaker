
export function getDayWithSuffix(day) {
  const num = parseInt(day); // Ensure it's a number
  const j = num % 10,
    k = num % 100;

  let suffix = "th";
  if (j === 1 && k !== 11) suffix = "st";
  else if (j === 2 && k !== 12) suffix = "nd";
  else if (j === 3 && k !== 13) suffix = "rd";

  return (
    <>
      {num}
      <sup>{suffix}</sup>
    </>
  );
}

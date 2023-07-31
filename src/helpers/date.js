export const extractDate = (dateString) => {
  try {
    // Parse the input date string into a Date object
    const dateObj = new Date(dateString);

    // Extract the date part from the Date object
    const year = dateObj.getUTCFullYear();
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();

    // Format the date components into a readable date string
    return `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
  } catch (error) {
    return "Invalid date format.";
  }
};

module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },

  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(
      date
    ).getDate()}/${new Date(date).getFullYear()}`;
  },

  // not used
  checkuser: (loggedinuser, commentuser) => {
    if (loggedinuser === commentuser) return true;
    else return false;
  },
};

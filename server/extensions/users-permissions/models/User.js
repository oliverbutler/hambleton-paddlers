module.exports = {
  lifecycles: {
    beforeUpdate(params, data) {
      var today = new Date();
      var isMember = false;
      if (data.payments) {
        data.payments.forEach((payment, index) => {
          if (new Date(payment.date_end) > today) isMember = true;
        });
        data.member = isMember;
      }
    },
  },
};

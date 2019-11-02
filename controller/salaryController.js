const calculateSalary = (req, res) => {
    console.log(req.body);
    //your calculation part

    const aSalary = req.body.asalary;
    const superRate = req.body.srate;

    const grossIncome = Math.round(aSalary / 12);

    const incomeTax = Math.round(getIncomeTax(aSalary) / 12);

    const netIncome = Math.round(grossIncome - incomeTax);

    const superAmn = Math.round((grossIncome * superRate) / 100);

    const startDate = new Date(req.body.paySDate);
    let startDay = new Date(startDate).getDate() + "";
    startDay = startDay.length === 1 ? `0${startDay}` : startDay;
    const monthLong = startDate.toLocaleString("default", { month: "long" });
    const endDay = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();

    const data = {
        name: req.body.fname + " " + req.body.lname,
        "pay-period": `${startDay} ${monthLong} - ${endDay} ${monthLong}`,
        "gross-income": grossIncome,
        "income-tax": incomeTax,
        "net-income": netIncome,
        "super-amount": superAmn
    };

    res.send({ status: "sucess", data: data });
};

const getIncomeTax = aSalary => {
    const annSalary = parseInt(aSalary);

    if (annSalary >= 18201 && annSalary <= 37000) {
        const taxableSal = annSalary - 18200;
        return Math.round(taxableSal * 0.19);
    } else if (annSalary >= 37001 && annSalary <= 87000) {
        const taxableSal = annSalary - 37000;
        return Math.round(taxableSal * 0.325 + 3572);
    } else if (annSalary >= 87001 && annSalary <= 180000) {
        const taxableSal = annSalary - 87000;
        return Math.round(taxableSal * 0.37 + 19822);
    } else if (annSalary >= 180001) {
        const taxableSal = annSalary - 180000;
        return Math.round(taxableSal * 0.45 + 54232);
    } else {
        return 0;
    }
};

module.exports = {
    calculateSalary: calculateSalary
};

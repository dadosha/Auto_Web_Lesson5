module.exports = {
  generateName: function (length) {
    let name = ""; //здесь будем хранить результат
    let chars = "abcdefgABCDEFG1234567890"; //возможные символы
    let charLength = chars.length; //определяем длину
    for (let i = 0; i < length; i++) {
      //запускаем цикл для формирования строки
      name += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return name;
  },
  getDateTimestamp: function (addDay) {
    if (addDay > 6) {
      throw new Error("Date should be less than 6");
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    today.setDate(today.getDate() + addDay);
    return today.getTime() / 1000;
  }
};

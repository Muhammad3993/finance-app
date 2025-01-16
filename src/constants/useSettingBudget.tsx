import { IGroups } from "@/data/hooks/groups";
const daysInMonth = new Date(
  new Date().getFullYear(),
  new Date().getMonth() + 1,
  0,
).getDate();

const useSettingBudget = (finance: number) => {
  const firstValue = (finance * 50) / 100;
  const secondValue = (finance * 30) / 100;
  const thirdValue = (finance * 20) / 100;
  const dailyValueNeed = +(firstValue / daysInMonth).toFixed(2);
  const dailyValueCul = +(secondValue / daysInMonth).toFixed(2);
  const groups: IGroups[] = [
    {
      name: "Necessary",
      title: "Необходимые расходы",
      subtitle: "сум на месяц",
      value: firstValue,
      spendValue: firstValue,
      dailyValue: dailyValueNeed,
      dailySpendValue: dailyValueNeed,
    },
    {
      name: "Desired",
      title: "Желаемые расходы",
      subtitle: "сум на месяц",
      value: secondValue,
      spendValue: secondValue,
      dailyValue: dailyValueCul,
      dailySpendValue: dailyValueCul,
    },
    {
      name: "Savings",
      title: "Сбережения",
      subtitle: "сум на месяц",
      value: thirdValue,
      spendValue: thirdValue,
      dailySpendValue: 0,
    },
  ];

  return { groups, firstValue, secondValue, thirdValue };
};

export default useSettingBudget;

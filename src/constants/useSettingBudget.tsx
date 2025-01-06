import { IGroups } from "@/data/hooks/groups";
import { useDaysInCurrentMonth } from "./useMonthDays";

const useSettingBudget = (finance?: string | number) => {
  const { daysInMonth } = useDaysInCurrentMonth();

  const firstValue = (Number(finance) * 50) / 100;
  const secondValue = (Number(finance) * 30) / 100;
  const thirdValue = (Number(finance) * 20) / 100;

  const dailyValueNeed = +(firstValue / daysInMonth).toFixed(2);
  const dailyValueCul = +(secondValue / daysInMonth).toFixed(2);

  const groups: IGroups[] = [
    {
      name: "Necessary",
      value: firstValue,
      spendValue: firstValue,
      dailyValue: dailyValueNeed,
      dailySpendValue: dailyValueNeed,
    },
    {
      name: "Desired",
      value: secondValue,
      spendValue: secondValue,
      dailyValue: dailyValueCul,
      dailySpendValue: dailyValueCul,
    },
    {
      name: "Savings",
      value: thirdValue,
      spendValue: thirdValue,
    },
  ];

  return { groups, firstValue, secondValue, thirdValue };
};

export default useSettingBudget;

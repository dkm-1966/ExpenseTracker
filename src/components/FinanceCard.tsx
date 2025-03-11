"use client";

import { Card, Statistic, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import Link from "next/link";
import React, { FC } from "react";
import { IFinanceCardProps } from "@/types/types";
import { useAppSelector } from "@/hooks/redux";

const FinanceCard: FC<IFinanceCardProps> = ({ title, link }) => {
  const { incomeRatio, expenseRatio, calculatedIncome, calculatedExpense } =
    useAppSelector((state) => state.calculatedFinances);

  const ratio = title === "Income" ? incomeRatio : expenseRatio;

  const calculatedFinance =
    title === "Income" ? calculatedIncome : calculatedExpense;

  let profitable;

  if (title === "Income") {
    profitable = ratio > 1 ? true : false;
  } else {
    profitable = ratio < 1 ? true : false;
  }

  return (
    <Card
      title={title}
      extra={<Link href={link}>More</Link>}
      style={{ width: 300 }}
    >
      <Statistic
        title={profitable ? "Profitable" : "Unprofitable"}
        value={calculatedFinance}
        precision={2}
        valueStyle={
          title === "Income" ? { color: "#3f8600" } : { color: "#cf1322" }
        }
        prefix={
          title === "Income" ? <ArrowUpOutlined /> : <ArrowDownOutlined />
        }
        suffix="$"
      />
      <div className="flex gap-4">
        <p>Expense ratio</p>
        <Tag color={profitable ? "green" : "red"}>{ratio}</Tag>
      </div>
    </Card>
  );
};

export default FinanceCard;

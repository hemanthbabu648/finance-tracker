'use client';

import { Accordion } from '@mantine/core';
import React, { useState } from 'react';

import NumberInput from '@/components/commons/NumberInput';
import SwitchInput from '@/components/commons/SwitchInput';
import { getCategories } from '@/utils/Utils';

const expenseCategories = getCategories.EXPENSE;

interface Budget {
  label: string;
  value: number;
  checked: boolean;
}

function BudgetsPage() {
  const budgetsCategories: Budget[] = expenseCategories.map((category) => ({
    label: category.label,
    value: 0,
    checked: false,
  }));

  const [budgets, setBudgets] = useState(budgetsCategories);

  const handleSwitchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    budget: Budget,
  ) => {
    setBudgets((prev) =>
      prev.map((b) =>
        b.label === budget.label ? { ...b, checked: event.target.checked } : b,
      ),
    );
  };

  const handleBudgetChange = (value: number, budget: Budget) => {
    setBudgets((prev) =>
      prev.map((b) => (b.label === budget.label ? { ...b, value: value } : b)),
    );
  };

  return (
    <div>
      <Accordion defaultValue="Apples" variant="separated">
        {budgets.map((budget) => (
          <Accordion.Item key={budget.label} value={budget.label}>
            <Accordion.Control>{budget.label}</Accordion.Control>
            <Accordion.Panel>
              <div className="flex items-center justify-between">
                <p>
                  Turn on Budget Tracking for{' '}
                  <span className="font-bold">
                    &ldquo;{budget.label}&rdquo;
                  </span>
                </p>
                <SwitchInput
                  checked={budget.checked}
                  onChange={(event) => handleSwitchChange(event, budget)}
                />
              </div>
              {budget.checked && (
                <div className="mt-10 flex items-center justify-center">
                  <NumberInput
                    value={budget.value}
                    onChange={(value) =>
                      handleBudgetChange(value as number, budget)
                    }
                  />
                </div>
              )}
              {budget.checked && budget.value > 0 && (
                <div className="mt-10 space-y-2">
                  <p>
                    Month: <span className="font-bold">January</span>
                  </p>
                  <p>
                    Budget Amount for {budget.label}: {budget.value}
                  </p>
                  <p>Spent Amount: 0</p>
                  <p>Remaining Amount: 0</p>
                </div>
              )}
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}

export default BudgetsPage;

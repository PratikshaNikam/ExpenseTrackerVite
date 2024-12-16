import styles from './Home.module.css';
import Card from '../Card/Card';
import { useState, useEffect } from 'react';
import MyPieChart from '../PieChart/PieChart';
import TransactionsList from '../TransactionsList/Transactions';
import Modal from '../Modal/Modal';
// import BarChartComponent from '../BarChart/BarChart';
import ExpenseForm from '../Forms/ExpenseForm/ExpenseForm';
import AddBalanceForm from '../Forms/AddBalanceForm/AddBalanceForm';

export default function Home() {
  const [balance, setBalance] = useState(5000);
  const [isOpenIncome, setIsOpenIncome] = useState(false);

  const [expenseList, setExpenseList] = useState([]);
  const [mount, setMount] = useState(false);
  const [expenses, setExpenses] = useState(0);
  const [isOpenExpense, setIsOpenExpense] = useState(false);

  const [categorySpends, setCategorySpends] = useState({
    "food": 0,
    
    "travel": 0,
    "entertainment": 0,
    
  });

  const [categoryCount, setCategoryCount] = useState({
    food: 0,
    entertainment: 0,
    travel: 0,
  });

  // console.log(isOpenIncome);
  // console.log(expenseList);
  // console.log(mount);
  // console.log(isOpenExpense)
  // console.log(categoryCount)
  // console.log(categorySpends)

  //check local balance if available use it or set balance to 5000
  useEffect(() => {
    const localBalance = localStorage.getItem('balance');
    if (localBalance) {
      setBalance(Number(localBalance));
      
    }
    else {
      setBalance(5000);
      localStorage.setItem('balance', 5000);
    }

    const items = JSON.parse(localStorage.getItem("expenses"));

    setExpenseList(items || []);
    setMount(true);
  }, []);

  // save expenses list to localstorage
  useEffect(() => {
    if (expenseList.length > 0 || mount) {
      localStorage.setItem("expenses", JSON.stringify(expenseList));
    }

    if (expenseList.length > 0) {
      setExpenses(
        expenseList.reduce((accumulator, currentValue) => accumulator + Number(currentValue.price), 0)
      );
    }
    else {
      setExpenses(0)
    }

    let foodSpends = 0, entertainmnetSpends = 0, travelSpends = 0;  
    
    let foodCount = 0, entertainmentCount = 0, travelCount = 0;
    
    expenseList.forEach((item) => {
      if (item.category === "food") {
        foodSpends += Number(item.price);
        foodCount++;
      }
      else if (item.category === "entertainment") {
        entertainmnetSpends += Number(item.price);
        entertainmentCount++;
      }
      else if (item.category === "travel") {
        travelSpends += Number(item.price);
        travelCount++;
      }
    });

    setCategorySpends({
      food: foodSpends,
      entertainment: entertainmnetSpends,
      travel: travelSpends,
    });
    setCategoryCount({
      food: foodCount,
      entertainment: entertainmentCount,
      travel: travelCount,
    });
  }, [expenseList]);

   //save balance to local storage
   useEffect(() => { 
    if (mount) {
      localStorage.setItem("balance", balance);
      
    }
  }, [balance]);
  

  return(
    <div className={styles.container}>
      <h1>Expense Tracker</h1>
      <div className={styles.cardsWrapper}>
      <Card
          title="wallet Balance"
          money={balance}
          buttonText="+ Add income"
          buttonType="success"
          handleClick={() => { setIsOpenIncome(true) }} />
        
        <Card
        title="Expenses"
        money={expenses}
        buttonText="+ Add Expense"
          buttonType="failure"
          success={false }
          handleClick={() => { setIsOpenExpense(true) }} />
        
        <MyPieChart
        data={[
          { name: "Food", value: categorySpends.food },
          { name: "Entertainment", value: categorySpends.entertainment },
          { name: "Travel", value: categorySpends.travel },
        ]}
      
        ></MyPieChart>

      </div>

      <div className={styles.transactionWrapper}>
        <TransactionsList
          transactions={expenseList}
          editTransactions={setExpenseList}
          title="Recent Transactions"
          balance={balance}
          setBalance={setBalance}
        />

        {/* <BarChartComponent
          data={[
            { name: "Food", value: categoryCount.food },
            { name: "Entertainment", value: categoryCount.entertainment },
            { name: "Travel", value: categoryCount.travel },
          ]}
        /> */}

      </div>


      <Modal isOpen={isOpenExpense} setIsOpen={setIsOpenExpense} >
        <ExpenseForm
          setIsOpen={setIsOpenExpense}
          balance={balance}
          setBalance={setBalance}
          expenseList={expenseList}
          setExpenseList={setExpenseList}
        />

      </Modal>

      <Modal isOpen={isOpenIncome} setIsOpen={setIsOpenIncome} >
        <AddBalanceForm setIsopen={setIsOpenIncome} setBalance={setBalance} />

      </Modal>
    </div>
  )
}
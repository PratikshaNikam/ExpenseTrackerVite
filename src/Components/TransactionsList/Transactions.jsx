
//import TransactionCard from "../TransactionCard/TransactionCard";
import styles from "./Transactions.module.css";
import { useEffect, useState } from "react";
//import Modal from "../Modal/Modal";
//import ExpenseForm from "../Forms/ExpenseForm/ExpenseForm";
//import pagination from "../Pagination/Pagination";
import TransactionCard from "../TransactionCard/Transactioncard";


export default function TransactionsList({ transactions, editTransactions,title,  balance, setBalance }) {
  
  const [editId, setEditId] = useState(0);
  const [isDisplayEditor, setIsDisplayEditor] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const maxRecords = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTransactions, setCurrentTransactions] = useState([]);


  const  handleEdit = (id) => {
    setEditId(id);
    setIsDisplayEditor(true);
  } 

  console.log(editId);
  console.log(transactions)
  console.log(isDisplayEditor)
  const handleDelete = (id) => {
    const item = transactions.find(i => i.id == id);
    const price = Number(item.price);
    setBalance(prev => prev + price)

    editTransactions(prev => prev.filter(i => i.id !== id))

  }

  useEffect(() => {

    const startIndex = (currentPage - 1) * maxRecords;
    const endIndex = Math.min(currentPage * maxRecords, transactions.length);
    
    setTotalPages(Math.ceil(transactions.length / maxRecords));
    setCurrentTransactions([...transactions].slice(startIndex, endIndex));
  }, [currentPage, transactions]);
  

  useEffect(() => {
    if (totalPages < currentPage && currentPage > 1) {
      setCurrentPage(prev=>prev -1 )
    }
  },[totalPages])


return (
  <div className={styles.transactions}>
    {title && <h2>{title}</h2>}
    {
      transactions.length > 0 ?
        <div className={styles.list}>
          <div>
            {currentTransactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                details={transaction}
                handleEdit={handleEdit(transaction.id)}
                handleDelete={()=>handleDelete(transaction.id)}
              />
            ))
              }
          </div>
          {totalPages > 1 && (
            <Pagination updatePage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
          )
            }
        </div> : (
          <div className={styles.emptyTransactionsWrapper}>
            <p>No Transactions!</p>
            </div>
        )
      
     }
    </div>
  );
}


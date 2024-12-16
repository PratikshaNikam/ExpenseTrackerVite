
import styles from './ExpenseForm.module.css';
import { useState, useEffect } from 'react';
import Button from "../../Button/Button";
import { useSnackbar } from 'notistack';

export default function ExpenseForm({ setIsOpen, balance, setBalance, expenseList, setExpenseList, editId }) {
  
  console.log(balance)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    date:''
  })
  const { enqueueSnackbar } = useSnackbar();


  const handleChange = (e) => {
    const name = e.target.name
    
    setFormData(prev => ({ ...prev, [name]: e.target.value }))
    
  }

  const handleAdd = (e) => {
    e.preventDefault()

    if (balance < Number(formData.price)) {
      enqueueSnackbar("Price should be less than the wallet balance", { variant: "warning" })
      setIsOpen(false)
      return
    }

    setBalance(prev => prev - Number(formData.price))

    const lastId = expenseList.length > 0 ? expenseList[0].id : 0;
    setExpenseList(prev => [{...formData, id:lastId +1} , ...prev] )
  }


  const handleEdit = (e) => {
    e.preventDefault()

    const updated = expenseList.map(item => {
      if (item.id == editId) {
        const pricedifference = item.price - Number(formData.price)
        
        if (pricedifference < 0 && Math.abs(pricedifference) > balance) {
          enqueueSnackbar("Price should be less than the wallet balance", { variant: "warning" })
          setIsOpen(false)
          return {...item}
          
          
        }
        setBalance(prev => prev + pricedifference)
        return {...formData, id: editId}
      }

      else {
        return item
      }
    })

    setExpenseList(updated)
    setIsOpen(false)
}

useEffect(() => {
  if (editId) {
    const expenseData = expenseList.find(item => item.id == editId)
    
    setFormData({
      title: expenseData.title,
      category: expenseData.category,
      price: expenseData.price,
      date: expenseData.date
    })
     } 
}, [editId])
  
  return (
    <div className={styles.container}>
      <h3>{editId ? 'Edit Expense' : 'Add Expense'}</h3>
      {console.log(editId)}
      
      <form onSubmit={editId ? handleEdit : handleAdd}>
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />

        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="" disabled>Select Category</option>
          <option value="Food"></option>
          <option value="Travel">Travel</option>
          <option value="entertainment">Entertainment</option>
        </select>

        <input type="date" name="date" value={formData.date} onChange={handleChange} required />

        <Button type="submit" style="primary" shadow> {editId ? 'Edit Expense' : 'Add Expense'}</Button>
      <Button style='secondary' shadow handleClick={()=>setIsOpen(false)}> Cancel</Button>


        </form>
    </div>
  )


}

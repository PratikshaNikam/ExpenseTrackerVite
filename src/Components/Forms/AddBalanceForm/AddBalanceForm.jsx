import styles from './AddBalanceForm.module.css';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import Button from '../../Button/Button';

export default function AddBalanceForm({ setIsopen, setBalance }) {
  const [balance, setBalanceState] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Number(balance) < 0) {
      enqueueSnackbar('Balance cannot be negative', { variant: 'warning' });
      setIsopen(false);
      return;
    }
    setBalance(prev => prev + Number(balance))
    setIsopen(false);

  }
    

  return (
    <diV className={styles.container}>
      <h3>Add Balance</h3>

      <form onSubmit={handleSubmit}>

        <input type="number" placeholder="Income Amount" value={balance} onChange={(e) => setBalanceState(e.target.value)} required />
        
        <Button type="submit" style="primary" shadow>Add Balance</Button>
      <Button  style="secondary" shadow handleClick={()=>setIsopen(false)}>Cancel</Button>

        </form>

    </diV>
  )



}
import styles from './TransactionCard.module.css';
import { PiPizza, PiGift } from 'react-icons/pi';
import { BsSuitCase2 } from 'react-icons/bs';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { MdOutlineModeEdit } from 'react-icons/md';

export default function TransactionCard({ details,handleDelete,handleEdit }) {
  return (
    <div className={styles.transactionCard}>
      <div className={styles.cardInner}>
        <div className={styles.cardIcon}>
          {details.category == 'food' && <PiPizza />}
          {details.category == 'travel' && <BsSuitCase2 />}
          {details.category == 'entertainment' && <PiGift />}

        </div>
        <div className={styles.cardInfo}>
          <h5>{details.title}</h5>
          <p>{details.date}</p>

        </div>

      </div>

      <div className={styles.cardInner}>
        <p className={styles.cardPrice}>{'₹${details.price}'}</p>
        <div className={styles.cardButtonWrapper}>
          <button className={styles.cardDelete} onClick={handleDelete}>
            <IoMdCloseCircleOutline />

          </button>

          <button className={styles.cardEdit} onClick={handleEdit}>
            <MdOutlineModeEdit/>
          </button>
        </div>

      </div>
      </div>
  )}
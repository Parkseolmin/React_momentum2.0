import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Popup.module.css';

export default function Popup() {
  const user = useSelector((state) => state.user.user);
  const [isPopupOpen, setIsPopupOpen] = useState(user?.name === '게스트'); // ✅ 초기 상태: 게스트면 true

  if (!isPopupOpen) return null; // 🔥 팝업이 닫혀 있으면 아무것도 렌더링하지 않음

  return (
    <div className={styles.popupContainer}>
      <div className={styles.popup}>
        <p>⚠️ 게스트 계정은 1분동안 제한된 요청이 설정됩니다.</p>
        <button onClick={() => setIsPopupOpen(false)}>X 닫기</button>
      </div>
    </div>
  );
}

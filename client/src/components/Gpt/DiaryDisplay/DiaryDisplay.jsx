import {
  FcPortraitMode,
  FcTodoList,
  FcContacts,
  FcLikePlaceholder,
  FcNeutralDecision,
  FcGraduationCap,
} from 'react-icons/fc';
import Loading from 'components/Loading/Loading';
import styles from './DiaryDisplay.module.css';
import { useSelector } from 'react-redux';

export default function DiaryDisplay({ data, isLoading }) {
  const user = useSelector((state) => state.user.user);
  return (
    <div className={styles.DiaryContainer}>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <div className={styles.ResultTitle}>{data.title}</div>

          <div className={styles.CardContainer}>
            <div className={styles.CardTitle}>
              <FcPortraitMode style={{ marginRight: '6px' }} />
              {user.name}에게,
            </div>
            <div className={styles.CardContent}>{data.appraisal}</div>
          </div>

          <div className={styles.CardContainer}>
            <div className={styles.CardTitle}>
              <FcTodoList style={{ marginRight: '6px' }} />
              요약
            </div>
            <div className={styles.CardContent}>{data.summary}</div>
          </div>

          <div className={styles.CardContainer}>
            <div className={styles.CardTitle}>
              <FcContacts style={{ marginRight: '6px' }} />
              일기장
            </div>
            <div className={styles.CardContent}>{data.emotional_content}</div>
          </div>

          <div className={styles.CardContainer}>
            <div className={styles.CardTitle}>
              <FcLikePlaceholder style={{ marginRight: '6px' }} />
              내가 느낀 감정
            </div>
            <div className={styles.CardContent}>{data.emotional_result}</div>
          </div>

          <div className={styles.CardContainer}>
            <div className={styles.CardTitle}>
              <FcNeutralDecision style={{ marginRight: '6px' }} />
              심리 분석
            </div>
            <div className={styles.CardContent}>{data.analysis}</div>
          </div>

          <div className={styles.CardContainer}>
            <div className={styles.CardTitle}>
              <FcGraduationCap style={{ marginRight: '6px' }} />
              GPT 조언
            </div>
            <div className={styles.CardContent}>
              <ol className={styles.ActionList}>
                {(data.action_list || []).map((action, index) => (
                  <li className={styles.ActionListItem} key={index}>
                    {action}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

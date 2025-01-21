import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { BsPencil } from 'react-icons/bs';
import { IoMdTimer } from 'react-icons/io';
import { VscRobot } from 'react-icons/vsc';
import { IoHomeOutline } from 'react-icons/io5';
import WeatherDisplay from 'components/Weather/WeatherDisplay';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const navItems = [
  { to: '/', text: 'Home', icon: 'ri-home-smile-line' },
  { to: '/todo', text: 'List', icon: 'ri-quill-pen-line' },
  { to: '/pomodoro', text: 'Timer', icon: 'ri-timer-2-line' },
  { to: '/gpt', text: 'GPT', icon: 'ri-pulse-line' },
];
const queryClient = new QueryClient();
export default function Navbar() {
  return (
    <header>
      <nav className={styles.header__wrap}>
        <div className={styles.header__left}>
          <Link to={'/'} aria-label='home'>
            <IoHomeOutline />
          </Link>
          <Link to={'/todo'} aria-label='todo'>
            <BsPencil />
          </Link>
          <Link to={'/pomodoro'} aria-label='pomodoro'>
            <IoMdTimer />
          </Link>
          <Link to={'/gpt'} aria-label='gpt'>
            <VscRobot />
          </Link>
        </div>
        <div className={styles.header__right}>
          <QueryClientProvider client={queryClient}>
            <WeatherDisplay />
          </QueryClientProvider>
        </div>
        <div className={styles.site}>
          <div className={styles.container}>
            <nav className={styles.siteNav}>
              <input type='checkbox' id='link' hidden />
              <label htmlFor='link' className={styles.link}>
                <i
                  style={{ fontSize: '1.5em' }}
                  className={`${styles.menu} ri-menu-3-line ri-2x`}
                ></i>
                <i className={`${styles.close} ri-close-line ri-2x`}></i>
              </label>

              <ul className={styles.submenu}>
                {navItems.map((item, index) => (
                  <li key={index}>
                    <Link to={item.to}>
                      <span>{item.text}</span>
                      <i className={item.icon}></i>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </nav>
    </header>
  );
}

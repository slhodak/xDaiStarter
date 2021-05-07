import 'react';

type Icons = {
  email: Function,
  twitter: Function,
  website: Function,
  github: Function,
  lock: Function
}

const icons: Icons = {
  email: () => {
    return (
      <svg className='icon' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 2L11 13" stroke="#3EC6C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#3EC6C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  twitter: () => {
    return (
      <svg className='icon' width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23 2.00005C22.0424 2.67552 20.9821 3.19216 19.86 3.53005C19.2577 2.83756 18.4573 2.34674 17.567 2.12397C16.6767 1.90121 15.7395 1.95724 14.8821 2.2845C14.0247 2.61176 13.2884 3.19445 12.773 3.95376C12.2575 4.71308 11.9877 5.61238 12 6.53005V7.53005C10.2426 7.57561 8.50127 7.18586 6.93101 6.39549C5.36074 5.60513 4.01032 4.43868 3 3.00005C3 3.00005 -1 12 8 16C5.94053 17.398 3.48716 18.099 1 18C10 23 21 18 21 6.50005C20.9991 6.2215 20.9723 5.94364 20.92 5.67005C21.9406 4.66354 22.6608 3.39276 23 2.00005V2.00005Z" stroke="#3EC6C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  github: () => {
    return (
      <svg className='icon' width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 22.0001V18.1301C15.0375 17.6532 14.9731 17.1739 14.811 16.7239C14.6489 16.2738 14.3929 15.8635 14.06 15.5201C17.2 15.1701 20.5 13.9801 20.5 8.52006C20.4997 7.12389 19.9627 5.78126 19 4.77006C19.4559 3.54857 19.4236 2.19841 18.91 1.00006C18.91 1.00006 17.73 0.65006 15 2.48006C12.708 1.85888 10.292 1.85888 8 2.48006C5.27 0.65006 4.09 1.00006 4.09 1.00006C3.57638 2.19841 3.54414 3.54857 4 4.77006C3.03013 5.78876 2.49252 7.14352 2.5 8.55006C2.5 13.9701 5.8 15.1601 8.94 15.5501C8.611 15.89 8.35726 16.2955 8.19531 16.74C8.03335 17.1845 7.96681 17.6581 8 18.1301V22.0001M8 19.0001C3 20.5001 3 16.5001 1 16.0001L8 19.0001Z" stroke="#3EC6C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  website: () => {
    return (
      <svg className='icon' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 13C10.4295 13.5741 10.9774 14.0491 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59695 21.9548 8.33394 21.9434 7.02296C21.932 5.71198 21.4061 4.45791 20.4791 3.53087C19.5521 2.60383 18.298 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.46997L11.75 5.17997" stroke="#3EC6C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.0002 11C13.5707 10.4259 13.0228 9.9508 12.3936 9.60704C11.7645 9.26328 11.0687 9.05886 10.3535 9.00765C9.63841 8.95643 8.92061 9.05961 8.24885 9.3102C7.5771 9.56079 6.96709 9.95291 6.4602 10.46L3.4602 13.46C2.54941 14.403 2.04544 15.666 2.05683 16.977C2.06822 18.288 2.59407 19.542 3.52111 20.4691C4.44815 21.3961 5.70221 21.922 7.01319 21.9334C8.32418 21.9447 9.58719 21.4408 10.5302 20.53L12.2402 18.82" stroke="#3EC6C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  lock: () => {
    return (
      <svg className='lock' width="34" height="38" viewBox="0 0 34 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M28.6667 17H5.33333C3.49238 17 2 18.5467 2 20.4545V32.5455C2 34.4533 3.49238 36 5.33333 36H28.6667C30.5076 36 32 34.4533 32 32.5455V20.4545C32 18.5467 30.5076 17 28.6667 17Z" stroke="#3EC6C1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 17V10.3333C9 8.1232 9.89553 6.00358 11.4896 4.44078C13.0837 2.87797 15.2457 2 17.5 2C19.7543 2 21.9163 2.87797 23.5104 4.44078C25.1045 6.00358 26 8.1232 26 10.3333V17" stroke="#3EC6C1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
};

export default (props: { name: keyof Icons, link?: string }) => {
  const { name } = props;
  const Icon = icons[name];
  return (
    <div className={`icon_circle ${name == 'lock' ? name : ''}`}>
      <Icon />
    </div>
  )
}

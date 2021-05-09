import Icon from './Icon';

export default (props: {
    info: {
      title?: string,
      value?: string,
      unit?: string,
      button: {
        text: string,
        emphasis: number
      },
      icon?: string
      handleClick?: Function
    },
    index: number,
  }) => {
  const { info, index } = props;
  const lbr = (index + 1) % 4 != 0;
  let buttonStyle = '';
  switch(info.button.emphasis) {
    case 0:
      buttonStyle = ' dark_button';
      break;
    case 1:
      buttonStyle = ' dull_button';
      break;
    case 2:
    default:
      buttonStyle = '';
  }
  return (
    <div className={`investment_detail_info_block ${lbr ? 'light_border_right' : ''}`}>
      <div className="investment_detail_text">
        {info.icon && info.icon == 'lock' ? <Icon name='lock' /> : <p className="detail_title">{info.title}</p>}
        <p className="detail_value">{info.value} {info.unit}</p>
      </div>
      <button className={`btn${buttonStyle}`} onClick={(e) => info.handleClick && info.handleClick(e)}>{info.button.text}</button>
    </div>
  )
}

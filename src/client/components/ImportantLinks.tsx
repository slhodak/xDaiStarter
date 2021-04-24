import Icon from './Icon';

export default (props: { info: { title: string, link?: string } }) => {
  const { info } = props;
  const isConnectBlock = info.title == 'Connect';
  return (
    <div className={`important_link_block${isConnectBlock ? ' connect_links' : ''}`}>
      <p className='detail_title'>{info.title}</p>
      {isConnectBlock ?
        <div className='connect_link_icons'>
          <Icon name='email' />
          <Icon name='twitter' />
          <Icon name='github' />
          <Icon name='website' />
        </div> :
        <a href="">{info.link}</a>}
    </div>
  )
}

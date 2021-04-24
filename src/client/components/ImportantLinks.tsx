import Icon from './Icon';

const tokenAddressUrl = (address?: string) => `https://blockscout.com/xdai/mainnet/tokens/${address}`;

export default (props: { info: { title: string, address?: string } }) => {
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
        <a href={tokenAddressUrl(info.address)}>{info.address}</a>}
    </div>
  )
}

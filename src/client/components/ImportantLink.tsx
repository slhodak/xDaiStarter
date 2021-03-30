export default (props: { info: { title: string, link?: string, images?: { image: string; link: string; }[] } }) => {
  const { info } = props;
  const isConnectBlock = info.title == 'Connect';
  return (
    <div className={`important_link_block${isConnectBlock ? ' connect_links' : ''}`}>
      <p className='detail_title'>{info.title}</p>
      {isConnectBlock ?
        <div className='connect_link_images'>
          <img src='' alt='email'></img>
          <img src='' alt='twitter'></img>
          <img src='' alt='github'></img>
          <img src='' alt='website'></img>
        </div> :
        <a href="">{info.link}</a>}
    </div>
  )
}

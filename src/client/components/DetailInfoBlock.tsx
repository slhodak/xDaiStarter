export default (props: { info: { title: string, value: number, unit: string }, index: number, totalBlocks: number }) => {
  const { info, index, totalBlocks } = props;
  const ibr = (index + 1) % 4 != 0;
  const ibb = index < totalBlocks - 4;
  return (
    <div className={`pool_detail_info_block ${ibb ? 'light_border_bottom' : ''} ${ibr ? 'light_border_right' : ''}`}>
      <p className="detail_block_title">{info.title}</p>
      <p className="detail_block_value">{info.value} {info.unit}</p>
    </div>
  )

}
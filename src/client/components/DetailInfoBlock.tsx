export default (props: { info: { title: string, value: number, unit: string }, index: number, totalBlocks: number }) => {
  const { info, index, totalBlocks } = props;
  const lbr = (index + 1) % 4 != 0;
  const lbb = index < totalBlocks - 4;
  return (
    <div className={`pool_detail_info_block ${lbb ? 'light_border_bottom' : ''} ${lbr ? 'light_border_right' : ''}`}>
      <p className="detail_title">{info.title}</p>
      <p className="detail_value">{info.value} {info.unit}</p>
    </div>
  )

}
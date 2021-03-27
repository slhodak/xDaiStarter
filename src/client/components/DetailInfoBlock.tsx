export default (props: { info: { title: string, value: string } }) => {
  const { info } = props;
  return (
    <div className="pool_detail_info_block">
      <p className="detail_block_title">{info.title}</p>
      <p className="detail_block_value">{info.value}</p>
    </div>
  )

}
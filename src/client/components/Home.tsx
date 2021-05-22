import Footer from './Footer';
import Pools from './Pools';
import ActionCall from './ActionCall';

export default (props: any) => {
  return (
    <div>
      <ActionCall top={true}/>
      <Pools />
      <ActionCall top={false}/>
      <Footer />
    </div>
  )
}

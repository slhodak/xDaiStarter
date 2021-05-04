import Header from './Header';
import Footer from './Footer';
import Pools from './Pools';
import ActionCall from './ActionCall';

export default (props: any) => {
  return (
    <div>
      <Header />
      <ActionCall top={true}/>
      <Pools />
      <ActionCall top={false}/>
      <Footer />
    </div>
  )
}

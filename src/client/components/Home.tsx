import Header from './Header';
import Footer from './Footer';
import Pools from './Pools';
import ActionCall from './ActionCall';

const testPools = ['a', 'b', 'c', 'd', 'e'];

export default (props: any) => {
  return (
    <div>
      <Header />
      <ActionCall top={true}/>
      <Pools pools={testPools}/>
      <ActionCall top={false}/>
      <Footer />
    </div>
  )
}

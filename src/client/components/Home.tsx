import Header from './Header';
import Footer from './Footer';
import ActionCall from './ActionCall';
import Pools from './Pools';

const testPools = ['a', 'b', 'c'];

export default (props: any) => {
  const { selectPage } = props;
  return (
    <div>
      <Header selectPage={selectPage} />
      <ActionCall top={true} />
      <Pools pools={testPools} />
      <ActionCall top={false} />
      <Footer />
    </div>
  )
}
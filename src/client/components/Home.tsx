import Header from './Header';
import Footer from './Footer';
import Pools from './Pools';
import ActionCall from './ActionCall';

const testPools = ['a', 'b', 'c', 'd', 'e'];

export default (props: { selectPage: Function }) => {
  const { selectPage } = props;
  return (
    <div>
      <Header selectPage={selectPage} />
      <Pools pools={testPools} />
      <ActionCall top={false} selectPage={selectPage}/>
      <Footer />
    </div>
  )
}
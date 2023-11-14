import Main from './views/main';
import BoarderVar from './views/boardervar';
import RecoilRootWrapper from './recoil/RecoilRootWrapper';
import axios from 'axios';
export default function Home() {
  return (
    <RecoilRootWrapper>
      <Main>
        <BoarderVar></BoarderVar>
      </Main>
    </RecoilRootWrapper>
  )
}

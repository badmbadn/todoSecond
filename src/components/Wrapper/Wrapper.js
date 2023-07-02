import styled from 'styled-components';

const Main = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 17.5vw;
  font-family: 'Inter', sans-serif;
`;

function Wrapper({ children }) {
  return <Main>{children}</Main>;
}

export default Wrapper;

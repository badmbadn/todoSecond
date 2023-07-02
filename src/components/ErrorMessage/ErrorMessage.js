import styled from 'styled-components';

const Message = styled.section`
  color: #f5222d;
  text-align: center;
  margin-top: 33vh;
  font-weight: bold;
`;

function ErrorMessage() {
  return <Message>Server respone whith error.</Message>;
}

export default ErrorMessage;

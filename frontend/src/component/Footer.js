import styled from "styled-components";

const FooterWrapper = styled.div`
  background: white;
`

const FooterContainer = styled.div`
  width: 1200px;
  display: flex;
  background: white;
  padding-top: 1.5rem;
  margin-left: auto;
  margin-right: auto;

  div {
    width: 200px;
    height: 200px;
    text-align: center;
  }
`

export default function Footer() {
  return (
    <FooterWrapper className="footer">
      <FooterContainer className="footer-container">
        <div>CHĂM SÓC KHÁCH HÀNG</div>
        <div>VỀ SHOPEE</div>
        <div>THANH TOÁN</div>
        <div>THEO DÕI CHÚNG TÔI TRÊN</div>
        <div>ĐƠN VỊ VẬN CHUYỂN</div>
        <div>TẢI SHOPEE</div>
      </FooterContainer>
    </FooterWrapper>
  )
}
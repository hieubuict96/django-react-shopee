import styled from "styled-components";

export const CartWrapper = styled.div``;

export const CartBody = styled.div`
  margin-top: 8rem;
  min-width: 1200px;
  padding: 2rem;
  background: rgb(245, 245, 245);

  .cart-loading {
    width: calc(1200px - 4rem);
    margin-left: auto;
    margin-right: auto;

    .top {
      background: white;
      height: 3rem;
      display: flex;
      align-items: center;
      border-radius: 3px;

      span {
        background: rgb(230, 230, 230);
        width: 5rem;
        height: 1.5rem;
      }

      .top-1 {
        margin-left: 2rem;
      }

      .top-2 {
        margin-left: auto;
        margin-right: 10rem;
      }

      .top-3 {
        margin-right: 10rem;
      }

      .top-4 {
        margin-right: 2rem;
      }
    }

    .product {
      border-radius: 3px;
      margin-top: 3rem;
      height: 8rem;
      background: white;
      display: flex;
      align-items: center;

      .product-1 {
        margin-left: 2rem;
        width: 15rem;
        height: 5rem;
        background: rgb(230, 230, 230);
      }

      .product-2 {
        width: 5rem;
        height: 2rem;
        background: rgb(230, 230, 230);
        margin-left: auto;
        margin-right: 10rem;
      }

      .product-3 {
        width: 5rem;
        height: 2rem;
        background: rgb(230, 230, 230);
        margin-right: 10rem;
      }

      .product-4 {
        width: 5rem;
        height: 2rem;
        background: rgb(230, 230, 230);
        margin-right: 2rem;
      }
    }
  }

  .cart-empty {
    width: calc(1200px - 4rem);
    margin-left: auto;
    margin-right: auto;
    background: white;
    height: 5rem;
    border-radius: 3px;
    font-size: 2rem;
    text-align: center;
    line-height: 5rem;
    font-weight: 500;
    color: rgb(239, 77, 45);
  }

  .cart-content {
    width: calc(1200px - 4rem);
    margin-left: auto;
    margin-right: auto;


    .notify-order {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 150;
  
      .modal {
        width: 16rem;
        height: 5rem;
        background: rgba(0, 0, 0, 0.6);
        border-radius: 5px;
        padding: 0.5rem;
        display: flex;
        flex-direction: column;
  
        .h1 {
          text-align: center;
          color: white;
        }
  
        .h2 {
          display: flex;
          margin-top: auto;
  
          span {
            margin: auto;
            height: 1.5rem;
            width: 1.5rem;
            line-height: 1.5rem;
            border-radius: 50%;
            display: flex;
            background: rgb(214, 200, 100);
  
            svg {
              margin: auto;
            }
          }
        }
      }
    }


    .top {
      background: white;
      height: 3rem;
      display: flex;
      align-items: center;
      border-radius: 3px;

      span {
        height: 1.5rem;
        text-align: center;
      }

      .top-1 {
        flex-grow: 1;
        margin-left: 2rem;
        text-align: left;
      }

      .top-2 {
        width: 10rem;
      }

      .top-3 {
        width: 10rem;
      }

      .top-4 {
        width: 10rem;
      }

      .top-5 {
        width: 10rem;
      }
    }

    .product {
      border-radius: 3px;
      margin-top: 3rem;
      height: 8rem;
      background: white;
      display: flex;
      align-items: center;
      text-align: center;

      .product-1 {
        margin-left: 2rem;
        height: 5rem;
        display: flex;
        align-items: center;
        flex-grow: 1;

        .a {
          display: block;
          height: 100%;

          img {
            height: 100%;
            object-fit: contain;
          }
        }

        .b {
          margin-left: 1rem;
        }
      }

      .product-2 {
        width: 10rem;
      }

      .product-3 {
        width: 10rem;

        .t1 {
          display: flex;
          justify-content: center;

          button {
            width: 2rem;
            border: 0.1px solid rgb(219, 219, 219);
          }

          span {
            width: 2rem;
          }
        }
        
        .t2 {
          margin-top: 0.25rem;
        }
      }

      .product-4 {
        width: 10rem;
      }

      .product-5 {
        width: 10rem;
        
        button {
          color: blue;
        }
      }
    }

    .total {
      margin-top: 3rem;
      background: white;
      height: 4rem;
      border-radius: 3px;
      display: flex;
      justify-content: center;
      align-items: center;

      .s1 {
        font-size: 1.2rem;
        color: rgb(239, 77, 45);
      }

      .s2 {
        margin-left: 1rem;
        font-size: 1.2rem;
      }

      button {
        margin-left: 5rem;
        height: 2.5rem;
        background: rgb(243, 131, 108);
        color: white;
        font-weight: 500;
        padding: 0 1rem;
      }
    }
  }
`;

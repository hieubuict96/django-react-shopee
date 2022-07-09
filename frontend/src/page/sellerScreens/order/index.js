import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrderListAction } from "../../../action/orderAction";
import { OrderWrapper, ListOrder, ListOrderLoading } from "./styled";
import { CardLoaded, CardLoading } from "../../../component/Card";

export default function Order() {
  const [listOrder, setListOrder] = useState({
    isGet: false,
    productsOrder: [],
  });
  const user = useSelector((s) => s.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderListAction(user._id, setListOrder));
  }, []);

  return (
    <OrderWrapper className="order">
      <h1>ĐƠN HÀNG ĐÃ ĐẶT</h1>
      <hr />
      <div className="list-order">
        {listOrder.isGet ? (
          <ListOrder className="list-order">
            {listOrder.productsOrder.map((value, key) => (
              <CardLoaded
                height="10rem"
                width="8rem"
                src={`${value.productImages[0]}`}
                name={`${value.name}`}
                to={`/seller/order/${value._id}`}
              />
            ))}
          </ListOrder>
        ) : (
          <ListOrderLoading className="list-order-loading">
            {["", "", "", "", "", "", "", ""].map((value, key) => (
              <CardLoading key={key} height="10rem" width="8rem" />
            ))}
          </ListOrderLoading>
        )}
      </div>
    </OrderWrapper>
  );
}

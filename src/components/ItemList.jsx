import Item from "../Item";

function ItemList({
  itemsToRender,
  itemsOnPage,
  currentPage,
  children,
  noItems,
}) {
  return (
    <div className="itemList">
      {noItems ? (
        <div className="noItems">
          <div className="noItems-inner">
            По вашему запросу ничего не нашлось
          </div>
        </div>
      ) : (
        <>
          <table className="itemList-table">
            <tbody>
              <tr>
                <th className="itemList-column-heading">№</th>
                <th className="itemList-column-heading">Название</th>
                <th className="itemList-column-heading">Бренд</th>
                <th className="itemList-column-heading">Цена</th>
                <th className="itemList-column-heading">Артикул</th>
              </tr>
              {itemsToRender.map((item, index) => {
                return (
                  <Item
                    name={item.product}
                    price={item.price}
                    id={item.id}
                    brand={item.brand}
                    index={index + 1 + (currentPage - 1) * itemsOnPage}
                    key={item.id}
                  />
                );
              })}
            </tbody>
          </table>

          {children}
        </>
      )}
    </div>
  );
}

export default ItemList;

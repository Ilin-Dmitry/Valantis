function Item({ name, price, id, brand, index }) {
  return (
    <tr className="item">
      <td className="item-cell">{index}</td>
      <td className="item-cell">{name}</td>
      <td className="item-cell">{brand ? brand : "-"}</td>
      <td className="item-cell">
        <strong>{price}</strong>
      </td>
      <td className="item-cell">{id}</td>
    </tr>
  );
}

export default Item;

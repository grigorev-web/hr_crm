export default function Table(props) {
  return (
    <div className="app-page">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Имя</th>
            <th scope="col">Телефон</th>
            <th scope="col">Город</th>
            <th scope="col">Комментарий</th>
            <th scope="col">Статус</th>
          </tr>
        </thead>
        <tbody>
          {props.persons.map((person) => (
            <tr>
              <td>{person.id}</td>
              <td>{person.name}</td>
              <td>{person.phone}</td>
              <td>{person.city}</td>
              <td>{person.comment}</td>
              <td></td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

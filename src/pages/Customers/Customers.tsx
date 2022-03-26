import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/Loading';
import { CustomerList } from '../../context/CustomersContext';
import { useCustomer } from '../../hooks/useCustomers';
import { useLocalStorage } from '../../hooks/useStorage';

export function Customers() {
  const { customers, loading, error, fetchCustomers, delCustomer } =
    useCustomer();

  // Similar to useState but first arg is key to the value in local storage.
  const [, setStorage] = useLocalStorage(`@customers`, {} as CustomerList);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return loading ? (
    <Loading />
  ) : error ? (
    <h2>{error}</h2>
  ) : (
    <div className="content">
      <div className="help-buttons-flex">
        <h1>Clientes</h1>
        <Link
          to="/customers/new"
          className="btn btn-primary"
          onClick={() => setStorage({} as CustomerList)}
        >
          novo <i className="fa-solid fa-plus"></i>
        </Link>
      </div>
      <ul className="ul-content-list">
        <li>
          <span>Nome</span>
          <span>Ações</span>
        </li>
        {customers.data.map(items => (
          <li key={items.id}>
            <span>{items.first_name}</span>
            <span>
              <Link
                to={`/customers/${items.id}/edit`}
                className="btn btn-default"
              >
                editar <i className="fa-solid fa-pen-to-square"></i>
              </Link>
              <span
                onClick={() => delCustomer(items.id)}
                className="btn btn-danger"
              >
                excluir <i className="fa-solid fa-trash"></i>
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

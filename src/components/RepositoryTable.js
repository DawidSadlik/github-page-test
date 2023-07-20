import { React } from "react";
import { useMeOnGitHubContextProvider } from "../context/MeOnGitHubContextProvider";
import { Table } from "react-bootstrap";
import { ReposListPagination } from "./ReposListPagination";

const RepositoryTable = () => {
  const { repositories } = useMeOnGitHubContextProvider();

  if (!repositories) return <h1>Loading...</h1>;
  if (repositories.length === 0) return <h1>Empty</h1>;

  return (
    <>
      <Table>
        <tbody>
          {repositories.map((r) => (
            <tr>
              <td key={r.name}>{r.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ReposListPagination />
    </>
  );
};
export default RepositoryTable;

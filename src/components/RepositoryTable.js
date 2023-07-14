import { React } from "react";
import { useMeOnGitHubContextProvider } from "../context/MeOnGitHubContextProvider";
import { Table } from "react-bootstrap";
import { ReposListPagination } from "./ReposListPagination";

const RepositoryTable = () => {
  const { repositories } = useMeOnGitHubContextProvider();

  return (
    <>
      <Table>
        <tbody>
          {repositories.map((r) => (
            <tr>
              <td>{r.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ReposListPagination />
    </>
  );
};
export default RepositoryTable;

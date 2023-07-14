import { React, useState } from "react";
import { Pagination } from "react-bootstrap";
import { useMeOnGitHubContextProvider } from "../context/MeOnGitHubContextProvider";

export const ReposListPagination = () => {
  const { reposResponseHeaders } = useMeOnGitHubContextProvider();
  const [options, setOptions] = useState({
    prevEnabled: false,
    leftEllipsisVisible: false,
    item1Visible: false,
    item1Value: undefined,
    item2Visible: false,
    item2Value: undefined,
    item3Visible: false,
    item3Value: undefined,
    rightEllipsisVisible: false,
    nextEnabled: false,
  });

  if (reposResponseHeaders.last && reposResponseHeaders.last >= 1) {
    setOptions({ ...options, item1Value: 1, item1Visible: true });
  }

  return (
    <>
      <Pagination>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Ellipsis />
        {options.item1Visible && (
          <Pagination.Item>{options.item1Value}</Pagination.Item>
        )}
        {options.item2Visible && (
          <Pagination.Item>{options.item2Value}</Pagination.Item>
        )}
        {options.item3Visible && (
          <Pagination.Item>{options.item3Value}</Pagination.Item>
        )}
        <Pagination.Ellipsis />
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </>
  );
};

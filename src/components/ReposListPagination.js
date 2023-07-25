import { React, useState } from "react";
import { Pagination } from "react-bootstrap";
import { useMeOnGitHubContextProvider } from "../context/MeOnGitHubContextProvider";

export const ReposListPagination = () => {
  const { reposResponseHeaders, setNewReposPageUrlProvided } =
    useMeOnGitHubContextProvider();
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

  let newOptions = { ...options };
  const currentPageNumber = reposResponseHeaders.currentPageNumber;

  if (reposResponseHeaders.last && reposResponseHeaders.lastPageNumber < 2) {
    newOptions = {
      ...newOptions,
      item1Value: 1,
      item1Visible: true,
      item2Visible: false,
      item3Visible: false,
    };
  } else if (
    reposResponseHeaders.last &&
    reposResponseHeaders.lastPageNumber < 3
  ) {
    newOptions = {
      ...newOptions,
      item1Value: 1,
      item2Value: 2,
      item1Visible: true,
      item2Visible: true,
      item3Visible: false,
    };
  } else if (currentPageNumber === 1) {
    newOptions = {
      ...newOptions,
      item1Value: 1,
      item2Value: 2,
      item3Value: 3,
      item1Visible: true,
      item2Visible: true,
      item3Visible: true,
    };
  } else if (currentPageNumber === reposResponseHeaders.lastPageNumber) {
    newOptions = {
      ...newOptions,
      item1Value: reposResponseHeaders.lastPageNumber - 2,
      item2Value: reposResponseHeaders.lastPageNumber - 1,
      item3Value: reposResponseHeaders.lastPageNumber,
      item1Visible: true,
      item2Visible: true,
      item3Visible: true,
    };
  } else {
    newOptions = {
      ...newOptions,
      item1Value: currentPageNumber - 1,
      item2Value: currentPageNumber,
      item3Value: currentPageNumber + 1,
      item1Visible: true,
      item2Visible: true,
      item3Visible: true,
    };
  }

  if (currentPageNumber == reposResponseHeaders.lastPageNumber)
    if (newOptions.item1Visible) {
      newOptions = {
        ...newOptions,
        leftEllipsisVisible: newOptions.item1Value > 1,
      };
    }

  if (
    Object.entries(options).toString() !== Object.entries(newOptions).toString()
  ) {
    setOptions(newOptions);
  }

  function paginationButtonClicked(buttonType, value) {
    switch (buttonType) {
      case BUTTON_TYPE.FIRST:
        setNewReposPageUrlProvided(reposResponseHeaders.first);
        break;
      case BUTTON_TYPE.PREV:
        break;
      case BUTTON_TYPE.RIGHT_ELLIPSIS:
        break;
      case BUTTON_TYPE.ITEM1:
      case BUTTON_TYPE.ITEM2:
      case BUTTON_TYPE.ITEM3:
        setNewReposPageUrlProvided(
          reposResponseHeaders.emptyTemplate + `&page=${value}`
        );
        break;
      case BUTTON_TYPE.LEFT_ELLIPSIS:
        break;
      case BUTTON_TYPE.NEXT:
        break;
      case BUTTON_TYPE.LAST:
        setNewReposPageUrlProvided(reposResponseHeaders.last);
        break;
    }
  }

  return (
    <>
      <Pagination>
        <Pagination.First
          onClick={() => paginationButtonClicked(BUTTON_TYPE.FIRST)}
        />
        <Pagination.Prev />
        {options.leftEllipsisVisible && (
          <Pagination.Ellipsis
            onClick={() => paginationButtonClicked(BUTTON_TYPE.LEFT_ELLIPSIS)}
          />
        )}
        {options.item1Visible && (
          <Pagination.Item
            onClick={() =>
              paginationButtonClicked(BUTTON_TYPE.ITEM1, options.item1Value)
            }
          >
            {options.item1Value}
          </Pagination.Item>
        )}
        {options.item2Visible && (
          <Pagination.Item
            onClick={() =>
              paginationButtonClicked(BUTTON_TYPE.ITEM2, options.item2Value)
            }
          >
            {options.item2Value}
          </Pagination.Item>
        )}
        {options.item3Visible && (
          <Pagination.Item
            onClick={() =>
              paginationButtonClicked(BUTTON_TYPE.ITEM3, options.item3Value)
            }
          >
            {options.item3Value}
          </Pagination.Item>
        )}
        {options.rightEllipsisVisible && <Pagination.Ellipsis />}
        <Pagination.Next />
        <Pagination.Last
          onClick={() => paginationButtonClicked(BUTTON_TYPE.LAST)}
        />
      </Pagination>
    </>
  );
};

const BUTTON_TYPE = {
  FIRST: "first",
  PREV: "prev",
  LEFT_ELLIPSIS: "leftEllipsis",
  ITEM1: "item1",
  ITEM2: "item2",
  ITEM3: "item3",
  RIGHT_ELLIPSIS: "rightEllipsis",
  NEXT: "next",
  LAST: "last",
};

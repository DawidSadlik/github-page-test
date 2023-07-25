import { createContext, useContext, useEffect, useState } from "react";

const MeOnGitHubContext = createContext({
  user: undefined,
  repositories: [],
  currentRepository: undefined,
  setCurrentRepository: () => {},
  reposResponseHeaders: undefined,
  setNewReposPageUrlProvided: () => {},
});

export const MeOnGitHubContextProvider = ({ children, userName }) => {
  const [user, setUser] = useState(undefined);
  const [repositories, setRepositories] = useState([]);
  const [currentRepository, setCurrentRepository] = useState(undefined);
  const [reposResponseHeaders, setReposresponseHeaders] = useState(
    createLinksResponse()
  );
  const [newReposPageUrlProvided, setNewReposPageUrlProvided] =
    useState(undefined);

  useEffect(() => {
    Promise.all([
      fetch(`https://api.github.com/users/${userName}`),
      fetch(`https://api.github.com/users/${userName}/repos`),
    ])
      .then(([userResponse, reposResponse]) => {
        setReposresponseHeaders(
          formatPagingLinks(reposResponse.headers.get("link"))
        );
        Promise.all([userResponse.json(), reposResponse.json()])
          .then(([userData, reposData]) => {
            setRepositories(reposData);
            setUser(userData);
          })
          .catch((parsingError) => {});
      })
      .catch((fetchinError) => {});
  }, []);

  useEffect(() => {
    if (!newReposPageUrlProvided) {
      return;
    }

    fetch(newReposPageUrlProvided)
      .then((response) => {
        setReposresponseHeaders(
          formatPagingLinks(response.headers.get("link"))
        );
        return response.json();
      })
      .then((data) => {
        setRepositories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [newReposPageUrlProvided]);

  return (
    <MeOnGitHubContext.Provider
      value={{
        user,
        repositories,
        currentRepository,
        setCurrentRepository,
        reposResponseHeaders,
        setNewReposPageUrlProvided,
      }}
    >
      {children}
    </MeOnGitHubContext.Provider>
  );
};

function createLinksResponse() {
  return {
    first: undefined, //url to first page
    last: undefined, //url to last page
    next: undefined, //url to next page
    prev: undefined, //url to prev page
    emptyTemplate: undefined, //url as a template to use with page number
    prevPageNumber: -1, //previous page number if exists
    nextPageNumber: -1, //next page number if exists
    lastPageNumber: -1, //last page number
    get currentPageNumber() {
      if (this.prevPageNumber === -1 && this.nextPageNumber === 2) return 1;
      else if (this.prevPageNumber > 0 && this.nextPageNumber > 0)
        return this.prevPageNumber + 1;
      else if (this.prevPageNumber > 0 && this.nextPageNumber === -1)
        return this.lastPageNumber;
    },
  };
}

function formatPagingLinks(linkHeaderValue) {
  const linksByRel = linkHeaderValue.split(",");
  let result = createLinksResponse();

  const linkFirst = linksByRel.find((l) => l.includes('rel="first"'));
  const linkNext = linksByRel.find((l) => l.includes('rel="next"'));
  const linkPrev = linksByRel.find((l) => l.includes('rel="prev"'));
  const linkLasr = linksByRel.find((l) => l.includes('rel="last"'));

  if (linkFirst && linkPrev) {
    result.first = extractUrlFromLink(linkFirst);
    result.prev = extractUrlFromLink(linkPrev);
    result.prevPageNumber = extractPageValueFromUrl(result.prev);
    result.lastPageNumber = result.prevPageNumber + 1;
    result.nextPageNumber = -1;
  } else if (linkLasr && linkNext) {
    result.last = extractUrlFromLink(linkLasr);
    result.next = extractUrlFromLink(linkNext);
    result.prevPageNumber = -1;
    result.lastPageNumber = extractPageValueFromUrl(result.last);
    result.nextPageNumber = extractPageValueFromUrl(result.next);
  } else if (linkPrev && linkNext) {
    result.prev = extractUrlFromLink(linkPrev);
    result.next = extractUrlFromLink(linkNext);
    result.prevPageNumber = extractPageValueFromUrl(result.prev);
    result.nextPageNumber = extractPageValueFromUrl(result.next);
  } else {
    throw Error("Unhandled pagination case");
  }

  result.emptyTemplate = extractPageUrl(result.prev ?? result.next);

  // linksByRel.forEach((link) => {
  //   if (link.includes('rel="first"')) {
  //     result.first = extractUrlFromLink(link);
  //   } else if (link.includes('rel="last"')) {
  //     result.last = extractUrlFromLink(link);
  //     result.lastPageNumber = extractPageValueFromUrl(result.last);
  //   } else if (link.includes('rel="prev"')) {
  //     result.prev = extractUrlFromLink(link);
  //     result.prevPageNumber = extractPageValueFromUrl(result.prev);
  //   } else if (link.includes('rel="next"')) {
  //     result.next = extractUrlFromLink(link);
  //     result.nextPageNumber = extractPageValueFromUrl(result.next);
  //   }
  // });
  return result;
}

function extractUrlFromLink(linkWithUrlInside) {
  return linkWithUrlInside.substring(
    linkWithUrlInside.indexOf("<") + 1,
    linkWithUrlInside.lastIndexOf(">")
  );
}

function extractPageValueFromUrl(url) {
  const parametersSubstring = url.substring(url.indexOf("?"));
  const parameters = new URLSearchParams(parametersSubstring);
  return parseInt(parameters.get("page")) ?? -1;
}

function extractPageUrl(url) {
  return url.substring(0, url.indexOf("?") + 1);
}

export const useMeOnGitHubContextProvider = () => {
  return useContext(MeOnGitHubContext);
};

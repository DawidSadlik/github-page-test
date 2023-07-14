import { createContext, useContext, useEffect, useState } from "react";

const MeOnGitHubContext = createContext({
  user: undefined,
  repositories: [],
  currentRepository: undefined,
  setCurrentRepository: () => {},
  reposResponseHeaders: undefined,
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
      .then((response) => response.json())
      .then((data) => setRepositories(data));
  }, [newReposPageUrlProvided]);

  return (
    <MeOnGitHubContext.Provider
      value={{
        user,
        repositories,
        currentRepository,
        setCurrentRepository,
        reposResponseHeaders,
      }}
    >
      {children}
    </MeOnGitHubContext.Provider>
  );
};

function createLinksResponse() {
  return {
    first: undefined,
    last: undefined,
    next: undefined,
    prev: undefined,
    prevPageNumber: -1,
    nextPageNumber: -1,
    lastPageNumber: -1,
  };
}

function formatPagingLinks(linkHeaderValue) {
  const linksByRel = linkHeaderValue.split(",");
  let result = createLinksResponse();
  linksByRel.forEach((link) => {
    if (link.includes('rel="first"')) {
      result.first = extractUrlFromLink(link);
    } else if (link.includes('rel="last"')) {
      result.last = extractUrlFromLink(link);
      result.lastPageNumber = extractPageValueFromUrl(result.last);
    } else if (link.includes('rel="prev"')) {
      result.prev = extractUrlFromLink(link);
      result.prevPageNumber = extractPageValueFromUrl(result.prev);
    } else if (link.includes('rel="next"')) {
      result.next = extractUrlFromLink(link);
      result.nextPageNumber = extractPageValueFromUrl(result.next);
    }
  });
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

export const useMeOnGitHubContextProvider = () => {
  return useContext(MeOnGitHubContext);
};

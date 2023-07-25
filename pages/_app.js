import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { setContext } from "@apollo/client/link/context";
import Navbar from "../components/NavBar";
import Cookies from 'js-cookie';
import { onError } from "@apollo/client/link/error";
import { AuthProvider } from "../context/authContext";
import { useRouter } from "next/router";

const httpLink = new HttpLink({
  uri: "/api/graphql",
  credentials: 'include',
});


const requestLogger = new ApolloLink((operation, forward) => {
  console.log("Request:", operation);

  let headers = operation.getContext().headers;
  console.log("Headers:", headers);

  let token;
  if (headers) {
    token = headers.authorization;
  }

  console.log(`Extracted token: ${token}`);

  return forward(operation);
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = Cookies.get('jwtToken');

  Cookies.set('jwtToken', token);
  console.log('Token set in cookies:', Cookies.get('jwtToken')); // This should print your token
  

  // return the headers to the context so httpLink can read them
  const newHeaders = {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };

  console.log(`New headers: ${JSON.stringify(newHeaders.headers)}`);

  return newHeaders;
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: ApolloLink.from([requestLogger, errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [DynamicComponent, setDynamicComponent] = useState();

  useEffect(() => {
    async function load() {
      if(Component.displayName === 'HomePage') {
        const dynamicComponent = (await dynamic(() => import("../pages"), { ssr: false })).default;
        setDynamicComponent(() => dynamicComponent);
      } else {
        setDynamicComponent(() => Component);
      }
    }

    load();
  }, [Component]);

  const pageBackground = () => {
    const route = router.pathname;
    if (route === "/") {
      return "bg-girl bg-no-repeat bg-cover min-h-screen";
    } else if (route === "/leaderboard") {
      return "bg-leaderboard min-h-screen";
    } else if (route === "/about") {
      return "bg-about min-h-screen";
    } else {
      return "min-h-screen";
    }
  };
  

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Navbar />
        <div className={`${pageBackground()} min-h-screen`}>
          {DynamicComponent && <DynamicComponent {...pageProps} />}
        </div>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;


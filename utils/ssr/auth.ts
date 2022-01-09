import Cookies from "cookies";
import { GetServerSideProps } from "next";
import { setAccessToken } from "../../api";

export function withAuth<T>(fn: GetServerSideProps<T>): GetServerSideProps<T> {
  return async (context) => {
    const cookies = new Cookies(context.req, context.res);
    const token = cookies.get("accessToken") ?? null;

    if (token === null) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    setAccessToken(token);

    const result = await fn(context);

    if ("props" in result) {
      return { props: { ...result.props, accessToken: token } };
    }

    return result;
  };
}

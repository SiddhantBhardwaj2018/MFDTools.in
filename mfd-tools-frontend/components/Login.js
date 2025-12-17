import React, { useRef, useEffect, useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";

const Login = () => {
  const elementsRef = useRef([]);

  const { user, login, isError, isLoading } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const triggerLogin = () => {
    login(email, password);
  };

  useEffect(() => {
    let role = localStorage.getItem("role");
    if (role) {
      if (role == "ROLE_ADMIN") {
        router.push("/admin");
      } else if (role == "ROLE_PARTNER") {
        router.push("/partner");
      }
    }

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection);
    console.log(elementsRef.current);
    elementsRef.current.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    // Cleanup observer on component unmount
    return () => {
      elementsRef.current.forEach((element) => {
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const handleKeyPress = (event) => {
    console.log(event);
    if (event.key === "Enter") {
      triggerLogin();
    }
  };

  return (
    <>
      <div style={{ margin: "0 4rem" }}>
        <h2
          style={{ marginTop: "25rem" }}
          className="animate-fade-in text-5xl text-center font-extrabold "
          ref={(el) => (elementsRef.current[0] = el)}
        >
          Login
        </h2>
        <form
          ref={(el) => (elementsRef.current[1] = el)}
          className="animate-fade-in mt-10 mb-10 max-w-sm mx-auto"
          onSubmitCapture={(e) => {
            console.log(e);
            e.preventDefault();
            triggerLogin();
          }}
        >
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Your email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Your password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
            className="mt-10"
          >
            <button
              type="submit"
              className="text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                {isLoading ? (
                  <div role="status" style={{ marginTop: "1.5px" }}>
                    <svg
                      aria-hidden="true"
                      style={{ marginRight: "10px" }}
                      className="w-4 h-4 text-gray-200 animate-spin  fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </div>
                ) : (
                  <></>
                )}
                {"  "}
                <span>Submit</span>
              </div>
            </button>
          </div>
          {isError ? (
            <p
              id="filled_error_help"
              className="mt-5 text-center text-sm text-red-600"
            >
              <span className="font-medium">{isError}</span>
            </p>
          ) : (
            <></>
          )}
          <p id="filled_error_help" className="mt-5 text-center text-sm">
            <span className="font-medium">
              <Link
                href="/forgotPassword"
                className="text-blue-600 visited:text-purple-600 ..."
              >
                Forgot Password
              </Link>
            </span>
          </p>
        </form>
        <br />
        <br />
      </div>
    </>
  );
};

export default Login;
import React, { useState, useEffect } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
    { name: "create Post", slug: "/create-post", active: authStatus },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 bg-primary mb-4 border-border border-2`}
    >
      <Container>
        <nav className="flex flex-row justify-between items-center py-3 px-6 ">
          {/* Logo Section */}
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul
            className={`z-10 flex flex-col md:flex-row md:static md:justify-end items-center absolute left-0  md:bg-transparent bg-slate-900 w-full ease-in-out transition-all duration-300 ${
              mobile ? "top-12" : "left-80" } md:py-0 py-6`}
          >
            {navItems.map((item) =>
              item.active ? (
                <li
                  key={item.name}
                  className="inline-block px-8 py-1 duration-200 mx-2 hover:bg-button hover:text-black rounded-md"
                >
                  <button onClick={() => navigate(item.slug)}>{item.name}</button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li className="duration-200 hover:bg-slate-700 rounded-sm ml-4 bg-button my-2 w-[100px]">
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden block text-white  "
            onClick={() => setMobile(!mobile)}
          >
            {!mobile ? "=" : "X"}
          </button>
        </nav>
      </Container>
    </header>
  );
};

export default Header;

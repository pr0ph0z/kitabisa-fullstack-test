import { Link, useNavigate } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";

export default function Menu() {
  const navigate = useNavigate();

  function logout() {
    fetch("http://localhost:8000/api/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(() => {
      localStorage.removeItem("token");
      navigate("/login");
    });
  }
  const menus = [
    {
      name: "Home",
      url: "/home",
    },
    {
      name: "Buy Transaction",
      url: "/buy",
    },
    {
      name: "Sell Transaction",
      url: "/sell",
    },
    {
      name: "Summary",
      url: "/summary",
    },
  ];
  return (
    <Flex direction="column" h="100%" p="20px" bg="#132043">
      {menus.map((menu, idx) => (
        <Link to={`${menu.url}`} key={idx}>
          <Box
            color="white"
            p={5}
            bg="#1F4172"
            borderRadius={5}
            mb={2}
            _hover={{
              bgColor: "#ffffff80",
            }}
            cursor="pointer"
          >
            {menu.name}
          </Box>
        </Link>
      ))}
      <Box
        color="white"
        p={5}
        bg="#1F4172"
        borderRadius={5}
        mb={2}
        _hover={{
          bgColor: "#ffffff80",
        }}
        cursor="pointer"
        onClick={logout}
      >
        Logout
      </Box>
    </Flex>
  );
}

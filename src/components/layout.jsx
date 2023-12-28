// noinspection JSValidateTypes

import React from "react";
import {
  Flex,
  Heading,
  Icon,
  Image,
  Modal,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";
import SidebarItem from "./sidebar-item.jsx";
import { BiMenu, BiNetworkChart, BiSlider } from "react-icons/bi";
import Settings from "./settings";
import logo from "../assets/logo.webp";

const Layout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      flexDir={"row"}
      h={"100vh"}
      w={"100%"}
      maxH={"100vh"}
      overflow={"hidden"}>
      {/* Sidebar */}
      <Flex
        bg={"#212F3D"}
        flexDir={"column"}
        w={['64px', '64px', '64px', '25%', '20%']}
        overflowX={"hidden"}
        overflowY={"auto"}
        py={8}
        px={[0,0,0,2,4]}
        alignItems={"center"}
        justifyContent={"space-between"}>
        <Flex flexDir={'column'}>
          <Image alt={"Mikan"} src={logo} h={['32px', '32px', '32px', '48px', '64px']} objectFit={'contain'} />
          <Heading
            fontFamily={"sans-serif"}
            as={"h1"}
            color={"whitesmoke"}
            fontSize={[0, 0, 0, 'xx-large', 'xx-large']}
            userSelect={"none"}>
            Mikan-KG
          </Heading>
        </Flex>
        <Flex flexDir={"column"} w={"100%"}>
          <SidebarItem icon={BiNetworkChart} path={"/"}>
            Graph
          </SidebarItem>
          <SidebarItem icon={BiMenu} path={"/context"}>
            Context
          </SidebarItem>
        </Flex>
        <Flex
          color={"whitesmoke"}
          fontSize={"2xl"}
          w={"64px"}
          h={"64px"}
          borderRadius={[0, 0, 0, "50%", "50%"]}
          p={3}
          alignItems={"center"}
          justifyContent={"center"}
          onClick={onOpen}
          _hover={{
            bg: "blackAlpha.400",
            color: "pink",
            cursor: "pointer"
          }}>
          <Icon as={BiSlider} />
        </Flex>
      </Flex>

      {/* Main content */}
      <Flex flex={1} h={"100vh"}>
        {children}
      </Flex>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <Settings onClose={onClose} />
      </Modal>
    </Flex>
  );
};

export default Layout;

import { Avatar, Box, Flex, Text, Divider, Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function MyDashboard() {
  const { t } = useTranslation();

  return (
    <Flex direction="column" align="center" width="full" mt={16}>
      {/* Stats Cards */}
      {/* <Flex justify="space-evenly" width="full" height="80" wrap="wrap"> */}
      {/* <Box
          width={{ base: "90%", md: "45%", lg: "25%" }}
          bg="gray.400"
          height="100%"
          rounded="2xl"
          textAlign="center"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          fontSize="4xl"
          mb={{ base: 4, lg: 0 }}
        >
          <Text as="span" fontSize="7xl" fontWeight="bold">
            590
          </Text>
          <Divider my={2} />
          <Text as="span" fontWeight="bold">
            {t("Like")}
          </Text>
       </Box> */}
      {/* //   <Box
      //     width={{ base: "90%", md: "45%", lg: "35%" }}
      //     bg="gray.400"
      //     height="100%"
      //     rounded="2xl"
      //     textAlign="center"
      //     display="flex"
      //     flexDirection="column"
      //     justifyContent="center"
      //     alignItems="center"
      //     fontSize="4xl"
      //     mb={{ base: 4, lg: 0 }}
      //   >
      //     <Text as="span" fontSize="7xl" fontWeight="bold" textColor="black">
      //       20
      //     </Text>
      //     <Divider my={2} />
      //     <Text as="span" fontWeight="bold" textColor="black">
      //       {t("Total Car")}
      //     </Text>
      //   </Box>
      // </Flex> */}

      <Box
        width={{ base: "90%", lg: "73%" }}
        mt={12}
        bg="gray.400"
        rounded="2xl"
        // textAlign="center"
        px={10}
        py={6}
      >
        <Heading
          size="xl"
          mb={4}
          textColor="black"
          className="pt-6 text-4xl font-bold pb-5"
        >
          {t("Comments")}
        </Heading>
        <Comment
          avatarSrc="https://bit.ly/dan-abramov"
          name="Mohammed Mahdi"
          message="hello there"
        />
      </Box>
    </Flex>
  );
}

function Comment({ avatarSrc, name, message }) {
  return (
    <Flex
      justify="center"
      align="center"
      gap={10}
      p={10}
      className="bg-slate-600 rounded-xl"
      direction={{ base: "column", md: "row" }}
    >
      <Avatar size="lg" name={name} src={avatarSrc} />
      <Box width="full" bg="white" rounded="xl" p={5} alignSelf="self-start">
        <Text fontSize="xl" fontWeight="bold" textColor="black">
          {name}
        </Text>
        <Divider my={2} />
        <Text textColor="black">{message}</Text>
      </Box>
    </Flex>
  );
}
